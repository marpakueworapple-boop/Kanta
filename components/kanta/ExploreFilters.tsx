import Link from "next/link";
import type { SearchFilters } from "@/lib/catalog";
import type { Category } from "@/lib/catalog-types";
import { exploreHref, priceRanges, sortOptions } from "@/lib/explore-url";

const sellerTypes = [
  { key: undefined, label: "All" },
  { key: "thrift", label: "Thrift" },
  { key: "boutique", label: "Boutiques" },
  { key: "designer", label: "Designers" },
] as const;

/** Seller-type chips as links (same look as Chip/Filter). */
export function SellerTypeLinks({ filters }: { filters: SearchFilters }) {
  return (
    <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:px-0" role="group" aria-label="Seller type">
      {sellerTypes.map((t) => {
        const active = filters.type === t.key;
        return (
          <Link
            key={t.label}
            href={exploreHref(filters, { type: t.key })}
            aria-current={active ? "true" : undefined}
            className={`t-label shrink-0 rounded-full px-4 py-[9px] transition ${
              active ? "bg-forest text-on-brand" : "border border-line bg-white text-ink hover:border-forest/40"
            }`}
          >
            {t.label}
          </Link>
        );
      })}
    </div>
  );
}

function Option({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <li>
      <Link
        href={href}
        aria-current={active ? "true" : undefined}
        className={`t-body flex items-center justify-between rounded-md px-2 py-1.5 transition hover:bg-sand ${
          active ? "font-medium text-forest" : "text-ink"
        }`}
      >
        {children}
        {active && <span aria-hidden="true" className="size-1.5 rounded-full bg-clay" />}
      </Link>
    </li>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <p className="t-over text-muted">{title}</p>
      <ul className="-mx-2 flex flex-col">{children}</ul>
    </div>
  );
}

/** The filter groups — shown in a sidebar on laptops and inside "Filters" on phones and tablets. */
export function FilterGroups({ filters, categories }: { filters: SearchFilters; categories: Category[] }) {
  const tops = categories.filter((c) => !c.parentSlug);
  const selected = categories.find((c) => c.slug === filters.category);
  const topSlug = selected ? (selected.parentSlug ?? selected.slug) : undefined;
  const subs = topSlug ? categories.filter((c) => c.parentSlug === topSlug) : [];

  return (
    <div className="flex flex-col gap-7">
      <Group title="Category">
        <Option href={exploreHref(filters, { category: undefined })} active={!filters.category}>
          All categories
        </Option>
        {tops.map((c) => (
          <li key={c.slug}>
            <Link
              href={exploreHref(filters, { category: c.slug })}
              aria-current={filters.category === c.slug ? "true" : undefined}
              className={`t-body flex items-center justify-between rounded-md px-2 py-1.5 transition hover:bg-sand ${
                topSlug === c.slug ? "font-medium text-forest" : "text-ink"
              }`}
            >
              {c.name}
              {filters.category === c.slug && <span aria-hidden="true" className="size-1.5 rounded-full bg-clay" />}
            </Link>
            {topSlug === c.slug && subs.length > 0 && (
              <ul className="ml-3 flex flex-col border-l border-line pl-2">
                {subs.map((s) => (
                  <Option key={s.slug} href={exploreHref(filters, { category: s.slug })} active={filters.category === s.slug}>
                    {s.name}
                  </Option>
                ))}
              </ul>
            )}
          </li>
        ))}
      </Group>

      <Group title="Price">
        <Option
          href={exploreHref(filters, { minCedis: undefined, maxCedis: undefined })}
          active={filters.minCedis === undefined && filters.maxCedis === undefined}
        >
          Any price
        </Option>
        {priceRanges.map((r) => (
          <Option
            key={r.label}
            href={exploreHref(filters, { minCedis: r.min, maxCedis: r.max })}
            active={filters.minCedis === r.min && filters.maxCedis === r.max}
          >
            {r.label}
          </Option>
        ))}
      </Group>

      <Group title="Condition">
        <Option href={exploreHref(filters, { condition: undefined })} active={!filters.condition}>
          Any condition
        </Option>
        <Option href={exploreHref(filters, { condition: "new" })} active={filters.condition === "new"}>
          New
        </Option>
        <Option href={exploreHref(filters, { condition: "preloved" })} active={filters.condition === "preloved"}>
          Pre-loved
        </Option>
      </Group>
    </div>
  );
}

export function SortLinks({ filters }: { filters: SearchFilters }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2" role="group" aria-label="Sort">
      <span className="t-cap text-muted">Sort:</span>
      {sortOptions.map((o) => (
        <Link
          key={o.key}
          href={exploreHref(filters, { sort: o.key })}
          aria-current={filters.sort === o.key ? "true" : undefined}
          className={`t-cap-m transition hover:text-forest ${
            filters.sort === o.key ? "text-forest underline decoration-clay decoration-2 underline-offset-4" : "text-ink"
          }`}
        >
          {o.label}
        </Link>
      ))}
    </div>
  );
}

/** Active filters as removable chips, e.g. "Bags ×". */
export function ActiveFilters({ filters, categories }: { filters: SearchFilters; categories: Category[] }) {
  const chips: { label: string; href: string }[] = [];
  if (filters.q) chips.push({ label: `“${filters.q}”`, href: exploreHref(filters, { q: undefined }) });
  if (filters.category) {
    const c = categories.find((x) => x.slug === filters.category);
    chips.push({ label: c?.name ?? filters.category, href: exploreHref(filters, { category: undefined }) });
  }
  if (filters.minCedis !== undefined || filters.maxCedis !== undefined) {
    const r = priceRanges.find((p) => p.min === filters.minCedis && p.max === filters.maxCedis);
    chips.push({
      label: r?.label ?? `GH₵ ${filters.minCedis ?? 0} – ${filters.maxCedis ?? "+"}`,
      href: exploreHref(filters, { minCedis: undefined, maxCedis: undefined }),
    });
  }
  if (filters.condition)
    chips.push({ label: filters.condition === "new" ? "New" : "Pre-loved", href: exploreHref(filters, { condition: undefined }) });
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {chips.map((c) => (
        <Link
          key={c.label}
          href={c.href}
          aria-label={`Remove filter ${c.label}`}
          className="t-cap-m inline-flex items-center gap-1.5 rounded-full bg-sand py-1.5 pr-2.5 pl-3 text-ink transition hover:bg-line"
        >
          {c.label}
          <span aria-hidden="true" className="text-muted">
            ×
          </span>
        </Link>
      ))}
      <Link href="/explore" className="t-cap-m px-1 text-forest underline underline-offset-4">
        Clear all
      </Link>
    </div>
  );
}
