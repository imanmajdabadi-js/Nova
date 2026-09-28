export type ExperienceSession = {
  readonly id: string;
  readonly date: string;
  readonly time: string;
  readonly remainingCapacity: number;
};

export type ExperienceStatus = "draft" | "published" | "paused";

export type Experience = {
  readonly id: string;
  readonly title: string;
  readonly slug: string;
  readonly category: string;
  readonly location: string;
  readonly price: number;
  readonly rating: number;
  readonly reviews: number;
  readonly image: string;
  readonly images?: readonly string[];
  readonly date?: string;
  readonly availability?: string;
  readonly description?: string;
  readonly highlights?: readonly string[];
  readonly host?: {
    readonly name: string;
    readonly avatar?: string;
    readonly bio?: string;
  };
  readonly hostId: string;
  readonly status: ExperienceStatus;
  readonly createdAt: string;
  readonly updatedAt: string;
  readonly reviewSummary?: {
    readonly text: string;
    readonly author: string;
  };
  readonly ratingDistribution?: readonly {
    readonly stars: number;
    readonly count: number;
  }[];
  readonly sessions: readonly ExperienceSession[];
};

export type SortOption =
  | "featured"
  | "popular"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "rating-desc";

export type FilterState = {
  readonly search: string;
  readonly category: string;
  readonly location: string;
  readonly sort: SortOption;
};

export const categories = [
  "همه",
  "آشپزی",
  "تورهای شهری",
  "کارگاه‌ها",
  "فرهنگی",
  "طبیعت",
  "ورزشی",
  "هنری",
  "موسیقی",
] as const;

