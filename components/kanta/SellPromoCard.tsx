import Link from "next/link";
import { Icon } from "./icons";

/**
  Promo — Sell on Kanta. Sits in the product grid next to the products.
  Phones and laptops: a card the size of a product. Tablets (3-column grid): a wide banner
  across the row, so it never sits alone in a half-empty row.
*/
export function SellPromoCard() {
  return (
    <div className="flex h-full min-h-[300px] w-full flex-col justify-between gap-6 rounded-lg bg-forest px-4 pt-[18px] pb-4 md:col-span-3 md:min-h-0 md:flex-row md:items-center md:rounded-xl md:p-8 lg:col-span-1 lg:min-h-[300px] lg:flex-col lg:items-stretch lg:rounded-lg lg:px-5 lg:pt-6 lg:pb-5">
      <div className="flex flex-col gap-2.5 md:max-w-md lg:max-w-none">
        <p className="t-over text-gold">Sell on Kanta</p>
        <p className="t-hero text-on-brand md:text-[28px] md:leading-[34px] lg:text-[26px] lg:leading-[32px]">
          Turn your closet into cash.
        </p>
        <p className="t-cap text-on-brand/80 md:text-sm md:leading-5">
          Thrift sellers, boutiques and designers — list an item in under 2 minutes.
        </p>
      </div>
      <Link
        href="/sell"
        className="t-label flex shrink-0 items-center justify-center gap-1.5 rounded-full bg-cream py-2.5 text-forest transition hover:bg-white active:scale-[0.98] md:px-6 md:py-3 lg:px-0 lg:py-2.5"
      >
        Start selling
        <Icon name="arrow" size={16} />
      </Link>
    </div>
  );
}
