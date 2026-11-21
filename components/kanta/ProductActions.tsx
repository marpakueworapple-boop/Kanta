"use client";

import Link from "next/link";
import { useState } from "react";
import { useFavourite } from "./Favourites";
import { Icon } from "./icons";

/**
  Size picker + "Add to bag" + save.
  The bag itself arrives in Phase 4, so for now the button confirms the size and explains that.
*/
export function ProductActions({
  productId,
  title,
  variants,
  soldOut,
  madeToOrderDays,
}: {
  productId: string;
  title: string;
  variants: { size: string; stock: number }[];
  soldOut: boolean;
  madeToOrderDays: number | null;
}) {
  const single = variants.length === 1 ? variants[0] : null;
  const [size, setSize] = useState<string | null>(single && single.stock > 0 ? single.size : null);
  const { saved, toggle } = useFavourite(productId, title);
  const [message, setMessage] = useState<string | null>(null);

  function addToBag() {
    if (!size) {
      setMessage("Please choose a size first.");
      return;
    }
    setMessage(`Size ${size} noted. The bag opens in Phase 4 of the Kanta build — check back soon.`);
  }

  return (
    <div className="flex flex-col gap-5">
      {!single || single.size !== "One size" ? (
        <fieldset className="flex flex-col gap-2.5">
          <legend className="t-label mb-2.5 text-ink">
            Size{size ? <span className="font-normal text-muted"> · {size}</span> : null}
          </legend>
          <div className="flex flex-wrap gap-2">
            {variants.map((v) => {
              const out = v.stock <= 0;
              const active = size === v.size;
              return (
                <button
                  key={v.size}
                  type="button"
                  disabled={out}
                  onClick={() => {
                    setSize(v.size);
                    setMessage(null);
                  }}
                  aria-pressed={active}
                  className={`t-label min-w-[52px] rounded-md border px-3.5 py-2.5 transition ${
                    active
                      ? "border-forest bg-forest text-on-brand"
                      : out
                        ? "cursor-not-allowed border-line bg-ivory text-muted line-through"
                        : "border-line bg-white text-ink hover:border-forest/50"
                  }`}
                >
                  {v.size}
                </button>
              );
            })}
          </div>
          {variants.some((v) => v.stock === 1) && (
            <p className="t-cap text-clay">Only 1 left in some sizes</p>
          )}
        </fieldset>
      ) : (
        <p className="t-label text-ink">
          Size <span className="font-normal text-muted">· One size</span>
        </p>
      )}

      {madeToOrderDays && (
        <p className="t-cap flex items-center gap-1.5 text-muted">
          <Icon name="verified" size={14} className="text-gold" />
          Made to order — ready in about {madeToOrderDays} days
        </p>
      )}

      <div className="flex gap-2.5">
        <button
          type="button"
          onClick={addToBag}
          disabled={soldOut}
          className="t-body-m flex h-[52px] flex-1 items-center justify-center gap-2 rounded-full bg-forest text-on-brand transition hover:bg-forest-soft active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-muted"
        >
          <Icon name="bag" size={18} />
          {soldOut ? "Sold out" : "Add to bag"}
        </button>
        <button
          type="button"
          onClick={toggle}
          aria-pressed={saved}
          aria-label={saved ? "Remove from favourites" : "Save to favourites"}
          className={`flex size-[52px] shrink-0 items-center justify-center rounded-full border border-line bg-white transition hover:border-forest/40 ${
            saved ? "text-clay" : "text-ink"
          }`}
        >
          <Icon name="heart" size={20} filled={saved} />
        </button>
      </div>

      {message && (
        <p role="status" className="t-cap rounded-md bg-sand px-3 py-2 text-ink">
          {message}{" "}
          {message.startsWith("Size") && (
            <Link href="/explore" className="text-forest underline underline-offset-2">
              Keep browsing
            </Link>
          )}
        </p>
      )}
    </div>
  );
}
