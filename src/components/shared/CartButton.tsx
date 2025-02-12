"use client";

import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "../ui";
import { CartDrawer } from "./";
import { cn } from "@/utils/utils";
import { useGetCart } from "@/hooks/cart/useGetCart";

export const CartButton = () => {
  const { data, isLoading } = useGetCart();

  return (
    <CartDrawer>
      <Button
        className={cn("group relative", { "w-[105px]": isLoading })}
        loading={isLoading}
      >
        <b>{data?.totalCartPrice} ₽</b>
        <span className="h-full w-[1px] bg-white/30 mx-3" />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart size={16} className="relative" strokeWidth={2} />
          <b>{data?.items.length}</b>
        </div>
        <ArrowRight
          size={20}
          className="absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </Button>
    </CartDrawer>
  );
};
