import { updateProfile } from "@/actions/profile";
import { TRegisterFormData } from "@/components/shared/modals/auth/schemas";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateProfile = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: TRegisterFormData) => await updateProfile(data),
    onSuccess: () => {
      toast.success("Профиль обновлен");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    updateProfile: mutate,
    isPending,
  };
};
