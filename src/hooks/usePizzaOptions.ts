import { PizzaSize, pizzaSizes, PizzaType } from "@/constants/pizza";
import { ProductVariant } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSet } from "react-use";

export const usePizzaOptions = (items: ProductVariant[]) => {
  const [size, setSize] = useState<PizzaSize>(20);
  const [type, setType] = useState<PizzaType>(1);

  const [selectedIngredients, { toggle: addIngredient }] = useSet(
    new Set<number>([])
  );

  const currentItemId = items.find(
    (item) => item.pizzaType === type && item.size === size
  )?.id as number;

  const currentSizeForType = items.filter((item) => item.pizzaType === type);
  const availableSizes = pizzaSizes.map((item) => ({
    ...item,
    disabled: !currentSizeForType.find((el) => el.size === Number(item.value)),
  }));

  useEffect(() => {
    const isAvalibleSize = currentSizeForType.some(
      (item) => item.size === size
    );

    if (!isAvalibleSize) {
      setSize(currentSizeForType[0].size as PizzaSize);
    }
  }, [type]);

  return {
    size,
    setSize,
    type,
    setType,
    selectedIngredients,
    availableSizes,
    addIngredient,
    currentItemId,
  };
};
