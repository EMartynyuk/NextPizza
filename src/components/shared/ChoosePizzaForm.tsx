"use client";

import { cn } from "@/utils/utils";
import { Ingredient, ProductVariant } from "@prisma/client";
import { GroupVariants, IngredientItem, PizzaImage, Title } from ".";
import { Button } from "../ui";
import { PizzaSize, PizzaType, pizzaTypes } from "@/constants/pizza";
import { totalPizzaPrice } from "@/utils/calc-total-pizza-price";
import { usePizzaOptions } from "@/hooks/usePizzaOptions";
import { IAddToCart } from "@/actions/cart";
import { useAddToCart } from "@/hooks/cart/useAddToCart";

interface IChoosePizzaForm {
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  items: ProductVariant[];
  className?: string;
  back?: boolean;
}

export const ChoosePizzaForm = ({
  name,
  items,
  imageUrl,
  ingredients,
  className,
  back,
}: IChoosePizzaForm) => {
  const {
    size,
    setSize,
    type,
    setType,
    selectedIngredients,
    availableSizes,
    addIngredient,
    currentItemId,
  } = usePizzaOptions(items);

  const textDetaills = `${size} см, ${pizzaTypes[type - 1].name} пицца`;

  const totalPrice = totalPizzaPrice({
    items,
    ingredients,
    selectedIngredients,
    type,
    size,
  });

  const { addToCart, isPending } = useAddToCart("pizza", back);

  const cartItem: IAddToCart = {
    quantity: 1,
    productItemId: currentItemId,
    ingredients: Array.from(selectedIngredients).map((id) => ({ id })),
    type: "pizza",
  };

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <p className="text-gray-400">{textDetaills}</p>

        <div className="flex flex-col gap-4 mt-5">
          <GroupVariants
            items={availableSizes}
            value={String(size)}
            onClick={(value) => setSize(Number(value) as PizzaSize)}
          />

          <GroupVariants
            items={pizzaTypes}
            value={String(type)}
            onClick={(value) => setType(Number(value) as PizzaType)}
          />
        </div>

        <div className="bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5">
          <div className="grid grid-cols-3 gap-3">
            {ingredients.map((ingredient) => (
              <IngredientItem
                key={ingredient.id}
                name={ingredient.name}
                price={ingredient.price}
                imageUrl={ingredient.imageUrl}
                onClick={() => addIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={isPending}
          onClick={() => addToCart(cartItem)}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};
