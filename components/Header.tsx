"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Avatar from "./Avatar";
import SugestionBox from "./SugestionBox";
import { useBoardStore } from "@/store/BoardStore";
import fetchSuggestion from "@/lib/fetchSuggestion";

const Header = () => {
  const [board, searchString, setSearchString] = useBoardStore((state) => [
    state.board,
    state.searchString,
    state.setSearchString,
  ]);

  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState("");

  useEffect(() => {
    //.size cuz its a Map
    if (board.columns.size === 0) {
      return;
    }

    setLoading(true);

    const fetchSuggestionFunc = async () => {
      const suggestion = await fetchSuggestion(board);
      setSuggestion(suggestion);
      setLoading(false);
    };

    fetchSuggestionFunc();
  }, [board]);

  return (
    <header>
      <div className="flex flex-col md:flex-row items-center p-5 bg-gray-500/10 rounded-b-2xl">
        {/* Gradient div */}
        <div
          className="
        absolute 
        top-0 
        left-0 
        w-full 
        h-96 
        bg-gradient-to-br
         from-pink-400 
         to-[#0055D1] 
         rounded-md
         filter
         blur-3xl 
         opacity-50
         -z-50
         "
        ></div>
        <Image
          src="/trello-full.png"
          alt="logo"
          width={160}
          height={100}
          className="w-34 md:w-40 pb-10 md:pb-0 object-contain"
        />
        <div className="flex items-center space-x-5 flex-1 justify-end w-full">
          {/* Searchbox  */}
          <form className="flex items-center space-x-5 bg-white rounded-md p-1 shadow-md flex-1 md:flex-initial">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="flex-1 outline-none p-2"
              value={searchString}
              onChange={(e) => setSearchString(e.target.value)}
            />
            <button type="submit" hidden>
              Search
            </button>
          </form>

          {/* Avatar */}

          <Avatar height={50} width={50} color={"blue"} name={"John Wayne"} />
        </div>
      </div>
      {/* Sugestion Box */}
      <SugestionBox suggestion={suggestion} loading={loading} />
    </header>
  );
};

export default Header;
