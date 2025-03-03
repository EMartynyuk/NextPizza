"use client";

import { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  Button,
} from "@/components/ui";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CartDrawerItem } from "./CartDrawerItem";
import { getCartItemDetails } from "@/utils/get-cart-item-details";
import { useGetCart, UserCartItem } from "@/hooks/cart/useGetCart";
import { cn } from "@/utils/utils";
import { Title } from ".";
import Image from "next/image";
import { PizzaSize, PizzaType } from "@/constants/pizza";
import NumberFlow from "@number-flow/react";

interface ICartDrawer {
  children: ReactNode;
}

export const CartDrawer = ({ children }: ICartDrawer) => {
  const { data } = useGetCart();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col justify-between pb-0 bg-[#F4F1EE]">
        <div
          className={cn(
            "flex flex-col h-full",
            !data?.totalCartPrice && "justify-center"
          )}
        >
          {data?.totalCartPrice !== 0 ? (
            <>
              <SheetHeader>
                <SheetTitle>
                  В корзине{" "}
                  <span className="font-bold">{data?.items.length} товара</span>
                </SheetTitle>
              </SheetHeader>
              <div className="-mx-6 mt-5 overflow-auto flex-1 flex flex-col gap-1">
                {data?.items.map((element: UserCartItem, i: number) => (
                  <CartDrawerItem
                    key={element.id}
                    id={element.id}
                    details={
                      element.productItem?.pizzaType
                        ? getCartItemDetails(
                            element.ingredients,
                            element.productItem.pizzaType as PizzaType,
                            element.productItem.size as PizzaSize
                          )
                        : ""
                    }
                    name={element.productItem.product.name}
                    price={data?.totalPrices[i]}
                    quantity={element.quantity}
                    imageUrl={element.productItem.product.imageUrl}
                  />
                ))}
              </div>

              <SheetFooter className="-mx-6 bg-white p-8">
                <div className="w-full">
                  <div className="flex mb-4">
                    <span className="flex flex-1 text-lg text-neutral-500">
                      Итого
                      <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
                    </span>

                    <NumberFlow
                      value={data?.totalCartPrice!}
                      className="font-bold text-lg"
                      suffix=" ₽"
                    />
                  </div>

                  <Link href="/checkout">
                    <Button
                      // onClick={() => setRedirecting(true)}
                      // loading={redirecting}
                      type="submit"
                      className="w-full h-12 text-base"
                    >
                      Оформить заказ
                      <ArrowRight className="w-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </SheetFooter>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <Image
                src="/assets/images/empty-box.png"
                alt="Empty cart"
                width={120}
                height={120}
              />
              <Title
                size="sm"
                text="Корзина пустая"
                className="text-center font-bold my-2"
              />
              <p className="text-center text-neutral-500 mb-5">
                Добавьте хотя бы одну пиццу, чтобы совершить заказ
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
