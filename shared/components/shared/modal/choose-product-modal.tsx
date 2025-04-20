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

interface Props {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
  const router = useRouter();

  const firstProductItem = product.productItems[0];
  const isPizzaForm = Boolean(firstProductItem.pizzaType);
  const addCartItem = useCartStore((state) => state.addCartItem);

  const onPizzaAddCartHandler = (
    productItemId: number,
    ingredientsIds: number[]
  ) => {
    addCartItem({
      productItemId,
      ingredientsIds,
    });
  };

  const onProductAddCartHandler = () => {
    addCartItem({
      productItemId: firstProductItem.id,
    });
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
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            productItems={product.productItems}
            onClickAddCart={onPizzaAddCartHandler}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            onClickAdd={onProductAddCartHandler}
            price={firstProductItem.price}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
