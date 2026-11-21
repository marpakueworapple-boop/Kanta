import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { AuthHashErrorRedirect } from "@/components/kanta/AuthHashErrorRedirect";
import { FavouritesProvider } from "@/components/kanta/Favourites";
import { getFavouritesState } from "@/lib/favourites";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kanta — Fashion with a story",
  description:
    "Discover pre-loved finds, boutique pieces and original designer fashion from verified sellers across Ghana.",
  applicationName: "Kanta",
};

export const viewport: Viewport = {
  themeColor: "#1e3a2b",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const favourites = await getFavouritesState();
  return (
    <html lang="en-GH" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body>
        <AuthHashErrorRedirect />
        <FavouritesProvider signedIn={favourites.signedIn} initialIds={favourites.ids}>
          {children}
        </FavouritesProvider>
      </body>
    </html>
  );
}
