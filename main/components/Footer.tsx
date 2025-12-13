import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-8 bg-black px-5 lg:px-20 py-2 lg:py-12">
      <div className="flex flex-col lg:flex-row w-full lg:justify-between gap-8 bg-black">
        <div className="space-y-1 lg:space-y-3">
          <p className="text-sm lg:text-xl font-medium lg:font-semibold text-neutral-100">
            Contact Us
          </p>
          <h2 className="text-xl lg:text-4xl font-semibold text-white">
            ertysevents@info.com
          </h2>
          <p className="text-sm font-medium lg:text-xl lg:font-semibold text-neutral-100">
            +7 705 676 4416
          </p>
        </div>
        <div className="grid grid-cols-2 lg:gap-24">
          <div className="space-y-3 lg:space-y-6">
            <h3 className="uppercase text-lg lg:text-2xl font-semibold text-white">
              Quick Links
            </h3>
            <div className="flex flex-col gap-1 lg:gap-2">
              <Link
                href={"#"}
                className="text-sm lg:text-lg lg:font-medium font-meduim text-neutral-200 hover:text-white active:text-white transition-colors"
              >
                ABOUT
              </Link>
              <Link
                href={"#"}
                className="text-sm lg:text-lg lg:font-medium font-meduim text-neutral-200 hover:text-white active:text-white transition-colors"
              >
                CITIES
              </Link>
              <Link
                href={"#"}
                className="text-sm lg:text-lg lg:font-medium font-meduim text-neutral-200 hover:text-white active:text-white transition-colors"
              >
                CREATORS
              </Link>
              <Link
                href={"#"}
                className="text-sm lg:text-lg lg:font-medium font-meduim text-neutral-200 hover:text-white active:text-white transition-colors"
              >
                SPONSORS
              </Link>
            </div>
          </div>
          <div className="space-y-3 lg:space-y-6">
            <h3 className="uppercase text-lg lg:text-2xl font-semibold text-white">
              Event Types
            </h3>
            <div className="flex flex-col gap-1 lg:gap-2">
              <Link
                href={"#"}
                className="text-sm lg:text-lg font-meduim text-neutral-200 hover:text-white active:text-white transition-colors"
              >
                SPORTS EVENTS
              </Link>
              <Link
                href={"#"}
                className="text-sm lg:text-lg font-meduim text-neutral-200 hover:text-white active:text-white transition-colors"
              >
                ART EVENTS
              </Link>
              <Link
                href={"#"}
                className="text-sm lg:text-lg font-meduim text-neutral-200 hover:text-white active:text-white transition-colors"
              >
                MUSIC EVENTS
              </Link>
              <Link
                href={"#"}
                className="text-sm lg:text-lg font-meduim text-neutral-200 hover:text-white active:text-white transition-colors"
              >
                CITY EVENTS
              </Link>
            </div>
          </div>
        </div>
      </div>
      <h2 className="font-bold text-4xl lg:text-[9rem] lg:text-center scale-x-105 text-start pl-7 lg:pl-0 lg:pt-4 text-blue-500 text-pretty mt-2 lg:mt-18">
        ERTIS<span className="text-white">EVENTS</span>
      </h2>
    </footer>
  );
}
