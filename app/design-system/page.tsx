import { CategoryTile } from "@/components/kanta/CategoryTile";
import { Chip } from "@/components/kanta/Chip";
import { Icon, type IconName } from "@/components/kanta/icons";
import { Logo } from "@/components/kanta/Logo";
import { ProductCard } from "@/components/kanta/ProductCard";
import { SearchBar } from "@/components/kanta/SearchBar";
import { SectionHeader } from "@/components/kanta/SectionHeader";
import { SellPromoCard } from "@/components/kanta/SellPromoCard";
import { TrustCard } from "@/components/kanta/TrustCard";
import { sampleProducts } from "@/lib/sample-data";

export const metadata = { title: "Design system — Kanta" };

/* Same names and values as the "Kanta Tokens" collection in Figma */
const colours = [
  { name: "brand/forest", cls: "bg-forest", hex: "#1E3A2B" },
  { name: "brand/forest-soft", cls: "bg-forest-soft", hex: "#2F5A43" },
  { name: "brand/clay", cls: "bg-clay", hex: "#B8643A" },
  { name: "brand/gold", cls: "bg-gold", hex: "#C9A46A" },
  { name: "surface/cream", cls: "bg-cream", hex: "#F5EFE4" },
  { name: "surface/sand", cls: "bg-sand", hex: "#EDE4D4" },
  { name: "surface/ivory", cls: "bg-ivory", hex: "#FBF8F2" },
  { name: "surface/white", cls: "bg-white", hex: "#FFFFFF" },
  { name: "text/ink", cls: "bg-ink", hex: "#171614" },
  { name: "text/muted", cls: "bg-muted", hex: "#7A7368" },
  { name: "text/on-brand", cls: "bg-on-brand", hex: "#F5EFE4" },
  { name: "border/line", cls: "bg-line", hex: "#E4DACA" },
];

const type = [
  { name: "Display/Logo", cls: "t-logo", spec: "Fraunces SemiBold 26/30" },
  { name: "Heading/H1", cls: "t-h1", spec: "Fraunces Regular 30/36" },
  { name: "Heading/Hero", cls: "t-hero", spec: "Fraunces Regular 24/29" },
  { name: "Heading/H2", cls: "t-h2", spec: "Fraunces SemiBold 20/26" },
  { name: "Body/Regular", cls: "t-body", spec: "DM Sans Regular 14/20" },
  { name: "Body/Medium", cls: "t-body-m", spec: "DM Sans Medium 14/20" },
  { name: "Label/Medium", cls: "t-label", spec: "DM Sans Medium 13/18" },
  { name: "Caption/Regular", cls: "t-cap", spec: "DM Sans Regular 12/16" },
  { name: "Overline", cls: "t-over", spec: "DM Sans SemiBold 10/12, +8%" },
  { name: "Price", cls: "t-price", spec: "DM Sans Bold 15/20" },
];

const icons: IconName[] = [
  "search", "bell", "bag", "sliders", "heart", "home", "explore", "plus", "user", "arrow",
  "verified", "men", "women", "shoes", "bags", "accessories",
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-5">
      <h2 className="t-over text-clay">{title}</h2>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="min-h-dvh bg-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 py-12">
        <header className="flex flex-col gap-3">
          <Logo />
          <h1 className="t-h1 text-ink">Kanta design system</h1>
          <p className="t-body max-w-xl text-muted">
            Every colour, font and component here matches the approved Figma file. Screens are built only from
            these pieces, so the app always looks like Kanta.
          </p>
        </header>

        <Section title="Colour palette">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            {colours.map((c) => (
              <div key={c.name} className="flex flex-col gap-1.5">
                <span className={`h-[72px] rounded-[14px] border border-line ${c.cls}`} />
                <span className="t-cap-m text-ink">{c.name}</span>
                <span className="t-cap text-muted">{c.hex}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Typography">
          <div className="flex flex-col divide-y divide-line rounded-lg border border-line">
            {type.map((t) => (
              <div key={t.name} className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-4">
                <span className={`${t.cls} text-ink`}>{t.name}</span>
                <span className="t-cap text-muted">{t.spec}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section title="Icons">
          <div className="flex flex-wrap gap-5 text-ink">
            {icons.map((n) => (
              <span key={n} className="flex w-16 flex-col items-center gap-1.5">
                <Icon name={n} size={24} />
                <span className="t-cap text-muted">{n}</span>
              </span>
            ))}
          </div>
        </Section>

        <Section title="Components">
          <div className="grid gap-10 rounded-xl bg-cream p-6 md:grid-cols-2">
            <div className="flex flex-col gap-8">
              <Logo />
              <SearchBar />
              <div className="flex flex-wrap gap-2">
                <Chip label="All" active />
                <Chip label="Thrift" />
                <Chip label="Boutiques" />
                <Chip label="Designers" />
              </div>
              <SectionHeader title="Trending now" />
              <div className="flex gap-4">
                <CategoryTile label="Men" icon="men" href="#" />
                <CategoryTile label="Women" icon="women" href="#" />
                <CategoryTile label="Accessories" icon="accessories" href="#" />
              </div>
              <TrustCard />
            </div>
            <div className="grid max-w-[360px] grid-cols-2 gap-2">
              {sampleProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
              <SellPromoCard />
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
