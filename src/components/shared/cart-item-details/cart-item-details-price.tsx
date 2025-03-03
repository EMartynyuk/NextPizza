import { cn } from "@/utils/utils";
import NumberFlow from "@number-flow/react";

interface Props {
  value: number;
  className?: string;
}

export const CartItemDetailsPrice: React.FC<Props> = ({ value, className }) => {
  return (
    <NumberFlow
      value={value}
      suffix=" ₽"
      className={cn("font-bold", className)}
    />
  );
  // return <h2 className={cn('font-bold', className)}>{value} ₽</h2>;
};
