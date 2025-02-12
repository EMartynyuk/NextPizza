import { addToCart, IAddToCart } from "@/actions/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useAddToCart = (type: "pizza" | "other", back?: boolean) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (cartItem: IAddToCart) => await addToCart(cartItem),
    onSuccess: () => {
      if (type === "pizza") {
        toast.success("Пицца добавлена в корзину");
      } else if (type === "other") {
        toast.success("Продукт добавлен в корзину");
      }
      if (back) {
        router.back();
      }
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast.error("Что-то пошло не так");
    },
  });

  return {
    addToCart: mutate,
    isPending,
  };
};
