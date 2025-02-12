"use client";

import { cn } from "@/utils/utils";
import { CountIconButton } from ".";
import { useChangeQuantity } from "@/hooks/cart/useChangeQuantity";

export interface CountButtonProps {
  value?: number;
  size?: "sm" | "lg";
  onClick?: (type: "plus" | "minus") => void;
  className?: string;
  id: number;
}

export const CountButton: React.FC<CountButtonProps> = ({
  className,
  value = 1,
  size = "sm",
  id,
}) => {
  const { changeQuantity } = useChangeQuantity(id);

  return (
    <div
      className={cn(
        "inline-flex items-center justify-between gap-3",
        className
      )}
    >
      <CountIconButton
        onClick={() => changeQuantity("minus")}
        disabled={value === 1}
        size={size}
        type="minus"
      />

      <b className={size === "sm" ? "text-sm" : "text-md"}>{value}</b>

      <CountIconButton
        onClick={() => changeQuantity("plus")}
        size={size}
        type="plus"
      />
    </div>
  );
};
