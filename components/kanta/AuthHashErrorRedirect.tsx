"use client";

import { useEffect } from "react";

/**
  When a sign-in link fails (for example it was already used or has expired), Supabase
  puts the reason after a "#" in the address, e.g.  /#error=access_denied&error_code=otp_expired
  The server never sees the part after "#", so this tiny browser-side check reads it
  and sends the person to the sign-in page with a clear message.
*/
export function AuthHashErrorRedirect() {
  useEffect(() => {
    const hash = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : "";
    if (!hash) return;
    const params = new URLSearchParams(hash);
    const code = params.get("error_code") ?? params.get("error");
    if (!code) return;
    const target = `/login?error=${encodeURIComponent(code)}`;
    if (window.location.pathname === "/login") {
      window.history.replaceState(null, "", target);
      window.location.reload();
    } else {
      window.location.replace(target);
    }
  }, []);
  return null;
}
