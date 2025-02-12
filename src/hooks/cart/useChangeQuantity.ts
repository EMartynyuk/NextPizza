import { changeQuantity } from "@/actions/cart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useChangeQuantity = (id: number) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (type: "plus" | "minus") => {
      await changeQuantity(id, type);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: () => {
      toast.error("Что-то пошло не так");
    },
  });

  return {
    changeQuantity: mutate,
    isPending,
  };
};
