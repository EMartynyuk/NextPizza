import { cn } from "@/utils/utils";
import { CircleCheck } from "lucide-react";

interface IIngredientItem {
  imageUrl: string;
  name: string;
  price: number;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const IngredientItem = ({
  className,
  active,
  price,
  name,
  imageUrl,
  onClick,
}: IIngredientItem) => {
  return (
    <div
      className={cn(
        "flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white border",
        { "border border-primary": active },
        className
      )}
      onClick={onClick}
    >
      {active && (
        <CircleCheck className="absolute top-2 right-2 text-primary" />
      )}
      <img width={110} height={110} src={imageUrl} alt="Ingredient"/>
      <span className="text-xs mb-1">{name}</span>
      <span className="font-bold">{price} ₽</span>
    </div>
  );
};
