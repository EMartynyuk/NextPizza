"use client";

import { cn } from "@/utils/utils";
import { useCategory } from "@/lib/zustand/category";
import { Category } from "@prisma/client";
import Link from "next/link";

interface ICatagories {
  className?: string;
  categoriesTopbar: Category[];
}

export const Categories = ({ className, categoriesTopbar }: ICatagories) => {
  const currentIndex = useCategory((state) => state.currentIndex);

  return (
    <div
      className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}
    >
      {categoriesTopbar.map((category, index) => (
        <Link
          href={`#${category.name.toLowerCase()}`}
          key={index}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            category.id === currentIndex &&
              "bg-white shadow-md shadow-gray-200 text-primary"
          )}
        >
          <button>{category.name}</button>
        </Link>
      ))}
    </div>
  );
};
