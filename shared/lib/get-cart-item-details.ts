import {
  MAP_PIZZA_SIZE,
  MAP_PIZZA_TYPE,
  PizzaSize,
  PizzaType,
} from "../constants/pizza";
import { CartStateItem } from "../store/cart";

export const getCartItemDetails = (
  pizzaType: PizzaType,
  pizzaSize: PizzaSize,
  ingredients: CartStateItem["ingredients"]
): string => {
  const details = [];

  if (pizzaSize && pizzaType) {
    const sizeName = MAP_PIZZA_SIZE[pizzaSize];
    const typeName = MAP_PIZZA_TYPE[pizzaType];
    details.push(`${sizeName} ${pizzaSize} см, ${typeName} тесто`);
  }

  if (ingredients) {
    details.push(...ingredients.map((ingredient) => ingredient.name));
  }

  return details.join(", ");
};
