import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { safeNext } from "@/lib/auth/safe-next";

/**
  "Code" (PKCE) sign-in links land here: Supabase sends ?code=…, and we swap it for a session.
  This works when the link is opened in the same browser that asked for the email.
  (Links that use the token_hash template go to /auth/confirm instead.)
*/
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = safeNext(searchParams.get("next"));

  // Supabase can send an error back instead of a code (for example an expired link).
  const sbError = searchParams.get("error_code") ?? searchParams.get("error");
  if (sbError) {
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(sbError)}`, request.url));
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(next, request.url));

    // Most common cause: the link was opened in a different browser or app than the one
    // that requested it, so the browser's one-time secret (code verifier) is missing.
    const reason = /code verifier|code_verifier|flow state/i.test(error.message) ? "other_browser" : "link";
    return NextResponse.redirect(new URL(`/login?error=${reason}`, request.url));
  }

  return NextResponse.redirect(new URL("/login?error=link", request.url));
}
