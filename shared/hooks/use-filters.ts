import { useSearchParams } from "next/navigation";
import { useSet } from "react-use";
import { useMemo, useState } from "react";

type PriceProps = {
  priceFrom?: number;
  priceTo?: number;
};

interface QueryFilters extends PriceProps {
  pizzaTypes: string;
  pizzaSizes: string;
  ingredients: string;
}

export interface Filters {
  pizzaSizes: Set<string>;
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

  const [pizzaSizes, { toggle: togglePizzaSizes }] = useSet(
    new Set<string>(searchParams.get("pizzaSizes")?.split(",") ?? [])
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

  return useMemo(
    () => ({
      pizzaSizes,
      pizzaTypes,
      selectedIngredients,
      prices: {
        priceFrom,
        priceTo,
      },
      setPrice: updatePrice,
      setPizzaTypes: togglePizzaTypes,
      setPizzaSizes: togglePizzaSizes,
      setIngredients: toggleIngredients,
    }),
    [pizzaSizes, pizzaTypes, selectedIngredients, priceFrom, priceTo]
  );
};
