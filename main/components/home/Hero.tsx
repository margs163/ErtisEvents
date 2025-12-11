import Image from "next/image";
import concert from "@/assets/images/concert.png";
import badge from "@/assets/images/badge.svg";
import Link from "next/link";
import useDialogsStore from "@/lib/dialogsStore";

export default function Hero() {
  const setSignUpForm = useDialogsStore((state) => state.setSignUpForm);
  const setSignInForm = useDialogsStore((state) => state.setSignInForm);

  return (
    <section className="space-y-4">
      <div className="space-y-0 px-4 lg:px-40 relative z-20">
        <div className="flex gap-8 lg:gap-20 items-start lg:items-center mb-0">
          <h1 className=" text-[3.5rem] lg:text-[9rem] leading-none font-extrabold text-white scale-x-109 lg:scale-x-110">
            THE
          </h1>
          <h3 className="text-[0.80rem] lg:text-3xl lg:max-w-160 leading-[1.41] font-medium text-neutral-300">
            Ertis Events is for crazy people who create something from nothing
          </h3>
        </div>
        <h1 className="text-[3.5rem] lg:text-[9rem] lg:text-9xl leading-[0.9] lg:leading-[1] font-extrabold text-blue-500 scale-x-109 lg:scale-x-112 pl-2 lg:pl-8">
          CREATOR
        </h1>
        <h1 className="text-[3.5rem] lg:text-[9rem] lg:text-9xl leading-[0.9] font-extrabold text-white scale-x-105 lg:scale-x-110 lg:pl-6">
          GATHERING
        </h1>
      </div>
      <div className="bg-blue-500 h-40 lg:h-100 relative -bottom-14 w-full">
        <Image
          src={concert}
          alt="img"
          className="max-w-88 lg:w-320 lg:max-w-320 h-48 lg:h-150 object-cover rounded-3xl lg:rounded-[3rem] relative -top-24 lg:-top-40 mx-auto z-0 shadow-xl"
        />
        <div className="absolute -top-26 lg:-top-24 right-4 lg:right-10 z-20">
          <Image
            src={badge}
            alt="badge"
            className="size-26 lg:size-80 fill-blue-400 filter-[invert(1)_hue-rotate(360deg)_saturate(2)] shadow-lg lg:shadow-none drop-shadow-lg drop-shadow-gray-400"
          />
          <h2 className="text-[10px] lg:text-[1.8rem] lg:max-w-50 leading-none top-10 lg:top-32 lg:right-14 right-0 text-center font-extrabold text-white absolute">
            BECOME AN ORGANIZER
          </h2>
        </div>
        <div className="flex justify-end gap-2 relative -top-20 lg:-top-24 px-6 lg:px-40">
          <Link
            href={"#"}
            onClick={() => setSignUpForm(true)}
            className="px-6 py-2.5 lg:px-12 lg:py-5 lg:rounded-3xl bg-black hover:bg-neutral-800 transition-colors active:bg-neutral-800 text-white rounded-2xl text-sm lg:text-xl font-semibold lg:font-bold"
          >
            Start Now
          </Link>
          <Link
            href={"#"}
            className="px-6 py-2.5 lg:px-12 lg:py-5 lg:rounded-3xl bg-white text-neutral-800 hover:bg-neutral-100 active:bg-neutral-100 transition-colors text-sm lg:text-xl font-semibold lg:font-bold rounded-2xl"
            onClick={() => setSignUpForm(true)}
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}
