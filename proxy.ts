import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
  Runs before every page request. It keeps the signed-in session fresh
  (Supabase sign-in tokens expire, and this quietly renews them).
*/
export async function proxy(request: NextRequest) {
  // If Supabase could not use our requested return address, it sends the sign-in
  // code (or token hash) to the Site URL instead — usually the homepage, where nothing
  // reads it. Forward it to the right sign-in route so the session is still created.
  const { pathname, searchParams } = request.nextUrl;
  if (!pathname.startsWith("/auth/")) {
    if (searchParams.has("token_hash") && searchParams.has("type")) {
      const to = request.nextUrl.clone();
      to.pathname = "/auth/confirm";
      if (!to.searchParams.has("next")) to.searchParams.set("next", "/account");
      return NextResponse.redirect(to);
    }
    if (searchParams.has("code")) {
      const to = request.nextUrl.clone();
      to.pathname = "/auth/callback";
      if (!to.searchParams.has("next")) to.searchParams.set("next", "/account");
      return NextResponse.redirect(to);
    }
  }

  let response = NextResponse.next({ request });

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  // If Supabase isn't configured yet, still show the site (sign-in just won't work).
  if (!url || !key) return response;

  const supabase = createServerClient(
    url,
    key,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet, headers?: Record<string, string>) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
          // Stop CDNs from caching a response that sets sign-in cookies.
          if (headers) Object.entries(headers).forEach(([k, v]) => response.headers.set(k, v));
        },
      },
    },
  );

  // Must run before the response is returned so a refreshed session can be saved.
  await supabase.auth.getClaims();

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
