"use server";

import { TRegisterFormData } from "@/components/shared/modals/auth/schemas";
import { auth } from "@/lib/auth.js/auth";
import { prisma } from "@/lib/prisma/prisma";
import { hashSync } from "bcrypt-edge";

export const updateProfile = async (data: TRegisterFormData) => {
  try {
    const session = await auth();

    if (!session?.user) {
      throw new Error("Not authenticated");
    }

    const { user } = session;

    const findUser = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    const hashedPassword = hashSync(data?.password, 10);

    await prisma.user.update({
      where: {
        id: Number(user.id),
      },
      data: {
        email: data.email,
        fullName: data.fullName,
        password: data?.password ? hashedPassword : findUser?.password,
      },
    });
  } catch (error) {
    console.log("[UPDATE_PROFILE] - Ошибка", error);
    throw error;
  }
};
