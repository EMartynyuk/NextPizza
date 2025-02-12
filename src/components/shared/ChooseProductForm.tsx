"use client";

import { Title } from ".";
import { cn } from "@/utils/utils";
import { Button } from "../ui";
import { useAddToCart } from "@/hooks/cart/useAddToCart";
import { IAddToCart } from "@/actions/cart";

interface IChooseProductForm {
  imageUrl: string;
  name: string;
  className?: string;
  price: number;
  id: number;
  back?: boolean;
}

export const ChooseProductForm = ({
  name,
  imageUrl,
  price,
  id,
  className,
  back,
}: IChooseProductForm) => {
  const { addToCart, isPending } = useAddToCart("other", back);
  const cartItem: IAddToCart = {
    quantity: 1,
    productItemId: id,
    type: "other",
  };

  return (
    <div className={cn(className, "flex flex-1")}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>

      <div className="w-[490px] bg-[#f7f6f5] p-7">
        <Title text={name} size="md" className="font-extrabold mb-1" />

        <Button
          loading={isPending}
          onClick={() => addToCart(cartItem)}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {price} ₽
        </Button>
      </div>
    </div>
  );
};
