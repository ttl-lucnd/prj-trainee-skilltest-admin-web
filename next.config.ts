const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [{ hostname: '**' }],
  },
  turbopack: {},
};

module.exports = withNextIntl(nextConfig);
