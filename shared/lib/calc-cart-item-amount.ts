import { CartItemDTO } from "../services/dto/cart-dto";

export const calcCartItemAmount = (cartItemDTO: CartItemDTO): number => {
  const { quantity } = cartItemDTO;
  const { price } = cartItemDTO.productItem;
  const ingredientsSum = cartItemDTO.ingredients.reduce(
    (acc, ingredient) => acc + ingredient.price,
    0
  );

  return quantity * (price + ingredientsSum);
};
