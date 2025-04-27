import { useEffect } from "react";
import { Filters } from "./use-filters";
import { useRouter } from "next/navigation";
import qs from "qs";

export const useQueryFilters = (filters: Filters) => {
  const router = useRouter();

  useEffect(() => {
    const params = {
      ...filters.prices,
      ingredients: Array.from(filters.selectedIngredients),
      pizzaSizes: Array.from(filters.pizzaSizes),
      pizzaTypes: Array.from(filters.pizzaTypes),
    };

    const queryString = qs.stringify(params, {
      arrayFormat: "comma",
    });

    router.push(`?${queryString}`, {
      scroll: false,
    });
  }, [filters, router]);
};
