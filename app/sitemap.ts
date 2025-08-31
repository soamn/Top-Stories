import prisma from "@/lib/prisma";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: {
      slug: true,
    },
  });

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${process.env.NEXT_PUBLIC_API_URL}/${post.slug}`,
  }));

  return [
    {
      url: `${process.env.NEXT_PUBLIC_API_URL}`,
      lastModified: new Date(),
    },
    ...postEntries,
  ];
}
