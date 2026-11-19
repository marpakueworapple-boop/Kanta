/** Brand/Logo — forest monogram + Fraunces wordmark with a clay full stop. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} aria-label="Kanta">
      <span
        aria-hidden="true"
        className="flex size-9 items-center justify-center rounded-[11px] bg-forest font-display text-[24px] leading-[26px] font-semibold italic text-on-brand"
      >
        k
      </span>
      <span aria-hidden="true" className="t-logo text-forest">
        kanta<span className="text-clay">.</span>
      </span>
    </span>
  );
}
