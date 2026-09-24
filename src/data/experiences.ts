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
  readonly date?: string;
  readonly availability?: string;
};

export type SortOption = "featured" | "popular" | "newest" | "price-asc" | "price-desc";

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
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
    date: "هر جمعه",
    availability: "ظرفیت ۸ نفر",
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
    image: "https://images.unsplash.com/photo-1542649758-0b8c0d28ca6c?w=800&q=80",
    date: "هر روز",
    availability: "ظرفیت ۱۵ نفر",
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
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80",
    date: "شنبه‌ها",
    availability: "ظرفیت ۱۰ نفر",
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
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80",
    date: "۲۹ آبان",
    availability: "ظرفیت ۲۰۰ نفر",
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
    image: "https://images.unsplash.com/photo-1551632811-561732d5464e?w=800&q=80",
    date: "هر شنبه",
    availability: "ظرفیت ۱۲ نفر",
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
    image: "https://images.unsplash.com/photo-1504333638930-c8787321eee0?w=800&q=80",
    date: "یکشنبه‌ها",
    availability: "ظرفیت ۶ نفر",
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
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
    date: "هر روز",
    availability: "ظرفیت ۱۰ نفر",
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
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80",
    date: "تا ۱۵ دی",
    availability: "بازدید آزاد",
  },
];
