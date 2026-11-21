"use client";

import type { Listing } from "@/lib/catalog-types";
import { useSavedIds } from "./Favourites";
import { ProductCard } from "./ProductCard";

/** "3 saved pieces" — updates straight away when a heart is tapped. */
export function FavouritesCount({ items }: { items: string[] }) {
  const saved = useSavedIds();
  const n = items.filter((id) => saved.has(id)).length;
  return <p className="t-body text-muted">{n === 1 ? "1 saved piece" : `${n} saved pieces`}</p>;
}

/** Saved pieces, newest first. Tapping a filled heart removes the piece from the list. */
export function FavouritesGrid({ items, empty }: { items: Listing[]; empty: React.ReactNode }) {
  const saved = useSavedIds();
  const shown = items.filter((p) => saved.has(p.id));
  if (shown.length === 0) return <>{empty}</>;

  return (
    <div className="grid grid-cols-2 gap-x-2 gap-y-6 md:grid-cols-3 md:gap-x-5 md:gap-y-10 lg:grid-cols-4 lg:gap-x-6">
      {shown.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < 4} />
      ))}
    </div>
  );
}
