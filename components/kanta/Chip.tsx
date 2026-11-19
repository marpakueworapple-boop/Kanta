/** Chip/Filter — State=Active (forest) or Default (white with border). */
export function Chip({
  label,
  active = false,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`t-label shrink-0 rounded-full px-4 py-[9px] transition active:scale-[0.97] ${
        active ? "bg-forest text-on-brand" : "border border-line bg-white text-ink"
      }`}
    >
      {label}
    </button>
  );
}
