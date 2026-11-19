import { AppShell } from "@/components/kanta/AppShell";
import { CategoryTile } from "@/components/kanta/CategoryTile";
import { Header } from "@/components/kanta/Header";
import { HeroBanner } from "@/components/kanta/HeroBanner";
import { HomeBody } from "@/components/kanta/HomeFeed";
import { SearchBar } from "@/components/kanta/SearchBar";
import { SectionHeader } from "@/components/kanta/SectionHeader";
import { TrustCard } from "@/components/kanta/TrustCard";
import { sampleProducts } from "@/lib/sample-data";
import { createClient } from "@/lib/supabase/server";

const categories = [
  { label: "Men", icon: "men", href: "/explore?category=men" },
  { label: "Women", icon: "women", href: "/explore?category=women" },
  { label: "Shoes", icon: "shoes", href: "/explore?category=shoes" },
  { label: "Bags", icon: "bags", href: "/explore?category=bags" },
  { label: "Accessories", icon: "accessories", href: "/explore?category=accessories" },
] as const;

async function getFirstName(): Promise<string | null> {
  try {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    if (!data.user) return null;
    const { data: profile } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", data.user.id)
      .maybeSingle();
    const name = (profile?.full_name as string | null | undefined)?.trim();
    return name ? name.split(" ")[0] : null;
  } catch {
    return null;
  }
}

export default async function HomePage() {
  const firstName = await getFirstName();

  return (
    <AppShell>
      <Header bagCount={2} hasUnread />

      {/* Greeting */}
      <section className="flex flex-col gap-1.5 px-5 pt-[18px]">
        <p className="t-body text-muted">{firstName ? `Akwaaba, ${firstName}` : "Akwaaba"}</p>
        <h1 className="t-h1 text-ink">
          Find pieces with
          <br />
          <em className="font-semibold text-clay">a story.</em>
        </h1>
      </section>

      {/* Search */}
      <div className="px-5 pt-5">
        <SearchBar />
      </div>

      <HomeBody
        products={sampleProducts}
        middle={
          <>
            <div className="px-5 pt-6">
              <HeroBanner />
            </div>

            <section aria-labelledby="categories" className="flex flex-col gap-4 px-5 pt-7">
              <div id="categories">
                <SectionHeader title="Shop by category" />
              </div>
              <div className="flex justify-between">
                {categories.map((c) => (
                  <CategoryTile key={c.label} label={c.label} icon={c.icon} href={c.href} />
                ))}
              </div>
            </section>
          </>
        }
      />

      <div className="px-5 pt-7">
        <TrustCard />
      </div>
    </AppShell>
  );
}
