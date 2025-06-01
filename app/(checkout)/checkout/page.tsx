"use client";

import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CheckoutAddressForm,
  CheckoutCart,
  CheckoutPersonalForm,
  CheckoutSidebar,
  Container,
  Title,
} from "@/shared/components/shared";
import { CountButtonType } from "@/shared/components/shared";
import { useCart } from "@/shared/hooks";
import {
  checkoutFormSchema,
  CheckoutFormValues,
} from "@/shared/components/shared";
import { createOrder } from "@/app/actions";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Api } from "@/shared/services/api-client";

const VAT = 15;
const DELIVERY_PRICE = 250;

export default function CheckoutPage(): JSX.Element {
  const [isSubmitting, setSubmitting] = useState(false);
  const {
    totalAmount,
    updateCartItemQuantity,
    items,
    loading,
    removeCartItem,
  } = useCart();
  const session = useSession();

  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  useEffect(() => {
    async function getProfileData() {
      const userData = await Api.profile.getProfile();
      const [firstName, lastName] = userData.fullName.split(" ");

      form.setValue("firstName", firstName);
      form.setValue("lastName", lastName);
      form.setValue("email", userData.email);
    }

    if (session) {
      getProfileData();
    }
  }, []);

  const onSubmitHandler: SubmitHandler<CheckoutFormValues> = async (data) => {
    setSubmitting(true);
    try {
      const url = await createOrder(data);

      if (url) {
        toast.success(
          "Заказ успешно оформлен! Переход на страницу оплаты >>>",
          {
            icon: "✅",
          }
        );

        location.href = url;
      }
    } catch (error) {
      console.error(error);
      setSubmitting(false);
      toast.error("Не удалось создать заказ", {
        icon: "❌",
      });
    }
  };

  const onClickCountButtonHandler = (
    id: number,
    quantity: number,
    type: CountButtonType
  ) => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateCartItemQuantity(id, newQuantity);
  };

  const vatPrice = (totalAmount * VAT) / 100;
  const fullTotalAmount = totalAmount + vatPrice + DELIVERY_PRICE;

  return (
    <Container className="mt-10">
      <Title
        text="Оформление заказа"
        className="font-extrabold mb-8 text-[36px]"
      />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmitHandler)}>
          <div className="flex gap-10">
            {/* Левая часть */}
            <div className="flex flex-col gap-10 flex-1 mb-20">
              <CheckoutCart
                loading={loading}
                items={items}
                onClickCountButton={onClickCountButtonHandler}
                onClickRemove={removeCartItem}
              />

              <CheckoutPersonalForm
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />

              <CheckoutAddressForm
                className={loading ? "opacity-40 pointer-events-none" : ""}
              />
            </div>

            {/* Правая часть */}
            <div className="w-[450px]">
              <CheckoutSidebar
                deliveryPrice={DELIVERY_PRICE}
                totalAmount={totalAmount}
                vatPercent={VAT}
                cartLoading={loading}
                isSubmitting={isSubmitting}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}
