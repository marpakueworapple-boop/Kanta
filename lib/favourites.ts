import "server-only";
import { createClient } from "@/lib/supabase/server";
import { getListingsByIds } from "@/lib/catalog";
import type { Listing } from "@/lib/catalog-types";

const configured = () =>
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);

export type FavouritesState = { signedIn: boolean; ids: string[] };

/**
  Who is signed in, and which products they have saved.
  Row Level Security means a shopper can only ever read their own favourites.
*/
export async function getFavouritesState(): Promise<FavouritesState> {
  if (!configured()) return { signedIn: false, ids: [] };
  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getClaims();
  const userId = auth?.claims?.sub;
  if (!userId) return { signedIn: false, ids: [] };

  const { data, error } = await supabase
    .from("favourites")
    .select("product_id")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("getFavouritesState", error.message);
    return { signedIn: true, ids: [] };
  }
  return { signedIn: true, ids: (data ?? []).map((r: { product_id: string }) => r.product_id) };
}

/** Saved products, newest saved first. Products a seller has since removed are left out. */
export async function getFavouriteListings(ids: string[]): Promise<Listing[]> {
  if (ids.length === 0) return [];
  const listings = await getListingsByIds(ids);
  const byId = new Map(listings.map((l) => [l.id, l]));
  return ids.map((id) => byId.get(id)).filter((l): l is Listing => Boolean(l));
}
