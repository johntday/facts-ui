/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Configure path aliases similar to Vite's config
  experimental: {
    esmExternals: true,
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
};

export default nextConfig;
