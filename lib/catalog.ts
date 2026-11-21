import "server-only";
import { createClient } from "@/lib/supabase/server";
import type { Category, Condition, Listing, ProductDetail, SellerType } from "./catalog-types";

/*
  Reads the product catalogue from Supabase (the `product_listings` view).
  Every function returns empty results instead of crashing if Supabase is not configured,
  so pages still load.
*/

const LISTING_COLUMNS =
  "id, slug, title, description, brand, condition, condition_note, colour, price_pesewas, compare_at_pesewas, made_to_order_days, status, created_at, shop_slug, shop_name, seller_type, shop_city, shop_verified, category_slug, category_name, top_category_slug, top_category_name, cover_url, sizes, total_stock";

type Row = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  brand: string | null;
  condition: Condition;
  condition_note: string | null;
  colour: string | null;
  price_pesewas: number;
  compare_at_pesewas: number | null;
  made_to_order_days: number | null;
  status: string;
  created_at: string;
  shop_slug: string;
  shop_name: string;
  seller_type: SellerType;
  shop_city: string | null;
  shop_verified: boolean;
  category_slug: string;
  category_name: string;
  top_category_slug: string;
  top_category_name: string;
  cover_url: string | null;
  sizes: string[] | null;
  total_stock: number;
};

const configured = () =>
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

export function sizeLabel(sizes: string[]): string {
  if (sizes.length === 0) return "Sold out";
  if (sizes.length === 1) {
    const s = sizes[0];
    return s === "One size" || s.startsWith("EU ") || s.startsWith("UK ") ? s : `Size ${s}`;
  }
  return `${sizes[0]} – ${sizes[sizes.length - 1]}`;
}

function toListing(r: Row): Listing {
  const sizes = r.sizes ?? [];
  const soldOut = r.status === "sold_out" || r.total_stock <= 0;
  return {
    id: r.id,
    slug: r.slug,
    title: r.title,
    description: r.description,
    brand: r.brand,
    condition: r.condition,
    conditionNote: r.condition_note,
    colour: r.colour,
    pricePesewas: r.price_pesewas,
    compareAtPesewas: r.compare_at_pesewas,
    madeToOrderDays: r.made_to_order_days,
    createdAt: r.created_at,
    shopName: r.shop_name,
    sellerType: r.seller_type,
    coverUrl: r.cover_url,
    sizes,
    sizeLabel: soldOut ? "Sold out" : sizeLabel(sizes),
    soldOut,
    shop: { slug: r.shop_slug, name: r.shop_name, sellerType: r.seller_type, city: r.shop_city, verified: r.shop_verified },
    category: { slug: r.category_slug, name: r.category_name, topSlug: r.top_category_slug, topName: r.top_category_name },
  };
}

/** Newest listings (used by the homepage). */
export async function getLatestListings(limit = 12): Promise<Listing[]> {
  if (!configured()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("product_listings")
    .select(LISTING_COLUMNS)
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("getLatestListings", error.message);
    return [];
  }
  return (data as unknown as Row[]).map(toListing);
}

export type SearchFilters = {
  q?: string;
  type?: SellerType;
  category?: string;
  minCedis?: number;
  maxCedis?: number;
  condition?: "new" | "preloved";
  sort?: "newest" | "price_asc" | "price_desc";
  shop?: string;
};

const SELLER_TYPES: SellerType[] = ["thrift", "boutique", "designer"];

/** Turns the address bar (?q=…&type=…) into safe, validated filters. */
export function parseFilters(sp: Record<string, string | string[] | undefined>): SearchFilters {
  const one = (k: string) => {
    const v = sp[k];
    return (Array.isArray(v) ? v[0] : v)?.trim() || undefined;
  };
  const num = (k: string) => {
    const v = Number(one(k));
    return Number.isFinite(v) && v >= 0 ? v : undefined;
  };
  const type = one("type") as SellerType | undefined;
  const category = one("category");
  const condition = one("condition");
  const sort = one("sort");
  return {
    q: one("q")?.slice(0, 80),
    type: type && SELLER_TYPES.includes(type) ? type : undefined,
    category: category && /^[a-z-]{2,40}$/.test(category) ? category : undefined,
    minCedis: num("min"),
    maxCedis: num("max"),
    condition: condition === "new" || condition === "preloved" ? condition : undefined,
    sort: sort === "price_asc" || sort === "price_desc" ? sort : "newest",
  };
}

