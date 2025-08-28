import React from "react";
import Logo from "./logo";

const Footer = () => {
  return (
    <footer className="w-full h-40 dark:bg-zinc-800">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex justify-center items-center font-extrabold sm:justify-start">
            <Logo />
            <span className="pl-4">Top Stories </span>
          </div>

          <p className="mt-4 text-center text-sm text-gray-500 lg:mt-0 lg:text-right">
            Copyright &copy; {new Date().getFullYear().toString()}. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
