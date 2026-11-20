import Link from "next/link";
import { Icon, type IconName } from "./icons";

/**
  Category/Tile — round icon with a label underneath.
  Phones: the approved 62px circle. Tablets and laptops: a white card with a larger icon.
*/
export function CategoryTile({ label, icon, href }: { label: string; icon: IconName; href: string }) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center gap-2 md:w-full md:gap-3 md:rounded-xl md:border md:border-line md:bg-white md:py-6 md:transition md:hover:border-forest/40 md:hover:shadow-[0_8px_24px_rgba(23,22,20,0.06)] lg:py-8"
    >
      <span className="flex size-[62px] items-center justify-center rounded-full border border-line bg-white text-forest transition active:scale-95 md:size-16 md:border-0 md:bg-cream lg:size-20">
        <Icon name={icon} size={26} className="lg:size-8" />
      </span>
      <span className="t-cap-m text-ink md:text-sm md:leading-5">{label}</span>
    </Link>
  );
}
