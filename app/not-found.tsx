import Link from "next/link";
import { AppShell } from "@/components/kanta/AppShell";
import { Header } from "@/components/kanta/Header";
import { Icon } from "@/components/kanta/icons";

export default function NotFound() {
  return (
    <AppShell>
      <Header />
      <section className="k-container flex max-w-xl flex-col items-center gap-4 pt-24 text-center md:pt-32">
        <span className="flex size-16 items-center justify-center rounded-full border border-line bg-white text-forest">
          <Icon name="search" size={28} />
        </span>
        <h1 className="t-h1 text-ink">We couldn&apos;t find that</h1>
        <p className="t-body text-muted">The piece or shop may have sold out or moved. Plenty more to discover.</p>
        <Link href="/explore" className="t-label mt-2 rounded-full bg-forest px-5 py-2.5 text-on-brand">
          Explore Kanta
        </Link>
      </section>
    </AppShell>
  );
}
