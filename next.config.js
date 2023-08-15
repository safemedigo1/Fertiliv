/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  rules: [
    {
      test: /\.json$/,
      use: "json-loader",
    },
  ],
};

module.exports = nextConfig;
