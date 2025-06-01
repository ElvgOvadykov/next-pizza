"use client";

import { ProductWithRelations } from "@/@types/prisma";
import { useCartStore } from "@/shared/store";
import React from "react";
import toast from "react-hot-toast";
import { ChoosePizzaForm } from "./choose-pizza-form";
import { ChooseProductForm } from "./choose-product-form";

interface Props {
  product: ProductWithRelations;
  onSubmit?: VoidFunction;
}

export const ChooseForm: React.FC<Props> = ({ product, onSubmit }) => {
  const addCartItem = useCartStore((state) => state.addCartItem);
  const isLoading = useCartStore((state) => state.loading);

  const isPizza = Boolean(product.productItems[0].pizzaType);

  const onProductAddCartHandler = async (
    productItemId: number,
    ingredientsIds?: number[]
  ) => {
    try {
      await addCartItem({
        productItemId,
        ingredientsIds,
      });
      toast.success(product.name + " добавили в корзину");
      onSubmit?.();
    } catch (error) {
      toast.error("Не удалось добавить товар в корзину");
      console.log(error);
    }
  };

  if (isPizza) {
    return (
      <ChoosePizzaForm
        product={product}
        onClickAddCart={onProductAddCartHandler}
        loading={isLoading}
      />
    );
  }

  return (
    <ChooseProductForm
      product={product}
      onClickAdd={onProductAddCartHandler}
      loading={isLoading}
    />
  );
};