export const experiences: readonly Experience[] = [
  {
    id: "1",
    title: "كلاس آشپزی ایرانی",
    slug: "persian-cooking-class",
    category: "آشپزی",
    location: "تهران، باغ نیاوران",
    price: 2500000,
    rating: 4.9,
    reviews: 128,
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=80",
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&q=80",
    ],
    date: "هر جمعه",
    availability: "ظرفیت ۸ نفر",
    description:
      "یک تجربه‌ی آشپزی اصیل در باغ نیاوران. شما یاد می‌گیرید غذاهای سنتی ایرانی را با مواد تازه و فصلی درست کنید. این کلاس برای علاقه‌مندان به آشپزی و کسانی که می‌خواهند فرهنگ آشپزی ایران را از نزدیک تجربه کنند، طراحی شده است.",
    highlights: [
      "آشپزی با یک سرآشپز بومی",
      "استفاده از مواد تازه و فصلی",
      "گرفتن دستور العمل‌ برای استفاده در منزل",
      "غذایی دلپذیر با همسفران و میزبان",
    ],
    host: {
      name: "مریم احمدی",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
      bio: "سرآشپز با ۱۵ سال تجربه در آشپزی سنتی و مدرن ایرانی",
    },
    hostId: "h1",
    status: "published",
    createdAt: "۱۴۰۴/۰۱/۱۵",
    updatedAt: "۱۴۰۵/۰۷/۱۵",
    reviewSummary: {
      text: "بیشترین تجربه‌ی خوبی که داشته‌ام. مریم فوق‌العاده است.",
      author: "علی ر.",
    },
    ratingDistribution: [
      { stars: 5, count: 118 },
      { stars: 4, count: 8 },
      { stars: 3, count: 1 },
      { stars: 2, count: 1 },
      { stars: 1, count: 0 },
    ],
    sessions: [
      { id: "s1-1", date: "۱۴۰۵/۰۷/۰۵", time: "۱۰:۰۰", remainingCapacity: 8 },
      { id: "s1-2", date: "۱۴۰۵/۰۷/۰۵", time: "۱۴:۳۰", remainingCapacity: 5 },
      { id: "s1-3", date: "۱۴۰۵/۰۷/۱۰", time: "۱۰:۰۰", remainingCapacity: 3 },
      { id: "s1-4", date: "۱۴۰۵/۰۷/۱۰", time: "۱۷:۰۰", remainingCapacity: 8 },
    ],
  },
  {
    id: "2",
    title: "تور مخفی شهر اصفهان",
    slug: "isfahan-hidden-city-tour",
    category: "تورهای شهری",
    location: "اصفهان، میدان نقش جهان",
    price: 850000,
    rating: 4.7,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1542649758-0b8c0d28ca6c?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1542649758-0b8c0d28ca6c?w=1200&q=80",
      "https://images.unsplash.com/photo-1599577180576-2d0c1a1e0a0a?w=1200&q=80",
      "https://images.unsplash.com/photo-1589308575326-882f37e95f3c?w=1200&q=80",
    ],
    date: "هر روز",
    availability: "ظرفیت ۱۵ نفر",
    description:
      "یک تور راهنمایی‌شده از نقاط پنهان اصفهان. از کوچه‌های قدیمی تا کارگاه‌های سنتی، این تور شما را با چهره‌ی واقعی اصفهان آشنا می‌کند.",
    highlights: [
      "راهنمایی توسط راهنمای بومی",
      "دیدن نقاط پنهان",
      "عکاسی در مکان‌های منحصربه‌فرد",
      "خرید از سوغات محلی",
    ],
    host: {
      name: "رضا کریمی",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
      bio: "راهنما و مورخ با ۱۰ سال تجربه در تورهای شهری اصفهان",
    },
    hostId: "h2",
    status: "published",
    createdAt: "۱۴۰۴/۰۲/۲۰",
    updatedAt: "۱۴۰۵/۰۷/۰۶",
    reviewSummary: {
      text: "تور فوق‌العاده بود. نقاطی را دیدم که اگر خودم بروم هرگز پیدا نمی‌کردم.",
      author: "مریم ک.",
    },
    ratingDistribution: [
      { stars: 5, count: 72 },
      { stars: 4, count: 10 },
      { stars: 3, count: 5 },
      { stars: 2, count: 1 },
      { stars: 1, count: 1 },
    ],
    sessions: [
      { id: "s2-1", date: "۱۴۰۵/۰۷/۰۶", time: "۰۹:۰۰", remainingCapacity: 12 },
      { id: "s2-2", date: "۱۴۰۵/۰۷/۰۶", time: "۱۵:۰۰", remainingCapacity: 15 },
      { id: "s2-3", date: "۱۴۰۵/۰۷/۰۸", time: "۱۰:۳۰", remainingCapacity: 7 },
      { id: "s2-4", date: "۱۴۰۵/۰۷/۰۸", time: "۱۶:۰۰", remainingCapacity: 2 },
    ],
  },
  {
    id: "3",
    title: "workshop گلیم بافی",
    slug: "kilim-weaving-workshop",
    category: "کارگاه‌ها",
    location: "کرمان، بازار",
    price: 1200000,
    rating: 4.8,
    reviews: 56,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80",
      "https://images.unsplash.com/photo-1594040226829-7f251ab46d80?w=1200&q=80",
    ],
    date: "شنبه‌ها",
    availability: "ظرفیت ۱۰ نفر",
    description:
      "یادگیری ساخت گلیم دستباف با هنرمندان کرمان. شما در این کارگاه اصول بافت گلیم را یاد می‌گیرید و می‌توانید خودتان یک گلیم کوچک بسازید.",
    highlights: [
      "آموزش اصول بافت",
      "استفاده از نخ‌های طبیعی",
      "گرفتن اثر خودتان",
      "معرفی تاریخچه گلیم",
    ],
    host: {
      name: "فاطمه کرمانی",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
      bio: "هنرمند گلیم‌باف با ۲۰ سال تجربه",
    },
    hostId: "h3",
    status: "paused",
    createdAt: "۱۴۰۴/۰۳/۱۰",
    updatedAt: "۱۴۰۵/۰۷/۱۵",
    reviewSummary: {
      text: "تجربه‌ای فوق‌العاده و آموزنده. فاطمه معلمی عالی است.",
      author: "سارا م.",
    },
    ratingDistribution: [
      { stars: 5, count: 48 },
      { stars: 4, count: 5 },
      { stars: 3, count: 2 },
      { stars: 2, count: 1 },
      { stars: 1, count: 0 },
    ],
    sessions: [
      { id: "s3-1", date: "۱۴۰۵/۰۷/۰۷", time: "۱۱:۰۰", remainingCapacity: 10 },
      { id: "s3-2", date: "۱۴۰۵/۰۷/۰۷", time: "۱۵:۰۰", remainingCapacity: 8 },
      { id: "s3-3", date: "۱۴۰۵/۰۷/۱۲", time: "۱۰:۰۰", remainingCapacity: 4 },
    ],
  },
  {
    id: "4",
    title: "کنسرت سنتی شیراز",
    slug: "shiraz-traditional-concert",
    category: "موسیقی",
    location: "شیراز، باغ ارم",
    price: 1800000,
    rating: 4.6,
    reviews: 234,
    image:
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=1200&q=80",
      "https://images.unsplash.com/photo-1501612780327-45045538702b?w=1200&q=80",
    ],
    date: "۲۹ آبان",
    availability: "ظرفیت ۲۰۰ نفر",
    description:
      "یک شب از موسیقی سنتی در باغ ارم شیراز. با اجرای گروه‌های محلی و استادان موسیقی ایرانی، این کنسرت تجربه‌ای فراموش‌نشدنی خواهد بود.",
    highlights: [
      "اجرای گروه‌های محلی",
      "فضای باغ ارم",
      "پذیرایی از چای",
      "ورود آزاد",
    ],
    host: {
      name: "سید محمد حسینی",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
      bio: "مدیر فرهنگی و برنامه‌ریز کنسرت‌های سنتی",
    },
    hostId: "h4",
    status: "published",
    createdAt: "۱۴۰۳/۱۱/۱۵",
    updatedAt: "۱۴۰۵/۰۷/۰۸",
    reviewSummary: {
      text: "فضای باغ ارم با موسیقی سنتی... معجزه است.",
      author: "امیر ح.",
    },
    ratingDistribution: [
      { stars: 5, count: 180 },
      { stars: 4, count: 33 },
      { stars: 3, count: 15 },
      { stars: 2, count: 5 },
      { stars: 1, count: 1 },
    ],
    sessions: [
      { id: "s4-1", date: "۱۴۰۵/۰۷/۱۱", time: "۱۸:۰۰", remainingCapacity: 180 },
      { id: "s4-2", date: "۱۴۰۵/۰۷/۱۲", time: "۱۹:۳۰", remainingCapacity: 200 },
      { id: "s4-3", date: "۱۴۰۵/۰۷/۱۳", time: "۱۸:۰۰", remainingCapacity: 150 },
    ],
  },
  {
    id: "5",
    title: "تور کوهنوردی البرز",
    slug: "alborz-hiking-tour",
    category: "طبیعت",
    location: "تهران، چالوس",
    price: 950000,
    rating: 4.8,
    reviews: 167,
    image:
      "https://images.unsplash.com/photo-1551632811-561732d5464e?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1551632811-561732d5464e?w=1200&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80",
    ],
    date: "هر شنبه",
    availability: "ظرفیت ۱۲ نفر",
    description:
      "یک روز کوهنوردی در رشته‌کوه البرز با راهبری Guide مجرب. این تور برای علاقه‌مندان به طبیعت و کوهنوردی مناسب است.",
    highlights: [
      "راهنمایی با راهنمای مجرب",
      "مناظر دیدنی",
      "غذای محلی در مسیر",
      "گرفتن یادآوری از ماجراها",
    ],
    host: {
      name: "حسین رضایی",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
      bio: "کوهنورد و راهنما با ۸ سال تجربه",
    },
    hostId: "h5",
    status: "published",
    createdAt: "۱۴۰۴/۰۳/۰۵",
    updatedAt: "۱۴۰۵/۰۷/۰۷",
    reviewSummary: {
      text: "تور عالی بود. حسین معلمی خوبی بود و مسیر بسیار زیبا بود.",
      author: "نیما ت.",
    },
    ratingDistribution: [
      { stars: 5, count: 135 },
      { stars: 4, count: 18 },
      { stars: 3, count: 9 },
      { stars: 2, count: 3 },
      { stars: 1, count: 2 },
    ],
    sessions: [
      { id: "s5-1", date: "۱۴۰۵/۰۷/۰۶", time: "۰۷:۰۰", remainingCapacity: 8 },
      { id: "s5-2", date: "۱۴۰۵/۰۷/۰۶", time: "۱۰:۰۰", remainingCapacity: 12 },
      { id: "s5-3", date: "۱۴۰۵/۰۷/۱۳", time: "۰۷:۰۰", remainingCapacity: 10 },
    ],
  },
  {
    id: "6",
    title: "کارگاه خاتم‌کاری",
    slug: "khatam-kari-workshop",
    category: "کارگاه‌ها",
    location: "اصفهان، خیابان خیام",
    price: 650000,
    rating: 4.5,
    reviews: 43,
    image:
      "https://images.unsplash.com/photo-1504333638930-c8787321eee0?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1504333638930-c8787321eee0?w=1200&q=80",
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1200&q=80",
    ],
    date: "یکشنبه‌ها",
    availability: "ظرفیت ۶ نفر",
    description:
      "یادگیری خاتم‌کاری، هنر اصیل ایرانی. شما اصول این هنر را یاد می‌گیرید و می‌توانید یک اثر کوچک خاتم‌کاری شده به عنوان سوغات ببرید.",
    highlights: [
      "آموزش اصول خاتم‌کاری",
      "استفاده از چوب و رزین طبیعی",
      "گرفتنی از اثر خودتان",
      "معرفی تاریخچه این هنر",
    ],
    host: {
      name: "علی اصغری",
      avatar:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
      bio: "هنرمند خاتم‌کار با ۲۵ سال تجربه",
    },
    hostId: "h6",
    status: "draft",
    createdAt: "۱۴۰۵/۰۶/۰۱",
    updatedAt: "۱۴۰۵/۰۷/۱۰",
    reviewSummary: {
      text: "کارگاه عالی. علی استاد خوبی است و فضای کارگاه بسیار دوستانه است.",
      author: "رضا پ.",
    },
    ratingDistribution: [
      { stars: 5, count: 25 },
      { stars: 4, count: 12 },
      { stars: 3, count: 3 },
      { stars: 2, count: 2 },
      { stars: 1, count: 1 },
    ],
    sessions: [
      { id: "s6-1", date: "۱۴۰۵/۰۷/۰۸", time: "۱۴:۰۰", remainingCapacity: 6 },
      { id: "s6-2", date: "۱۴۰۵/۰۷/۱۵", time: "۱۰:۰۰", remainingCapacity: 5 },
    ],
  },
  {
    id: "7",
    title: "غرق‌شده‌های کیش",
    slug: "kish-snorkeling",
    category: "طبیعت",
    location: "کیش، دریا",
    price: 1400000,
    rating: 4.4,
    reviews: 312,
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80",
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80",
    ],
    date: "هر روز",
    availability: "ظرفیت ۱۰ نفر",
    description:
      "غواصی و اسنورکلینگ در آب‌های زیبای کیش. این تجربه برای علاقه‌مندان به دنیای زیر آب و ماهی‌های رنگارنگ مناسب است.",
    highlights: [
      "تجهیزات رایگان",
      "راهنمایی با مربی مجرب",
      "مناظر زیر آب",
      "عکاسی زیر آب",
    ],
    host: {
      name: "امید بحرانی",
      avatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80",
      bio: "مربی غواصی با ۱۲ سال تجربه",
    },
    hostId: "h7",
    status: "published",
    createdAt: "۱۴۰۴/۱۰/۰۲",
    updatedAt: "۱۴۰۵/۰۷/۱۴",
    reviewSummary: {
      text: "تجربه‌ای فوق‌العاده. امید عالی بود.",
      author: "پارسا ر.",
    },
    ratingDistribution: [
      { stars: 5, count: 220 },
      { stars: 4, count: 55 },
      { stars: 3, count: 25 },
      { stars: 2, count: 8 },
      { stars: 1, count: 4 },
    ],
    sessions: [
      { id: "s7-1", date: "۱۴۰۵/۰۷/۰۷", time: "۰۹:۰۰", remainingCapacity: 8 },
      { id: "s7-2", date: "۱۴۰۵/۰۷/۰۷", time: "۱۳:۰۰", remainingCapacity: 10 },
      { id: "s7-3", date: "۱۴۰۵/۰۷/۰۹", time: "۰۹:۳۰", remainingCapacity: 6 },
    ],
  },
  {
    id: "8",
    title: "نمایشگاه عکس تهران",
    slug: "tehran-photography-exhibition",
    category: "هنری",
    location: "تهران، خیابان انقلاب",
    price: 300000,
    rating: 4.7,
    reviews: 89,
    image:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&q=80",
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&q=80",
    ],
    date: "تا ۱۵ دی",
    availability: "بازدید آزاد",
    description:
      "نمایشگاه عکس گروهی از عکاسان معاصر تهران. این نمایشگاه شهر تهران را از زوایای نگاه‌نشده به نمایش می‌گذارد.",
    highlights: [
      "عکس‌های زیبا از تهران",
      "حضور عکاسان",
      "جلسه پرسش و پاسخ",
      "گرفتن کاتالوگ",
    ],
    host: {
      name: "عکس‌خانه تهران",
      avatar:
        "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=200&q=80",
      bio: "فضای فرهنگی برای نمایش آثار عکاسان معاصر",
    },
    hostId: "h8",
    status: "published",
    createdAt: "۱۴۰۴/۰۸/۱۵",
    updatedAt: "۱۴۰۵/۰۷/۱۶",
    reviewSummary: {
      text: "نمایشگاه بسیار خوب بود. عکس‌های واقعاً زیبایی بود.",
      author: "کیمیا ه.",
    },
    ratingDistribution: [
      { stars: 5, count: 70 },
      { stars: 4, count: 10 },
      { stars: 3, count: 5 },
      { stars: 2, count: 3 },
      { stars: 1, count: 1 },
    ],
    sessions: [
      { id: "s8-1", date: "۱۴۰۵/۰۷/۰۵", time: "۱۱:۰۰", remainingCapacity: 50 },
      { id: "s8-2", date: "۱۴۰۵/۰۷/۰۶", time: "۱۴:۰۰", remainingCapacity: 89 },
      { id: "s8-3", date: "۱۴۰۵/۰۷/۱۰", time: "۱۶:۰۰", remainingCapacity: 60 },
    ],
  },
];

