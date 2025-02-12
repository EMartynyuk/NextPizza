"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { registerFormSchema, TRegisterFormData } from "./schemas";
import { FormInput, Title } from "../..";
import { Button } from "@/components/ui";
import { useRegister } from "@/hooks/auth/useRegister";

export const RegisterForm = () => {
  const { mutate: registerFn } = useRegister();

  const form = useForm<TRegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const handlerSubmit = async (data: TRegisterFormData) => {
    registerFn(data);
  };

  return (
    <FormProvider {...form}>
      <form
        className="flex flex-col gap-5"
        onSubmit={form.handleSubmit(handlerSubmit)}
      >
        <div className="flex justify-between items-center">
          <div className="mr-2">
            <Title text="Регистрация" size="md" className="font-bold" />
            <p className="text-gray-400">Введите данные ниже для регистрации</p>
          </div>
          <img
            src="/assets/images/phone-icon.png"
            alt="phone-icon"
            width={60}
            height={60}
          />
        </div>

        <FormInput name="fullName" label="Ваше имя" required />
        <FormInput name="email" label="E-Mail" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <FormInput
          name="confirmPassword"
          label="Подтвердите пароль"
          type="password"
          required
        />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Зарегистрироваться
        </Button>
      </form>
    </FormProvider>
  );
};
