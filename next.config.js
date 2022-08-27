/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['cdn.animaapp.com', 'res.cloudinary.com'],
  },
};

module.exports = nextConfig;
