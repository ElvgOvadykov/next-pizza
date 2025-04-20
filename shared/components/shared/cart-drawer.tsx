"use client";
import React, { useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  Button,
} from "@/shared/components/ui";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./cart-drawer-item";
import { getCartItemDetails } from "@/shared/lib";
import { useCartStore } from "@/shared/store";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { CountButtonType } from "./count-button";

interface Props {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  const totalAmount = useCartStore((state) => state.totalAmount);
  const items = useCartStore((state) => state.items);

  const fetchCartItems = useCartStore((state) => state.fetchCartItems);
  const updateCartItemQuantity = useCartStore(
    (state) => state.updateItemQuantity
  );
  const removeCartItem = useCartStore((state) => state.removeCartItem);

  useEffect(() => {
    fetchCartItems();
  }, []);

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
        <SheetHeader>
          <SheetTitle>
            В корзине <span className="font-bold">{items.length} товара</span>
          </SheetTitle>
        </SheetHeader>

        {/* {items} */}
        <div className="-mx-6 mt-5 overflow-auto flex-1">
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
              />
            )
          )}

          {/* <div className="mb-2">
            <CartDrawerItem
              id={1}
              imageUrl="http://localhost:3000/_next/image?url=https%3A%2F%2Fmedia.dodostatic.net%2Fimage%2Fr%3A584x584%2F11EE7D61706D472F9A5D71EB94149304.webp&w=640&q=75"
              name=""
              details={getCartItemDetails(2, 30, [
                { name: "Цыпленок" },
                { name: "Сыр" },
              ])}
              price={100}
              quantity={1}
            />
          </div> */}
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

            <Link href="/cart">
              <Button type="submit" className="w-full h-12 text-base">
                Оформить заказ
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
