import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import { useState } from "react";

type PriceProps = {
  priceFrom?: number;
  priceTo?: number;
};

interface QueryFilters extends PriceProps {
  pizzaTypes: string;
  sizes: string;
  ingredients: string;
}

export interface Filters {
  sizes: Set<string>;
  pizzaTypes: Set<string>;
  selectedIngredients: Set<string>;
  prices: PriceProps;
}

interface ReturnProps extends Filters {
  setPrice: (name: keyof PriceProps, value: number) => void;
  setPizzaTypes: (key: string) => void;
  setPizzaSizes: (key: string) => void;
  setIngredients: (key: string) => void;
}

export const useFilters = (): ReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<
    keyof QueryFilters,
    string
  >;

  const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
    new Set<string>(searchParams.get("ingredients")?.split(",") ?? [])
  );

  const [sizes, { toggle: toggleSizes }] = useSet(
    new Set<string>(searchParams.get("sizes")?.split(",") ?? [])
  );
  const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(
    new Set<string>(searchParams.get("pizzaTypes")?.split(",") ?? [])
  );

  const [{ priceFrom, priceTo }, setPrice] = useState<PriceProps>({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  const updatePrice = (name: keyof PriceProps, value: number) => {
    setPrice((oldValue) => ({
      ...oldValue,
      [name]: value,
    }));
  };

  return {
    sizes,
    pizzaTypes,
    selectedIngredients,
    prices: {
      priceFrom,
      priceTo,
    },
    setPrice: updatePrice,
    setPizzaTypes: togglePizzaTypes,
    setPizzaSizes: toggleSizes,
    setIngredients: toggleIngredients,
  };
};
