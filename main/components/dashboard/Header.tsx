import { useEventsStore } from "@/lib/eventStore";
import { useUserStore } from "@/lib/userStore";
import { Edit, Star } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const role = useUserStore((state) => state.role);
  const recommendedEvents = useEventsStore((state) => state.recommendedEvents);

  return (
    <header className="space-y-8 lg:space-y-16 px-5 lg:px-40">
      <div className="space-y-1 lg:space-y-4">
        <h1 className="text-2xl lg:text-5xl font-bold text-neutral-800 max-w-3/4 text-pretty">
          {recommendedEvents.length ?? 4} Мероприятий Были Подоброны Для Вас
        </h1>
        <p className="text-sm lg:text-xl font-medium text-neutral-600">
          Получайте рекомендации по мероприятиям, основанные на ваших
          предпочтениях.
        </p>
      </div>
      <div className="flex items-center flex-wrap gap-4">
        <Link
          href={"/search"}
          className="px-4 py-2 lg:px-8 lg:py-2.5 lg:rounded-lg rounded-md bg-transparent border-[1.5px] border-neutral-300 text-neutral-500 font-medium text-sm lg:text-lg hover:border-neutral-400 hover:text-neutral-700 active:border-neutral-400 active:text-neutral-700 transition-colors"
        >
          Искать
        </Link>
        <button className="flex items-center gap-2 bg-blue-500 cursor-pointer hover:bg-blue-600/90 active:bg-blue-600/90 transition-colors rounded-md px-4 py-2.5 text-white font-medium text-sm lg:px-8 lg:py-3 lg:rounded-lg lg:text-lg">
          <Star className="size-5 lg:size-7 text-white" strokeWidth={1.8} />
          Cохранить Подборки
        </button>
        {role === "organizer" && (
          <Link
            href={"/create"}
            className="flex items-center gap-2 bg-blue-500 cursor-pointer hover:bg-blue-600/90 active:bg-blue-600/90 transition-colors rounded-md px-4 py-2.5 text-white font-medium text-sm lg:px-8 lg:py-3 lg:rounded-lg lg:text-lg"
          >
            <Edit className="size-5 text-white" strokeWidth={1.8} />
            Создать Мероприятие
          </Link>
        )}
      </div>
    </header>
  );
}
