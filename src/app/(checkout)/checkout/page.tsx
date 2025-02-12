"use client";

import {
  CheckoutAddress,
  CheckoutCart,
  CheckoutPersonal,
  CheckoutSidebar,
  Container,
  Loader,
  Title,
} from "@/components/shared";
import { useGetCart } from "@/hooks/cart/useGetCart";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  checkoutFormSchema,
  TCheckoutForm,
} from "@/components/shared/checkout/checkout-schema";
import { useCreateOrder } from "@/hooks/checkout/useCreateOrder";
import { calcCheckoutPrice } from "@/utils/checkout-prices";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import Image from "next/image";

export default function CheckoutPage() {
  const { data: user } = useSession();
  const { data, isPending: isFetching, isLoading } = useGetCart();
  const prices = calcCheckoutPrice(data?.totalCartPrice);

  const { isPending, mutate } = useCreateOrder();

  const form = useForm<TCheckoutForm>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: "",
    },
  });

  const handlerSubmit = (data: TCheckoutForm) => {
    mutate({ data, finishAmount: prices.total });
  };

  useEffect(() => {
    if (user?.user?.fullName) {
      const [firstName, lastName] = user.user.fullName.split(" ");
      form.setValue("firstName", firstName);
      form.setValue("lastName", lastName);
    }
    if (user?.user?.email) {
      form.setValue("email", user?.user?.email);
    }
  }, [user]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container className="mt-10">
      {data?.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center w-72 mx-auto">
          <Image
            src="/assets/images/empty-box.png"
            alt="Empty cart"
            width={120}
            height={120}
          />
          <Title
            size="sm"
            text="Корзина пустая"
            className="text-center font-bold my-2"
          />
          <p className="text-center text-neutral-500 mb-5">
            Добавьте хотя бы одну пиццу, чтобы совершить заказ
          </p>
        </div>
      ) : (
        <>
          <Title
            text="Оформление заказа"
            className="font-extrabold mb-8 text-[36px]"
          />
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(handlerSubmit)}>
              <div className="flex gap-10">
                <div className="flex flex-col gap-10 flex-1 mb-20">
                  <CheckoutCart isFetching={isFetching} data={data} />
                  <CheckoutPersonal
                    className={
                      isFetching ? "opacity-50 pointer-events-none" : ""
                    }
                  />
                  <CheckoutAddress
                    className={
                      isFetching ? "opacity-50 pointer-events-none" : ""
                    }
                  />
                </div>

                <CheckoutSidebar
                  isFetching={isFetching || isPending}
                  data={data}
                  prices={prices}
                />
              </div>
            </form>
          </FormProvider>
        </>
      )}
    </Container>
  );
}
