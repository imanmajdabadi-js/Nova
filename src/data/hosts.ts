export type Host = {
  readonly id: string;
  readonly name: string;
  readonly avatar?: string;
  readonly bio?: string;
  readonly verified: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
};

export const hosts: readonly Host[] = [
  {
    id: "h1",
    name: "مریم احمدی",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    bio: "سرآشپز با ۱۵ سال تجربه در آشپزی سنتی و مدرن ایرانی",
    verified: true,
    createdAt: "۱۳۹۹/۰۳/۱۵",
    updatedAt: "۱۴۰۵/۰۷/۱۵",
  },
  {
    id: "h2",
    name: "رضا کریمی",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    bio: "راهنما و مورخ با ۱۰ سال تجربه در تورهای شهری اصفهان",
    verified: true,
    createdAt: "۱۴۰۰/۰۶/۲۰",
    updatedAt: "۱۴۰۵/۰۷/۰۶",
  },
  {
    id: "h3",
    name: "فاطمه کرمانی",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    bio: "هنرمند گلیم‌باف با ۲۰ سال تجربه",
    verified: true,
    createdAt: "۱۳۹۸/۰۸/۱۰",
    updatedAt: "۱۴۰۵/۰۷/۱۵",
  },
  {
    id: "h4",
    name: "سید محمد حسینی",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    bio: "مدیر فرهنگی و برنامه‌ریز کنسرت‌های سنتی",
    verified: true,
    createdAt: "۱۳۹۷/۰۲/۱۵",
    updatedAt: "۱۴۰۵/۰۷/۰۸",
  },
  {
    id: "h5",
    name: "حسین رضایی",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    bio: "کوهنورد و راهنما با ۸ سال تجربه",
    verified: true,
    createdAt: "۱۴۰۲/۰۳/۰۵",
    updatedAt: "۱۴۰۵/۰۷/۰۷",
  },
  {
    id: "h6",
    name: "علی اصغری",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80",
    bio: "هنرمند خاتم‌کار با ۲۵ سال تجربه",
    verified: true,
    createdAt: "۱۴۰۵/۰۶/۰۱",
    updatedAt: "۱۴۰۵/۰۷/۱۰",
  },
  {
    id: "h7",
    name: "امید بحرانی",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&q=80",
    bio: "مربی غواصی با ۱۲ سال تجربه",
    verified: true,
    createdAt: "۱۴۰۰/۱۰/۰۲",
    updatedAt: "۱۴۰۵/۰۷/۱۴",
  },
  {
    id: "h8",
    name: "عکس‌خانه تهران",
    avatar:
      "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=200&q=80",
    bio: "فضای فرهنگی برای نمایش آثار عکاسان معاصر",
    verified: false,
    createdAt: "۱۳۹۷/۰۸/۱۵",
    updatedAt: "۱۴۰۵/۰۷/۱۶",
  },
];

export function findHostById(id: string): Host | undefined {
  return hosts.find((h) => h.id === id);
}
