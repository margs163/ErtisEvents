"use client";
import { interestTagIcons, recommendations } from "@/lib/constants";
import { EventType } from "@/lib/types";
import { Divide, Heart, MoveUpRight, Star } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import badge from "@/assets/images/badge.svg";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import EventSearchFilters from "./SearchFilters";
import { useEventsStore } from "@/lib/eventStore";

interface SearchFilters {
  searchQuery: string;
  dateFrom: string;
  dateTo: string;
  priceMin: number | null;
  priceMax: number | null;
  tags: string[];
}

export default function SearchedEvents() {
  const allEvents = useEventsStore((state) => state.events);
  const [filters, setFilters] = useState<SearchFilters>({
    searchQuery: "",
    dateFrom: "",
    dateTo: "",
    priceMin: null,
    priceMax: null,
    tags: [],
  });

  const filteredEvents = useMemo(() => {
    console.log("change");
    // if (!allEvents || allEvents.length < 1) {
    //   return recommendations;
    // }

    // return allEvents;
    return allEvents.filter((event) => {
      // Search query filter
      if (
        filters.searchQuery &&
        !event.title
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase()) &&
        !event.shortDescription
          .toLowerCase()
          .includes(filters.searchQuery.toLowerCase())
      ) {
        return false;
      }

      // Date range filter
      if (filters.dateFrom && event.date < new Date(filters.dateFrom)) {
        return false;
      }
      if (filters.dateTo && event.date > new Date(filters.dateTo)) {
        return false;
      }

      // Seats filter - filter by available seats
      if (
        filters.priceMin !== null &&
        event.availableSeats < filters.priceMin
      ) {
        return false;
      }
      if (
        filters.priceMax !== null &&
        event.availableSeats > filters.priceMax
      ) {
        return false;
      }

      // Tag filter - event must have at least one selected tag
      if (filters.tags.length > 0) {
        const hasMatchingTag = event.tags.some((tag) =>
          filters.tags.includes(tag),
        );
        if (!hasMatchingTag) {
          return false;
        }
      }

      return true;
    });
  }, [filters, allEvents.length]);

  const handleSearch = (newFilters: SearchFilters) => {
    setFilters(newFilters);
  };

  const handleClear = () => {
    setFilters({
      searchQuery: "",
      dateFrom: "",
      dateTo: "",
      priceMin: null,
      priceMax: null,
      tags: [],
    });
  };
  return (
    <section className="space-y-8 px-5 lg:px-32">
      <EventSearchFilters onSearch={handleSearch} onClear={handleClear} />
      <div className="grid grid-cols-1 lg:gap-12 lg:grid-cols-3 gap-8 mt-4 lg:mt-20">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((item, index) => (
            <SearchedItem key={index} data={item} />
          ))
        ) : (
          <div className="col-span-1 py-12 text-center">
            <p className="text-neutral-600 text-lg">
              No events found matching your filters.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function SearchedItem({ data }: { data: EventType }) {
  const [liked, setLiked] = useState(false);
  return (
    <div className="flex flex-col space-y-6 lg:space-y-9 p-6 lg:p-8 rounded-2xl lg:rounded-3xl bg-white border-[1.5px] shadow-md shadow-gray-200 relative">
      {data.s3Url && (
        <Image
          src={data.s3Url}
          alt="img"
          width={340}
          height={190}
          unoptimized
          className="w-full h-48 lg:h-58 object-cover rounded-xl "
        />
      )}
      <div className="absolute top-0 -right-0 z-20">
        <Image
          src={badge}
          alt="badge"
          className="size-24 fill-blue-400 filter-[invert(1)_hue-rotate(360deg)_saturate(2)] shadow-lg drop-shadow-lg drop-shadow-gray-400"
        />
        <h2 className="text-base leading-none top-8 w-20 right-2 text-center font-extrabold text-white absolute">
          NEW EVENT
        </h2>
      </div>
      <div className="space-y-6">
        <div className="space-y-1">
          <p className="text-sm font-medium text-neutral-600">
            {data.shortDescription}
          </p>
          <h3 className="text-xl font-bold leading-[1.2] text-neutral-800">
            {data.title}
          </h3>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-neutral-800">
              {data.rating}
            </h3>
            <Star className="size-6 fill-yellow-400 text-yellow-400" />
          </div>
          <p className="text-sm font-medium text-neutral-600">
            {new Date(data.date).toDateString()}
          </p>
          <Heart
            onClick={() => setLiked((prev) => !prev)}
            className={cn(
              "text-neutral-600 size-6 transition-colors cursor-pointer",
              liked && "text-red-500 fill-red-500",
            )}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {data.tags.map((item, index) => {
          const Icon = interestTagIcons[item as "Cinema"];
          return (
            <div
              key={index}
              className="flex gap-2 items-center px-3 py-1.5 rounded-full border border-neutral-300"
            >
              <Icon className="size-4 text-neutral-600 " />
              <h3 className="text-xs lg:text-sm font-medium text-neutral-600">
                {item}
              </h3>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm font-medium text-neutral-800">
          {data.availableSeats} seats left
        </p>
        <button className="flex items-center gap-2 bg-blue-500 cursor-pointer hover:bg-blue-600/90 active:bg-blue-600/90 transition-colors rounded-md px-4 py-2.5 text-white font-medium text-sm lg:text-base">
          Learn More
          <MoveUpRight className="size-5 text-white" strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
}
