import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/kanta/AppShell";
import { Header } from "@/components/kanta/Header";
import { Icon } from "@/components/kanta/icons";
import { ProductCard } from "@/components/kanta/ProductCard";
import { getShop, searchListings } from "@/lib/catalog";
import { sellerBadge, sellerTypeLabel } from "@/lib/catalog-types";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const shop = await getShop((await params).slug);
  return { title: shop ? `${shop.name} — Kanta` : "Shop not found — Kanta", description: shop?.bio ?? undefined };
}

/** A seller's shop: who they are, their badge, and everything they're selling. */
export default async function ShopPage({ params }: Props) {
  const slug = (await params).slug;
  const shop = await getShop(slug);
  if (!shop) notFound();
  const { items, total } = await searchListings({ shop: slug, sort: "newest" });
  const badge = sellerBadge[shop.sellerType];
  const since = new Date(shop.createdAt).toLocaleDateString("en-GH", { month: "long", year: "numeric" });

  return (
    <AppShell>
      <Header bagCount={2} hasUnread />
      <div className="k-container pt-6 md:pt-10">
        <section className="flex flex-col gap-5 rounded-2xl border border-line bg-white p-5 md:flex-row md:items-center md:gap-8 md:p-8">
          <span className="flex size-16 shrink-0 items-center justify-center rounded-full bg-forest font-display text-[28px] text-on-brand md:size-24 md:text-[40px]">
            {shop.name.charAt(0)}
          </span>
          <div className="flex flex-1 flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="t-h1 text-ink md:text-[36px] md:leading-[42px]">{shop.name}</h1>
              <span className={`t-over rounded-[6px] px-2 py-[5px] ${badge.className}`}>{badge.label}</span>
            </div>
            <p className="t-cap flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
              {shop.verified && (
                <span className="flex items-center gap-1 text-ink">
                  <Icon name="verified" size={14} className="text-clay" /> Verified seller
                </span>
              )}
              <span>{sellerTypeLabel[shop.sellerType]} shop</span>
              {shop.city && <span>{shop.city}</span>}
              <span>On Kanta since {since}</span>
            </p>
            {shop.bio && <p className="t-body max-w-2xl text-muted">{shop.bio}</p>}
          </div>
        </section>

        <div className="flex items-baseline justify-between pt-8 md:pt-12">
          <h2 className="t-h2 text-ink md:text-[26px] md:leading-8">Pieces from this shop</h2>
          <p className="t-cap text-muted">
            {total} {total === 1 ? "piece" : "pieces"}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-2 gap-y-6 pt-4 md:grid-cols-3 md:gap-x-5 md:gap-y-10 md:pt-6 lg:grid-cols-4 lg:gap-x-6">
          {items.map((p, i) => (
            <ProductCard key={p.slug} product={p} priority={i < 4} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
