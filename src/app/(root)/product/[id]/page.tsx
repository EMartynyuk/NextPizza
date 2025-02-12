import { ChooseProductForm, Container } from "@/components/shared";
import { ChoosePizzaForm } from "@/components/shared/ChoosePizzaForm";
import { prisma } from "@/lib/prisma/prisma";
import { notFound } from "next/navigation";

export const revalidate = 86400;

export async function generateStaticParams() {
  return Array(20)
    .fill(0)
    .map((_, i) => ({ id: String(i + 1) }));
}

interface IProductPage {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: IProductPage) {
  const { id } = await params;
  const product = await prisma.product.findUnique({
    where: { id: Number(id) },
    include: {
      variants: true,
      ingredients: true,
      category: {
        include: {
          products: {
            include: {
              variants: true,
            },
          },
        },
      },
    },
  });

  if (!product) {
    return notFound();
  }

  const isPizzaForm = Boolean(product.variants[0].pizzaType);

  return (
    <Container className="flex flex-col my-10">
      {isPizzaForm ? (
        <ChoosePizzaForm
          imageUrl={product.imageUrl}
          name={product.name}
          ingredients={product.ingredients}
          items={product.variants}
        />
      ) : (
        <ChooseProductForm
          imageUrl={product.imageUrl}
          name={product.name}
          price={product.variants[0].price}
          id={product.variants[0].id}
        />
      )}
    </Container>
  );
}
