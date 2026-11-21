import type { Metadata } from "next";
import Link from "next/link";
import { AppShell } from "@/components/kanta/AppShell";
import { ActiveFilters, FilterGroups, SellerTypeLinks, SortLinks } from "@/components/kanta/ExploreFilters";
import { Header } from "@/components/kanta/Header";
import { Icon } from "@/components/kanta/icons";
import { ProductCard } from "@/components/kanta/ProductCard";
import { SearchBar } from "@/components/kanta/SearchBar";
import { getCategories, parseFilters, searchListings } from "@/lib/catalog";
import { sellerTypeLabel } from "@/lib/catalog-types";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const f = parseFilters(await searchParams);
  return { title: f.q ? `“${f.q}” — Kanta` : "Explore — Kanta" };
}

/** Explore: search results, seller-type chips, filters and sorting — all driven by the address bar. */
export default async function ExplorePage({ searchParams }: Props) {
  const filters = parseFilters(await searchParams);
  const [{ items, total }, categories] = await Promise.all([searchListings(filters), getCategories()]);

  const categoryName = categories.find((c) => c.slug === filters.category)?.name;
  const heading = filters.q
    ? `Results for “${filters.q}”`
    : categoryName
      ? categoryName
      : filters.type
        ? `${sellerTypeLabel[filters.type]} sellers`
        : "Explore";
  const filterCount =
    (filters.category ? 1 : 0) +
    (filters.minCedis !== undefined || filters.maxCedis !== undefined ? 1 : 0) +
    (filters.condition ? 1 : 0);

  return (
    <AppShell>
      <Header bagCount={2} hasUnread query={filters.q} />

      <div className="k-container pt-4 md:pt-8">
        {/* Search — phones (tablets and laptops use the header search) */}
        <div className="pb-4 md:hidden">
          <SearchBar defaultValue={filters.q} />
        </div>

        <div className="flex flex-col gap-1 md:gap-2">
          <h1 className="t-h1 text-ink md:text-[40px] md:leading-[46px]">{heading}</h1>
          <p className="t-body text-muted" aria-live="polite">
            {total} {total === 1 ? "piece" : "pieces"}
          </p>
        </div>

        <div className="flex flex-col gap-3 pt-4 md:pt-6">
          <SellerTypeLinks filters={filters} />
          <ActiveFilters filters={filters} categories={categories} />
        </div>

        <div className="flex flex-col gap-6 pt-5 md:pt-8 lg:grid lg:grid-cols-[220px_1fr] lg:gap-10">
          {/* Filters: sidebar on laptops */}
          <aside aria-label="Filters" className="hidden lg:block">
            <div className="sticky top-36">
              <FilterGroups filters={filters} categories={categories} />
            </div>
          </aside>

          <div className="flex min-w-0 flex-col gap-5">
            {/* Filters + sort: folded on phones and tablets */}
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-end">
              <details className="group rounded-lg border border-line bg-white lg:hidden">
                <summary className="t-label flex cursor-pointer list-none items-center justify-between px-4 py-3 text-ink">
                  <span className="flex items-center gap-2">
                    <Icon name="sliders" size={18} className="text-forest" />
                    Filters{filterCount > 0 ? ` (${filterCount})` : ""}
                  </span>
                  <span aria-hidden="true" className="text-muted transition group-open:rotate-180">
                    ⌄
                  </span>
                </summary>
                <div className="border-t border-line px-4 py-5">
                  <FilterGroups filters={filters} categories={categories} />
                </div>
              </details>
              <SortLinks filters={filters} />
            </div>

            {items.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-2 gap-y-6 md:grid-cols-3 md:gap-x-5 md:gap-y-10 xl:grid-cols-4 xl:gap-x-6">
                {items.map((p, i) => (
                  <ProductCard key={p.slug} product={p} priority={i < 4} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-white px-6 py-14 text-center">
                <span className="flex size-14 items-center justify-center rounded-full bg-sand text-forest">
                  <Icon name="search" size={24} />
                </span>
                <p className="t-h2 text-ink">No pieces match yet</p>
                <p className="t-body max-w-sm text-muted">
                  Try a different word, remove a filter, or browse everything on Kanta.
                </p>
                <Link href="/explore" className="t-label rounded-full bg-forest px-5 py-2.5 text-on-brand">
                  Browse all pieces
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
