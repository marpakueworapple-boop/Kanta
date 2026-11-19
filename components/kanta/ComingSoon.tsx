import Link from "next/link";
import { AppShell } from "./AppShell";
import { Header } from "./Header";
import { Icon, type IconName } from "./icons";

/** Friendly placeholder for screens that arrive in a later stage. */
export function ComingSoon({ title, stage, icon }: { title: string; stage: number; icon: IconName }) {
  return (
    <AppShell>
      <Header />
      <section className="flex flex-col items-center gap-4 px-8 pt-24 text-center">
        <span className="flex size-16 items-center justify-center rounded-full border border-line bg-white text-forest">
          <Icon name={icon} size={28} />
        </span>
        <h1 className="t-h1 text-ink">{title}</h1>
        <p className="t-body text-muted">This screen is being built in Stage {stage} of the Kanta plan.</p>
        <Link href="/" className="t-label mt-2 rounded-full bg-forest px-5 py-2.5 text-on-brand">
          Back to Home
        </Link>
      </section>
    </AppShell>
  );
}
