import event1 from "@/assets/images/event1.jpeg";
import event2 from "@/assets/images/event2.jpeg";
import event3 from "@/assets/images/event3.jpeg";
import event4 from "@/assets/images/event4.jpeg";
import event5 from "@/assets/images/event5.jpeg";
import event6 from "@/assets/images/event6.jpeg";
import event7 from "@/assets/images/event7.jpeg";
import {
  Baby,
  Building2,
  Clapperboard,
  Cpu,
  Drama,
  Dumbbell,
  GraduationCap,
  Landmark,
  Map,
  Mic,
  Music,
  PartyPopper,
  Sparkles,
} from "lucide-react";

export const events = [
  {
    title: "Ночная Труппа: Театр Теней и Света",
    date: "15 November 2025",
    category: "Городское Мероприятие",
    img: event4,
    img2: event3,
  },
  {
    title: "Павлодарский Фестиваль Народного Танца",
    date: "12 September 2025",
    category: "Городское Мероприятие",
    img: event1,
    img2: event3,
  },
  {
    title: "Летний Музыкальный Концерт",
    date: "20 September 2025",
    category: "Городское Мероприятие",
    img: event2,
    img2: event5,
  },
  {
    title: "День города Павлодара",
    date: "19 July 2025",
    category: "Городское Мероприятие",
    img: event1,
    img2: event4,
  },
  {
    title: "Главное дерби зимы: Иртыш vs Тобол",
    date: "19 December 2025",
    category: "Городское Мероприятие",
    img: event6,
    img2: event7,
  },
];

export const recommendations = [
  {
    title: "Ночная Труппа: Театр Теней и Света",
    date: new Date(2025, 10, 15), // 15 November 2025
    category: "Городское Мероприятие",
    tags: ["Theaters", "Entertainment"],
    rating: 4.8,
    availableSeats: 42,
    shortDescription: "Завораживающее световое шоу",
    description:
      "Погружение в атмосферу мистики и визуальной магии, где тени оживают в синхроне со световыми эффектами и современной музыкой. Зрителей ждут уникальные художественные постановки, использующие инновационные технологии, чтобы создать незабываемое сценическое путешествие. Отличный выбор для тех, кто хочет провести вечер в творческой и атмосферной среде.",
    img: event4,
    img2: event3,
  },
  {
    title: "Павлодарский Фестиваль Народного Танца",
    date: new Date(2025, 8, 12), // 12 September 2025
    category: "Городское Мероприятие",
    tags: ["Entertainment", "Tours"],
    rating: 4.6,
    availableSeats: 120,
    shortDescription: "Фестиваль народных танцев",
    description:
      "Красочный фестиваль, объединяющий танцевальные коллективы региона, представляющие богатые традиции и культуру народного искусства. Зрители смогут насладиться яркими выступлениями, национальными костюмами и живой энергией сцены. Мероприятие подойдёт для всей семьи и поможет прочувствовать культурное разнообразие Павлодарской области.",
    img: event1,
    img2: event3,
  },
  {
    title: "Летний Музыкальный Концерт",
    date: new Date(2025, 8, 20), // 20 September 2025
    category: "Городское Мероприятие",
    tags: ["Concerts", "Entertainment"],
    rating: 4.9,
    availableSeats: 65,
    shortDescription: "Открытый летний концерт",
    description:
      "Музыкальный вечер под открытым небом, где выступят местные и приглашённые исполнители разных жанров. Концерт наполнен летней атмосферой, ярким звучанием и живыми эмоциями. Гости смогут насладиться качественной музыкой, расслабленной обстановкой и общением в приятной компании. Отличное событие для завершения тёплого сезона.",
    img: event2,
    img2: event5,
  },
  {
    title: "День города Павлодара",
    date: new Date(2025, 6, 19), // 19 July 2025
    category: "Городское Мероприятие",
    tags: ["Entertainment", "Tours"],
    rating: 4.7,
    availableSeats: 200,
    shortDescription: "Главный праздник города",
    description:
      "Масштабное ежегодное празднование, включающее концерты, ярмарки, выступления артистов, выставки и развлечения для всей семьи. День города предлагает жителям и гостям множество активностей, создающих атмосферу единства и праздника. Это отличный повод провести время на свежем воздухе и почувствовать настоящий городской дух Павлодара.",
    img: event1,
    img2: event4,
  },
  {
    title: "Главное дерби зимы: Иртыш vs Тобол",
    date: new Date(2025, 11, 19), // 19 December 2025
    category: "Городское Мероприятие",
    tags: ["Sports"],
    rating: 4.9,
    availableSeats: 17,
    shortDescription: "Главный праздник города",
    description:
      "Масштабное ежегодное празднование, включающее концерты, ярмарки, выступления артистов, выставки и развлечения для всей семьи. День города предлагает жителям и гостям множество активностей, создающих атмосферу единства и праздника. Это отличный повод провести время на свежем воздухе и почувствовать настоящий городской дух Павлодара.",
    img: event7,
    img2: event6,
  },
];

export const interestTags = [
  "Cinema",
  "Theaters",
  "Concerts",
  "Business Forums",
  "Stand Up",
  "New Year's",
  "Children's",
  "Tours",
  "Master Classes",
  "Museums",
  "Entertainment",
  "Sports",
  "IT",
];

export const interestTagIcons = {
  Cinema: Clapperboard,
  Theaters: Drama,
  Concerts: Music,
  "Business Forums": Building2,
  "Stand Up": Mic,
  "New Year's": Sparkles,
  "Children's": Baby,
  Tours: Map,
  "Master Classes": GraduationCap,
  Museums: Landmark,
  Entertainment: PartyPopper,
  Sports: Dumbbell,
  IT: Cpu,
};

export const categories = [
  {
    title: "Спорт События",
    img: event6,
    description:
      "Живые спортивные соревнования и матчи — шум трибун, острые соперничества и захватывающие концовки.",
  },
  {
    title: "Музык События",
    img: event2,
    description:
      "Концерты, фестивали и живые выступления — ощутите ритм, атмосферу и энергию музыки.",
  },
  {
    title: "Арт-События",
    img: event3,
    description:
      "Выставки, галереи и творческие проекты, посвящённые живописи, скульптуре, фотографии и другим видам искусства.",
  },
  {
    title: "Городские События",
    img: event1,
    description:
      "Городские собрания, фестивали и общие события, объединяющие людей и создающие атмосферу городской общности.",
  },
];
