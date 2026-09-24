import { appConfig } from "@/config";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-foreground">
        {appConfig.name}
      </h1>
      <p className="max-w-md text-lg leading-8 text-foreground-muted">
        صفحه اصلی موقت — پایه پروژه NOVA.
      </p>
    </div>
  );
}
