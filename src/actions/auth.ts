"use server";

import { TRegisterFormData } from "@/components/shared/modals/auth/schemas";
import { signIn } from "@/lib/auth.js/auth";
import { prisma } from "@/lib/prisma/prisma";
import { hashSync } from "bcrypt-edge";

export const login = async () => {};

export const registration = async (data: TRegisterFormData) => {
  try {
    const { fullName, email, password } = data;

    // Проверяю нет ли уже такого пользователя в БД
    const findUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (findUser) {
      throw new Error("Пользователь с такой почтой уже существует");
    }

    const hashedPassword = hashSync(password, 10);

    await prisma.user.create({
      data: {
        fullName: fullName,
        email,
        password: hashedPassword,
      },
    });

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (e) {
    throw e;
  }
};
