/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "/uploads/:path*",
      },
    ];
  },

  images: {
    domains: [
      "localhost",
      "http://localhost:3000",
      "localhost:3000",
      "fertiliv.vercel.app",
      "fertiliv.com",
    ],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.json$/,
      use: "json-loader",
    });
    return config;
  },
};

module.exports = nextConfig;
