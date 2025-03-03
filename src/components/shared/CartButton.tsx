"use client";

import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "../ui";
import { CartDrawer } from "./";
import { cn } from "@/utils/utils";
import { useGetCart } from "@/hooks/cart/useGetCart";
import NumberFlow from "@number-flow/react";

export const CartButton = () => {
  const { data, isLoading } = useGetCart();

  return (
    <CartDrawer>
      <Button
        className={cn("group relative", { "w-[105px]": isLoading })}
        loading={isLoading}
      >
        <NumberFlow
          value={data?.totalCartPrice}
          className="font-bold"
          suffix=" ₽"
        />
        <span className="h-full w-[1px] bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} className="relative" strokeWidth={2} />
          <NumberFlow value={data?.items.length} className="font-bold" />
        </div>
        <ArrowRight
          size={20}
          className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </Button>
    </CartDrawer>
  );
};
