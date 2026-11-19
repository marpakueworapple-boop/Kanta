/** Formats a price stored in pesewas as "GH₵ 280" (or "GH₵ 280.50" when there are pesewas). */
export function formatGHS(pesewas: number): string {
  const cedis = pesewas / 100;
  const hasPesewas = pesewas % 100 !== 0;
  return `GH₵ ${cedis.toLocaleString("en-GH", {
    minimumFractionDigits: hasPesewas ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
}
