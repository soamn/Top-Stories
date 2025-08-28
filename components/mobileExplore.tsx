"use client";
import { Post, Subcategory, user } from "@/app/generated/prisma";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
type PostWithUser = Post & {
  user: user;
};
type SubcatWIthPost = Subcategory & {
  Post: {
    thumbnail: string | null;
  }[];
};
const MobileExplore = ({ categories }: { categories: SubcatWIthPost[] }) => {
  const [query, setQuery] = useState<string>("");
  const [posts, setPosts] = useState<PostWithUser[]>();
  const [results, setResults] = useState("");
  const router = useRouter();
  useEffect(() => {
    fetchPosts();
  }, []);
  const fetchPosts = async () => {
    const res = await fetch(`/api/posts?q=`, {
      method: "POST",
    });

    const data = await res.json();
    if (data.success == true) {
      setPosts(data.message);
    }
  };
  const onsubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/posts?q=${encodeURIComponent(query)}`, {
      method: "POST",
    });
    const data = await res.json();
    setResults(`Results for " ${query} "`);
    if (data.success == true) {
      setPosts(data.message);
    } else {
      setPosts([]);
    }
  };
  const handleclick = async (cat: any) => {
    try {
      const res = await fetch("/api/categoryPosts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subcategoryId: cat.id }),
      });
      if (!res.ok) throw new Error(`GET failed: ${res.status}`);
      const data = await res.json();
      setResults(`Results for " ${cat.name} "`);
      if (data.success == true) {
        setPosts(data.message);
      } else {
        setPosts([]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div
        className="w-full overflow-x-scroll flex  gap-2 p-4 mb-10 lg:hidden"
        style={{
          scrollbarWidth: "none",
          height: "14rem",
        }}
      >
        {categories.map((cat, k) => (
          <button
            onClick={() => {
              handleclick(cat);
            }}
            key={k}
            className="w-1/3 h-full flex-none relative overflow-clip roundness  "
          >
            <img
              src={cat.Post[0]?.thumbnail || "opengraph-image.png"}
              alt=""
              className="object-cover   w-full h-full"
            />
            <div className="absolute bottom-1 left-2  p-2">
              <p className="cloud px-2  bg-sky-300 dark:bg-amber-800 line-clamp-2 w-fit">
                {cat.name}
              </p>
            </div>
          </button>
        ))}
      </div>
      <form
        className="p-4 mb-8"
        onKeyDown={(e) => {
          if (e.code == "Enter") onsubmit;
        }}
        onSubmit={onsubmit}
      >
        <div className="bg-gray-100 dark:bg-zinc-500 rounded-full px-3 py-2 flex space-x-1 items-center">
          <Search width={16} />
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            className="outline-0 w-full placeholder:pl-2"
            placeholder="Search"
          />
        </div>
      </form>
      {results && <p className="px-3 font-bold">{results}</p>}
      {posts && posts.length > 0 ? (
        <div className="flex-col flex gap-4 p-2">
          {posts?.map((post, k) => (
            <div key={k}>
              <a href={post.slug} key={k} className="flex space-x-3 h-40 ">
                <div className=" w-1/3 lg:w-1/6 flex-none ">
                  <img
                    src={post.thumbnail || `opengraph-image.png`}
                    alt=""
                    className="object-cover  roundness w-full h-full"
                  />
                </div>
                <div className="flex flex-col  w-full  h-full justify-center ">
                  <div className=" ">
                    <p className="text-2xl line-clamp-2 font-medium">
                      {post.title}
                    </p>
                  </div>
                  <div>
                    <p className="line-clamp-3  ">{post.description}</p>
                  </div>
                </div>
              </a>
              <span className="text-[0.5rem] text-right w-full block   p-2">
                by{" "}
                <b>
                  <button
                    onClick={() => router.push(`/author/${post.user.id}`)}
                    className="underline"
                  >
                    {post.user.name}
                  </button>
                </b>{" "}
                on {new Date(post.createdAt).toDateString()}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <p className="px-2 text-center"> no results found</p>
      )}
    </>
  );
};

export default MobileExplore;
