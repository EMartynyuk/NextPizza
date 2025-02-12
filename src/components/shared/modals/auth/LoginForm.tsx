"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { loginFormSchema, TLoginFormData } from "./schemas";
import { FormInput, Title } from "../..";
import { Button } from "@/components/ui";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

interface ILoginForm {
  setOpen: () => void;
}

export const LoginForm = ({ setOpen }: ILoginForm) => {
  const form = useForm<TLoginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handlerSubmit = async (data: TLoginFormData) => {
    const resp = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (resp?.error) {
      return toast.error("Не удалось войти в аккаунт");
    }

    toast.success("Вы успешно вошли в аккаунт");
    setOpen();
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(handlerSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Вход в аккаунт" size="md" className="font-bold" />
            <p className="text-gray-400">
              Введите свою почту, чтобы войти в свой аккаунт
            </p>
          </div>
          <img
            src="/assets/images/phone-icon.png"
            alt="phone-icon"
            width={60}
            height={60}
          />
        </div>

        <FormInput name="email" label="E-Mail" required />
        <FormInput name="password" label="Пароль" type="password" required />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Войти
        </Button>
      </form>
    </FormProvider>
  );
};
