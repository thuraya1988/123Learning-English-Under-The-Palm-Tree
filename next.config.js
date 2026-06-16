/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  basePath: "/123Learning-English-Under-The-Palm-Tree",
  assetPrefix: "/123Learning-English-Under-The-Palm-Tree/",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  transpilePackages: ["three"],
};

module.exports = nextConfig;
