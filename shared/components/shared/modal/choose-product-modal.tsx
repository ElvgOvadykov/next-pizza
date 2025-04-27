"use client";

import { Dialog } from "@/shared/components/ui";
import { DialogContent } from "@/shared/components/ui/dialog";
import React from "react";
import { cn } from "@/shared/lib/utils";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "../choose-product-form";
import { ProductWithRelations } from "@/@types/prisma";
import { ChoosePizzaForm } from "../choose-pizza-form";
import { useCartStore } from "@/shared/store";
import toast from "react-hot-toast";

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  const isPizzaForm = Boolean(product.productItems[0].pizzaType);

  const addCartItem = useCartStore((state) => state.addCartItem);
  const isLoading = useCartStore((state) => state.loading);

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
      router.back();
    } catch (error) {
      toast.error("Не удалось добавить товар в корзину");
      console.log(error);
    }
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w=[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
      >
        {isPizzaForm ? (
          <ChoosePizzaForm
            product={product}
            onClickAddCart={onProductAddCartHandler}
            loading={isLoading}
          />
        ) : (
          <ChooseProductForm
            product={product}
            onClickAdd={onProductAddCartHandler}
            loading={isLoading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
