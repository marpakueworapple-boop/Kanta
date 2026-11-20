import { BottomNav } from "./BottomNav";
import { Footer } from "./Footer";

/**
  The frame every customer screen sits in.
  - Phones: the approved mobile layout, with the bottom navigation bar.
  - Tablets and laptops (768px and wider): full-width pages, top navigation in the header,
    a footer, and no bottom bar.
*/
export function AppShell({
  children,
  withNav = true,
  withFooter = true,
}: {
  children: React.ReactNode;
  withNav?: boolean;
  withFooter?: boolean;
}) {
  return (
    <div className="flex min-h-dvh w-full flex-col bg-cream">
      <main className="flex-1">{children}</main>
      {withFooter && <Footer />}
      {/* Space so the fixed bottom bar never covers content on phones */}
      {withNav && <div aria-hidden="true" className="h-32 md:hidden" />}
      {withNav && <BottomNav />}
    </div>
  );
}
