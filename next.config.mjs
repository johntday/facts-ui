/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Enable static optimization
  output: "standalone",

  // Configure path aliases similar to Vite's config
  experimental: {
    esmExternals: true,
    // Enable full server side rendering for caching on the server
    serverActions: {
      bodySizeLimit: "2mb",
    },
    // Optimize React server components
    optimizeServerReact: true,
  },

  // Moved from experimental.serverComponentsExternalPackages
  serverExternalPackages: [],

  // Allow use of the client side directories during migration
  transpilePackages: [],

  // Configure webpack to handle the migration
  webpack: (config, { isServer }) => {
    // Handle the Wouter router during migration
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }

    return config;
  },

  // Configure redirects and rewrites as needed
  async redirects() {
    return [];
  },

  async rewrites() {
    return [
      // Forward API requests to the Next.js API routes
      {
        source: "/api/:path*",
        destination: "/api/:path*",
      },
    ];
  },

  // Configure cache handling
  headers: async () => {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, stale-while-revalidate=86400",
          },
        ],
      },
      // Don't cache API routes
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
