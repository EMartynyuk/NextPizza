import { useQuery } from "@tanstack/react-query";
import { Prisma } from "@prisma/client";

export type UserCartType = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        productItem: {
          include: {
            product: true;
          };
        };
        ingredients: true;
      };
    };
  };
}>;

export type UserCartItem = UserCartType["items"][number];
export type UserCartTypeWithSelect = {
  items: UserCartType["items"];
  totalCartPrice: UserCartType["totalAmount"];
  totalPrices: number[];
};

const getData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cart`);
  return await res.json();
};

export const useGetCart = () => {
  const {
    data,
    isLoading,
    error,
    refetch,
    isFetching,
    isFetchedAfterMount,
    isPending,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: getData,
    // placeholderData: keepPreviousData,
    select: (data): UserCartTypeWithSelect => ({
      items: data.userCart.items,
      totalCartPrice: data.userCart.totalAmount,
      totalPrices: data.totalPrices,
    }),
  });

  return {
    data,
    isLoading,
    error,
    refetch,
    isFetching,
    isFetchedAfterMount,
    isPending,
    isPlaceholderData,
  };
};
