import { LucideGhost } from "lucide-react";
import React from "react";

const NotFound = () => {
  return (
    <div className="w-screen h-screen ">
      <div className="flex flex-col items-center h-screen justify-center  ">
        <LucideGhost width={20} />
        <p> 404 | Not Found</p>
      </div>
    </div>
  );
};

export default NotFound;
