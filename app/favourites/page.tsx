import Link from "next/link";
import { AppShell } from "@/components/kanta/AppShell";
import { FavouritesCount, FavouritesGrid } from "@/components/kanta/FavouritesGrid";
import { Header } from "@/components/kanta/Header";
import { Icon } from "@/components/kanta/icons";
import { getFavouriteListings, getFavouritesState } from "@/lib/favourites";

export const metadata = { title: "Favourites — Kanta" };

export default async function FavouritesPage() {
  const { signedIn, ids } = await getFavouritesState();
  const items = signedIn ? await getFavouriteListings(ids) : [];

  return (
    <AppShell>
      <Header />
      <div className="k-container flex flex-col gap-6 pt-6 md:gap-8 md:pt-12">
        <header className="flex flex-col gap-1">
          <h1 className="t-h1 text-ink">Favourites</h1>
          {signedIn && <FavouritesCount items={items.map((i) => i.id)} />}
        </header>

        {!signedIn ? (
          <EmptyCard
            title="Sign in to see your favourites"
            text="Tap the heart on any piece to save it. Your favourites stay with your account on every device."
            href="/login?next=%2Ffavourites"
            cta="Sign in"
          />
        ) : (
          <FavouritesGrid
            items={items}
            empty={
              <EmptyCard
                title="No favourites yet"
                text="Tap the heart on any piece you love and it will be saved here."
                href="/explore"
                cta="Explore pieces"
              />
            }
          />
        )}
      </div>
    </AppShell>
  );
}

function EmptyCard({ title, text, href, cta }: { title: string; text: string; href: string; cta: string }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-xl border border-line bg-white px-6 py-14 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-sand text-forest">
        <Icon name="heart" size={24} />
      </span>
      <h2 className="t-h2 text-ink">{title}</h2>
      <p className="t-body max-w-sm text-muted">{text}</p>
      <Link href={href} className="t-label rounded-full bg-forest px-5 py-2.5 text-on-brand">
        {cta}
      </Link>
    </div>
  );
}
