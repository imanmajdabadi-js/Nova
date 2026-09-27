"use client";

import {
  SearchOutlined,
  AppstoreOutlined,
  TagsOutlined,
  BuildOutlined,
  HeartOutlined,
  LoginOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

export type NavItem = {
  readonly label: string;
  readonly href: string;
  readonly icon?: React.ReactNode;
};

export const publicNavigation: readonly NavItem[] = [
  { label: "اكتشاف", href: "/app/discover", icon: <SearchOutlined /> },
  { label: "تجربه‌ها", href: "/app/experiences", icon: <AppstoreOutlined /> },
  { label: "دسته‌ها", href: "/categories", icon: <TagsOutlined /> },
];

export const authNavigation: readonly NavItem[] = [
  { label: "ورود", href: "/app/auth/login", icon: <LoginOutlined /> },
  { label: "ثبت‌نام", href: "/auth/signup", icon: <UserAddOutlined /> },
];

export const appNavigation: readonly NavItem[] = [
  ...publicNavigation,
  { label: "میزبانی", href: "/host", icon: <BuildOutlined /> },
  {
    label: "علاقه‌مندی‌ها",
    href: "/dashboard/wishlist",
    icon: <HeartOutlined />,
  },
];
