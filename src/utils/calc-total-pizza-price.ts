import { PizzaSize, PizzaType } from "@/constants/pizza";
import { Ingredient, ProductVariant } from "@prisma/client";

interface IParams {
  ingredients: Ingredient[];
  items: ProductVariant[];
  selectedIngredients: Set<number>;
  size: PizzaSize;
  type: PizzaType;
}

export const totalPizzaPrice = ({
  items,
  ingredients,
  selectedIngredients,
  size,
  type,
}: IParams) => {
  const currentPizzaPrice =
    items.find((el) => el.size === size && el.pizzaType === type)?.price || 0;
  const totalIngredientsPrice = ingredients
    .filter((ingredient) => selectedIngredients.has(ingredient.id))
    .reduce((acc, ingredient) => acc + ingredient.price, 0);
  return currentPizzaPrice + totalIngredientsPrice;
};
