import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Production security headers.
   * Applied to all routes.
   */
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Prevent site from being embedded in iframes (clickjacking)
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          // Prevent MIME type sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // Control referrer information
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Permissions policy: restrict powerful APIs
          {
            key: "Permissions-Policy",
            value: "camera=(), geolocation=(), interest-cohort=()",
          },
          // HSTS: enforce HTTPS for 1 year (enable once domain is confirmed HTTPS)
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          // Content Security Policy
          // Allows: self, Google Fonts, Next.js inline scripts
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              // Next.js needs unsafe-inline for styles; tighten once stable
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              // Allow inline scripts for Next.js hydration
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              // Media: allow self-hosted audio (microphone recording stays local)
              "media-src 'self' blob:",
              // Worker: needed for Audio Worklets / MediaRecorder
              "worker-src 'self' blob:",
              "connect-src 'self'",
              "img-src 'self' data: blob:",
              "frame-ancestors 'none'",
            ].join("; "),
          },
        ],
      },
    ];
  },

  /**
   * Redirect www to non-www canonical.
   * Only applies when deployed; DNS must handle www → understanddog.com at CDN level.
   */
  async redirects() {
    return [
      {
        source: "/(.*)",
        has: [{ type: "host", value: "www.understanddog.com" }],
        destination: "https://understanddog.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
