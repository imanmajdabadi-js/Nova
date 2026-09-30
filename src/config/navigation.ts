export type NavItem = {
  readonly label: string;
  readonly href: string;
  readonly icon?: React.ReactNode;
};

export const publicNavigation: readonly NavItem[] = [
  { label: "اكتشاف", href: "/app/discover" },
  { label: "تجربه‌ها", href: "/app/experiences" },
  { label: "دسته‌ها", href: "/categories" },
];

export const authNavigation: readonly NavItem[] = [
  { label: "ورود", href: "/app/auth/login" },
  { label: "ثبت‌نام", href: "/auth/signup" },
];

export const appNavigation: readonly NavItem[] = [
  ...publicNavigation,
  { label: "میزبانی", href: "/host" },
  { label: "علاقه‌مندی‌ها", href: "/dashboard/wishlist" },
];
