export type ExperienceReview = {
  readonly id: string;
  readonly experienceId: string;
  readonly customerName: string;
  readonly rating: number;
  readonly title: string;
  readonly comment: string;
  readonly createdAt: string;
  readonly verifiedBooking: boolean;
};

export const reviews: readonly ExperienceReview[] = [
  {
    id: "r1",
    experienceId: "1",
    customerName: "سارا م.",
    rating: 5,
    title: "یک شب آشپزی فوق‌العاده",
    comment:
      "کلاس آشپزی با مریم واقعاً تجربه‌ای متفاوت بود. از مواد اولیه تا نکات نگهداری، همه چیز بود که نیاز بود با آشپزی ایرانی بیشتر آشنا می‌شدم. غذاهایی که درست کردیم، طعمشان متفاوت از رستوران بود.",
    createdAt: "۱۴۰۵/۰۷/۱۲",
    verifiedBooking: true,
  },
  {
    id: "r2",
    experienceId: "1",
    customerName: "امید ر.",
    rating: 5,
    title: "عالی و آموزنده",
    comment:
      "به‌عنوان یک عکاس، فضای باغ نیاوران با نور طبیعی عالی بود. مریم روشنی نرم و حرفه‌ای داشت که احساس راحتی می‌داد.",
    createdAt: "۱۴۰۵/۰۷/۰۸",
    verifiedBooking: true,
  },
  {
    id: "r3",
    experienceId: "1",
    customerName: "لیلا ک.",
    rating: 4,
    title: "یادگیری جدی سرآشپزی",
    comment:
      "دوره خوب بود. کمی شل بود برای کسانی که می‌خواهند فقط یک آشپزی سریع درست کنند، اما برای کسانی که می‌خواهند اصل آشپزی ایرانی را بفهمند، عالی است.",
    createdAt: "۱۴۰۵/۰۷/۰۵",
    verifiedBooking: true,
  },
  {
    id: "r4",
    experienceId: "1",
    customerName: "نیما س.",
    rating: 5,
    title: "بهترین کلاس آشپزی در تهران",
    comment:
      "مریم حرفه‌ای است. من یاد گرفتم که چطور یک قاشق مرمری درست درست شود.",
    createdAt: "۱۴۰۵/۰۷/۰۳",
    verifiedBooking: false,
  },
  {
    id: "r5",
    experienceId: "1",
    customerName: "فاطمه و.",
    rating: 4,
    title: "تجربه‌ای دلپذیر",
    comment:
      "اگر به دنبال فضای دوستانه و آموزشی هستید، این کلاس مناسب شماست. فقط انتظار داشتم روغن بیشتری استفاده بشه!",
    createdAt: "۱۴۰۵/۰۶/۲۹",
    verifiedBooking: true,
  },

  {
    id: "r6",
    experienceId: "2",
    customerName: "مریم ک.",
    rating: 5,
    title: "نقاطی که هرگز نمی‌رسیدم",
    comment:
      "رضا راهنمایی بسیار دقیق داشت. از یک کوچه‌ی قدیمی که نمی‌دانستم وجود داره، تا کارگاهی که فقط محلی‌ها می‌دانند. تور واقعاً شخصیت شهر را نشان می‌دهد.",
    createdAt: "۱۴۰۵/۰۷/۱۵",
    verifiedBooking: true,
  },
  {
    id: "r7",
    experienceId: "2",
    customerName: "حسین ن.",
    rating: 5,
    title: "لحظه‌ای که اصفهان شخصی شد",
    comment:
      "به‌عنوان یک توریست خارجی که توی تهران زندگی می‌کنم، این تور بهم نشون داد که اصفهان فقط میدان نقش جهان نیست. راهنمای محلی بود که همه سؤالات منو جواب می‌داد.",
    createdAt: "۱۴۰۵/۰۷/۱۰",
    verifiedBooking: true,
  },
  {
    id: "r8",
    experienceId: "2",
    customerName: "پریا م.",
    rating: 4,
    title: "آرامش‌بخش در میان شلوغی شهر",
    comment:
      "مسیرهای کم‌حجم و انراک میوه‌های محلی که در طول راه می‌خوردیم. فقط کمی گرم بود.",
    createdAt: "۱۴۰۵/۰۷/۰۸",
    verifiedBooking: true,
  },
  {
    id: "r9",
    experienceId: "2",
    customerName: "سامیار ل.",
    rating: 4,
    title: "نگاهی دیگر به اصفهان",
    comment: "یه نگاه دیگه به اصفهان. متشکرم که این تجربه رو فراهم کردید.",
    createdAt: "۱۴۰۵/۰۷/۰۶",
    verifiedBooking: false,
  },
  {
    id: "r10",
    experienceId: "2",
    customerName: "نگار ت.",
    rating: 5,
    title: "حیرت‌انگیز",
    comment:
      "از کارگاه‌های سنتی که دیدیم، حیرت‌انگیز بود. مخصوصاً جایی که می‌تونی یه چراغ قدیمی رو ببینی که ۳۰۰ سال تاریخ داشته.",
    createdAt: "۱۴۰۵/۰۷/۰۴",
    verifiedBooking: true,
  },

  {
    id: "r11",
    experienceId: "3",
    customerName: "علی ب.",
    rating: 5,
    title: "دست دراز، دل نرم",
    comment:
      "وقتی دستت تو خاک می‌زنه و بافت میاد، واقعاً احساس می‌کنی با هنرهای باستانی در تماسی. فاطمه با صبر توضیح می‌داد.",
    createdAt: "۱۴۰۵/۰۷/۱۴",
    verifiedBooking: true,
  },
  {
    id: "r12",
    experienceId: "3",
    customerName: "زهرا ح.",
    rating: 4,
    title: "یک گلیم کوچک که داستانش رو می‌تونی بشنوی",
    comment:
      "الگوهای گلیم بافی که آموختم، هر کدوم یه داستان داشت. فضای کارگاه بسیار آرامش‌بخش بود.",
    createdAt: "۱۴۰۵/۰۷/۱۰",
    verifiedBooking: false,
  },
  {
    id: "r13",
    experienceId: "3",
    customerName: "سارا م.",
    rating: 5,
    title: "همسفری در دنیای بافت",
    comment:
      "فاطمه یه معلمِ بی‌نهایت صبوره. حتی اگه یه بار بافتت رو ببری، بازم کمک می‌کنه.",
    createdAt: "۱۴۰۵/۰۷/۰۷",
    verifiedBooking: true,
  },
  {
    id: "r14",
    experienceId: "3",
    customerName: "مهرداد ک.",
    rating: 5,
    title: "توصیه می‌کنم به همه",
    comment:
      "جزئیات‌بندی این کارگاه عالیه. انگشت‌هام خسته شد، اما خوشحالم که تجربه کردم.",
    createdAt: "۱۴۰۵/۰۷/۰۳",
    verifiedBooking: true,
  },
  {
    id: "r15",
    experienceId: "3",
    customerName: "دکترا ن.",
    rating: 4,
    title: "سخت اما جذاب",
    comment: "واردش شدن سخته، اما وقتی اولین بافت درست می‌شه، وجدان می‌گیری.",
    createdAt: "۱۴۰۵/۰۶/۳۰",
    verifiedBooking: false,
  },

  {
    id: "r16",
    experienceId: "4",
    customerName: "دانیال م.",
    rating: 5,
    title: "جرعه‌ای از شعر در باغ ارم",
    comment:
      "موسیقی سنتی در فضای باغ ارم یه تجربه فراموش‌نشونده بود. صداها با فضا ترکیب می‌شدن مثل یه شعر.",
    createdAt: "۱۴۰۵/۰۷/۱۶",
    verifiedBooking: true,
  },
  {
    id: "r17",
    experienceId: "4",
    customerName: "سیده ف.",
    rating: 4,
    title: "لحظه‌های زیبا",
    comment: "اجراها عالی بودن، فقط صندلی‌ها کمی راحت نبودن.",
    createdAt: "۱۴۰۵/۰۷/۱۱",
    verifiedBooking: true,
  },
  {
    id: "r18",
    experienceId: "4",
    customerName: "بهزاد ر.",
    rating: 5,
    title: "یادش باقی می‌مونه",
    comment: "یه شب فراموش‌نشونده بود. حتی چایی که می‌خوردین، طعمش متفاوت بود.",
    createdAt: "۱۴۰۵/۰۷/۱۰",
    verifiedBooking: false,
  },
  {
    id: "r19",
    experienceId: "4",
    customerName: "فاطمه حسینی",
    rating: 4,
    title: "فرهنگ موسیقی سنتی ایران",
    comment: "از گروه‌های محلی که دیدم، حرفه‌ای‌ترین اجراها رو دیدم.",
    createdAt: "۱۴۰۵/۰۷/۰۹",
    verifiedBooking: true,
  },
  {
    id: "r20",
    experienceId: "4",
    customerName: "مهتاب کیانی",
    rating: 4,
    title: "تجربه‌ای شبیه به رویا",
    comment: "به‌عنوان یه شهروند شیراز، خیلی خوشحالم که این تجربه تو شهرم هست.",
    createdAt: "۱۴۰۵/۰۷/۰۶",
    verifiedBooking: false,
  },

  {
    id: "r21",
    experienceId: "5",
    customerName: "فرهاد ق.",
    rating: 5,
    title: "مراقبت از نیروی طبیعت",
    comment:
      "حسین هیچ‌وقت فشار نمی‌آورد. مسیر رو به‌راحتی توضیح می‌ده. غذاهای محلی در مسیر، عالی بود.",
    createdAt: "۱۴۰۵/۰۷/۱۳",
    verifiedBooking: true,
  },
  {
    id: "r22",
    experienceId: "5",
    customerName: "مرتضی ص.",
    rating: 4,
    title: "از مناظر البرز لذت بردم",
    comment: "از دیدن مناظر البرز لذت بردم. فقط کمی سرد بود.",
    createdAt: "۱۴۰۵/۰۷/۰۷",
    verifiedBooking: true,
  },
  {
    id: "r23",
    experienceId: "5",
    customerName: "سارا ن.",
    rating: 4,
    title: "یه روز بیرون از شهر",
    comment: "خروج از شلوغی تهران، یه نفس تازه. مسیرهای سخت بودن اما چشم‌نواز.",
    createdAt: "۱۴۰۵/۰۷/۰۶",
    verifiedBooking: false,
  },
  {
    id: "r24",
    experienceId: "5",
    customerName: "نوید س.",
    rating: 5,
    title: "گرافی از طبیعت",
    comment: "عکس‌هایی که تو این مسیر می‌تونی بگیری، یه جایزه‌انگیزه.",
    createdAt: "۱۴۰۵/۰۷/۰۲",
    verifiedBooking: true,
  },
  {
    id: "r25",
    experienceId: "5",
    customerName: "دانه پ.",
    rating: 5,
    title: "پیشنهاد ویژه",
    comment:
      "یه تجربه‌ی فوق‌العاده برای کسانی که می‌خوان لذت بگیرن. حسین بی‌نظیره.",
    createdAt: "۱۴۰۵/۰۶/۲۸",
    verifiedBooking: false,
  },

  {
    id: "r26",
    experienceId: "6",
    customerName: "رضا خ.",
    rating: 5,
    title: "هنری که دست تو می‌شه حس کرد",
    comment:
      "خاتم‌کاری واقعاً یه هنره. علی با دقت توضیح می‌داد که هر خط چه معنی داره.",
    createdAt: "۱۴۰۵/۰۷/۱۵",
    verifiedBooking: true,
  },
  {
    id: "r27",
    experienceId: "6",
    customerName: "سارا م.",
    rating: 4,
    title: "دقیق اما سنگین",
    comment: "کارگاه خوب بود، فقط سر کار گرفتن خیلی دقیق لازمه.",
    createdAt: "۱۴۰۵/۰۷/۱۰",
    verifiedBooking: false,
  },
  {
    id: "r28",
    experienceId: "6",
    customerName: "نگار ت.",
    rating: 5,
    title: "سوغاتی دست‌ساز",
    comment: "اثری که ساختیم، یه یادآوری زیبا از این تجربه.",
    createdAt: "۱۴۰۵/۰۷/۰۸",
    verifiedBooking: true,
  },
  {
    id: "r29",
    experienceId: "6",
    customerName: "پژمان ح.",
    rating: 5,
    title: "جزئیات‌بندی شگفت‌انگیز",
    comment: "هر جزئیاتی از ابزارهای قدیمی، تاریخچه‌ش داشت.",
    createdAt: "۱۴۰۵/۰۷/۰۵",
    verifiedBooking: false,
  },
  {
    id: "r30",
    experienceId: "6",
    customerName: "لیلا ک.",
    rating: 3,
    title: "سخت اما ارزشش رو داره",
    comment: "اولش سخت بود، اما وقتی یه الگو درست می‌شه، خیلی رضایت‌بخشه.",
    createdAt: "۱۴۰۵/۰۶/۲۷",
    verifiedBooking: true,
  },

  {
    id: "r31",
    experienceId: "7",
    customerName: "پارسا ر.",
    rating: 5,
    title: "زیر آب، بالای دنیا",
    comment:
      "ماهی‌های رنگارنگ، شفافیت آب، همه‌چیز زیبا بود. امید توضیح می‌داد که هر ماهی چه می‌گه.",
    createdAt: "۱۴۰۵/۰۷/۱۴",
    verifiedBooking: true,
  },
  {
    id: "r32",
    experienceId: "7",
    customerName: "نگار ت.",
    rating: 4,
    title: "غوخورده شدن در آراستگی",
    comment: "عکاسی زیر آب که امکانش رو نداشتم. منتظر ویدیوهایی که گرفتیم!",
    createdAt: "۱۴۰۵/۰۷/۱۰",
    verifiedBooking: false,
  },
  {
    id: "r33",
    experienceId: "7",
    customerName: "امید ر.",
    rating: 4,
    title: "لحظه‌ای در عمق",
    comment: "یه تجربه‌ی متفاوت از کیش. نه فقط سواحل، ولی زیر آب.",
    createdAt: "۱۴۰۵/۰۷/۰۹",
    verifiedBooking: true,
  },
  {
    id: "r34",
    experienceId: "7",
    customerName: "بهزاد ر.",
    rating: 5,
    title: "تعقیق از طبیعت",
    comment: "از تجهیزات رایگان که استفاده کردیم، عالیه. همه چیز آماده بود.",
    createdAt: "۱۴۰۵/۰۷/۰۷",
    verifiedBooking: true,
  },
  {
    id: "r35",
    experienceId: "7",
    customerName: "مهتاب کیانی",
    rating: 3,
    title: "خوب اما شلوغ",
    comment: "در روز پر از گردشگر، یه کم از لذت کاسته شد.",
    createdAt: "۱۴۰۵/۰۷/۰۴",
    verifiedBooking: false,
  },

  {
    id: "r36",
    experienceId: "8",
    customerName: "کیمیا ه.",
    rating: 5,
    title: "عکس‌هایی که زبان دارن",
    comment:
      "نمایشگاه عکس تهران یه سفر بصری بود. هر قطعه، یه داستان می‌تونست بگه.",
    createdAt: "۱۴۰۵/۰۷/۱۵",
    verifiedBooking: true,
  },
  {
    id: "r37",
    experienceId: "8",
    customerName: "دانیال م.",
    rating: 5,
    title: "هنر معاصر در معرض",
    comment:
      "حضور عکاسان در روز آخر، فضای خیلی خوبی بود. سؤال و پاسخ جالب بود.",
    createdAt: "۱۴۰۵/۰۷/۱۰",
    verifiedBooking: true,
  },
  {
    id: "r38",
    experienceId: "8",
    customerName: "سیده ف.",
    rating: 4,
    title: "نگاهی به شهر",
    comment: "عکس‌های تهران از زوایای نگهگرفته نشده بود. مفید بود.",
    createdAt: "۱۴۰۵/۰۷/۰۸",
    verifiedBooking: false,
  },
  {
    id: "r39",
    experienceId: "8",
    customerName: "مریم ک.",
    rating: 4,
    title: "تجربه‌ای هنرمندانه",
    comment: "کاتالوگی که گرفتیم، جزئیات‌بندیش عالیه.",
    createdAt: "۱۴۰۵/۰۷/۰۶",
    verifiedBooking: true,
  },
  {
    id: "r40",
    experienceId: "8",
    customerName: "نگار ت.",
    rating: 4,
    title: "یه سفر بصری در میانه شهر",
    comment: "فضای نمایشگاه بزرگ و آرام بود. می‌شه گفت یه کتاب تصویری زنده.",
    createdAt: "۱۴۰۵/۰۷/۰۵",
    verifiedBooking: false,
  },
];

export function getReviewsForExperience(
  experienceId: string,
): ExperienceReview[] {
  return reviews.filter((r) => r.experienceId === experienceId);
}

export function selectReviewsToShow(
  experienceReviews: ExperienceReview[],
  count = 5,
): ExperienceReview[] {
  return [...experienceReviews]
    .sort((a, b) => {
      if (a.verifiedBooking !== b.verifiedBooking) {
        return a.verifiedBooking ? -1 : 1;
      }
      return b.createdAt.localeCompare(a.createdAt);
    })
    .slice(0, count);
}
