import { Icon } from "./icons";

/** "Shop with confidence" — the held-payment promise approved by Marpa. */
export function TrustCard() {
  return (
    <div className="flex w-full items-center gap-3.5 rounded-lg border border-line bg-ivory p-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-md bg-sand text-forest">
        <Icon name="verified" size={22} />
      </span>
      <div className="flex flex-col gap-0.5">
        <p className="t-body-m text-ink">Shop with confidence</p>
        <p className="t-cap text-muted">
          Verified sellers. Your payment is held safely until your order arrives.
        </p>
      </div>
    </div>
  );
}
