"use server";

import { TCheckoutForm } from "@/components/shared/checkout/checkout-schema";
import { prisma } from "@/lib/prisma/prisma";
import { OrderStatus } from "@prisma/client";
import { cookies } from "next/headers";
import { createPayment } from "@/utils/server/payment/payment";
import { createOrderMail } from "@/utils/server/email/email";

export async function createOrder(data: TCheckoutForm, finishAmount: string) {
  try {
    const cookieStore = await cookies();
    const cartToken = cookieStore.get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("Cart token not found");
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        token: cartToken,
      },
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productItem: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    if (!userCart) {
      throw new Error("Cart not found");
    }

    if (!userCart.items.length) {
      throw new Error("Cart is empty");
    }

    const order = await prisma.order.create({
      data: {
        fullName: data.firstName + " " + data.lastName,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: Number(finishAmount),
        items: userCart.items,
        token: userCart.token,
        status: OrderStatus.PENDING,
      },
    });

    await prisma.cart.update({
      where: {
        id: userCart.id,
      },
      data: {
        totalAmount: 0,
        items: {
          deleteMany: {},
        },
      },
    });

    const createPaymentY = await createPayment({
      orderId: String(order.id),
      amount: Number(finishAmount),
      description: "Оплата заказа",
    });

    if (!createPaymentY) {
      throw new Error("Payment error");
    }

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        paymentId: createPaymentY.id,
      },
    });

    const paymentURL = createPaymentY.confirmation.confirmation_url;

    // --- Отправка письма ---
    try {
      await createOrderMail({
        orderId: String(order.id),
        totalAmount: order.totalAmount,
        paymentUrl: paymentURL,
        email: data.email,
      });
    } catch (error) {
      console.error(
        "[Server action - checkout] - Не удалось отправить письмо",
        error
      );
    }

    return {
      success: true,
      url: paymentURL,
    };
  } catch (error) {
    console.error("[Server action - checkout] ", error);

    if (error instanceof Error)
      return { success: false, message: error.message };
    return { success: false, message: "Что-то пошло не так" };
  }
}