export function normalizePersianText(text: string): string {
  return text
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/ٔ/g, "")
    .replace(/َ|ُ|ِ|ّ|ْ|ً|ٌ|ٍ/g, "")
    .trim();
}

export function filterExperiences(
  experiences: readonly Experience[],
  filter: FilterState,
): Experience[] {
  let result = [...experiences];

  if (filter.category !== "همه") {
    result = result.filter((e) => e.category === filter.category);
  }

  if (filter.location !== "همه") {
    result = result.filter((e) => e.location === filter.location);
  }

  if (filter.search.trim()) {
    const q = normalizePersianText(filter.search.trim().toLowerCase());
    result = result.filter(
      (e) =>
        normalizePersianText(e.title.toLowerCase()).includes(q) ||
        normalizePersianText(e.location.toLowerCase()).includes(q) ||
        normalizePersianText(e.category.toLowerCase()).includes(q) ||
        (e.description &&
          normalizePersianText(e.description.toLowerCase()).includes(q)) ||
        (e.host && normalizePersianText(e.host.name.toLowerCase()).includes(q)),
    );
  }

  switch (filter.sort) {
    case "popular":
      result.sort((a, b) => b.reviews - a.reviews);
      break;
    case "newest":
      result.sort((a, b) => b.id.localeCompare(a.id));
      break;
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    case "rating-desc":
      result.sort((a, b) => b.rating - a.rating);
      break;
    case "featured":
    default:
      break;
  }

  return result;
}

