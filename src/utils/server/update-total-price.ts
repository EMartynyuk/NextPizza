import { prisma } from "@/lib/prisma/prisma";
import { calcTotalPrice } from "./calc-total-price";

export const updataTotalPrice = async (token: string) => {
  try {
    const userCart = await prisma.cart.findFirst({
      where: {
        token,
      },
      include: {
        items: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            productItem: {
              include: {
                product: true,
              },
            },
            ingredients: true,
          },
        },
      },
    });

    if (!userCart) {
      throw new Error("Cart not found");
    }

    const { totalCartPrice } = calcTotalPrice(userCart);

    await prisma.cart.update({
      where: {
        id: userCart?.id,
      },
      data: {
        totalAmount: totalCartPrice,
      },
    });
  } catch (error) {
    throw error;
  }
};
