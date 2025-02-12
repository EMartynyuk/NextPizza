"use server";

import { cookies } from "next/headers";
import { findOrCreateCart } from "./find-or-create-cart";

export const TokenMiddleware = async () => {
  try {
    let token = (await cookies()).get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    const userCart = await findOrCreateCart(token);

    (await cookies()).set("cartToken", token);

    return { userCart, token };
  } catch (error) {
    console.log("[TOKEN_MIDDLEWARE] - Ошибка", error);
  }
};
