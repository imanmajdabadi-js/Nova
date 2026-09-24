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
  readonly reviewSummary?: {
    readonly text: string;
    readonly author: string;
  };
};

export type SortOption =
  "featured" | "popular" | "newest" | "price-asc" | "price-desc";

export type FilterState = {
  readonly search: string;
  readonly category: string;
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
      "یک تجربه‌ی آشپزی اصیل در باغ نیاوران. شما یاد می‌گیرید غذاهای سنتی ایرانی را با موادfresh و تازه درست کنید. این کلاس برای علاقه‌مندان به آشپزی و کسانی که می‌خواهند فرهنگ آشپزی ایران را از نزدیک تجربه کنند، طراحی شده است.",
    highlights: [
      "آشپزی با یک سرآشپز بومی",
      "استفاده از موادfresh و فصل",
      "گرفتن دستور العمل برای استفاده در منزل",
      "غذا با همسفران و میزبان",
    ],
    host: {
      name: "مریم احمدی",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
      bio: "سرآشپز با ۱۵ سال تجربه در آشپزی سنتی و مدرن ایرانی",
    },
    reviewSummary: {
      text: "بیشترین تجربه‌ی خوبی که داشته‌ام. مریم فوق‌العاده است.",
      author: "علی ر.",
    },
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
      "یک تور guid شده از نقاط پنهان اصفهان. از کوچه‌های قدیمی تا کارگاه‌های سنتی، این تور شما را با چهره‌ی واقعی اصفهان آشنا می‌کند.",
    highlights: [
      "راهبری توسط Guide بومی",
      "دیدن نقاط پنهان",
      "عکاسی در locations منحصربه‌فرد",
      "گرفتنی از سوغات محلی",
    ],
    host: {
      name: "رضا کریمی",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
      bio: "Guide و مورخ با ۱۰ سال تجربه در تورهای شهری اصفهان",
    },
    reviewSummary: {
      text: "تور فوق‌العاده بود. نقاطی را دیدم که اگر خودم بروم هرگز پیدا نمی‌کردم.",
      author: "مریم ک.",
    },
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
      "یادگیری ساخت گلیم دستباف با هنرمندان کرمان. شما در این workshop اصول بافت گلیم را یاد می‌گیرید و می‌توانید خودتان یک گلیم کوچک بسازید.",
    highlights: [
      "آموزش اصول بافت",
      "استفاده از نخ‌های طبیعی",
      "گرفتنی از اثر خودتان",
      "معرفی تاریخچه گلیم",
    ],
    host: {
      name: "فاطمه کرمانی",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
      bio: "هنرمند گلیم‌باف با ۲۰ سال تجربه",
    },
    reviewSummary: {
      text: "تجربه‌ای فوق‌العاده و آموزنده. فاطمه معلمی عالی است.",
      author: "سارا م.",
    },
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
      "پذیرایی و چای",
      "قابلیت покуشی",
    ],
    host: {
      name: "سید محمد حسینی",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
      bio: "مدیر فرهنگی و برنامه‌ریز کنسرت‌های سنتی",
    },
    reviewSummary: {
      text: "فضای باغ ارم با موسیقی سنتی... معجزه است.",
      author: "امیر ح.",
    },
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
      "راهبری Guide مجرب",
      "منظره‌های دیدنی",
      "غذای محلی در مسیر",
      "گرفتنی از خاطرات",
    ],
    host: {
      name: "حسین رضایی",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
      bio: "کوهنورد و Guide با ۸ سال تجربه",
    },
    reviewSummary: {
      text: "تور عالی بود. حسین معلمی خوبی بود و مسیر بسیار زیبا بود.",
      author: "نیما ت.",
    },
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
    reviewSummary: {
      text: "کارگاه عالی. علی استاد خوبی است و فضای کارگاه بسیار دوستانه است.",
      author: "رضا پ.",
    },
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
      "راهبری instructor مجرب",
      "منظره‌های زیر آب",
      "عکاسی زیر آب",
    ],
    host: {
      name: "امید بحرانی",
      avatar:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80",
      bio: "Instructor غواصی با ۱۲ سال تجربه",
    },
    reviewSummary: {
      text: "تجربه‌ای فوق‌العاده. امید عالی بود.",
      author: "پارسا ر.",
    },
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
      "نمایشگاه عکس گروهی از عکاسان معاصر تهران. این نمایشگاه蛇های زیبا و دیدنی از شهر تهران را به نمایش می‌گذارد.",
    highlights: [
      "عکس‌هایungi از تهران",
      "حضور عکاسان",
      "جلسه‌ی پرسش و پاسخ",
      "گرفتنی از کاتالوگ",
    ],
    host: {
      name: "عکس‌خانه تهران",
      avatar:
        "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=200&q=80",
      bio: "فضای فرهنگی برای نمایش آثار عکاسان معاصر",
    },
    reviewSummary: {
      text: "نمایشگاه بسیار خوب بود. عکس‌های واقعاً زیبایی بود.",
      author: "کیمیا ه.",
    },
  },
];
