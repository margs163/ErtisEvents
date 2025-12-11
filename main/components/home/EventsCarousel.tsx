import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { events } from "@/lib/constants";
import Image, { StaticImageData } from "next/image";
import badge from "@/assets/images/badge.svg";
import Link from "next/link";
import { MoveRight } from "lucide-react";

export default function EventsCarousel() {
  return (
    <section className="px-4 lg:px-16 lg:py-4 bg-blue-500">
      <Carousel
        className="w-full"
        opts={{ align: "start" }}
        orientation="horizontal"
      >
        <CarouselContent className="w-full">
          {events.map((item, index) => (
            <CarouselItem
              className="basis-1/1 lg:basis-1/4 py-2 pl-4 lg:pl-6"
              key={index}
            >
              <EventItem
                title={item.title}
                date={item.date}
                img={item.img}
                img2={item.img2}
                category={item.category}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

function EventItem({
  title,
  date,
  category,
  img,
  img2,
}: {
  title: string;
  date: string;
  category: string;
  img: StaticImageData;
  img2: StaticImageData;
}) {
  return (
    <div className="flex flex-col items-start gap-5 lg:gap-8 bg-white p-8 lg:p-10 pb-6 lg:pb-8 rounded-3xl relative h-120 lg:h-148 shadow-md">
      <p className="text-xs self-end font-medium text-neutral-600 px-3 py-1 rounded-full border-neutral-200 border-[1.5px] absolute top-3 right-3 lg:top-4 lg:right-4">
        {date}
      </p>
      <div className="mt-4 space-y-1">
        <h2 className="text-xl lg:text-2xl font-extrabold leading-[1.2] trakcing-tight text-neutral-800 uppercase">
          {title}
        </h2>
        <p className="text-sm lg:text-base font-medium text-neutral-500">
          {category}
        </p>
      </div>
      <div className="relative">
        <Image
          src={img}
          alt="eventimg"
          className="w-[93%] lg:w-full h-62 rounded-2xl object-cover shadow-md"
        />
        <div className="absolute top-1/4 -right-8 z-20">
          <Image
            src={badge}
            alt="badge"
            className="size-28 fill-blue-400 filter-[invert(1)_hue-rotate(360deg)_saturate(2)] shadow-lg drop-shadow-lg drop-shadow-gray-400"
          />
          <h2 className="text-base leading-none top-10 w-20 right-4 text-center font-extrabold text-white absolute">
            NEW EVENT
          </h2>
        </div>
        <Image
          src={img2}
          alt="img2"
          className="w-27 lg:w-32 lg:h-30 h-25 rounded-md absolute -bottom-8 -left-2 lg:-left-4 lg:-bottom-12 -rotate-10 shadow-md shadow-neutral-200"
        />
      </div>
      <Link
        href={"#"}
        className="flex items-center gap-2 self-end text-sm font-medium px-4 py-2 rounded-full bg-gray-200 mt-auto hover:bg-gray-300 active:bg-gray-300 transition-colors"
      >
        BOOK NOW <MoveRight />
      </Link>
    </div>
  );
}
