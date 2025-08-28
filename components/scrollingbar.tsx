"use client";
import React from "react";
import { useEffect, useRef } from "react";
import { useAnimation, motion } from "motion/react";
import type { FC } from "react";

type Post = {
  slug: string;
  title: string;
};

type ScrollingBarProps = {
  posts: Post[];
};

const ScrollingBar: FC<ScrollingBarProps> = ({ posts }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const animate = async () => {
      if (!containerRef.current) return;
      const container = containerRef.current;
      const scrollWidth = container.scrollWidth;
      const clientWidth = container.clientWidth;
      const distance = scrollWidth - clientWidth;

      if (distance <= 0) return;

      while (true) {
        await controls.start({
          x: -distance,
          transition: { duration: distance / 50, ease: "linear" },
        });
        await controls.start({
          x: 0,
          transition: { duration: 0 },
        });
      }
    };
    animate();
  }, [posts, controls]);

  return (
    <div className="w-full   bg-gray-100 dark:bg-zinc-700  rounded-xl p-2 flex overflow-hidden mb-10">
      <span className="text-amber-600 flex-none mr-4">New Update :</span>
      <div className="relative flex-1 overflow-hidden">
        <motion.div
          className="flex space-x-8"
          ref={containerRef}
          animate={controls}
          style={{ whiteSpace: "nowrap" }}
        >
          {posts.slice(1).map((post, k) => (
            <a href={post.slug} key={k} className="flex flex-none items-center">
              <span className="text-amber-600 pl-5 text-lg">• </span>
              <span className="font-medium">{post.title}</span>
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollingBar;
