import { cn } from "@/utils/utils";
import { CartItemProps } from "./cart-item-details/cart-item-details.types";
import * as CartItemDetails from "./cart-item-details";
import { X } from "lucide-react";
import { CountButton } from ".";
import { useRemoveFromCart } from "@/hooks/cart/useRemoveFromCart";

interface Props extends CartItemProps {
  onClickCountButton?: (type: "plus" | "minus") => void;
  onClickRemove?: () => void;
  className?: string;
}

export const CheckoutItem = ({
  className,
  name,
  price,
  imageUrl,
  quantity,
  details,
  id,
}: Props) => {
  const { removeFromCart, isPending } = useRemoveFromCart();

  return (
    <div
      className={cn(
        "flex items-center justify-between",
        {
          "opacity-50 pointer-events-none": isPending,
        },
        className
      )}
    >
      <div className="flex items-center gap-5 flex-1">
        <CartItemDetails.Image src={imageUrl} />
        <CartItemDetails.Info name={name} details={details} />
      </div>

      <CartItemDetails.Price value={price} />

      <div className="flex items-center gap-5 ml-20">
        <CountButton id={id} value={quantity} />
        <button type="button" onClick={() => removeFromCart(id)}>
          <X
            className="text-gray-400 cursor-pointer hover:text-gray-600"
            size={20}
          />
        </button>
      </div>
    </div>
  );
};
