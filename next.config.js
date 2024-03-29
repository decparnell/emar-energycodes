/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  images: {
    domains: [
      "reccodocstroage.blob.core.windows.net",
      "reccoemapstorage.blob.core.windows.net",
    ],
  },
  // time in seconds of no pages generating during static
  // generation before timing out
  staticPageGenerationTimeout: 1000,
};
/* 
module.exports = {
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, zlib: false };

    return config;
  },
}; */
