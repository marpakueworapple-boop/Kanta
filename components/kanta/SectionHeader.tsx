import Link from "next/link";
import { Icon } from "./icons";

/** Section/Header — Fraunces title with a "See all →" action. */
export function SectionHeader({
  title,
  action = "See all",
  href = "/explore",
}: {
  title: string;
  action?: string;
  href?: string;
}) {
  return (
    <div className="flex w-full items-center justify-between">
      <h2 className="t-h2 text-ink md:text-[26px] md:leading-8">{title}</h2>
      <Link href={href} className="t-label inline-flex items-center gap-1 text-forest">
        {action}
        <Icon name="arrow" size={16} />
      </Link>
    </div>
  );
}
