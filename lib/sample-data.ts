/*
  Static example products, used only by the /design-system page so it works
  even without a database connection. Real pages read from Supabase (lib/catalog.ts).
*/
import type { CardProduct } from "./catalog-types";

export type { SellerType } from "./catalog-types";

export const sampleProducts: CardProduct[] = [
  {
    slug: "vintage-washed-denim-jacket",
    title: "Vintage Washed Denim Jacket",
    shopName: "Kantamanto Finds",
    sellerType: "thrift",
    pricePesewas: 28000,
    compareAtPesewas: null,
    coverUrl: "/images/products/vintage-washed-denim-jacket.jpg",
    sizeLabel: "Size L",
    soldOut: false,
  },
  {
    slug: "kente-trim-linen-shirt",
    title: "Kente-Trim Linen Shirt",
    shopName: "Studio Adinkra",
    sellerType: "designer",
    pricePesewas: 65000,
    compareAtPesewas: null,
    coverUrl: "/images/products/kente-trim-linen-shirt.jpg",
    sizeLabel: "S – XL",
    soldOut: false,
  },
  {
    slug: "tan-leather-saddle-bag",
    title: "Tan Leather Saddle Bag",
    shopName: "Osu Boutique",
    sellerType: "boutique",
    pricePesewas: 42000,
    compareAtPesewas: null,
    coverUrl: "/images/products/tan-leather-saddle-bag.jpg",
    sizeLabel: "One size",
    soldOut: false,
  },
];
