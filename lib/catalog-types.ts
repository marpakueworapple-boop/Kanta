/* Shapes of catalogue data used across the app. Safe to import in browser code. */

export type SellerType = "thrift" | "boutique" | "designer";
export type Condition = "new" | "like_new" | "excellent" | "good" | "fair";

/** What a product card needs. */
export type CardProduct = {
  /** Product id (uuid) — used to save favourites. */
  id: string;
  slug: string;
  title: string;
  shopName: string;
  sellerType: SellerType;
  /** Price in pesewas (1 GH₵ = 100 pesewas). */
  pricePesewas: number;
  compareAtPesewas: number | null;
  coverUrl: string | null;
  /** Short size summary, e.g. "Size L", "S – XL", "One size". */
  sizeLabel: string;
  soldOut: boolean;
};

export type Listing = CardProduct & {
  description: string | null;
  brand: string | null;
  condition: Condition;
  conditionNote: string | null;
  colour: string | null;
  madeToOrderDays: number | null;
  createdAt: string;
  shop: { slug: string; name: string; sellerType: SellerType; city: string | null; verified: boolean };
  category: { slug: string; name: string; topSlug: string; topName: string };
  sizes: string[];
};

export type ProductDetail = Listing & {
  images: { url: string; alt: string | null }[];
  variants: { size: string; stock: number }[];
};

export type Category = { slug: string; name: string; parentSlug: string | null };

/* Badge colours: Pre-loved (clay), New (forest), Designer (gold) — as approved in Figma */
export const sellerBadge: Record<SellerType, { label: string; className: string }> = {
  thrift: { label: "Pre-loved", className: "bg-clay text-on-brand" },
  boutique: { label: "New", className: "bg-forest text-on-brand" },
  designer: { label: "Designer", className: "bg-gold text-ink" },
};

export const sellerTypeLabel: Record<SellerType, string> = {
  thrift: "Thrift",
  boutique: "Boutique",
  designer: "Designer",
};

export const conditionLabel: Record<Condition, string> = {
  new: "New",
  like_new: "Like new",
  excellent: "Excellent",
  good: "Good",
  fair: "Fair",
};
