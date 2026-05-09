"use client";
import { Input } from "@/components/ui/input";
import { WEBSITE_SHOP } from "@/routes/WebsiteRoute";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";


const Search = ({ isShow }) => {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const handleSearch = (event) => {
    event?.preventDefault()

    const trimmedQuery = query.trim()
    if (!trimmedQuery) {
      return
    }

    router.push(`${WEBSITE_SHOP}?q=${encodeURIComponent(trimmedQuery)}`)
  }
  return (
    <div
      className={`absolute border-t transition-all left-0 py-5 md:px-32 px-5 z-10 bg-white w-full ${isShow ? "top-18" : "-top-full "
        }`}
    >
      <form className="flex justify-between items-center relative" onSubmit={handleSearch}>
        <Input
          className="rounded-full md:h-12 ps-5 border-primary"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="absolute right-3 cursor-pointer">
          <IoSearchOutline size={20} className="text-gray-500" />
        </button>
      </form>
    </div>
  );
};

export default Search;
