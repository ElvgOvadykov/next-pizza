import { ChooseProductModal } from "@/shared/components/shared";
import { prisma } from "@/prisma/prisma-client";
import { notFound } from "next/navigation";

type ProductPageProps = {
  params: { id: string };
};

export default async function ProductModalPage({
  params: { id },
}: ProductPageProps) {
  const product = await prisma.product.findFirst({
    where: { id: Number(id) },
    include: {
      ingredients: true,
      productItems: true,
      // productItems: {
      //   orderBy: { createdAt: "desc" },
      //   include: { product: { include: { productItems: true } } },
      // },
    },
  });

  if (!product) {
    return notFound();
  }

  return <ChooseProductModal product={product} />;
}
