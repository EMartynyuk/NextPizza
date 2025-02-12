"use client";

import { ChangeEvent, useState } from "react";
import { Input, Skeleton } from "../ui";
import { FilterCheckbox } from "./";
import { IFilterCheckbox } from "./FilterCheckbox";

type Item = IFilterCheckbox;

export type TTitle = "Тип теста" | "Размеры" | "Ингредиенты";
export type TSlug = "pizzaType" | "pizzaSize" | "pizzaIngredients";

interface ICheckboxFiltersGroup {
  title: TTitle;
  items: Item[];
  limit?: number;
  loading?: boolean;
  searchInputPlaceholder?: string;
  className?: string;
  selected: string[];
  onCheckedChange: (value: string) => void;
}

export const CheckboxFiltersGroup = ({
  title,
  items,
  limit = 5,
  searchInputPlaceholder = "Поиск...",
  className,
  loading,
  selected,
  onCheckedChange,
}: ICheckboxFiltersGroup) => {
  const [showAll, setShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handlerChangeSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  if (loading) {
    return (
      <div className={className}>
        <p className="font-bold mb-3">{title}</p>
        {Array(limit)
          .fill(0)
          .map((el, i) => (
            <Skeleton className="h-6 mb-4 rounder-[8px]" key={i} />
          ))}
      </div>
    );
  }

  const list = showAll
    ? items.filter((item) =>
        item.text.toLowerCase().includes(searchValue.toLowerCase())
      )
    : items.slice(0, limit);

  return (
    <div className={className}>
      <p className="font-bold mb-3">{title}</p>

      {showAll && (
        <div className="mb-5">
          <Input
            onChange={handlerChangeSearchInput}
            placeholder={searchInputPlaceholder}
            className="bg-gray-50 border-none"
          />
        </div>
      )}

      <div className="flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar">
        {list.map((item) => (
          <FilterCheckbox
            key={item.value + item.text}
            text={item.text}
            value={item.value}
            checked={selected.includes(item.value)}
            onCheckedChange={() => onCheckedChange(item.value)}
          />
        ))}
      </div>

      {items.length > limit && (
        <div className={showAll ? "border-t border-t-neutral-100 mt-4" : ""}>
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-primary mt-3"
          >
            {showAll ? "Скрыть" : "+ Показать все"}
          </button>
        </div>
      )}
    </div>
  );
};
