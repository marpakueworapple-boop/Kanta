import { redirect } from "next/navigation";
import { AppShell } from "@/components/kanta/AppShell";
import { Header } from "@/components/kanta/Header";
import { Icon } from "@/components/kanta/icons";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Profile — Kanta" };

export default async function AccountPage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) redirect("/login");
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data.user) redirect("/login?next=/account");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, country_code, role, created_at")
    .eq("id", data.user.id)
    .maybeSingle();

  const name = (profile?.full_name as string | null) || "Kanta shopper";
  const initial = name.charAt(0).toUpperCase();

  return (
    <AppShell>
      <Header />
      <section className="flex flex-col gap-6 px-5 pt-6">
        <div className="flex items-center gap-4">
          <span className="flex size-16 items-center justify-center rounded-full bg-forest font-display text-[28px] text-on-brand">
            {initial}
          </span>
          <div className="flex flex-col gap-0.5">
            <h1 className="t-h2 text-ink">{name}</h1>
            <p className="t-cap text-muted">{data.user.email}</p>
          </div>
        </div>

        <dl className="grid grid-cols-2 gap-3">
          <div className="rounded-lg border border-line bg-white p-4">
            <dt className="t-over text-muted">Account type</dt>
            <dd className="t-body-m mt-1 text-ink capitalize">{(profile?.role as string) ?? "customer"}</dd>
          </div>
          <div className="rounded-lg border border-line bg-white p-4">
            <dt className="t-over text-muted">Country</dt>
            <dd className="t-body-m mt-1 text-ink">
              {(profile?.country_code as string) === "GH" ? "Ghana" : (profile?.country_code as string) ?? "Ghana"}
            </dd>
          </div>
        </dl>

        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="t-body-m flex h-[52px] w-full items-center justify-center gap-2 rounded-full border border-line bg-white text-ink"
          >
            <Icon name="logout" size={18} />
            Sign out
          </button>
        </form>
      </section>
    </AppShell>
  );
}
