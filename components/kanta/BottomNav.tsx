"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon, type IconName } from "./icons";

type Item = { label: string; href: string; icon: IconName };

const left: Item[] = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Explore", href: "/explore", icon: "explore" },
];
const right: Item[] = [
  { label: "Favourites", href: "/favourites", icon: "heart" },
  { label: "Profile", href: "/account", icon: "user" },
];

function NavItem({ item, active }: { item: Item; active: boolean }) {
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={`flex w-16 flex-col items-center gap-1 ${active ? "text-forest" : "text-muted"}`}
    >
      <Icon name={item.icon} size={24} />
      <span className={active ? "t-nav-active" : "t-nav"}>{item.label}</span>
    </Link>
  );
}

/** Nav/Bottom Bar — Home, Explore, Sell (raised primary action), Favourites, Profile. */
export function BottomNav() {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 mx-auto w-full max-w-[480px] border-t border-line bg-white px-3.5 pt-2.5 pb-[max(14px,env(safe-area-inset-bottom))] shadow-[0_-4px_20px_rgba(23,22,20,0.06)]"
    >
      <ul className="flex items-end justify-between">
        {left.map((item) => (
          <li key={item.href}>
            <NavItem item={item} active={isActive(item.href)} />
          </li>
        ))}
        <li>
          <Link href="/sell" className="flex w-16 flex-col items-center gap-1 text-ink">
            <span className="flex size-[50px] items-center justify-center rounded-full bg-forest text-on-brand shadow-[0_6px_14px_rgba(30,58,43,0.28)] ring-4 ring-white">
              <Icon name="plus" size={24} />
            </span>
            <span className="t-nav-active">Sell</span>
          </Link>
        </li>
        {right.map((item) => (
          <li key={item.href}>
            <NavItem item={item} active={isActive(item.href)} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
