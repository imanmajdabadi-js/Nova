"use client";

import {
  Checkbox,
  DatePicker,
  Form,
  Input as AntInput,
  Pagination,
  Radio,
  Select,
  Switch,
  Table,
  Tabs,
  type TableProps,
} from "antd";
import { SearchOutlined, SendOutlined, StarOutlined } from "@ant-design/icons";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  IconButton,
  Input,
  Spinner,
  Textarea,
} from "@/components/ui";
import { useTheme } from "@/components/providers/nova-theme-provider";
import {
  palette,
  semantic,
  type SemanticName,
  type ColorName,
} from "@/styles/tokens";

type SwatchScale = { name: string; colors: Record<string, string> };

function ColorSwatch({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 text-center">
      <div
        className="mx-auto aspect-square w-full max-w-10 rounded shadow-medium"
        style={{ backgroundColor: value }}
      />
      <span className="text-caption text-foreground-muted">{label}</span>
      <code className="block w-full max-w-10 break-all text-foreground-subtle text-caption">
        {value.replace("oklch(", "").replace(")", "")}
      </code>
    </div>
  );
}

const brandScales: SwatchScale[] = [
  {
    name: "primary (teal)",
    colors: palette.primary as unknown as Record<string, string>,
  },
  {
    name: "secondary (amber)",
    colors: palette.secondary as unknown as Record<string, string>,
  },
  {
    name: "accent (rose)",
    colors: palette.accent as unknown as Record<string, string>,
  },
  {
    name: "success",
    colors: palette.success as unknown as Record<string, string>,
  },
  {
    name: "warning",
    colors: palette.warning as unknown as Record<string, string>,
  },
  { name: "error", colors: palette.error as unknown as Record<string, string> },
  { name: "info", colors: palette.info as unknown as Record<string, string> },
];

const neutralSwatch: SwatchScale = {
  name: "neutral",
  colors: palette.neutral as unknown as Record<string, string>,
};
const colorNames: ColorName[] = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
];

const semanticNames: SemanticName[] = [
  "background",
  "surface",
  "surface-subtle",
  "surface-muted",
  "surface-elevated",
  "surface-interactive",
  "foreground",
  "foreground-muted",
  "foreground-subtle",
  "border",
  "border-strong",
  "divider",
  "primary",
  "primary-foreground",
  "secondary",
  "accent",
  "success",
  "warning",
  "error",
  "info",
];

