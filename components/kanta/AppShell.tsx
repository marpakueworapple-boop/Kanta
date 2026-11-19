import { BottomNav } from "./BottomNav";

/**
  The phone-width column every customer screen sits in.
  On a laptop it stays centred at phone width for Stage 1; the wider laptop layout comes in Stage 2.
*/
export function AppShell({ children, withNav = true }: { children: React.ReactNode; withNav?: boolean }) {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-[480px] bg-cream shadow-[0_0_40px_rgba(23,22,20,0.06)]">
      <main className={withNav ? "pb-32" : "pb-10"}>{children}</main>
      {withNav && <BottomNav />}
    </div>
  );
}
