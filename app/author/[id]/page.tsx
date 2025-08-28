import React from "react";
import prisma from "@/lib/prisma";
import { unstable_cache } from "next/cache";

export const revalidate = 500;
export const dynamicParams = true;

const getUser = (id: string) =>
  unstable_cache(
    () =>
      prisma.user.findUnique({
        where: {
          id: id,
        },
        include: {
          Post: {
            where: {
              published: true,
              Category: {
                name: "Top-Stories",
              },
            },
            select: {
              title: true,
              slug: true,
              thumbnail: true,
              description: true,
              createdAt: true,
            },
            take: 10,
            orderBy: { updatedAt: "desc" },
          },
        },
      }),
    [`user-${id}`],
    { tags: [`user-${id}`] }
  )();
const PostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const user = await getUser(id);

  return (
    <div className="lg:max-w-5xl m-auto">
      {/* User Info */}
      <div className="flex flex-col md:flex-row p-4 items-center md:items-start gap-4">
        <img
          src={user?.image || "/favicon.svg"}
          alt=""
          className="rounded-full w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 object-cover"
        />
        <div className="text-center md:text-left">
          <p className="text-base md:text-lg lg:text-xl">{user?.about}</p>
        </div>
      </div>

      <hr className="my-4" />

      {/* Posts */}
      <div className="flex flex-col gap-6 p-2">
        {user?.Post?.map((post, k) => (
          <div key={k}>
            <a
              href={`/${post.slug}`}
              className="flex flex-col md:flex-row gap-4 items-center md:items-start"
            >
              {/* Thumbnail */}
              <div className="w-full md:w-1/4 h-40 md:h-28 lg:h-32 flex-none">
                <img
                  src={post.thumbnail || `/opengraph-image.png`}
                  alt=""
                  className="object-cover w-full h-full rounded-md"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col w-full justify-center md:justify-start">
                <p className="text-lg md:text-xl lg:text-2xl font-medium line-clamp-2">
                  {post.title}
                </p>
                <p className="text-sm md:text-base lg:text-lg line-clamp-3">
                  {post.description}
                </p>
                <span className="text-[0.65rem] md:text-xs lg:text-sm text-gray-500 mt-2 block">
                  {new Date(post.createdAt).toDateString()}
                </span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostPage;
