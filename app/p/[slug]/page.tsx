import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/kanta/AppShell";
import { Header } from "@/components/kanta/Header";
import { Icon } from "@/components/kanta/icons";
import { ProductActions } from "@/components/kanta/ProductActions";
import { ProductCard } from "@/components/kanta/ProductCard";
import { SectionHeader } from "@/components/kanta/SectionHeader";
import { getProduct, getRelated } from "@/lib/catalog";
import { conditionLabel, sellerBadge, sellerTypeLabel } from "@/lib/catalog-types";
import { formatGHS } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = await getProduct((await params).slug);
  if (!p) return { title: "Not found — Kanta" };
  return {
    title: `${p.title} — ${formatGHS(p.pricePesewas)} — Kanta`,
    description: p.description ?? undefined,
    openGraph: { images: p.coverUrl ? [p.coverUrl] : [] },
  };
}

/** Product page: photos, price, condition, sizes, seller, details and similar pieces. */
export default async function ProductPage({ params }: Props) {
  const product = await getProduct((await params).slug);
  if (!product) notFound();
  const related = await getRelated(product);

  const badge = sellerBadge[product.sellerType];
  const images = product.images.length ? product.images : product.coverUrl ? [{ url: product.coverUrl, alt: product.title }] : [];
  const preLoved = product.condition !== "new";

  const details: [string, string][] = [
    ["Category", `${product.category.topName} › ${product.category.name}`],
    ...(product.brand ? ([["Brand", product.brand]] as [string, string][]) : []),
    ...(product.colour ? ([["Colour", product.colour]] as [string, string][]) : []),
    ["Condition", conditionLabel[product.condition]],
    ["Ships from", product.shop.city ?? "Ghana"],
  ];

  return (
    <AppShell>
      <Header bagCount={2} hasUnread />

      <div className="k-container pt-3 md:pt-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="t-cap flex flex-wrap items-center gap-1.5 text-muted">
          <Link href="/" className="hover:text-forest">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href={`/explore?category=${product.category.topSlug}`} className="hover:text-forest">
            {product.category.topName}
          </Link>
          <span aria-hidden="true">/</span>
          <Link href={`/explore?category=${product.category.slug}`} className="hover:text-forest">
            {product.category.name}
          </Link>
        </nav>

        <div className="flex flex-col gap-6 pt-3 md:grid md:grid-cols-2 md:gap-8 md:pt-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-14">
          {/* Photos */}
          <div className="md:sticky md:top-28 md:self-start lg:top-36">
            <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory overflow-x-auto md:mx-0 md:flex-col md:gap-3 md:overflow-visible">
              {images.map((img, i) => (
                <div
                  key={img.url}
                  className="relative aspect-[4/5] w-full shrink-0 snap-center overflow-hidden bg-sand md:rounded-2xl"
                >
                  <Image
                    src={img.url}
                    alt={img.alt ?? product.title}
                    fill
                    priority={i === 0}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`object-cover ${product.soldOut ? "opacity-70" : ""}`}
                  />
                  {i === 0 && (
                    <span className={`t-over absolute top-4 left-4 rounded-[6px] px-2.5 py-[6px] ${badge.className}`}>
                      {badge.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Information */}
          <div className="flex flex-col gap-6 md:gap-7">
            <div className="flex flex-col gap-2">
              <Link href={`/shop/${product.shop.slug}`} className="t-cap flex w-fit items-center gap-1 text-muted hover:text-forest">
                <Icon name="verified" size={14} className="text-clay" />
                {product.shop.name}
              </Link>
              <h1 className="font-display text-[26px] leading-[32px] font-normal tracking-[-0.01em] text-ink md:text-[34px] md:leading-[40px]">
                {product.title}
              </h1>
              <p className="flex items-baseline gap-2.5 pt-1">
                <span className="text-[22px] leading-7 font-bold text-ink">{formatGHS(product.pricePesewas)}</span>
                {product.compareAtPesewas && (
                  <span className="t-body text-muted line-through">{formatGHS(product.compareAtPesewas)}</span>
                )}
              </p>
            </div>

            {preLoved && (
              <div className="flex flex-col gap-1 rounded-lg border border-clay/25 bg-clay/5 p-4">
                <p className="t-label text-ink">
                  Condition: <span className="text-clay">{conditionLabel[product.condition]}</span>
                </p>
                {product.conditionNote && <p className="t-cap text-muted">{product.conditionNote}</p>}
              </div>
            )}

            <ProductActions
              productId={product.id}
              title={product.title}
              variants={product.variants}
              soldOut={product.soldOut}
              madeToOrderDays={product.madeToOrderDays}
            />

            {/* Trust */}
            <div className="flex items-center gap-3 rounded-lg bg-ivory p-4">
              <Icon name="verified" size={22} className="shrink-0 text-forest" />
              <p className="t-cap text-ink">
                <span className="font-medium">Payment held until it arrives.</span>{" "}
                <span className="text-muted">The seller is paid only after you confirm delivery.</span>
              </p>
            </div>

            {/* Description and details */}
            {product.description && (
              <section className="flex flex-col gap-2">
                <h2 className="t-label text-ink">Description</h2>
                <p className="t-body whitespace-pre-line text-muted">{product.description}</p>
              </section>
            )}
            <dl className="grid grid-cols-[110px_1fr] gap-x-4 gap-y-2 border-t border-line pt-5">
              {details.map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="t-cap text-muted">{k}</dt>
                  <dd className="t-cap text-ink">{v}</dd>
                </div>
              ))}
            </dl>

            {/* Seller */}
            <Link
              href={`/shop/${product.shop.slug}`}
              className="flex items-center gap-4 rounded-xl border border-line bg-white p-4 transition hover:border-forest/40"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-forest font-display text-[20px] text-on-brand">
                {product.shop.name.charAt(0)}
              </span>
              <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                <span className="t-body-m flex items-center gap-1.5 text-ink">
                  {product.shop.name}
                  {product.shop.verified && <Icon name="verified" size={15} className="text-clay" />}
                </span>
                <span className="t-cap text-muted">
                  {sellerTypeLabel[product.sellerType]} seller{product.shop.city ? ` · ${product.shop.city}` : ""}
                </span>
              </span>
              <Icon name="arrow" size={18} className="text-forest" />
            </Link>
          </div>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="related" className="flex flex-col gap-4 pt-12 md:gap-6 md:pt-20">
            <div id="related">
              <SectionHeader title="More like this" href={`/explore?category=${product.category.topSlug}`} />
            </div>
            <div className="grid grid-cols-2 gap-x-2 gap-y-6 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4 lg:gap-x-6">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </AppShell>
  );
}
