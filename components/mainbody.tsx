import React from "react";
import { unstable_cache } from "next/cache";
import prisma from "@/lib/prisma";
import ScrollingBar from "./scrollingbar";
import { ArrowRight } from "lucide-react";
import ShareButtons from "./Sharebutton";

const getFeaturedPosts = () =>
  unstable_cache(
    () =>
      prisma.post.findMany({
        where: {
          featured: true,
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
          Subcategory: true,
          user: {
            select: { id: true, name: true, image: true },
          },
        },
        take: 5,
        orderBy: { updatedAt: "desc" },
      }),
    [],
    { tags: ["posts"] }
  )();
const getPosts = () =>
  unstable_cache(
    () =>
      prisma.post.findMany({
        where: {
          featured: false,
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
          user: {
            select: { id: true, name: true, image: true },
          },
        },
        orderBy: { updatedAt: "desc" },
      }),
    [],
    { tags: ["posts"] }
  )();
const getCategories = () =>
  unstable_cache(
    () =>
      prisma.subcategory.findMany({
        where: {
          Category: {
            name: "Top-Stories",
          },
        },
        include: {
          Post: {
            where: {
              featured: false,
              published: true,
            },
            select: {
              title: true,
              slug: true,
              thumbnail: true,
              description: true,
              createdAt: true,
              Subcategory: true,
              user: {
                select: { id: true, name: true, image: true },
              },
            },
            orderBy: {
              updatedAt: "desc",
            },
            take: 4,
          },
        },
      }),
    [],
    { tags: ["posts"] }
  )();
