"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { type CardProduct, sellerBadge } from "@/lib/catalog-types";
import { formatGHS } from "@/lib/format";
import { Icon } from "./icons";

/** Card/Product — one card for every seller type. Tapping the photo or name opens the product page. */
export function ProductCard({ product, priority = false }: { product: CardProduct; priority?: boolean }) {
  const [saved, setSaved] = useState(false);
  const b = sellerBadge[product.sellerType];
  const href = `/p/${product.slug}`;

  return (
    <article className="group relative flex w-full flex-col gap-3">
      <div className="relative aspect-[171/214] w-full overflow-hidden rounded-lg bg-sand">
        <Link href={href} aria-label={product.title} className="absolute inset-0">
          {product.coverUrl && (
            <Image
              src={product.coverUrl}
              alt={product.title}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 300px"
              priority={priority}
              className={`object-cover transition duration-500 md:group-hover:scale-[1.03] ${
                product.soldOut ? "opacity-60 grayscale-[40%]" : ""
              }`}
            />
          )}
        </Link>
        <span className={`t-over pointer-events-none absolute top-2.5 left-2.5 rounded-[6px] px-2 py-[5px] ${b.className}`}>
          {b.label}
        </span>
        {product.soldOut && (
          <span className="t-over pointer-events-none absolute bottom-2.5 left-2.5 rounded-[6px] bg-ink px-2 py-[5px] text-on-brand">
            Sold out
          </span>
        )}
        <button
          type="button"
          onClick={() => setSaved((s) => !s)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.title} from favourites` : `Save ${product.title} to favourites`}
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
          <span className="t-cap text-muted">{product.shopName}</span>
        </p>
        <h3 className="t-body-m text-ink">
          <Link href={href} className="hover:text-forest">
            {product.title}
          </Link>
        </h3>
        <p className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-0.5">
          <span className="flex flex-wrap items-baseline gap-x-1.5">
            <span className="t-price whitespace-nowrap text-ink">{formatGHS(product.pricePesewas)}</span>
            {product.compareAtPesewas && (
              <span className="t-cap whitespace-nowrap text-muted line-through">
                {formatGHS(product.compareAtPesewas)}
              </span>
            )}
          </span>
          <span className="t-cap whitespace-nowrap text-muted">{product.sizeLabel}</span>
        </p>
      </div>
    </article>
  );
}