export default function DesignSystemShowcase() {
  const { mode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-3 border-b border-border bg-surface/80 px-6 backdrop-blur-sm">
        <h1 className="text-h3 font-bold">NOVA Design System</h1>
        <div className="flex items-center gap-3">
          <span
            className="text-caption text-foreground-muted"
            aria-label="current theme"
          >
            {mode === "dark" ? "تمایل شبی" : "روشن"}
          </span>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-foreground hover:bg-surface-interactive"
          >
            {mode === "dark" ? "روشن کردن" : "حالت شبی"}
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl space-y-16 px-6 py-10">
        <section className="space-y-4">
          <h2 className="text-h2 font-bold">تایپوگرافی</h2>
          <p className="text-body-sm text-foreground-muted">
            فونت پیش‌فرض: Vazirmatn (FA) + Inter (EN) بارگذاری شده با next/font.
          </p>
          <div className="space-y-2">
            <h1 className="text-display">صفحه نمایش — Display</h1>
            <h2 className="text-h1">سطح ۱ — H1</h2>
            <h3 className="text-h2">سطح ۲ — H2</h3>
            <h4 className="text-h3">سطح ۳ — H3</h4>
            <h5 className="text-h4">سطح ۴ — H4</h5>
            <p className="text-body-lg">متن بدنه بزرگ — Body Large</p>
            <p className="text-body">
              متن اصلی بدنه — Body (۱rem / ۱۶px). این متن شامل اعداد انگلیسی 123
              و ۴۵۶ است.
            </p>
            <p className="text-body-sm">متن کوچک — Body Small</p>
            <p className="text-label">برچسب فرم — Label</p>
            <p className="text-caption">توضیح/کپشن — Caption</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-h2 font-bold">پالس ۱ (Palette)</h2>
          <div className="space-y-6">
            {brandScales.map((scale) => (
              <div key={scale.name} className="space-y-2">
                <h3 className="text-h4 font-semibold">{scale.name}</h3>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11">
                  {colorNames.map((n) => (
                    <ColorSwatch key={n} label={n} value={scale.colors[n]} />
                  ))}
                </div>
              </div>
            ))}
            <div className="space-y-2">
              <h3 className="text-h4 font-semibold">{neutralSwatch.name}</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11">
                {colorNames.map((n) => (
                  <ColorSwatch
                    key={n}
                    label={n}
                    value={neutralSwatch.colors[n]}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-h2 font-bold">توکن‌های معنایی</h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {semanticNames.map((name) => {
              const value: string =
                mode === "dark" ? semantic.dark[name] : semantic.light[name];
              return <ColorSwatch key={name} label={name} value={value} />;
            })}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-h2 font-bold">دکمه‌ها</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card title="واریانت‌ها">
              <CardBody className="gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">ثانویه</Button>
                  <Button variant="secondary">ثانویه</Button>
                  <Button variant="outline">خط دور</Button>
                  <Button variant="ghost">شفاف</Button>
                  <Button variant="destructive">حذف</Button>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary" loading>
                    در حال بارگذاری
                  </Button>
                  <Button variant="secondary" disabled>
                    غیرفعال
                  </Button>
                </div>
              </CardBody>
            </Card>
            <Card title="اندازه‌ها">
              <CardBody className="gap-3">
                <div className="flex items-center gap-3">
                  <Button size="sm" icon={<StarOutlined />}>
                    کوچک
                  </Button>
                  <Button size="md" icon={<StarOutlined />}>
                    متوسط
                  </Button>
                  <Button size="lg" icon={<StarOutlined />}>
                    بزرگ
                  </Button>
                </div>
              </CardBody>
            </Card>
            <Card title="دکمه‌های آیکون">
              <CardBody className="gap-3">
                <div className="flex items-center gap-3">
                  <IconButton
                    label="جستجو"
                    icon={<SearchOutlined />}
                    variant="ghost"
                  />
                  <IconButton
                    label="ارسال"
                    icon={<SendOutlined />}
                    variant="primary"
                  />
                  <IconButton
                    label="علامت‌گذاری"
                    icon={<StarOutlined />}
                    variant="outline"
                  />
                  <IconButton
                    label="بارگذاری"
                    icon={<StarOutlined />}
                    variant="ghost"
                    loading
                  />
                </div>
              </CardBody>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-h2 font-bold">فرم‌ها</h2>
          <Card title="ورودی‌ها">
            <CardBody>
              <div className="grid gap-6 sm:grid-cols-2">
                <Input
                  label="نام کاربری"
                  placeholder="mohammad_nova"
                  required
                />
                <Input
                  label="ایمیل"
                  placeholder="user@example.com"
                  error="این ایمیل معتبر نیست."
                />
                <Input
                  label="جستجو"
                  prefix={<SearchOutlined />}
                  placeholder="جستجو کنید..."
                  helperText="حداقل ۳ کاراکتر."
                />
                <Input label="کد پستی" suffix={<span>۱۲۳۴۵</span>} />
                <Input label="حالت خواندنی" placeholder="مقدار" disabled />
              </div>
            </CardBody>
          </Card>

          <Card title="فرم تماس">
            <CardBody>
              <Form layout="vertical">
                <Form.Item label="موضوع" name="subject">
                  <AntInput placeholder="موضوع پیام" />
                </Form.Item>
                <Form.Item label="جزئیات" name="details">
                  <Textarea
                    label="پیام"
                    placeholder="متن پیام خود را بنویسید…"
                  />
                </Form.Item>
                <Form.Item name="terms" valuePropName="checked">
                  <Checkbox>با شرایط استفاده موافقت دارم</Checkbox>
                </Form.Item>
                <Form.Item>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="primary">ارسال</Button>
                    <Button variant="outline">لغو</Button>
                  </div>
                </Form.Item>
              </Form>
            </CardBody>
          </Card>
        </section>

        <section className="space-y-6">
          <h2 className="text-h2 font-bold">نشان‌ها</h2>
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="primary">اولویت اول</Badge>
            <Badge variant="secondary">ثانویه</Badge>
            <Badge variant="accent">اکانت</Badge>
            <Badge variant="success">موفقیت</Badge>
            <Badge variant="warning">هشدار</Badge>
            <Badge variant="error">خطا</Badge>
            <Badge variant="info">اطلاعات</Badge>
            <Badge variant="neutral">خنثی</Badge>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-h2 font-bold">کارت‌ها</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card hoverable>
              <CardHeader>
                <h3 className="text-h3 font-semibold">کارت پیش‌فرض</h3>
                <p className="text-body-sm text-foreground-muted">
                  سطح سطحی ۱. کارت‌ها با سایه ملایم و لبه مرمری.
                </p>
              </CardHeader>
              <CardBody>
                <p className="text-body">
                  این یک کارت نمونه است. می‌تواند شامل هر محتوایی باشد.
                </p>
              </CardBody>
              <CardFooter>
                <Button size="sm" variant="outline">
                  اقدام
                </Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <Badge variant="primary" className="mb-1 w-max">
                  فعال
                </Badge>
                <h3 className="text-h3 font-semibold">بدون افکت هاور</h3>
              </CardHeader>
              <CardBody>
                <p className="text-body-sm text-foreground-muted">
                  این کارت حالت hover ندارد.
                </p>
              </CardBody>
            </Card>
            <Card hoverable>
              <CardHeader>
                <h3 className="text-h3 font-semibold">با افکت هاور</h3>
              </CardHeader>
              <CardBody>
                <p className="text-body-sm text-foreground-muted">
                  این کارت در حالت hover سایه می‌گیرد.
                </p>
              </CardBody>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-h2 font-bold">جداکننده و اسپینر</h2>
          <div className="flex flex-col gap-4">
            <Divider>یا</Divider>
            <div className="flex items-center justify-center gap-4">
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-h2 font-bold">یکپارچگی Ant Design</h2>
          <p className="text-body-sm text-foreground-muted">
            کامپوننت‌های Ant با تم NOVA (رنگ اصلی = teal، شعاع لبه‌ها = 8px).
          </p>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card title="کنترل‌های Ant">
              <CardBody className="gap-4">
                <AntInput.Group>
                  <div className="grid grid-cols-2 gap-3">
                    <Select
                      style={{ width: "100%" }}
                      placeholder="انتخاب کنید"
                      options={[
                        { value: "a", label: "گزینه الف" },
                        { value: "b", label: "گزینه ب" },
                      ]}
                    />
                    <DatePicker
                      style={{ width: "100%" }}
                      placeholder="تاریخ انتخاب شود"
                    />
                  </div>
                </AntInput.Group>
                <Tabs
                  items={[
                    {
                      key: "1",
                      label: "بررسی",
                      tabKey: "1",
                      children: "محتوای بررسی",
                    },
                    {
                      key: "2",
                      label: "تنظیمات",
                      tabKey: "2",
                      children: "محتویات تنظیمات",
                    },
                  ]}
                />
                <div className="flex items-center gap-3">
                  <Switch defaultChecked />
                  <Radio.Group
                    options={[
                      { value: "a", label: "الف" },
                      { value: "b", label: "ب" },
                    ]}
                  />
                </div>
                <Pagination total={120} showSizeChanger />
              </CardBody>
            </Card>
            <Card title="جدول Ant">
              <CardBody>
                <AntTableDemo />
              </CardBody>
            </Card>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-h2 font-bold">RTL vs LTR</h2>
          <RTLDemo />
        </section>

        <section className="space-y-4">
          <h2 className="text-h2 font-bold">پایان</h2>
          <Divider />
          <p className="text-caption text-foreground-muted">
            این صفحه صرفاً نمایش سیستم طراحی است و در مسیر عمومی / محصول نیست.
          </p>
        </section>
      </main>
    </div>
  );
}

