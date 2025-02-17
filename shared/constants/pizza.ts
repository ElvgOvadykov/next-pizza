export const MAP_PIZZA_SIZE = {
  20: "Маленькая",
  30: "Средняя",
  40: "Большая",
} as const;

export const MAP_PIZZA_TYPE = {
  1: "Традиционное",
  2: "Тонкое",
} as const;

export const PIZZA_SIZES = Object.entries(MAP_PIZZA_SIZE).map(
  ([value, name]) => ({
    name,
    value,
  })
);

export const PIZZA_TYPES = Object.entries(MAP_PIZZA_TYPE).map(
  ([value, name]) => ({
    name,
    value,
  })
);

export type PizzaSize = keyof typeof MAP_PIZZA_SIZE;
export type PizzaType = keyof typeof MAP_PIZZA_TYPE;
