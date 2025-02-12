"use client";

import { useFilterIngredients } from "@/hooks/useFilterIngredients";
import { CheckboxFiltersGroup, RangeGroup, Title } from ".";
import { useQueryFilter } from "@/hooks/useQueryFilter";
import { useFilter } from "@/hooks/useFilter";

export const Filters = () => {
  // Get ingredients
  const { ingredients, loading } = useFilterIngredients();
  const changedIngredients = ingredients.map((ingredient) => ({
    text: ingredient.name,
    value: String(ingredient.id),
  }));

  // Get filters
  const filter = useFilter();

  // Get search params
  useQueryFilter(filter.filter);

  return (
    <div>
      <Title text="Фильтрация" size="sm" className="mb-5 font-bold" />

      <CheckboxFiltersGroup
        title="Тип теста"
        className="mt-5"
        limit={2}
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" },
        ]}
        selected={filter.pizzaType}
        onCheckedChange={(value) =>
          filter.setPizzaType((state) => filter.changeState(state, value))
        }
      />

      <CheckboxFiltersGroup
        title="Размеры"
        className="mt-5"
        limit={3}
        items={[
          { text: "20", value: "20" },
          { text: "30", value: "30" },
          { text: "40", value: "40" },
        ]}
        selected={filter.pizzaSize}
        onCheckedChange={(value) =>
          filter.setPizzaSize((state) => filter.changeState(state, value))
        }
      />

      <RangeGroup
        pizzaPrice={filter.pizzaPrice}
        setPizzaPrice={filter.changePrice}
        updatePrice={filter.updatePrice}
      />

      <CheckboxFiltersGroup
        title="Ингредиенты"
        className="mt-5"
        limit={6}
        items={changedIngredients}
        loading={loading}
        selected={filter.pizzaIngredients}
        onCheckedChange={(value) =>
          filter.setPizzaIngredients((state) =>
            filter.changeState(state, value)
          )
        }
      />
    </div>
  );
};
