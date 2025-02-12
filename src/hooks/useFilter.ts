import { useSearchParams } from "next/navigation";
import { ChangeEvent, useMemo, useState } from "react";

export const useFilter = () => {
  const searchParams = useSearchParams();

  const [pizzaType, setPizzaType] = useState<string[]>(
    searchParams.has("pizzaTypes")
      ? searchParams.get("pizzaTypes")!.split(",")
      : []
  );

  const [pizzaSize, setPizzaSize] = useState<string[]>(
    searchParams.has("size")
      ? searchParams.get("size")!.split(",")
      : []
  );

  const [pizzaIngredients, setPizzaIngredients] = useState<string[]>(
    searchParams.has("ingredients")
      ? searchParams.get("ingredients")!.split(",")
      : []
  );

  const changeState = (state: string[], value: string) => {
    if (state.includes(value)) {
      return state.filter((el) => el !== value);
    } else {
      return [...state, value];
    }
  };

  const [pizzaPrice, setPizzaPrice] = useState({
    priceFrom: Number(searchParams.get("priceFrom")) || undefined,
    priceTo: Number(searchParams.get("priceTo")) || undefined,
  });

  const changePrice = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPizzaPrice((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const updatePrice = (priceFrom: number, priceTo: number) => {
    setPizzaPrice({ priceFrom, priceTo });
  };

  const filter = {
    pizzaTypes: pizzaType,
    sizes: pizzaSize,
    ingredients: pizzaIngredients,
    priceFrom: pizzaPrice.priceFrom,
    priceTo: pizzaPrice.priceTo,
  };

  return useMemo(
    () => ({
      pizzaType,
      setPizzaType,
      pizzaSize,
      setPizzaSize,
      pizzaIngredients,
      setPizzaIngredients,
      changeState,
      pizzaPrice,
      changePrice,
      updatePrice,
      filter,
    }),
    [pizzaType, pizzaSize, pizzaIngredients, pizzaPrice]
  );
};
