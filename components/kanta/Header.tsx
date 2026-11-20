"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "./icons";
import { Logo } from "./Logo";
import { SearchBar } from "./SearchBar";

const mainLinks = [
  { label: "Explore", href: "/explore" },
  { label: "Thrift", href: "/explore?type=thrift" },
  { label: "Boutiques", href: "/explore?type=boutique" },
  { label: "Designers", href: "/explore?type=designer" },
];

const categoryLinks = [
  { label: "Men", href: "/explore?category=men" },
  { label: "Women", href: "/explore?category=women" },
  { label: "Shoes", href: "/explore?category=shoes" },
  { label: "Bags", href: "/explore?category=bags" },
  { label: "Accessories", href: "/explore?category=accessories" },
];

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="relative flex size-[42px] items-center justify-center rounded-full border border-line bg-white text-ink transition hover:border-forest/40"
    >
      {children}
    </Link>
  );
}

/**
  Top bar.
  - Phones: logo + notifications + bag (the approved mobile design).
  - Tablets: adds the search bar and a profile button; the header stays at the top while scrolling.
  - Laptops: adds main links, a "Sell" button and a category bar underneath.
*/
export function Header({ bagCount = 0, hasUnread = false }: { bagCount?: number; hasUnread?: boolean }) {
  const pathname = usePathname();

  return (
    <header className="bg-cream md:sticky md:top-0 md:z-30 md:border-b md:border-line md:bg-cream/95 md:backdrop-blur">
      <div className="k-container flex items-center justify-between gap-6 pt-4 pb-1.5 md:py-4">
        <Link href="/" aria-label="Kanta home" className="shrink-0">
          <Logo />
        </Link>

        <div className="hidden min-w-0 flex-1 md:block lg:max-w-[440px] xl:max-w-[520px]">
          <SearchBar compact />
        </div>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {mainLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`t-label whitespace-nowrap transition hover:text-forest ${
                pathname === l.href ? "text-forest" : "text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2.5">
          <Link
            href="/sell"
            className="t-label hidden items-center gap-1.5 rounded-full bg-forest py-2.5 pr-4 pl-3.5 text-on-brand transition hover:bg-forest-soft lg:inline-flex"
          >
            <Icon name="plus" size={16} />
            Sell
          </Link>
          <IconLink href="/notifications" label={hasUnread ? "Notifications, unread" : "Notifications"}>
            <Icon name="bell" size={20} />
            {hasUnread && (
              <span className="absolute top-[9px] right-[8px] size-[9px] rounded-full border-2 border-white bg-clay" />
            )}
          </IconLink>
          <span className="hidden md:contents">
            <IconLink href="/favourites" label="Favourites">
              <Icon name="heart" size={20} />
            </IconLink>
          </span>
          <IconLink href="/bag" label={`Bag, ${bagCount} items`}>
            <Icon name="bag" size={20} />
            {bagCount > 0 && (
              <span className="absolute -top-[3px] -right-[3px] flex size-[18px] items-center justify-center rounded-full bg-forest text-[10px] font-bold text-on-brand">
                {bagCount}
              </span>
            )}
          </IconLink>
          <span className="hidden md:contents">
            <IconLink href="/account" label="Profile">
              <Icon name="user" size={20} />
            </IconLink>
          </span>
        </div>
      </div>

      {/* Category bar — laptops and desktops */}
      <div className="hidden border-t border-line lg:block">
        <nav aria-label="Categories" className="k-container flex items-center gap-8 py-2.5">
          {categoryLinks.map((c) => (
            <Link key={c.href} href={c.href} className="t-cap-m text-muted transition hover:text-forest">
              {c.label}
            </Link>
          ))}
          <span className="t-cap ml-auto flex items-center gap-1.5 text-muted">
            <Icon name="verified" size={14} className="text-clay" />
            Payment held until your order arrives
          </span>
        </nav>
      </div>
    </header>
  );
}
