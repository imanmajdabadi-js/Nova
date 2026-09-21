import { appConfig } from "@/config";
import { cn } from "@/lib";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <h1
        className={cn(
          "text-4xl font-bold tracking-tight",
          "text-zinc-900 dark:text-zinc-50",
        )}
      >
        {appConfig.name}
      </h1>
      <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        صفحه اصلی موقت — پایه پروژه NOVA.
      </p>
    </div>
  );
}