/** Search + filter the catalogue (Explore, category and shop pages). */
export async function searchListings(f: SearchFilters, limit = 48): Promise<{ items: Listing[]; total: number }> {
  if (!configured()) return { items: [], total: 0 };
  const supabase = await createClient();
  let query = supabase
    .from("product_listings")
    .select(LISTING_COLUMNS, { count: "exact" })
    .in("status", ["active", "sold_out"]);

  if (f.q) query = query.textSearch("search", f.q, { type: "websearch", config: "english" });
  if (f.type) query = query.eq("seller_type", f.type);
  if (f.category) query = query.or(`category_slug.eq.${f.category},top_category_slug.eq.${f.category}`);
  if (f.minCedis !== undefined) query = query.gte("price_pesewas", Math.round(f.minCedis * 100));
  if (f.maxCedis !== undefined) query = query.lte("price_pesewas", Math.round(f.maxCedis * 100));
  if (f.condition === "new") query = query.eq("condition", "new");
  if (f.condition === "preloved") query = query.neq("condition", "new");
  if (f.shop) query = query.eq("shop_slug", f.shop);

  if (f.sort === "price_asc") query = query.order("price_pesewas", { ascending: true });
  else if (f.sort === "price_desc") query = query.order("price_pesewas", { ascending: false });
  else query = query.order("created_at", { ascending: false });

  const { data, count, error } = await query.range(0, limit - 1);
  if (error) {
    console.error("searchListings", error.message);
    return { items: [], total: 0 };
  }
  return { items: (data as unknown as Row[]).map(toListing), total: count ?? 0 };
}

/** One product with all its photos and sizes (product page). */
export async function getProduct(slug: string): Promise<ProductDetail | null> {
  if (!configured() || !/^[a-z0-9-]{3,120}$/.test(slug)) return null;
  const supabase = await createClient();
  const { data, error } = await supabase.from("product_listings").select(LISTING_COLUMNS).eq("slug", slug).maybeSingle();
  if (error || !data) return null;
  const listing = toListing(data as unknown as Row);

  const [images, variants] = await Promise.all([
    supabase.from("product_images").select("url, alt, position").eq("product_id", listing.id).order("position"),
    supabase.from("product_variants").select("size, stock, sort_order").eq("product_id", listing.id).order("sort_order"),
  ]);

  return {
    ...listing,
    images: ((images.data ?? []) as { url: string; alt: string | null }[]).map((i) => ({ url: i.url, alt: i.alt })),
    variants: ((variants.data ?? []) as { size: string; stock: number }[]).map((v) => ({ size: v.size, stock: v.stock })),
  };
}

/** Other pieces from the same top-level category. */
export async function getRelated(p: Listing, limit = 4): Promise<Listing[]> {
  const { items } = await searchListings({ category: p.category.topSlug, sort: "newest" }, limit + 1);
  return items.filter((i) => i.slug !== p.slug).slice(0, limit);
}

export async function getCategories(): Promise<Category[]> {
  if (!configured()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("slug, name, sort_order, parent:parent_id(slug)")
    .order("sort_order");
  if (error || !data) return [];
  return (data as unknown as { slug: string; name: string; parent: { slug: string } | null }[]).map((c) => ({
    slug: c.slug,
    name: c.name,
    parentSlug: c.parent?.slug ?? null,
  }));
}

export type Shop = {
  slug: string;
  name: string;
  sellerType: SellerType;
  city: string | null;
  bio: string | null;
  verified: boolean;
  createdAt: string;
};

export async function getShop(slug: string): Promise<Shop | null> {
  if (!configured() || !/^[a-z0-9-]{2,80}$/.test(slug)) return null;
  const supabase = await createClient();
  const { data } = await supabase
    .from("shops")
    .select("slug, name, seller_type, city, bio, is_verified, created_at")
    .eq("slug", slug)
    .maybeSingle();
  if (!data) return null;
  const d = data as {
    slug: string;
    name: string;
    seller_type: SellerType;
    city: string | null;
    bio: string | null;
    is_verified: boolean;
    created_at: string;
  };
  return {
    slug: d.slug,
    name: d.name,
    sellerType: d.seller_type,
    city: d.city,
    bio: d.bio,
    verified: d.is_verified,
    createdAt: d.created_at,
  };
}