function AntTableDemo() {
  const columns: TableProps<Record<string, string>>["columns"] = [
    { title: "عنوان", dataIndex: "title", key: "title" },
    { title: "وضعیت", dataIndex: "status", key: "status" },
    { title: "عملیات", key: "action", dataIndex: "action" },
  ];
  const data: Array<Record<string, string>> = [
    { key: "1", title: "نمونهٔ اول", status: "فعال", action: "-" },
    { key: "2", title: "نمونهٔ دوم", status: "پیش‌نویس", action: "-" },
  ];
  return (
    <Table
      columns={columns}
      dataSource={data}
      size="small"
      pagination={false}
    />
  );
}

function RTLDemo() {
  return (
    <Card>
      <CardBody className="gap-4">
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" icon={<SendOutlined />}>
            ارسال در چینش راست به چپ
          </Button>
          <Input
            label="جستجو (راست به چپ)"
            prefix={<SearchOutlined />}
            placeholder="جستجو کنید…"
          />
        </div>

        <div
          dir="ltr"
          lang="en"
          className="max-w-md rounded-xl border border-border bg-surface p-4 shadow-subtle"
        >
          <h3 className="text-h4 font-bold">LTR Sample</h3>
          <p className="text-body-sm text-foreground-muted">
            English content renders with Inter. Buttons and inputs are in
            left-to-right flow.
          </p>
          <div className="mt-3 flex items-center gap-3">
            <Button variant="primary">Get started</Button>
            <Input label="Email address" placeholder="you@example.com" />
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
