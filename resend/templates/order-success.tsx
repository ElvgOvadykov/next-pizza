import { CartItemDTO } from "@/shared/services/dto/cart-dto";
import React from "react";

export interface OrderSuccessEmailProps {
  orderId: number;
  cartItems: CartItemDTO[];
}

export const OrderSuccessTemplate: React.FC<OrderSuccessEmailProps> = ({
  orderId,
  cartItems,
}) => (
  <div>
    <h1>Спасибо за покупку!!!</h1>

    <p>Ваш заказ №{orderId} оплачен. Список товаров: </p>

    <hr />

    <ul>
      {cartItems.map((cartItem) => (
        <li key={cartItem.id}>
          {cartItem.productItem.product.name} | {cartItem.productItem.price} ₽ x{" "}
          {cartItem.quantity} шт. ={" "}
          {cartItem.productItem.price * cartItem.quantity} ₽
        </li>
      ))}
    </ul>
  </div>
);