export function getUniqueLocations(
  experiences: readonly Experience[],
): string[] {
  const collator = new Intl.Collator("fa-IR");
  const unique = [...new Set(experiences.map((e) => e.location))];
  unique.sort(collator.compare);
  return ["همه", ...unique];
}

export function getSortOptions(): readonly {
  value: SortOption;
  label: string;
}[] {
  return [
    { value: "featured", label: "پیشنهاد NOVA" },
    { value: "popular", label: "محبوب‌ترین" },
    { value: "rating-desc", label: "بیشترین امتیاز" },
    { value: "price-asc", label: "ارزان‌ترین" },
    { value: "price-desc", label: "گران‌ترین" },
    { value: "newest", label: "جدیدترین" },
  ] as const;
}

export const defaultFilterState: FilterState = {
  search: "",
  category: "همه",
  location: "همه",
  sort: "featured",
};

export function findExperienceById(id: string): Experience | undefined {
  return experiences.find((e) => e.id === id);
}

export function findExperiencesByHost(hostId: string): Experience[] {
  return experiences.filter((e) => e.hostId === hostId);
}

export function findExperienceBySlug(slug: string): Experience | undefined {
  return experiences.find((e) => e.slug === slug);
}

export function findSessionById(
  experience: Experience,
  sessionId: string,
): ExperienceSession | undefined {
  return experience.sessions.find((s) => s.id === sessionId);
}

export function validateBooking(
  experience: Experience,
  session: ExperienceSession,
  guestCount: number,
): { valid: boolean; error?: string } {
  if (!session) {
    return { valid: false, error: "جلسه یافت نشد" };
  }

  if (session.remainingCapacity <= 0) {
    return { valid: false, error: "ظرفیت جلسه تکمیل شده است" };
  }

  if (guestCount < 1) {
    return { valid: false, error: "تعداد مهمان باید حداقل ۱ نفر باشد" };
  }

  if (guestCount > session.remainingCapacity) {
    return { valid: false, error: "تعداد مهمان از ظرفیت باقی‌مانده بیشتر است" };
  }

  return { valid: true };
}

export function calculateBookingTotal(
  experience: Experience,
  guestCount: number,
): number {
  return experience.price * guestCount;
}
