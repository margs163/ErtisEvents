import { categories } from "@/lib/constants";
import Image from "next/image";

export default function Categories() {
  return (
    <section className="space-y-8 lg:space-y-24 bg-linear-to-b from-blue-500 from-0% to-50% to-blue-50 px-4 py-20 lg:px-32 lg:py-36">
      <h2 className="text-3xl lg:text-7xl text-center font-extrabold text-neutral-900">
        EVENT CATEGORIES
      </h2>
      <div className="space-y-6 lg:space-y-12">
        {categories.map((item, index) =>
          index === 0 ? (
            <div
              className="flex flex-col gap-5 lg:flex-row lg:gap-90 bg-neutral-900 w-full py-5 px-6.5 lg:px-0 lg:py-0 rounded-3xl shadow-sm"
              key={index}
            >
              <div className="flex justify-between items-center lg:gap-48">
                <h2 className="text-3xl lg:text-5xl scale-x-110 lg:px-16 lg:py-14 font-extrabold text-white max-w-20 lg:max-w-50 lg:uppercase">
                  {item.title}
                </h2>
                <Image
                  src={item.img}
                  className="w-40 lg:w-92 h-28 lg:h-58 object-cover rounded-2xl shadow-md shadow-gray-800 -rotate-8"
                  alt="img"
                />
              </div>
              <p className="text-sm lg:px-16 lg:py-14 lg:text-xl lg:font-semibold font-medium text-neutral-50 text-pretty">
                {item.description}
              </p>
            </div>
          ) : (
            <div
              className="flex flex-col gap-5 lg:flex-row lg:gap-90 bg-white w-full py-5 px-6.5 lg:px-0 lg:py-0 rounded-3xl shadow-sm"
              key={index}
            >
              <div className="flex justify-between items-center lg:gap-48">
                <h2 className="text-3xl lg:text-5xl scale-x-110 lg:px-16 lg:py-14 font-extrabold text-neutral-800 max-w-20 lg:max-w-50 lg:uppercase">
                  {item.title}
                </h2>
                <Image
                  src={item.img}
                  className="w-40 lg:w-90 h-28 lg:h-58 object-cover rounded-2xl shadow-md shadow-gray-400 -rotate-8"
                  alt="img"
                />
              </div>
              <p className="text-sm lg:px-16 lg:py-14 lg:text-xl lg:font-semibold font-medium text-neutral-600 text-pretty">
                {item.description}
              </p>
            </div>
          )
        )}
      </div>
    </section>
  );
}
