import React from "react";
const Sidebar = () => {
  return (
    <ul className="flex flex-col *:underline *:underline-offset-4  *:leading-9.5   ">
      <li>
        <a href="/">Home</a>
      </li>{" "}
      <li>
        <a href="/privacy-policy">Privacy</a>
      </li>{" "}
      <li>
        <a
          href={`mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}?subject=Write%20for%20us%20Inquiry`}
        >
          Write-for-us
        </a>
      </li>{" "}
    </ul>
  );
};

export default Sidebar;
