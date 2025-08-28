"use client";
import React from "react";
import Logo from "./logo";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header className="hidden md:flex   py-4 px-9 items-center dark:bg-zinc-800 ">
      <div className=" flex-1">
        <a href="/" className=" flex items-center  space-x-2 w-fit ">
          <Logo />
          <span className="font-extrabold text-lg ">Top Stories</span>
        </a>
      </div>
      <ul className="flex space-x-5 *:hover:underline items-center">
        <li>
          <ThemeToggle />
        </li>
        <li>
          <a href="/privacy-policy">Privacy</a>
        </li>
        <li>
          <a
            href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}?subject=Write%20for%20us%20Inquiry`}
          >
            Write for us
          </a>
        </li>
      </ul>
    </header>
  );
};

export default Header;
