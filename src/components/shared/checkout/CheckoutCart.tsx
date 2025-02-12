import { Skeleton } from "@/components/ui";
import { getCartItemDetails } from "@/utils/get-cart-item-details";
import { CheckoutItem, WhiteBlock } from "..";
import { UserCartItem, UserCartTypeWithSelect } from "@/hooks/cart/useGetCart";
import { PizzaSize, PizzaType } from "@/constants/pizza";

interface ICheckoutCart {
  isFetching: boolean;
  data?: UserCartTypeWithSelect;
}

export const CheckoutCart = ({ isFetching, data }: ICheckoutCart) => {
  return (
    <WhiteBlock title="1. Корзина">
      <div className="flex flex-col gap-5">
        {isFetching
          ? Array(3)
              .fill(0)
              .map((el, i) => <Skeleton key={i} className="w-full h-[60px]" />)
          : data?.items.map((item: UserCartItem, i: number) => (
              <CheckoutItem
                key={item.id}
                name={item.productItem.product.name}
                price={data?.totalPrices[i]}
                quantity={item.quantity}
                id={item.id}
                imageUrl={item.productItem.product.imageUrl}
                details={
                  item.productItem.pizzaType
                    ? getCartItemDetails(
                        item.ingredients,
                        item.productItem.pizzaType as PizzaType,
                        item.productItem.size as PizzaSize
                      )
                    : ""
                }
              />
            ))}
      </div>
    </WhiteBlock>
  );
};
