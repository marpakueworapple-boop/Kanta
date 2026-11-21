import type { SearchFilters } from "./catalog";

/** Builds an /explore address from the current filters plus a change (undefined removes a filter). */
export function exploreHref(current: SearchFilters, change: Partial<Record<keyof SearchFilters, string | number | undefined>>) {
  const merged: Record<string, string | number | undefined> = {
    q: current.q,
    type: current.type,
    category: current.category,
    min: current.minCedis,
    max: current.maxCedis,
    condition: current.condition,
    sort: current.sort === "newest" ? undefined : current.sort,
  };
  const keyMap: Partial<Record<keyof SearchFilters, string>> = { minCedis: "min", maxCedis: "max" };
  for (const [k, v] of Object.entries(change)) merged[keyMap[k as keyof SearchFilters] ?? k] = v;
  if (merged.sort === "newest") merged.sort = undefined;

  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(merged)) if (v !== undefined && v !== "") params.set(k, String(v));
  const qs = params.toString();
  return qs ? `/explore?${qs}` : "/explore";
}

export const priceRanges: { label: string; min?: number; max?: number }[] = [
  { label: "Under GH₵ 100", max: 100 },
  { label: "GH₵ 100 – 300", min: 100, max: 300 },
  { label: "GH₵ 300 – 600", min: 300, max: 600 },
  { label: "Over GH₵ 600", min: 600 },
];

export const sortOptions: { key: NonNullable<SearchFilters["sort"]>; label: string }[] = [
  { key: "newest", label: "Newest" },
  { key: "price_asc", label: "Price: low to high" },
  { key: "price_desc", label: "Price: high to low" },
];
