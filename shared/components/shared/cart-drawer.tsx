"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  Button,
  SheetClose,
} from "@/shared/components/ui";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { CountButtonType } from "./count-button";
import Image from "next/image";
import { Title } from "./title";
import { useCart } from "@/shared/hooks";

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const {
    totalAmount,
    items,
    totalItemsCount,
    updateCartItemQuantity,
    removeCartItem,
  } = useCart();

  const isCartEmpty = totalAmount === 0;

  const onCountButtonClickHandler = (
    itemId: number,
    quantity: number,
    type: CountButtonType
  ) => {
    if (type === "minus") {
      updateCartItemQuantity(itemId, quantity - 1);
    } else {
      updateCartItemQuantity(itemId, quantity + 1);
    }
  };

  const onRemoveClickHandler = (itemId: number) => {
    removeCartItem(itemId);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        {isCartEmpty && (
          <div className="flex flex-col h-full justify-center">
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <Image
                src="/assets/images/empty-box.png"
                alt="Empty cart"
                width={120}
                height={120}
              />
              <Title
                size="sm"
                text="Корзина пустая"
                className="text-center font-bold my-2"
              />
              <p className="text-center text-neutral-500 mb-5">
                Добавьте хотя бы одну пиццу, чтобы совершить заказ
              </p>
              <SheetClose>
                <Button className="w-56 h-12 text-base" size="lg">
                  <ArrowLeft className="w-5 mr-2" />
                  Вернуться назад
                </Button>
              </SheetClose>
            </div>
          </div>
        )}

        {!isCartEmpty && (
          <SheetHeader>
            <SheetTitle>
              В корзине{" "}
              <span className="font-bold">{totalItemsCount} товара</span>
            </SheetTitle>
          </SheetHeader>
        )}

        {!isCartEmpty && (
          <>
            <div className="-mx-6 overflow-auto flex-1">
              {items.map(
                ({
                  id,
                  imageUrl,
                  pizzaSize,
                  pizzaType,
                  name,
                  amount,
                  ingredients,
                  quantity,
                  disabled,
                }) => (
                  <CartDrawerItem
                    id={id}
                    key={id}
                    imageUrl={imageUrl}
                    details={
                      pizzaSize && pizzaType
                        ? getCartItemDetails(
                            pizzaType as PizzaType,
                            pizzaSize as PizzaSize,
                            ingredients
                          )
                        : ""
                    }
                    name={name}
                    price={amount}
                    quantity={quantity}
                    onCountButtonClick={(type) =>
                      onCountButtonClickHandler(id, quantity, type)
                    }
                    onRemoveButtonClick={() => onRemoveClickHandler(id)}
                    disabled={disabled}
                  />
                )
              )}
            </div>

            <SheetFooter className="-mx-6 bg-white p-8">
              <div className="w-full">
                <div className="flex mb-4">
                  <span className="flex flex-1 text-lg text-neutral-500">
                    Итого
                    <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                  </span>
                  <span className="font-bold text-lg">{totalAmount} ₽</span>
                </div>

                <Link href="/checkout">
                  <Button type="submit" className="w-full h-12 text-base">
                    Оформить заказ
                    <ArrowRight className="w-5 ml-2" />
                  </Button>
                </Link>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};
