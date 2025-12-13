import { Star } from "lucide-react";
import Link from "next/link";

export default function HeaderSearch() {
  return (
    <header className="space-y-8 lg:space-y-16 lg:px-40 px-5">
      <div className="space-y-1 lg:space-y-2">
        <h1 className="text-2xl lg:text-5xl font-bold text-neutral-800 text-pretty">
          Search for Events
        </h1>
        <p className="text-sm lg:text-xl font-medium text-neutral-600">
          Find all the events in the city with smart filters
        </p>
      </div>
      {/* <div className="flex items-center gap-4">
        <Link
          href={"/search"}
          className="px-4 py-2 rounded-md bg-transparent border-[1.5px] border-neutral-300 text-neutral-500 font-medium text-sm hover:border-neutral-400 hover:text-neutral-700 active:border-neutral-400 active:text-neutral-700 transition-colors"
        >
          Search
        </Link>
        <button className="flex items-center gap-2 bg-blue-500 cursor-pointer hover:bg-blue-600/90 active:bg-blue-600/90 transition-colors rounded-md px-4 py-2.5 text-white font-medium text-sm">
          <Star className="size-5 text-white" strokeWidth={1.8} />
          Save Recommends
        </button>
      </div> */}
    </header>
  );
}
