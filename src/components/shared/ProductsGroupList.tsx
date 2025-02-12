"use client";

import { useIntersection } from "react-use";
import { cn } from "@/utils/utils";
import { ProductCard, Title } from ".";
import { RefObject, useEffect, useRef } from "react";
import { useCategory } from "@/lib/zustand/category";
import { MainPageDTO } from "@/utils/server/find-pizzas";

interface IProductsGroupList {
  title: string;
  items: MainPageDTO["products"];
  className?: string;
  listClassName?: string;
  categoryId: number;
}

export const ProductsGroupList = ({
  title,
  items,
  listClassName,
  categoryId,
  className,
}: IProductsGroupList) => {
  const intersectionRef = useRef<HTMLDivElement>(null);

  const intersection = useIntersection(
    intersectionRef as RefObject<HTMLDivElement>,
    {
      threshold: 0.4,
    }
  );

  const setCurrentIndex = useCategory((state) => state.setCurrentIndex);

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setCurrentIndex(categoryId);
    }
  }, [intersection?.isIntersecting]);

  return (
    <div className={className} id={title.toLowerCase()} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />

      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {items.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            imageUrl={product.imageUrl}
            price={product.variants[0].price}
            ingredients={product.ingredients}
          />
        ))}
      </div>
    </div>
  );
};
