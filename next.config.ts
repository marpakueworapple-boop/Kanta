import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product photos will later be served from Supabase Storage.
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co" }],
  },
};

export default nextConfig;
