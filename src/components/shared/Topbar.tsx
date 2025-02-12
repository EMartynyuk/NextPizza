import { cn } from "@/utils/utils";
import { Container, Categories, SortPopup } from "./";
import { Category } from "@prisma/client";

interface ITopbar {
  className?: string;
  categoriesTopbar: Category[];
}

export const Topbar = ({ className, categoriesTopbar }: ITopbar) => {
  return (
    <div
      className={cn(
        "sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10",
        className
      )}
    >
      <Container className="flex items-center justify-between ">
        <Categories categoriesTopbar={categoriesTopbar} />
        <SortPopup />
      </Container>
    </div>
  );
};
