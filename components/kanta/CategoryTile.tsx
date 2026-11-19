import Link from "next/link";
import { Icon, type IconName } from "./icons";

/** Category/Tile — round icon with a label underneath. */
export function CategoryTile({ label, icon, href }: { label: string; icon: IconName; href: string }) {
  return (
    <Link href={href} className="flex flex-col items-center gap-2">
      <span className="flex size-[62px] items-center justify-center rounded-full border border-line bg-white text-forest transition active:scale-95">
        <Icon name={icon} size={26} />
      </span>
      <span className="t-cap-m text-ink">{label}</span>
    </Link>
  );
}
