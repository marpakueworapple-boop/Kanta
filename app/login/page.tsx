import { redirect } from "next/navigation";
import { AppShell } from "@/components/kanta/AppShell";
import { Logo } from "@/components/kanta/Logo";
import { safeNext } from "@/lib/auth/safe-next";
import { createClient } from "@/lib/supabase/server";
import { LoginForm } from "./LoginForm";

export const metadata = { title: "Sign in — Kanta" };

/** Plain-language explanations for the reasons a sign-in link can fail. */
function errorMessage(code: string): string {
  switch (code) {
    case "otp_expired":
    case "access_denied":
      return "That sign-in link has expired or was already used. Each link works once — please request a new one.";
    case "other_browser":
      return "Please open the sign-in link in the same browser you used to request it, or request a new link.";
    default:
      return "That sign-in link didn't work. Please request a new one.";
  }
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const { next, error } = await searchParams;
  const destination = safeNext(next);

  // Already signed in? Go straight to the profile (or wherever they were heading).
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    if (data.user) redirect(destination);
  }

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
            {errorMessage(error)}
          </p>
        )}
        <LoginForm next={destination} />
      </div>
    </AppShell>
  );
}
