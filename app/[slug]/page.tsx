import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";
import ShareButton from "@/components/Sharebutton";

export const revalidate = 7200;
export const dynamicParams = true;
const getPost = (slug: string) =>
  unstable_cache(
    () =>
      prisma.post.findUnique({
        where: {
          slug: slug,
          published: true,
          Category: {
            name: "Top-Stories",
          },
        },
        include: { user: true, Subcategory: true },
      }),
    [`post-${slug}`],
    { tags: [`post-${slug}`, "user"] }
  )();

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug: slug, published: true },
  });

  const title = post?.title || "Top Stories Online";
  const description = post?.description || "Top Stories Online";
  const image = post?.thumbnail || "";
  const url = `https://${process.env.NEXT_PUBLIC_API_URL}/${slug}`;

  return {
    title: { absolute: title },
    description,
    keywords: post?.tags,
    openGraph: {
      title,
      description,
      url,
      siteName: "Top Stories Online",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    metadataBase: new URL(
      `${process.env.NEXT_PUBLIC_API_URL}/opengraph-image.png`
    ),
    alternates: {
      canonical: url,
    },
  };
}

const PostPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const article = await getPost(slug);

  if (!article) {
    return notFound();
  }
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    image: article.thumbnail || "opengraph-image.png",
    author: {
      "@type": "Person",
      name: "Aman Negi",
    },
    datePublished: new Date(article.createdAt).toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_API_URL}/${article.slug}`,
    },
  };
  let date = new Date(article.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const wordsPerMinute = 250;
  const wordCount = article.content.trim().split(/\s+/).length;
  const readTimeMinutes = Math.ceil(wordCount / wordsPerMinute);

  return (
    <>
      <div className="w-full max-h-fit min-h-dvh   flex flex-col   items-center  px-4 md:px-6  ">
        <div className="w-full flex-1 max-w-4xl  py-5  ">
          <div className=" w-full relative h-fit overflow-clip  ">
            <img
              alt={article.title}
              src={article.thumbnail || "opengraph-image.png"}
              className="mb-5 w-full max-h-100   object-cover roundness"
            />
            <div
              className="
            bg-gradient-to-b from-transparent from-5%   via-zinc-400 to-white text-white
            dark:bg-gradient-to-b dark:from-transparent dark:from-5% dark:via-zinc-700 dark:to-zinc-800
             h-fit absolute bottom-0 px-2 py-5  w-full"
            >
              <h2 className="lg:text-3xl text-2xl font-bold pop-shadow  line-clamp-3">
                {article.title}
              </h2>
              <p className="line-clamp-2 pl-2">{article.description}</p>
            </div>
          </div>
          <ShareButton
            size={25}
            title={article.title}
            url={`${process.env.NEXT_PUBLIC_API_URL}/${article.slug}`}
          />
          <div className="text-center text-xs w-full p-5 text-gray-600">
            <small className="italic">{date}</small>
            <p className="inline pl-5">| {readTimeMinutes} min Read</p>
          </div>
          <article
            className="prose prose-sm sm:prose md:prose-base lg:prose-lg max-w-none article"
            dangerouslySetInnerHTML={{ __html: article.content }}
          ></article>
          <p className="text-[0.5rem] text-right w-full block   p-2 ">
            by{" "}
            <b>
              <a className="underline" href={`/author/${article.user.id}`}>
                {article.user.name}
              </a>
            </b>{" "}
            on {new Date(article.createdAt).toDateString()}
          </p>
        </div>

        <Script
          id="application/ld+json"
          type="application/ld+json"
          suppressHydrationWarning
          key="blog-jsonld"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </div>
    </>
  );
};

export default PostPage;
