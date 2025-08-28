"use client";

import React, { useEffect, useState } from "react";
import { notFound, useSearchParams } from "next/navigation";
import ShareButton from "@/components/Sharebutton";

type Post = {
  id: number;
  title: string;
  description: string;
  thumbnail?: string;
  slug: string;
  createdAt: string;
  user?: { name?: string };
};
const CategoryPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSmall, setIsSmall] = useState<boolean | null>(null);

  useEffect(() => {
    setIsSmall(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (!id) return;
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/categoryPosts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ subcategoryId: id }),
        });
        const data = await res.json();

        if (data.success) {
          setPosts(data.message);
        } else {
          setPosts([]);
        }
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [id]);

  if (isSmall === null) return null;
  if (isSmall) {
    notFound();
  }
  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Posts in Category</h1>
      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.id} className="rounded-lg p-4 ">
            <div className="flex items-center gap-4">
              <img
                src={post.thumbnail || "/opengraph-image.png"}
                alt={post.title}
                className="w-24 h-full object-cover rounded"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-gray-600 line-clamp-2">{post.description}</p>
                <div className="flex items-center text-xs text-gray-500 mt-2">
                  <span>By {post.user?.name}</span>
                  <span className="mx-2">|</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <ShareButton
                  size={20}
                  title={post.title}
                  url={`${process.env.NEXT_PUBLIC_API_URL}/${post.slug}`}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryPage;
