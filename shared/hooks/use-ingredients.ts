import { Api } from "@/shared/services/api-client";
import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";

type ReturnProps = {
  ingredients: Ingredient[];
  loading: boolean;
};

export const useIngredients = () => {
  const [ingredients, setIngredients] = useState<ReturnProps["ingredients"]>(
    []
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        setLoading(true);
        const ingredients = await Api.ingredients.getAll();
        setIngredients(ingredients);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    fetchIngredients();
  }, []);

  return {
    ingredients,
    loading,
  };
};
