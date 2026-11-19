import { AppShell } from "@/components/kanta/AppShell";
import { Logo } from "@/components/kanta/Logo";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Sign in — Kanta" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;
  const safeNext = next && next.startsWith("/") && !next.startsWith("//") ? next : "/account";

  return (
    <AppShell withNav={false}>
      <div className="flex flex-col gap-8 px-5 pt-10">
        <Logo />
        <div className="flex flex-col gap-2">
          <h1 className="t-h1 text-ink">Welcome to Kanta</h1>
          <p className="t-body text-muted">Sign in or create your account to save items and check out.</p>
        </div>
        {error && (
          <p role="alert" className="t-cap rounded-md bg-clay/10 px-3 py-2 text-clay">
            That sign-in link didn&apos;t work or has expired. Please request a new one.
          </p>
        )}
        <LoginForm next={safeNext} />
      </div>
    </AppShell>
  );
}
