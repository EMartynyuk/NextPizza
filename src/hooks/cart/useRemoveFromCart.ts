import { removeFromCart } from "@/actions/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useRemoveFromCart = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (id: number) => await removeFromCart(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
      toast.success("Пицца удалена из корзины");
    },
    onError: () => {
      toast.error("Что-то пошло не так");
    },
  });

  return {
    removeFromCart: mutate,
    isPending,
  };
};
