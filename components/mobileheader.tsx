"use client";
import { Compass, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Logo from "./logo";
import Sidebar from "./mobileSidebar";
import { motion } from "motion/react";
import ThemeToggle from "./ThemeToggle";

const MobileHeader = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  return (
    <header className="flex  py-4 px-5  items-center justify-center  md:hidden dark:bg-zinc-800 ">
      <div className="flex-1  w-full ">
        <a href="/" className=" flex items-center  space-x-2 w-fit ">
          <Logo />
          <span className="font-extrabold text-lg ">Top Stories</span>
        </a>
      </div>
      <div className="flex items-center space-x-3">
        <ThemeToggle />
        {pathname == "/explore" ? (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className=" rounded-full p-1 "
          >
            <Menu />
          </button>
        ) : (
          <a href="/explore">
            <Compass />
          </a>
        )}
      </div>

      {isOpen && (
        <motion.div
          initial={{ x: 100 }}
          animate={{
            x: 0,
          }}
          transition={{
            duration: 0.3,
          }}
          className="absolute top-0 h-screen w-full bg-white dark:bg-zinc-800 z-50 flex items-center justify-center"
        >
          <div className="absolute top-5 right-5">
            <button onClick={() => setIsOpen(!isOpen)}>
              <X />
            </button>
          </div>
          <Sidebar />
        </motion.div>
      )}
    </header>
  );
};

export default MobileHeader;
