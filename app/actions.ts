"use server";

import { prisma } from "@/prisma/prisma-client";
import { sendEmail } from "@/resend/send-email";
import { PayOrderTemplate } from "@/resend/templates";
import { VerificationUserTemplate } from "@/resend/templates/verification-user";
import { CheckoutFormValues } from "@/shared/components/shared";
import { Api } from "@/shared/services/api-client";
import { OrderStatus, Prisma } from "@prisma/client";
import { hashSync } from "bcrypt";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";
import { authOptions } from "./api/auth/[...nextauth]/route";

export async function createOrder(data: CheckoutFormValues): Promise<string> {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("Cart token not found");
    }

    /** Находим корзину по токену */
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        cartItems: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
      where: {
        token: cartToken,
      },
    });

    /** Если корзина не найдена возвращаем ошибку */
    if (!userCart) {
      throw new Error("Cart not found");
    }

    /** Если корзина пустая возвращаем ошибку */
    if (userCart.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    /** Создаем заказ */
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.cartItems),
      },
    });

    /** Очищаем корзину */
    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
      },
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id,
      },
    });

    /** Создаем платеж */
    const paymentData = await Api.payment.createPayment({
      description: "Оплата заказа №" + order.id,
      orderId: order.id,
      amount: order.totalAmount,
    });

    if (!paymentData) {
      throw new Error("Payment data not found");
    }

    const {
      id: paymentDataId,
      confirmation: { confirmation_url: paymentUrl },
    } = paymentData;

    /** Обновляем информацию о заказе */
    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: paymentDataId,
      },
    });

    /** Отправляем информацию о заказе на почту */
    await sendEmail(
      data.email,
      "Next Pizza / Оплата заказа №" + order.id,
      PayOrderTemplate({
        orderId: order.id,
        paymentUrl,
        totalAmount: order.totalAmount,
      })
    );

    return paymentUrl;
  } catch (error) {
    throw error;
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      throw new Error("Auth error");
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(session.user.id),
      },
    });

    if (!findUser) {
      throw new Error("User not found");
    }

    await prisma.user.update({
      where: {
        id: Number(session.user.id),
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password
          ? hashSync(body.password.toString(), 10)
          : findUser.password,
      },
    });
  } catch (error) {
    console.error("Error [UPDATE_USER]", error);
    throw error;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (user) {
      if (!user.verified) {
        throw new Error("Почта не подтверждена!");
      }

      throw new Error("Почта уже существует");
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10),
      },
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id,
      },
    });

    await sendEmail(
      createdUser.email,
      "Next Pizza / Подтверждение регистрации",
      VerificationUserTemplate({
        code,
      })
    );
  } catch (err) {
    console.error("Error [CREATE_USER]: ", err);
    throw err;
  }
}
