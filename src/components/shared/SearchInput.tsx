"use client";

import { cn } from "@/utils/utils";
import { Product } from "@prisma/client";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useDebounce } from "react-use";

interface ISearchInput {
  className?: string;
}

export const SearchInput = ({ className }: ISearchInput) => {
  const [focused, setFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useDebounce(
    () => {
      const getProducts = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/products/search?query=${searchQuery}`
          );
          const data = await res.json();
          setProducts(data);
        } catch (error) {
          console.log(error);
        }
      };
      getProducts();
    },
    350,
    [searchQuery]
  );

  const handlerItemClick = () => {
    setFocused(false);
    setSearchQuery("");
    setProducts([]);
  };

  return (
    <>
      {focused && (
        <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 z-30" />
      )}

      <label
        className={cn(
          "flex rounded-2xl flex-1 justify-between relative h-11 z-30",
          className
        )}
      >
        <Search className="absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400 pointer-events-none" />
        <input
          className="rounded-2xl outline-none w-full bg-gray-100 pl-11"
          type="text"
          placeholder="Найти пиццу..."
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {products.length > 0 && (
          <div
            className={cn(
              "absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30",
              focused && "visible opacity-100 top-12"
            )}
          >
            {products.map((product) => (
              <Link
                onClick={handlerItemClick}
                key={product.id}
                className="flex items-center gap-3 w-full px-3 py-2 hover:bg-primary/10"
                href={`/product/${product.id}`}
              >
                <img
                  className="rounded-sm h-8 w-8"
                  src={product.imageUrl}
                  alt={product.name}
                />
                <span>{product.name}</span>
              </Link>
            ))}
          </div>
        )}
      </label>
    </>
  );
};
