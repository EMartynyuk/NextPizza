"use client";

import { cn } from "@/utils/utils";
import * as CartItem from "./cart-item-details";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import { CountButton } from ".";
import { Trash2Icon } from "lucide-react";
import { Button } from "../ui";
import { useRemoveFromCart } from "@/hooks/cart/useRemoveFromCart";

interface ICartDrawerItem extends CartItemProps {
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemove?: (id: number) => void;
  className?: string;
  isPending?: boolean;
}

export const CartDrawerItem = ({
  imageUrl,
  name,
  price,
  quantity,
  details,
  onClickCountButton,
  className,
  id,
}: ICartDrawerItem) => {
  const { removeFromCart, isPending } = useRemoveFromCart();

  return (
    <div
      className={cn(
        "flex bg-white p-5 gap-6",
        {
          "opacity-50 pointer-events-none": isPending,
        },
        className
      )}
    >
      <CartItem.Image src={imageUrl} />

      <div className="flex-1">
        <CartItem.Info name={name} details={details} />

        <hr className="my-3" />

        <div className="flex items-center justify-between">
          <CountButton onClick={onClickCountButton} value={quantity} id={id} />

          <div className="flex items-center gap-3">
            <CartItem.Price value={price} />
            <Button
              variant={"outline"}
              size={"icon"}
              className="w-[30px] h-[30px] rounded-[10px]"
              onClick={() => removeFromCart(id)}
            >
              <Trash2Icon className="text-gray-400 cursor-pointer " size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
