import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import hero from "@/public/images/hero-designer-edit.jpg";
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
    <AppShell withNav={false} withFooter={false}>
      <div className="k-container grid min-h-dvh gap-10 pt-10 pb-12 md:place-items-center md:py-16 lg:grid-cols-2 lg:gap-16 lg:py-10">
        {/* Brand panel — laptops and desktops */}
        <div className="relative hidden h-full max-h-[720px] min-h-[560px] w-full overflow-hidden rounded-2xl lg:block">
          <Image
            src={hero}
            alt="A woman in a tailored terracotta and green outfit by a Ghanaian designer"
            fill
            priority
            placeholder="blur"
            sizes="640px"
            className="object-cover object-[75%_center]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{ background: "linear-gradient(0deg, rgba(30,58,43,0.9) 0%, rgba(30,58,43,0.2) 55%, rgba(30,58,43,0) 100%)" }}
          />
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-10">
            <p className="t-over text-gold">Kanta</p>
            <p className="font-display text-[40px] leading-[46px] text-on-brand">
              Fashion with
              <br />a story.
            </p>
            <p className="t-body max-w-sm text-on-brand/85">
              Verified sellers. Your payment is held safely until your order arrives.
            </p>
          </div>
        </div>

        {/* Sign-in form */}
        <div className="flex w-full max-w-[440px] flex-col gap-8 md:rounded-2xl md:border md:border-line md:bg-white md:p-10 lg:mx-auto lg:border-0 lg:bg-transparent lg:p-0">
          <Link href="/" aria-label="Kanta home" className="w-fit">
            <Logo />
          </Link>
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
      </div>
    </AppShell>
  );
}
