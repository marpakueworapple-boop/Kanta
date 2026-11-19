import Link from "next/link";
import { Icon } from "./icons";

/** Promo — Sell on Kanta. Sits in the product grid next to the products. */
export function SellPromoCard() {
  return (
    <div className="flex h-full min-h-[300px] w-full flex-col justify-between rounded-lg bg-forest px-4 pt-[18px] pb-4">
      <div className="flex flex-col gap-2.5">
        <p className="t-over text-gold">Sell on Kanta</p>
        <p className="t-hero text-on-brand">Turn your closet into cash.</p>
        <p className="t-cap text-on-brand/80">
          Thrift sellers, boutiques and designers — list an item in under 2 minutes.
        </p>
      </div>
      <Link
        href="/sell"
        className="t-label flex items-center justify-center gap-1.5 rounded-full bg-cream py-2.5 text-forest transition active:scale-[0.98]"
      >
        Start selling
        <Icon name="arrow" size={16} />
      </Link>
    </div>
  );
}
