"use client";

import { useRouter } from "next/navigation";
import { Button, Input, Label } from "@/components/ui";

export default function LoginPage() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.replace("/app/discover");
  };

  return (
    <div className="mx-auto max-w-md space-y-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          ورود
        </h1>
        <p className="text-body-sm text-foreground-muted">
          برای ادامه وارد حساب کاربری خود شوید.
        </p>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">ایمیل</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">رمز عبور</Label>
            <Input id="password" type="password" required />
          </div>
        </div>
        <Button type="submit" className="w-full" size="lg">
          ورود
        </Button>
      </form>
    </div>
  );
}
