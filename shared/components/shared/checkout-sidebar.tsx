import React from "react";
import { WhiteBlock } from "./white-block";
import { CheckoutDetailsRow } from "./checkout-details-row";
import { Button, Skeleton } from "../ui";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";

interface Props {
  totalAmount: number;
  vatPercent: number;
  deliveryPrice: number;
  className?: string;
  cartLoading?: boolean;
  isSubmitting?: boolean;
}

export const CheckoutSidebar: React.FC<Props> = ({
  className,
  totalAmount,
  vatPercent,
  deliveryPrice,
  cartLoading,
  isSubmitting,
}) => {
  const vatPrice = (totalAmount * vatPercent) / 100;
  const fullTotalAmount = totalAmount + vatPrice + deliveryPrice;

  return (
    <WhiteBlock className="p-6 sticky top-4">
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {cartLoading ? (
          <Skeleton className="h-11 w-48" />
        ) : (
          <span className="h-11 text-[34px] font-extrabold">
            {fullTotalAmount} ₽
          </span>
        )}
      </div>

      <CheckoutDetailsRow
        title={
          <div className="flex items-center">
            <Package size={18} className="mr-2 text-gray-300" />
            Стоимость товара:
          </div>
        }
        value={
          cartLoading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${totalAmount} ₽`
          )
        }
      />
      <CheckoutDetailsRow
        title={
          <div className="flex items-center">
            <Percent size={18} className="mr-2 text-gray-300" />
            Налоги:
          </div>
        }
        value={
          cartLoading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${vatPrice} ₽`
          )
        }
      />
      <CheckoutDetailsRow
        title={
          <div className="flex items-center">
            <Truck size={18} className="mr-2 text-gray-300" />
            Доставка:
          </div>
        }
        value={
          cartLoading ? (
            <Skeleton className="h-6 w-16 rounded-[6px]" />
          ) : (
            `${deliveryPrice} ₽`
          )
        }
      />

      <Button
        loading={cartLoading || isSubmitting}
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
      >
        Перейти к оплате
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
