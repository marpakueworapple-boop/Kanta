import Link from "next/link";
import { Icon } from "./icons";
import { Logo } from "./Logo";

/** Top bar: logo, notifications (clay dot = unread), bag with item count. */
export function Header({ bagCount = 0, hasUnread = false }: { bagCount?: number; hasUnread?: boolean }) {
  return (
    <header className="flex items-center justify-between px-5 pt-4 pb-1.5">
      <Link href="/" aria-label="Kanta home">
        <Logo />
      </Link>
      <div className="flex items-center gap-2.5">
        <Link
          href="/notifications"
          aria-label={hasUnread ? "Notifications, unread" : "Notifications"}
          className="relative flex size-[42px] items-center justify-center rounded-full border border-line bg-white text-ink"
        >
          <Icon name="bell" size={20} />
          {hasUnread && (
            <span className="absolute top-[9px] right-[8px] size-[9px] rounded-full border-2 border-white bg-clay" />
          )}
        </Link>
        <Link
          href="/bag"
          aria-label={`Bag, ${bagCount} items`}
          className="relative flex size-[42px] items-center justify-center rounded-full border border-line bg-white text-ink"
        >
          <Icon name="bag" size={20} />
          {bagCount > 0 && (
            <span className="absolute -top-[3px] -right-[3px] flex size-[18px] items-center justify-center rounded-full bg-forest text-[10px] font-bold text-on-brand">
              {bagCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
