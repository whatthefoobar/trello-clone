import { UserCircleIcon } from "@heroicons/react/24/solid";
import React from "react";

type IProps = {
  suggestion: string;
  loading: boolean;
};

const SugestionBox = ({ suggestion, loading }: IProps) => {
  return (
    <div className="flex items-center justify-center px-5 py-2 md:py-5">
      <p className="flex items-center text-sm p-5 font-light pr-5 shadow-xl w-fit bg-white italic max-w-3xl text-[#0055d1]">
        <UserCircleIcon
          className={`inline-block h-10 w-10 text-primary mr-1 ${
            loading && "animate-spin"
          }`}
        />
        {/* {suggestion && !loading
          ? suggestion
          : "GPT is summarising your tasks for the day..."} */}
        Good Morning TaskOwner. Have a productive day!
      </p>
    </div>
  );
};

export default SugestionBox;
