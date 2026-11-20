/** Only allow redirects to pages on Kanta itself (stops "open redirect" tricks). */
export function safeNext(next: string | null | undefined, fallback = "/account"): string {
  if (!next) return fallback;
  if (!next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) return fallback;
  return next;
}
