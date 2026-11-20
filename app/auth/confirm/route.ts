import type { EmailOtpType } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { safeNext } from "@/lib/auth/safe-next";

/**
  Sign-in / confirmation links land here once the Supabase email templates use
  {{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email

  This is Supabase's recommended server-side flow. Unlike the "code" flow it does not
  depend on a secret stored in the browser that requested the email, so the link works
  even when it is opened in a different browser or in the Gmail app.
*/
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = safeNext(searchParams.get("next"));

  if (tokenHash && type) {
    const supabase = await createClient();
    const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });
    if (!error) return NextResponse.redirect(new URL(next, request.url));

    const code = error.code ?? (error.status === 403 ? "otp_expired" : "link");
    return NextResponse.redirect(new URL(`/login?error=${encodeURIComponent(code)}`, request.url));
  }

  return NextResponse.redirect(new URL("/login?error=link", request.url));
}
