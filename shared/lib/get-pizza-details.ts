import { Ingredient, ProductItem } from "@prisma/client";
import { MAP_PIZZA_TYPE, PizzaSize, PizzaType } from "../constants/pizza";
import { calcTotalPizzaPrice } from "./calc-total-pizza-price";

export const getPizzaDetails = (
  type: PizzaType,
  size: PizzaSize,
  productItems: ProductItem[],
  allIngredients: Ingredient[],
  selectedIngredientsIds: Set<number>
) => {
  const totalPrice = calcTotalPizzaPrice(
    type,
    size,
    productItems,
    allIngredients,
    selectedIngredientsIds
  );

  const textDetails = `${size} см, ${MAP_PIZZA_TYPE[type]} тесто`;

  return { totalPrice, textDetails };
};
