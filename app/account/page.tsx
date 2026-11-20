import Link from "next/link";
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
  const country =
    (profile?.country_code as string) === "GH" ? "Ghana" : (profile?.country_code as string) ?? "Ghana";
  const memberSince = profile?.created_at
    ? new Date(profile.created_at as string).toLocaleDateString("en-GH", { month: "long", year: "numeric" })
    : null;

  const sections = [
    { title: "Orders", text: "Track and review your purchases.", href: "/bag", icon: "bag" },
    { title: "Favourites", text: "Pieces you've saved for later.", href: "/favourites", icon: "heart" },
    { title: "Sell on Kanta", text: "Open a thrift, boutique or designer shop.", href: "/sell", icon: "plus" },
  ] as const;

  return (
    <AppShell>
      <Header />
      <div className="k-container pt-6 md:pt-12">
        <h1 className="sr-only">Your profile</h1>
        <div className="flex flex-col gap-6 md:grid md:grid-cols-[300px_1fr] md:items-start md:gap-8 lg:grid-cols-[340px_1fr] lg:gap-10">
          {/* Who you are */}
          <section className="flex flex-col gap-6 md:rounded-2xl md:border md:border-line md:bg-white md:p-8">
            <div className="flex items-center gap-4 md:flex-col md:items-start">
              <span className="flex size-16 items-center justify-center rounded-full bg-forest font-display text-[28px] text-on-brand md:size-20 md:text-[34px]">
                {initial}
              </span>
              <div className="flex flex-col gap-0.5">
                <p className="t-h2 text-ink">{name}</p>
                <p className="t-cap break-all text-muted">{data.user.email}</p>
                {memberSince && <p className="t-cap hidden text-muted md:block">Member since {memberSince}</p>}
              </div>
            </div>
            <form action="/auth/signout" method="post" className="hidden md:block">
              <button
                type="submit"
                className="t-body-m flex h-11 w-full items-center justify-center gap-2 rounded-full border border-line bg-white text-ink transition hover:border-forest/40"
              >
                <Icon name="logout" size={18} />
                Sign out
              </button>
            </form>
          </section>

          {/* Details and account sections */}
          <div className="flex flex-col gap-6 md:gap-8">
            <dl className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="rounded-lg border border-line bg-white p-4 md:rounded-xl md:p-6">
                <dt className="t-over text-muted">Account type</dt>
                <dd className="t-body-m mt-1 text-ink capitalize md:text-base">
                  {(profile?.role as string) ?? "customer"}
                </dd>
              </div>
              <div className="rounded-lg border border-line bg-white p-4 md:rounded-xl md:p-6">
                <dt className="t-over text-muted">Country</dt>
                <dd className="t-body-m mt-1 text-ink md:text-base">{country}</dd>
              </div>
            </dl>

            <ul className="grid gap-3 lg:grid-cols-3 lg:gap-4">
              {sections.map((s) => (
                <li key={s.title}>
                  <Link
                    href={s.href}
                    className="flex h-full items-center gap-4 rounded-lg border border-line bg-white p-4 transition hover:border-forest/40 md:rounded-xl md:p-5 lg:flex-col lg:items-start lg:gap-3 lg:p-6"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-sand text-forest">
                      <Icon name={s.icon} size={20} />
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="t-body-m text-ink">{s.title}</span>
                      <span className="t-cap text-muted">{s.text}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            <form action="/auth/signout" method="post" className="md:hidden">
              <button
                type="submit"
                className="t-body-m flex h-[52px] w-full items-center justify-center gap-2 rounded-full border border-line bg-white text-ink"
              >
                <Icon name="logout" size={18} />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
