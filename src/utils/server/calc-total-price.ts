import { UserCartType } from "@/hooks/cart/useGetCart";

export const calcTotalPrice = (data: UserCartType) => {
  const totalPrices = data?.items.map(
    (item) =>
      (item.productItem.price +
        item.ingredients.reduce((acc2, el2) => acc2 + el2.price, 0)) *
      item.quantity
  );

  const totalCartPrice = totalPrices?.reduce((acc, el) => acc + el, 0);

  return { totalPrices, totalCartPrice };
};
