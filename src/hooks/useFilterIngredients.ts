import { Ingredient } from "@prisma/client";
import { useEffect, useState } from "react";

interface IReturnProps {
  ingredients: Ingredient[];
  loading: boolean;
}

export const useFilterIngredients = (): IReturnProps => {
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    const getIngredients = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/ingredients`
        );
        const data = await res.json();
        setIngredients(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getIngredients();
  }, []);

  return { ingredients, loading };
};
