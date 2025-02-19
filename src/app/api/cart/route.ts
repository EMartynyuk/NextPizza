import { calcTotalPrice } from "@/utils/server/calc-total-price";
import { prisma } from "@/lib/prisma/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      console.log("[GET_CART] - Токена нет");
      return NextResponse.json({
        userCart: {
          totalAmount: 0,
          items: [],
        },
      });
    }

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
      console.log("[GET_CART] - Данный токен отсутствует в базе данных");
      return NextResponse.json({
        userCart: {
          totalAmount: 0,
          items: [],
        },
      });
    }

    const { totalPrices } = calcTotalPrice(userCart);
    return NextResponse.json({ userCart, totalPrices });
  } catch (error) {
    console.log("[GET_CART] - Ошибка", error);
    return NextResponse.json({
      message: "Something went wrong",
    });
  }
}
