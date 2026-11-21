"use server";

import { createClient } from "@/lib/supabase/server";

export type FavouriteResult = { ok: true } | { ok: false; reason: "signed-out" | "invalid" | "failed" };

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
  Save or remove one favourite for the signed-in shopper.
  The database's Row Level Security also checks that people only change their own favourites.
*/
export async function setFavourite(productId: string, save: boolean): Promise<FavouriteResult> {
  if (typeof productId !== "string" || !UUID.test(productId) || typeof save !== "boolean") {
    return { ok: false, reason: "invalid" };
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    return { ok: false, reason: "failed" };
  }

  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getClaims();
  const userId = auth?.claims?.sub;
  if (!userId) return { ok: false, reason: "signed-out" };

  const { error } = save
    ? await supabase
        .from("favourites")
        .upsert({ user_id: userId, product_id: productId }, { onConflict: "user_id,product_id", ignoreDuplicates: true })
    : await supabase.from("favourites").delete().eq("user_id", userId).eq("product_id", productId);

  if (error) {
    console.error("setFavourite", error.message);
    return { ok: false, reason: "failed" };
  }
  return { ok: true };
}
