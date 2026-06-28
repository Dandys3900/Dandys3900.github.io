import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Hide DEV Toolbar for better UX
  devIndicators: false,
  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          // TODO(security): Add strict CSP with nonces for production deployment
          // Currently using a relaxed policy for development.
          // For production, use: script-src 'self' 'nonce-xxx'; style-src 'self' 'unsafe-inline';
        ],
      },
    ];
  },
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
