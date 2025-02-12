"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Container, FormInput, Title } from ".";
import { Button } from "../ui";
import { registerFormSchema, TRegisterFormData } from "./modals/auth/schemas";
import { signOut } from "next-auth/react";
import { useUpdateProfile } from "@/hooks/profile/useUpdateProfile";

interface IProfileForm {
  data: {
    id: string;
    email: string;
    fullName: string;
    role: string;
  };
}

export const ProfileForm = ({ data }: IProfileForm) => {
  const { updateProfile, isPending } = useUpdateProfile();
  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: TRegisterFormData) => {
    await updateProfile(data);
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: "/",
    });
  };

  return (
    <Container className="my-10">
      <Title
        text={`Личные данные | #${data.id}`}
        size="md"
        className="font-bold"
      />

      <FormProvider {...form}>
        <form
          className="flex flex-col gap-5 w-96 mt-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormInput name="email" label="E-Mail" required />
          <FormInput name="fullName" label="Полное имя" required />

          <FormInput
            type="password"
            name="password"
            label="Новый пароль"
            required
          />
          <FormInput
            type="password"
            name="confirmPassword"
            label="Повторите пароль"
            required
          />

          <Button
            disabled={form.formState.isSubmitting || isPending}
            className="text-base mt-10"
            type="submit"
          >
            Сохранить
          </Button>

          <Button
            onClick={onClickSignOut}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button"
          >
            Выйти
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
