"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product, SellerType } from "@/lib/sample-data";
import { formatGHS } from "@/lib/format";
import { Icon } from "./icons";

/* Badge colours: Pre-loved (clay), New (forest), Designer (gold) — as approved in Figma */
const badge: Record<SellerType, { label: string; className: string }> = {
  thrift: { label: "Pre-loved", className: "bg-clay text-on-brand" },
  boutique: { label: "New", className: "bg-forest text-on-brand" },
  designer: { label: "Designer", className: "bg-gold text-ink" },
};

/** Card/Product — one card for every seller type. */
export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const [saved, setSaved] = useState(false);
  const b = badge[product.sellerType];

  return (
    <article className="group flex w-full flex-col gap-3">
      <div className="relative aspect-[171/214] w-full overflow-hidden rounded-lg bg-sand">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 300px"
          placeholder="blur"
          priority={priority}
          className="object-cover transition duration-500 md:group-hover:scale-[1.03]"
        />
        <span className={`t-over absolute top-2.5 left-2.5 rounded-[6px] px-2 py-[5px] ${b.className}`}>
          {b.label}
        </span>
        <button
          type="button"
          onClick={() => setSaved((s) => !s)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.name} from favourites` : `Save ${product.name} to favourites`}
          className={`absolute top-2.5 right-2.5 flex size-8 items-center justify-center rounded-full bg-white/90 transition active:scale-90 ${
            saved ? "text-clay" : "text-ink"
          }`}
        >
          <Icon name="heart" size={17} filled={saved} />
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <p className="flex items-center gap-1">
          <Icon name="verified" size={13} className="text-clay" />
          <span className="t-cap text-muted">{product.seller}</span>
        </p>
        <h3 className="t-body-m text-ink">{product.name}</h3>
        <p className="flex items-center justify-between">
          <span className="t-price text-ink">{formatGHS(product.pricePesewas)}</span>
          <span className="t-cap text-muted">{product.meta}</span>
        </p>
      </div>
    </article>
  );
}
