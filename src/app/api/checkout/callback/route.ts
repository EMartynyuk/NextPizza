import { PaymentCallbackData } from "@/@types/yookassa";
import { prisma } from "@/lib/prisma/prisma";
import { successPayment } from "@/utils/server/email/email";
import { OrderStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = (await req.json()) as PaymentCallbackData;

    // Нахождение заказа по его id
    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id),
      },
      include: {
        user: true,
      },
    });

    // Ошибка, если заказа нет
    if (!order || !order.user) {
      return NextResponse.json({
        error: "Order not found",
      });
    }

    // Обновление статуса заказа
    const statusOrder =
      body.object.status === "succeeded"
        ? OrderStatus.SUCCEEDED
        : OrderStatus.CANCELLED;

    await prisma.order.update({
      where: {
        id: order.id,
      },
      data: {
        status: statusOrder,
      },
    });

    // Отправка письма об успешной оплате
    if (statusOrder === OrderStatus.SUCCEEDED) {
      await successPayment({
        orderId: String(order.id),
        totalAmount: order.totalAmount,
        email: order.user.email,
      });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      error: "Ошибка обработки платежа",
      data: error,
    });
  }
};
