import { ChooseForm, Container } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: { id: string };
};

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      productItems: true,
      category: {
        include: {
          include: {
              products: {
              productItems: true,
            },
          },
        },
      },
    },
  });

  if (!product) {
    return notFound();
  }

  return (
    <Container className="flex flex-col my-10">
      <ChooseForm product={product} />
    </Container>
  );
}
