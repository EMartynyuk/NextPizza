"use client";

import { ChangeEvent } from "react";
import { RangeSlider } from ".";
import { Input } from "../ui";

interface IRangeGroup {
  pizzaPrice: { priceFrom: number | undefined; priceTo: number | undefined };
  setPizzaPrice: (e: ChangeEvent<HTMLInputElement>) => void;
  updatePrice: (priceFrom: number, priceTo: number) => void;
}

export const RangeGroup = ({
  pizzaPrice,
  setPizzaPrice,
  updatePrice,
}: IRangeGroup) => {
  return (
    <div className="mt-5 border-y border-y-neutral-100 py-6 pb-7">
      <p className="font-bold mb-3">Цена от и до:</p>
      <div className="flex gap-3 mb-5">
        <Input
          type="number"
          placeholder="0"
          min={0}
          max={1000}
          value={String(pizzaPrice.priceFrom)}
          name="priceFrom"
          onChange={setPizzaPrice}
        />
        <Input
          type="number"
          placeholder="1000"
          min={100}
          max={1000}
          value={String(pizzaPrice.priceTo)}
          name="priceTo"
          onChange={setPizzaPrice}
        />
      </div>
      <RangeSlider
        min={0}
        max={1000}
        step={10}
        value={[pizzaPrice.priceFrom || 0, pizzaPrice.priceTo || 1000]}
        onValueChange={([priceFrom, priceTo]) => {
          updatePrice(priceFrom, priceTo);
        }}
      />
    </div>
  );
};
