"use server";

import { TokenMiddleware } from "@/utils/server/token-middleware";
import { updataTotalPrice } from "@/utils/server/update-total-price";
import { prisma } from "@/lib/prisma/prisma";

export type IAddToCart = {
  productItemId: number;
  quantity: number;
  ingredients?: { id: number }[];
  type: "pizza" | "other";
};

export const addToCart = async (obj: IAddToCart) => {
  // Проверка авторизации
  const getCart = await TokenMiddleware();
  if (!getCart) {
    throw new Error("TokenMiddleware failed");
  }
  const { userCart, token } = getCart;

  if (obj.type === "pizza") {
    // --- Добавление пиццы в корзину или обновление его количества ---
    // Нахожу все
    const findCartItems = await prisma.cartItem.findMany({
      where: {
        cartId: userCart.id,
        productItemId: obj.productItemId,
      },
      include: {
        ingredients: true,
      },
    });

    // Нахожу все товары с такой же длиной, как и входной массив и сортирую
    const filterItemsLength = findCartItems
      .filter((item) => item.ingredients.length === obj.ingredients?.length)
      .map((item) => ({
        id: item.id,
        ingredients: item.ingredients.map((el) => el.id),
      }))
      .map((item) => ({
        ...item,
        ingredients: item.ingredients.sort((a, b) => a - b),
      }));

    // Сортирую входной массив
    const sortedIngredients = obj.ingredients
      ?.sort((a, b) => a.id - b.id)
      .reduce((acc, el) => [...acc, el.id], [] as number[]);

    // Нахожу есть ли среди всех добавленных, товар с точно такими же ингредиентами
    const findSameCartItem = filterItemsLength.find((item) =>
      item.ingredients.every(
        (value, index) => value === sortedIngredients?.[index]
      )
    );

    if (findSameCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findSameCartItem.id,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          quantity: obj.quantity,
          productItemId: obj.productItemId,
          ingredients: {
            connect: obj.ingredients,
          },
        },
      });
    }
  } else if (obj.type === "other") {
    // --- Добавление прочих товаров в корзину или обновление его количества ---
    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart?.id,
        productItemId: obj.productItemId,
      },
    });

    // Если товар был найден, делаем +1
    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          quantity: {
            increment: 1,
          },
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart?.id,
          productItemId: obj.productItemId,
          quantity: 1,
        },
      });
    }
  }

  // Обновление итоговой стоимости
  await updataTotalPrice(token);
};

export const removeFromCart = async (id: number) => {
  // Проверка авторизации
  const getCart = await TokenMiddleware();
  if (!getCart) {
    throw new Error("TokenMiddleware failed");
  }
  const { token } = getCart;

  // Удаление товара из корзины
  await prisma.cartItem.delete({
    where: {
      id,
    },
  });

  // Обновление итоговой стоимости
  await updataTotalPrice(token);
};

export const changeQuantity = async (id: number, type: "plus" | "minus") => {
  // Проверка авторизации
  const getCart = await TokenMiddleware();
  if (!getCart) {
    throw new Error("TokenMiddleware failed");
  }
  const { token } = getCart;

  await prisma.cartItem.update({
    where: {
      id,
    },
    data: {
      quantity: type === "plus" ? { increment: 1 } : { decrement: 1 },
    },
  });

  // Обновление итоговой стоимости
  await updataTotalPrice(token);
};
