import { createOrder } from "@/actions/checkout";
import { TCheckoutForm } from "@/components/shared/checkout/checkout-schema";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";


export const useCreateOrder = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async ({
      data,
      finishAmount,
    }: {
      data: TCheckoutForm;
      finishAmount: string;
    }) => await createOrder(data, finishAmount),
    onSuccess: async (data) => {
      toast.success("Заказ успешно оформлен! Переход на оплату...");

      if (data?.url) {
        location.href = data.url;
      }
    },
    onError: (error) => {
      console.error(error);

      toast.error("Не удалось создать заказ");
    },
  });

  return {
    mutate,
    isPending,
  };
};
