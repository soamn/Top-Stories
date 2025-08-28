import MobileExplore from "@/components/mobileExplore";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import React from "react";

const getSubcategories = () =>
  unstable_cache(
    () =>
      prisma.subcategory.findMany({
        where: { Category: { name: "Top-Stories" } },
        include: {
          Post: {
            where: {
              published: true,
              thumbnail: { not: null, notIn: [""] },
            },
            select: {
              thumbnail: true,
            },
            take: 1,
          },
        },
      }),
    [`category`],
    { tags: ["category"] }
  )();

const page = async () => {
  const categories = await getSubcategories();
  return (
    <>
      <MobileExplore categories={categories} />
    </>
  );
};

export default page;
