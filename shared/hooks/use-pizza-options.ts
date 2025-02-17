import { ProductItem } from "@prisma/client";
import {
  PizzaSize,
  PIZZA_SIZES,
  PizzaType,
  PIZZA_TYPES,
} from "../constants/pizza";
import React from "react";
import { useSet } from "react-use";
import { Variant } from "../components/shared/group-variants";

type ReturnProps = {
  size: PizzaSize;
  type: PizzaType;
  selectedIngredients: Set<number>;
  sizesOptions: Variant[];
  typesOptions: Variant[];
  setSize: (size: PizzaSize) => void;
  setType: (size: PizzaType) => void;
  toggleIngredient: (key: number) => void;
};

export const usePizzaOptions = (items: ProductItem[]): ReturnProps => {
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);
  const [selectedIngredients, { toggle: toggleIngredient }] = useSet(
    new Set<number>([])
  );

  const availableSizes = new Set(items.map((item) => String(item.size)));
  const sizesOptions = PIZZA_SIZES.map<Variant>((size) => {
    if (!availableSizes.has(size.value)) {
      return {
        ...size,
        disabled: true,
      };
    }

    return size;
  });

  const availableTypes = new Set(
    items
      .filter((item) => item.size === size)
      .map((item) => String(item.pizzaType))
  );
  const typesOptions = PIZZA_TYPES.map<Variant>((type) => {
    if (!availableTypes.has(type.value)) {
      return {
        ...type,
        disabled: true,
      };
    }

    return type;
  });

  React.useEffect(() => {
    const isPizzaItemAvailable = Boolean(
      items.find((item) => item.pizzaType === type && item.size === size)
    );

    if (!isPizzaItemAvailable) {
      const firstBySizeItem = items.find((item) => item.size === size);

      if (firstBySizeItem?.size && firstBySizeItem?.pizzaType) {
        setSize(firstBySizeItem.size as PizzaSize);
        setType(firstBySizeItem.pizzaType as PizzaType);
      }
    }
  }, [type, size, items]);

  return {
    size,
    type,
    selectedIngredients,
    sizesOptions,
    typesOptions,
    setSize,
    setType,
    toggleIngredient,
  };
};
