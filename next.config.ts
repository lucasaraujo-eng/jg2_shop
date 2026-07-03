import type { NextConfig } from "next";

const R2_PUBLIC_URL = (process.env.R2_PUBLIC_URL ?? "").replace(/\/$/, "");

const nextConfig: NextConfig = {
  async redirects() {
    if (!R2_PUBLIC_URL) return [];
    return [
      // Mídia migrada para o Cloudflare R2 (ver scripts/migrate-media-to-r2.ts).
      // Os logos (assets/jg2-logo*.png) continuam locais/no git, de propósito.
      { source: "/uploads/:path*", destination: `${R2_PUBLIC_URL}/uploads/:path*`, permanent: true },
      { source: "/assets/filtro/:path*", destination: `${R2_PUBLIC_URL}/assets/filtro/:path*`, permanent: true },
      { source: "/assets/hero.mp4", destination: `${R2_PUBLIC_URL}/assets/hero.mp4`, permanent: true },
      { source: "/assets/hero-banner.mp4", destination: `${R2_PUBLIC_URL}/assets/hero-banner.mp4`, permanent: true },
      { source: "/assets/planejamento.mp4", destination: `${R2_PUBLIC_URL}/assets/planejamento.mp4`, permanent: true },
    ];
  },
};

export default nextConfig;
