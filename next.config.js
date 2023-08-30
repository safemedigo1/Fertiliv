const { i18n } = require("./next-i18next.config");
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
      "https://fertiliv.vercel.app",
      "fertiliv.com",
      "https://fertilive.com/",
      "https://cp2.safemedigo.com",
      "cp2.safemedigo.com",
    ],
  },
  i18n,

  webpack(config) {
    config.module.rules.push({
      test: /\.json$/,
      use: "json-loader",
    });
    return config;
  },
};

module.exports = nextConfig;
