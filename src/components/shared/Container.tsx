import { cn } from "@/utils/utils";
import { ReactNode } from "react";

interface IContainer {
  className?: string;
  children: ReactNode;
}

export const Container = ({ children, className }: IContainer) => {
  return (
    <div className={cn("mx-auto max-w-[1280px] px-[10px]", className)}>{children}</div>
  );
};
