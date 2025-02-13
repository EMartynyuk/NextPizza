import {
  Container,
  Filters,
  Title,
  Topbar,
  ProductsGroupList,
} from "@/components/shared";
import { findPizzas } from "@/utils/server/find-pizzas";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const categories = await findPizzas(params);

  const categoriesTopbar = categories.filter(
    (category) => category.products.length > 0
  );

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <Topbar categoriesTopbar={categoriesTopbar} />
      <Container className="mt-10 pb-14">
        <div className="flex gap-[60px]">
          <div className="w-[250px]">
            <Filters />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categoriesTopbar.map((category) => (
                <ProductsGroupList
                  key={category.id}
                  title={category.name}
                  categoryId={category.id}
                  items={category.products}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
