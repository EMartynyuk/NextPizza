import { ChooseProductModal } from "@/components/shared";
import { prisma } from "@/lib/prisma/prisma";
import { notFound } from "next/navigation";

// export const revalidate = 86400;

// export async function generateStaticParams() {
//   return Array(20)
//     .fill(0)
//     .map((_, i) => ({ id: String(i + 1) }));
// }

interface IModalProductPage {
  params: Promise<{ id: string }>;
}

export default async function ModalProductPage({ params }: IModalProductPage) {
  const { id } = await params;

  const product = await prisma.product.findFirst({
    where: {
      id: Number(id),
    },
    include: {
      ingredients: true,
      variants: true,
    },
  });

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
}
