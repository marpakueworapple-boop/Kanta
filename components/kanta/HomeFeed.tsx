"use client";

import { useState } from "react";
import type { Product, SellerType } from "@/lib/sample-data";
import { Chip } from "./Chip";
import { ProductCard } from "./ProductCard";
import { SectionHeader } from "./SectionHeader";
import { SellPromoCard } from "./SellPromoCard";

type Filter = "all" | SellerType;

const filters: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "thrift", label: "Thrift" },
  { key: "boutique", label: "Boutiques" },
  { key: "designer", label: "Designers" },
];

/** The seller-type chips and the "Fresh finds" grid share state, so tapping a chip filters the grid. */
export function SellerTypeChips({ value, onChange }: { value: Filter; onChange: (f: Filter) => void }) {
  return (
    <div
      className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
      role="group"
      aria-label="Seller type"
    >
      {filters.map((f) => (
        <Chip key={f.key} label={f.label} active={value === f.key} onClick={() => onChange(f.key)} />
      ))}
    </div>
  );
}

/**
  Home body: chips → (hero + categories, rendered on the server) → Fresh finds.
  The chips and the product grid share one "filter" value.
*/
export function HomeBody({ products, middle }: { products: Product[]; middle: React.ReactNode }) {
  const [filter, setFilter] = useState<Filter>("all");
  return (
    <>
      <div className="k-container pt-4 md:pt-6">
        <SellerTypeChips value={filter} onChange={setFilter} />
      </div>
      {middle}
      <div className="k-container pt-8 md:pt-14">
        <FreshFinds products={products} filter={filter} />
      </div>
    </>
  );
}

/** Product grid: 2 columns on phones, 3 on tablets, 4 on laptops and desktops. */
export function FreshFinds({ products, filter }: { products: Product[]; filter: Filter }) {
  const shown = filter === "all" ? products : products.filter((p) => p.sellerType === filter);

  return (
    <section aria-labelledby="fresh-finds" className="flex flex-col gap-4 md:gap-6">
      <div id="fresh-finds">
        <SectionHeader title="Fresh finds" />
      </div>
      <div className="grid grid-cols-2 gap-x-2 gap-y-6 md:grid-cols-3 md:gap-x-5 md:gap-y-10 lg:grid-cols-4 lg:gap-x-6">
        {shown.map((p, i) => (
          <ProductCard key={p.id} product={p} priority={i < 2} />
        ))}
        <SellPromoCard />
      </div>
      {shown.length === 0 && <p className="t-body text-muted">No items from this seller type yet.</p>}
    </section>
  );
}
