/*
  Sample products for Stage 1. In Stage 2 these come from the Supabase database instead.
  The three products match the approved Figma homepage exactly.
*/
import type { StaticImageData } from "next/image";
import denimJacket from "@/public/images/denim-jacket.jpg";
import kenteShirt from "@/public/images/kente-linen-shirt.jpg";
import saddleBag from "@/public/images/saddle-bag.jpg";

export type SellerType = "thrift" | "boutique" | "designer";

export type Product = {
  id: string;
  name: string;
  seller: string;
  sellerType: SellerType;
  /** Price in pesewas (1 GH₵ = 100 pesewas) so money maths never has rounding errors. */
  pricePesewas: number;
  currency: "GHS";
  meta: string;
  image: StaticImageData;
};

export const sampleProducts: Product[] = [
  {
    id: "vintage-washed-denim-jacket",
    name: "Vintage Washed Denim Jacket",
    seller: "Kantamanto Finds",
    sellerType: "thrift",
    pricePesewas: 28000,
    currency: "GHS",
    meta: "Size L",
    image: denimJacket,
  },
  {
    id: "kente-trim-linen-shirt",
    name: "Kente-Trim Linen Shirt",
    seller: "Studio Adinkra",
    sellerType: "designer",
    pricePesewas: 65000,
    currency: "GHS",
    meta: "S – XL",
    image: kenteShirt,
  },
  {
    id: "tan-leather-saddle-bag",
    name: "Tan Leather Saddle Bag",
    seller: "Osu Boutique",
    sellerType: "boutique",
    pricePesewas: 42000,
    currency: "GHS",
    meta: "One size",
    image: saddleBag,
  },
];
