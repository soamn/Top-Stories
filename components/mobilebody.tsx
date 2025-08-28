import prisma from "@/lib/prisma";
import React from "react";
import { unstable_cache } from "next/cache";

const getFeaturedPosts = () =>
  unstable_cache(
    () =>
      prisma.post.findMany({
        where: {
          featured: true,
          published: true,
          Category: {
            name: "Psychology",
          },
        },
        select: {
          title: true,
          slug: true,
          thumbnail: true,
          description: true,
          createdAt: true,
          user: {
            select: { id: true, name: true },
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
            select: { id: true, name: true },
          },
        },
        orderBy: { updatedAt: "desc" },
      }),
    [],
    { tags: ["posts"] }
  )();

const MobileBody = async () => {
  const feaaturedPosts = await getFeaturedPosts();
  const Toppost = feaaturedPosts[0];
  const posts = await getPosts();
  return (
    <div className="py-1  px-2  flex-1 md:hidden">
      {/* section 1 */}
      <div className="flex flex-col space-y-4 w-full px-4 mb-10">
        <a href={Toppost.slug} className="flex space-x-5   ">
          {Toppost.thumbnail ? (
            <img
              src={Toppost.thumbnail}
              className="w-1/3 object-cover roundness"
            />
          ) : (
            <div className="font-extrabold text-5xl w-1/4">{"(*"}</div>
          )}
          <div className="w-1/3 flex flex-1 flex-col space-y-4">
            <h1 className="text-4xl  font-bold line-clamp-3 ">
              {Toppost.title}
            </h1>
            <p className="line-clamp-2 text-xs">{Toppost.description}</p>
          </div>
        </a>
        <span className="text-[0.5rem] self-end">
          by{" "}
          <b>
            <a className="underline" href={`/author/${Toppost.user.id}`}>
              {Toppost.user.name}
            </a>
          </b>{" "}
          on {new Date(Toppost.createdAt).toDateString()}
        </span>
      </div>

      {/* section 2 */}
      {feaaturedPosts.length > 1 ? (
        <>
          <h1 className="text-2xl  font-bold">Trending</h1>
          <section
            className="w-full overflow-x-scroll flex  gap-2 p-4 mb-10"
            style={{
              scrollbarWidth: "none",
              height: "25rem",
            }}
          >
            {feaaturedPosts.slice(1).map((post, key) => (
              <a
                href={post.slug}
                key={key}
                className="w-[80%] h-full flex-none relative overflow-clip roundness "
              >
                <img
                  src={post.thumbnail || "opengraph-image.png"}
                  alt=""
                  className="object-cover   w-full h-full"
                />

                <div className="absolute bottom-0 p-2">
                  <p className=" text-2xl px-5  font-bold py-2 pop-shadow cloud bg-orange-700 text-white  line-clamp-2 ">
                    {post.title}
                  </p>
                </div>
              </a>
            ))}
          </section>
        </>
      ) : (
        <></>
      )}

      {/* section 3 */}
      {posts.length > 0 ? (
        <>
          {" "}
          <h1 className="text-2xl  font-bold">More Posts </h1>
          <section className="py-4 px-2">
            <div
              className="h-[50rem]  w-full  overflow-scroll flex flex-col gap-4  snap-y snap-mandatory *:snap-center roundness  *:h-[93%] *:w-full *:flex-none"
              style={{
                scrollbarWidth: "none",
              }}
            >
              {posts.map((post, k) => (
                <a
                  href={post.slug}
                  key={k}
                  className="   roundness relative overflow-clip"
                >
                  <img
                    src={post.thumbnail || "opengraph-image.png"}
                    className="h-full w-full object-cover "
                  />

                  <div className="bg-gradient-to-b from-transparent from-5%   via-zinc-600  to-black text-white h-fit absolute bottom-0 px-2 py-5  w-full">
                    <h2 className="text-3xl font-bold pop-shadow line-clamp-3">
                      {post.title}
                    </h2>
                    <p className="line-clamp-6 pl-2">
                      {post.description}
                      <span className="text-[0.5rem] text-right w-full block   p-2">
                        by <b>{post.user.name} </b> on{" "}
                        {new Date(post.createdAt).toDateString()}
                      </span>
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MobileBody;
