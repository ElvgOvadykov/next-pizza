import React from "react";
import { WhiteBlock } from "../white-block";
import { CheckoutCartItem } from "../checkout-cart-item";
import { getCartItemDetails } from "@/shared/lib";
import { PizzaSize, PizzaType } from "@/shared/constants/pizza";
import { CartStateItem } from "@/shared/store/cart";
import { CountButtonType } from "../count-button";
import { CheckoutItemSkeleton } from "../checkout-item-skeleton";

interface Props {
  loading?: boolean;
  items: CartStateItem[];
  className?: string;
  onClickCountButton: (
    itemId: number,
    currentQuantity: number,
    type: CountButtonType
  ) => void;
  onClickRemove: (itemId: number) => void;
}

export const CheckoutCart: React.FC<Props> = ({
  className,
  items,
  loading,
  onClickCountButton,
  onClickRemove,
}) => {
  return (
    <WhiteBlock title="1. Корзина" className={className}>
      {loading ? (
        <div className="flex flex-col gap-3">
          {[...Array(3)].map((_, index) => (
            <CheckoutItemSkeleton key={index} />
          ))}
        </div>
      ) : (
        items.map((item) => (
          <CheckoutCartItem
            key={item.id}
            id={item.id}
            name={item.name}
            details={
              item.pizzaType && item.pizzaSize
                ? getCartItemDetails(
                    item.pizzaType as PizzaType,
                    item.pizzaSize as PizzaSize,
                    item.ingredients
                  )
                : ""
            }
            imageUrl={item.imageUrl}
            price={item.amount}
            quantity={item.quantity}
            disabled={item.disabled}
            onClickCountButton={(type: CountButtonType) =>
              onClickCountButton(item.id, item.quantity, type)
            }
            onClickRemove={() => onClickRemove(item.id)}
          />
        ))
      )}
    </WhiteBlock>
  );
};
