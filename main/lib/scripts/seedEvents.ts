import prisma from "@/lib/prisma";
import { v4 as uuidv4 } from "uuid";

export const sampleEvents = [
  {
    id: uuidv4(),
    title: "Павлодарский Кинофестиваль 2025",
    date: new Date(2025, 7, 12),
    category: "Кино",
    tags: ["Cinema", "Entertainment"],
    rating: 4.6,
    availableSeats: 150,
    shortDescription: "Премьеры и авторское кино",
    description:
      "Показ лучших фильмов года, встречи с актерами и обсуждения со зрителями.",
    img: "posters/event1.jpeg",
  },
  {
    id: uuidv4(),
    title: "IT-Хакатон Ertis Hack",
    date: new Date(2025, 9, 3),
    category: "IT",
    tags: ["IT", "Business Forums"],
    rating: 4.8,
    availableSeats: 120,
    shortDescription: "48 часов создания цифровых решений",
    description:
      "Команды студентов и специалистов создают IT-проекты для реальных задач бизнеса.",
    img: "posters/event2.jpeg",
  },
  {
    id: uuidv4(),
    title: "Стэндап Вечер в Pavlodar Hub",
    date: new Date(2025, 5, 22),
    category: "Comedy",
    tags: ["Stand Up", "Entertainment"],
    rating: 4.5,
    availableSeats: 100,
    shortDescription: "Остроумные шутки и живая атмосфера",
    description:
      "Выступление молодых комиков и приглашённых звезд стендап-сцены.",
    img: "posters/event3.jpeg",
  },
  {
    id: uuidv4(),
    title: "Новогодний Бал 2025",
    date: new Date(2025, 11, 30),
    category: "Holiday Event",
    tags: ["New Year's", "Entertainment"],
    rating: 4.9,
    availableSeats: 250,
    shortDescription: "Элегантное завершение года",
    description:
      "Фуршет, живой оркестр, выступления артистов и праздничная атмосфера.",
    img: "posters/event4.jpeg",
  },
  {
    id: uuidv4(),
    title: "Детский Фестиваль «Мир Игры»",
    date: new Date(2025, 8, 14),
    category: "Детское мероприятие",
    tags: ["Children's", "Entertainment"],
    rating: 4.7,
    availableSeats: 300,
    shortDescription: "Игры, квесты и шоу для детей",
    description:
      "Анимационная программа, игры, мастер-классы и интерактивные зоны.",
    img: "posters/event5.jpeg",
  },
  {
    id: uuidv4(),
    title: "Летние Экскурсии по Променаду Ertis",
    date: new Date(2025, 6, 10),
    category: "Экскурсия",
    tags: ["Tours"],
    rating: 4.6,
    availableSeats: 40,
    shortDescription: "Обзорная прогулка по набережной",
    description:
      "Гид расскажет историю Павлодара, архитектуру и интересные факты о Променаде.",
    img: "posters/event6.jpeg",
  },
  {
    id: uuidv4(),
    title: "Мастер-класс по Гончарному Делю",
    date: new Date(2025, 7, 18),
    category: "Творчество",
    tags: ["Master Classes"],
    rating: 4.8,
    availableSeats: 20,
    shortDescription: "Создание керамики своими руками",
    description:
      "Практическое занятие с профессиональным мастером гончарного искусства.",
    img: "posters/event7.jpeg",
  },
  {
    id: uuidv4(),
    title: "Выставка в Краеведческом Музее",
    date: new Date(2025, 5, 2),
    category: "Музеи",
    tags: ["Museums"],
    rating: 4.4,
    availableSeats: 80,
    shortDescription: "Экспозиция об истории региона",
    description:
      "Уникальные экспонаты, архивные материалы и современные цифровые инсталляции.",
    img: "posters/event8.jpeg",
  },
  {
    id: uuidv4(),
    title: "Ночной Забег Ertis Night Run",
    date: new Date(2025, 5, 28),
    category: "Спорт",
    tags: ["Sports"],
    rating: 4.8,
    availableSeats: 500,
    shortDescription: "Беговое событие с неоновой атмосферой",
    description:
      "Трасса вдоль набережной, музыка, зона разминки и участие профессиональных спортсменов.",
    img: "posters/event9.jpeg",
  },
  {
    id: uuidv4(),
    title: "Театральная Постановка «Сны Иртыша»",
    date: new Date(2025, 8, 11),
    category: "Театр",
    tags: ["Theaters"],
    rating: 4.6,
    availableSeats: 130,
    shortDescription: "Современная постановка с этно-элементами",
    description:
      "История о городе, реке и людях, рассказанная через музыку, движение и актерскую игру.",
    img: "posters/event10.jpeg",
  },
  {
    id: uuidv4(),
    title: "Концерт Симфонического Оркестра",
    date: new Date(2025, 10, 17),
    category: "Концерт",
    tags: ["Concerts"],
    rating: 4.9,
    availableSeats: 400,
    shortDescription: "Классическая музыка мирового уровня",
    description:
      "Исполнение известных произведений и премьера новой авторской сюиты.",
    img: "posters/event11.jpeg",
  },
  {
    id: uuidv4(),
    title: "Бизнес-Форум «Ertis Invest»",
    date: new Date(2025, 9, 21),
    category: "Форум",
    tags: ["Business Forums"],
    rating: 4.7,
    availableSeats: 600,
    shortDescription: "Инвестиции, стартапы и развитие региона",
    description:
      "Выступления предпринимателей, встречи с инвесторами и презентации проектов.",
    img: "posters/event12.jpeg",
  },
  {
    id: uuidv4(),
    title: "Курс «IT-Основы для Начинающих»",
    date: new Date(2025, 8, 4),
    category: "Обучение",
    tags: ["IT"],
    rating: 4.9,
    availableSeats: 25,
    shortDescription: "Базовые знания программирования и технологий",
    description: "Обучение для тех, кто хочет начать путь в IT-сфере.",
    img: "posters/event13.jpeg",
  },
  {
    id: uuidv4(),
    title: "Новогодний Детский Мюзикл",
    date: new Date(2025, 11, 25),
    category: "Праздничное шоу",
    tags: ["Children's", "New Year's"],
    rating: 4.8,
    availableSeats: 300,
    shortDescription: "Музыкальное представление для всей семьи",
    description: "Сказочные герои, песни, танцы и праздничная атмосфера.",
    img: "posters/event14.jpeg",
  },
  {
    id: uuidv4(),
    title: "Комедийный Спектакль «Соседи»",
    date: new Date(2025, 7, 9),
    category: "Театр",
    tags: ["Theaters", "Entertainment"],
    rating: 4.5,
    availableSeats: 110,
    shortDescription: "Легкая бытовая комедия",
    description:
      "Веселая история о дружбе, случайностях и приключениях соседей.",
    img: "posters/event15.jpeg",
  },
  {
    id: uuidv4(),
    title: "Кино Показ Под Открытым Небом",
    date: new Date(2025, 6, 16),
    category: "Кино",
    tags: ["Cinema", "Entertainment"],
    rating: 4.6,
    availableSeats: 200,
    shortDescription: "Фильм на большом экране под звездами",
    description: "Комфортные пуфы, летняя ночь и любимая классика кино.",
    img: "posters/event16.jpeg",
  },
  {
    id: uuidv4(),
    title: "Спортивный Фестиваль Ertis Open",
    date: new Date(2025, 7, 2),
    category: "Спорт",
    tags: ["Sports", "Entertainment"],
    rating: 4.7,
    availableSeats: 450,
    shortDescription: "Турниры, показательные выступления и активности",
    description:
      "Массовый спортивный праздник с участием профессионалов и любителей.",
    img: "posters/event17.jpeg",
  },
  {
    id: uuidv4(),
    title: "Мастер-класс по Робототехнике",
    date: new Date(2025, 9, 15),
    category: "Образование",
    tags: ["Master Classes", "IT"],
    rating: 4.9,
    availableSeats: 30,
    shortDescription: "Построй своего первого робота",
    description:
      "Интерактивный урок для детей и взрослых по сборке и программированию роботов.",
    img: "posters/event18.jpeg",
  },
  {
    id: uuidv4(),
    title: "Ночная Труппа: Театр Теней и Света",
    date: new Date(2025, 10, 15), // 15 November 2025
    category: "Городское Мероприятие",
    tags: ["Theaters", "Entertainment"],
    rating: 4.8,
    availableSeats: 42,
    shortDescription: "Завораживающее световое шоу",
    description:
      "Погружение в атмосферу мистики и визуальной магии, где тени оживают в синхроне со световыми эффектами и современной музыкой. Зрителей ждут уникальные художественные постановки, использующие инновационные технологии, чтобы создать незабываемое сценическое путешествие. Отличный выбор для тех, кто хочет провести вечер в творческой и атмосферной среде.",
    img: "posters/event19.jpeg",
  },
  {
    id: uuidv4(),
    title: "Павлодарский Фестиваль Народного Танца",
    date: new Date(2025, 8, 12), // 12 September 2025
    category: "Городское Мероприятие",
    tags: ["Entertainment", "Tours"],
    rating: 4.6,
    availableSeats: 120,
    shortDescription: "Фестиваль народных танцев",
    description:
      "Красочный фестиваль, объединяющий танцевальные коллективы региона, представляющие богатые традиции и культуру народного искусства. Зрители смогут насладиться яркими выступлениями, национальными костюмами и живой энергией сцены. Мероприятие подойдёт для всей семьи и поможет прочувствовать культурное разнообразие Павлодарской области.",
    img: "posters/event20.jpeg",
  },
  {
    id: uuidv4(),
    title: "Летний Музыкальный Концерт",
    date: new Date(2025, 8, 20), // 20 September 2025
    category: "Городское Мероприятие",
    tags: ["Concerts", "Entertainment"],
    rating: 4.9,
    availableSeats: 65,
    shortDescription: "Открытый летний концерт",
    description:
      "Музыкальный вечер под открытым небом, где выступят местные и приглашённые исполнители разных жанров. Концерт наполнен летней атмосферой, ярким звучанием и живыми эмоциями. Гости смогут насладиться качественной музыкой, расслабленной обстановкой и общением в приятной компании. Отличное событие для завершения тёплого сезона.",
    img: "posters/event21.jpeg",
  },
  {
    id: uuidv4(),
    title: "День города Павлодара",
    date: new Date(2025, 6, 19), // 19 July 2025
    category: "Городское Мероприятие",
    tags: ["Entertainment", "Tours"],
    rating: 4.7,
    availableSeats: 200,
    shortDescription: "Главный праздник города",
    description:
      "Масштабное ежегодное празднование, включающее концерты, ярмарки, выступления артистов, выставки и развлечения для всей семьи. День города предлагает жителям и гостям множество активностей, создающих атмосферу единства и праздника. Это отличный повод провести время на свежем воздухе и почувствовать настоящий городской дух Павлодара.",
    img: "posters/event22.jpeg",
  },
  {
    id: uuidv4(),
    title: "Главное дерби зимы: Иртыш vs Тобол",
    date: new Date(2025, 11, 19), // 19 December 2025
    category: "Городское Мероприятие",
    tags: ["Sports"],
    rating: 4.9,
    availableSeats: 17,
    shortDescription: "Главный праздник города",
    description:
      "Масштабное ежегодное празднование, включающее концерты, ярмарки, выступления артистов, выставки и развлечения для всей семьи. День города предлагает жителям и гостям множество активностей, создающих атмосферу единства и праздника. Это отличный повод провести время на свежем воздухе и почувствовать настоящий городской дух Павлодара.",
    img: "posters/event23.jpeg",
  },
];

async function seedEvents() {
  try {
    console.log(`Creating ${sampleEvents.length} events...`);

    const createMany = await prisma.event.createMany({
      data: sampleEvents,
      skipDuplicates: true,
    });

    console.log(`\n✓ Successfully created ${createMany.count}`);
  } catch (error) {
    console.error("Error seeding events:", error);
    throw error;
  }
}

seedEvents()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
