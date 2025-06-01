import { PaymentCallbackData } from "@/@types/yookassa";
import { prisma } from "@/prisma/prisma-client";
import { sendEmail } from "@/resend/send-email";
import { OrderSuccessTemplate } from "@/resend/templates";
import { CartItemDTO } from "@/shared/services/dto/cart-dto";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" });
    }

    const isSucceeded = body.object.status === "succeeded";

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
      },
    });

    const cartItems = JSON.parse(order?.items as string) as CartItemDTO[];

    if (isSucceeded) {
      await sendEmail(
        order.email,
        "Спасибо за заказ!",
        OrderSuccessTemplate({
          orderId: order.id,
          cartItems,
        })
      );
    }

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.log("[Checkout Callback] Error:", error);

    return NextResponse.json({ error: "Server error" });
  }
}
