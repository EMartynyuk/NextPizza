// import { PaymentData } from "@/@types/yookassa";

const YMONEY_URL = "https://api.yookassa.ru/v3/payments";

interface Ipayment {
  amount: number;
  description: string;
  orderId: string;
}

export const createPayment = async (details: Ipayment) => {
  const createBody = {
    amount: {
      value: details.amount,
      currency: "RUB",
    },
    capture: true,
    description: details.description,
    metadata: {
      order_id: details.orderId,
    },
    confirmation: {
      type: "redirect",
      return_url: "http://localhost:3000/",
    },
  };

  const headers = {
    "Content-Type": "application/json",
    "Idempotence-Key": Math.random().toString(36).substring(7),
    Authorization: `Basic ${Buffer.from(
      `${process.env.YMONEY_SHOPID}:${process.env.YMONEY_API_KEY}`
    ).toString("base64")}`,
  };

  try {
    const res = await fetch(`${YMONEY_URL}`, {
      method: "POST",
      body: JSON.stringify(createBody),
      headers: headers,
    });
    return await res.json();
  } catch (error) {
    throw error;
  }
};
