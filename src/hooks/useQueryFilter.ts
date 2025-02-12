import { useRouter } from "next/navigation";
import qs from "qs";
import { useEffect, useRef } from "react";

interface IUseQueryFilter {
  pizzaTypes: string[];
  sizes: string[];
  ingredients: string[];
  priceFrom: number | undefined;
  priceTo: number | undefined;
}

export const useQueryFilter = (filter: IUseQueryFilter) => {
  const isMount = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (isMount.current) {
      const queryString = qs.stringify(filter, {
        arrayFormat: "comma",
      });

      router.push(`?${queryString}`, { scroll: false });
    }
    isMount.current = true;
  }, [filter]);
};
