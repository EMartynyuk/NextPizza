import { registration } from "@/actions/auth";
import { TRegisterFormData } from "@/components/shared/modals/auth/schemas";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useRegister = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: TRegisterFormData) => {
      const res = await registration(data);
      
      if (!res?.success) {
        throw new Error(res?.message);
      }
    },
    onSuccess: () => {
      toast.success("Вы успешно зарегистрировались");
      setTimeout(() => location.reload(), 1000);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    mutate,
    isPending,
  };
};
