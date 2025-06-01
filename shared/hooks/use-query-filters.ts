import { useEffect } from "react";
import { Filters } from "./use-filters";
import { useRouter } from "next/navigation";
import qs from "qs";
import { useIsMounted } from "./use-is-mounted";

export const useQueryFilters = (filters: Filters) => {
  const isMounted = useIsMounted();
  const router = useRouter();

  useEffect(() => {
    if (isMounted) {
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
    }
  }, [filters, router]);
};
