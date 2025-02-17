import { Ingredient, ProductItem } from "@prisma/client";
import { PizzaSize, PizzaType } from "../constants/pizza";

export const calcTotalPizzaPrice = (
  type: PizzaType,
  size: PizzaSize,
  productItems: ProductItem[],
  allIngredients: Ingredient[],
  selectedIngredientsIds: Set<number>
) => {
  const pizzaPrice =
    productItems.find((item) => item.pizzaType === type && item.size === size)
      ?.price || 0;

  const ingredientsPrice = allIngredients
    .filter((ingredient) => selectedIngredientsIds.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);

  return pizzaPrice + ingredientsPrice;
};
