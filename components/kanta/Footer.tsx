import Link from "next/link";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Shop",
    links: [
      { label: "Men", href: "/explore?category=men" },
      { label: "Women", href: "/explore?category=women" },
      { label: "Shoes", href: "/explore?category=shoes" },
      { label: "Bags", href: "/explore?category=bags" },
      { label: "Accessories", href: "/explore?category=accessories" },
    ],
  },
  {
    title: "Sellers",
    links: [
      { label: "Thrift", href: "/explore?type=thrift" },
      { label: "Boutiques", href: "/explore?type=boutique" },
      { label: "Designers", href: "/explore?type=designer" },
      { label: "Start selling", href: "/sell" },
    ],
  },
  {
    title: "Your account",
    links: [
      { label: "Profile", href: "/account" },
      { label: "Favourites", href: "/favourites" },
      { label: "Bag", href: "/bag" },
      { label: "Sign in", href: "/login" },
    ],
  },
];

/** Site footer — shown on every screen size; on phones it sits above the bottom bar. */
export function Footer() {
  return (
    <footer className="mt-12 border-t border-line bg-ivory md:mt-20">
      <div className="k-container grid gap-10 py-10 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:py-14">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="t-body max-w-xs text-muted">
            Pre-loved finds, boutique pieces and original designer fashion from verified sellers across Ghana.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-6 md:contents">
          {columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <p className="t-over text-clay">{col.title}</p>
              <ul className="flex flex-col gap-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="t-cap text-ink transition hover:text-forest md:text-sm md:leading-5">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-line">
        <p className="k-container t-cap py-5 text-muted">© 2026 Kanta · Made in Accra</p>
      </div>
    </footer>
  );
}