const MainBody = async () => {
  const featuredPosts = await getFeaturedPosts();
  const Toppost = featuredPosts && featuredPosts[0];
  const posts = await getPosts();
  const categories = await getCategories();

  if (!featuredPosts || featuredPosts.length === 0 || !Toppost) {
    return (
      <div className="flex items-center justify-center h-96 text-2xl font-bold">
        Under Maintenance
      </div>
    );
  }

  return (
    <>
      <div className="px-8 mt-4 hidden md:block">
        <ScrollingBar posts={featuredPosts} />
        <div className="flex w-full  space-x-4 h-160 mb-10">
          <a
            href={Toppost.slug}
            className="w-full  h-full rounded-3xl overflow-clip relative cursor-pointer block"
            tabIndex={0}
            aria-label={Toppost.title}
          >
            <img
              src={Toppost.thumbnail || "opengraph-image.png"}
              alt={Toppost.title}
              className="object-cover w-full h-full hover:scale-110 transition-all duration-300"
            />
            <div
              className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
              }}
            />
            <div className="absolute bottom-10 font-medium text-white w-full py-2 px-10 z-10">
              <div className="flex items-center space-x-2">
                <span className="p-2 bg-orange-500 rounded-full">
                  {Toppost.Subcategory?.name}
                </span>
                <span>{new Date(Toppost.createdAt).toLocaleDateString()}</span>
              </div>
              <p className="text-3xl line-clamp-2">{Toppost.title}</p>
            </div>
          </a>
          <div
            className="w-1/2 flex flex-col space-y-4 h-160 overflow-y-scroll px-3"
            style={{
              scrollbarWidth: "none",
            }}
          >
            <h2 className="font-semibold">More Recent Posts</h2>
            {posts.map((post, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-4  rounded-xl  py-3"
              >
                <a
                  href={post.slug}
                  className="w-1/3 h-full rounded-xl overflow-hidden block"
                  tabIndex={0}
                  aria-label={post.title}
                >
                  <img
                    src={post.thumbnail || "opengraph-image.png"}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </a>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex items-center space-x-2 mb-1">
                    <img
                      src={post.user.image || "/favicon.svg"}
                      alt={post.user.name || ""}
                      className="w-7 h-7 rounded-full object-cover "
                    />
                    <a
                      href={`/author/${post.user.id}`}
                      className="text-sm font-semibold  hover:underline"
                    >
                      {post.user.name}
                    </a>
                    <span className="text-xs text-gray-400">
                      {(() => {
                        const now = Date.now();
                        const created = new Date(post.createdAt).getTime();
                        const diffMs = now - created;
                        const diffHours = Math.floor(diffMs / 36e5);
                        const diffDays = Math.floor(diffMs / (24 * 36e5));
                        const diffWeeks = Math.floor(diffMs / (7 * 24 * 36e5));
                        if (diffWeeks > 0) {
                          return diffWeeks === 1
                            ? "1 week ago"
                            : `${diffWeeks} weeks ago`;
                        } else if (diffDays > 0) {
                          return diffDays === 1
                            ? "1 day ago"
                            : `${diffDays} days ago`;
                        } else if (diffHours > 0) {
                          return diffHours === 1
                            ? "1 hour ago"
                            : `${diffHours} hours ago`;
                        } else {
                          return "Just now";
                        }
                      })()}
                    </span>
                  </div>
                  <div>
                    <div className="font-bold text-lg line-clamp-1">
                      {post.title}
                    </div>
                    <div className="text-gray-600 text-sm line-clamp-2 mb-1">
                      {post.description}
                    </div>
                    <a
                      href={post.slug}
                      className="text-blue-600 text-xs font-medium hover:underline"
                    >
                      Read more...
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {categories
          .slice(0, 4)
          .filter((cat) => cat.Post && cat.Post.length > 0)
          .map((cat, k) => (
            <div key={k} className=" w-full flex flex-col mb-10">
              <div className="flex justify-between items-center w-full mb-2">
                <h2 className="text-2xl font-medium">{cat.name}</h2>
                <a
                  href={`/category?id=${cat.id}`}
                  className="text-amber-600 text-sm hover:underline font-medium"
                >
                  <span>See more</span>
                  <ArrowRight className="inline pl-1" />
                </a>
              </div>
              <div className="flex space-x-4 w-full">
                {cat.Post.slice(0, 4).map((post, idx) => (
                  <div key={idx} className="  p-3 w-1/4 flex flex-col">
                    <a
                      href={post.slug}
                      className="block mb-2 rounded-xl overflow-hidden"
                      tabIndex={0}
                      aria-label={post.title}
                    >
                      <img
                        src={post.thumbnail || "opengraph-image.png"}
                        alt={post.title}
                        className="w-full h-50 object-cover hover:scale-120 transition-all duration-300"
                      />
                    </a>
                    <div className="flex items-center space-x-2 mb-2">
                      <img
                        src={post.user.image || "/favicon.svg"}
                        alt={post.user.name || ""}
                        className="w-7 h-7 rounded-full object-cover "
                      />
                      <a
                        href={`/author/${post.user.id}`}
                        className="text-xs font-medium hover:underline"
                      >
                        {post.user.name}
                      </a>
                      <span className="text-xs text-gray-400">
                        {(() => {
                          const now = Date.now();
                          const created = new Date(post.createdAt).getTime();
                          const diffMs = now - created;
                          const diffMins = Math.floor(diffMs / 60000);
                          const diffHours = Math.floor(diffMs / 36e5);
                          const diffDays = Math.floor(diffMs / (24 * 36e5));
                          const diffWeeks = Math.floor(
                            diffMs / (7 * 24 * 36e5)
                          );
                          const diffMonths = Math.floor(
                            diffMs / (30 * 24 * 36e5)
                          );
                          if (diffMonths > 0) {
                            return diffMonths === 1
                              ? "1 month ago"
                              : `${diffMonths} months ago`;
                          } else if (diffWeeks > 0) {
                            return diffWeeks === 1
                              ? "1 week ago"
                              : `${diffWeeks} weeks ago`;
                          } else if (diffDays > 0) {
                            return diffDays === 1
                              ? "1 day ago"
                              : `${diffDays} days ago`;
                          } else if (diffHours > 0) {
                            return diffHours === 1
                              ? "1 hour ago"
                              : `${diffHours} hours ago`;
                          } else if (diffMins > 0) {
                            return diffMins === 1
                              ? "1 min ago"
                              : `${diffMins} mins ago`;
                          } else {
                            return "Just now";
                          }
                        })()}
                      </span>
                    </div>
                    <div className="font-bold text-base line-clamp-1 mb-1">
                      {post.title}
                    </div>
                    <div className="text-gray-600 text-sm line-clamp-2">
                      {post.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        <ShareButtons
          size={30}
          title="Top Stories Online"
          url={` ${process.env.NEXT_PUBLIC_API_URL}`}
        />
      </div>
    </>
  );
};

export default MainBody;
