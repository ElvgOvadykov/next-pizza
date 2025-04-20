import { cn } from "@/shared/lib/utils";
import React from "react";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import * as CartItem from "./cart-item-details";
import { Trash2Icon } from "lucide-react";
import { CountButtonType } from "./count-button";

interface Props extends CartItemProps {
  onCountButtonClick: (type: CountButtonType) => void;
  onRemoveButtonClick: () => void;
  className?: string;
}

export const CartDrawerItem: React.FC<Props> = ({
  className,
  imageUrl,
  name,
  price,
  quantity,
  details,
  onCountButtonClick,
  onRemoveButtonClick,
}) => {
  return (
    <div className={cn("flex bg-white p-5 gap-6 mb-2", className)}>
      <CartItem.Image src={imageUrl} />

      <div className="flex-1">
        <CartItem.Info name={name} details={details} />

        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <CartItem.CountButton onClick={onCountButtonClick} value={quantity} />

          <div className="flex items-center gap-3">
            <CartItem.Price value={price} />
            <Trash2Icon
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
              onClick={onRemoveButtonClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
