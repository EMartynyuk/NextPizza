"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui";
import { cn } from "@/utils/utils";
import { Ingredient, Product, ProductVariant } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ChooseProductForm } from "..";
import { ChoosePizzaForm } from "../ChoosePizzaForm";

export type IProduct = Product & {
  variants: ProductVariant[];
  ingredients: Ingredient[];
};

interface IChooseProductModal {
  product: IProduct;
  className?: string;
}

export const ChooseProductModal = ({
  product,
  className,
}: IChooseProductModal) => {
  const router = useRouter();
  const isPizzaForm = Boolean(product.variants[0].pizzaType);

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent
        className={cn(
          "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden",
          className
        )}
        aria-describedby={undefined}
      >
        <DialogTitle className="visually-hidden" />

        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            items={product.variants}
            back
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            price={product.variants[0].price}
            id={product.variants[0].id}
            back
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
