/** @type {import('next').NextConfig} */
// next.config.js

const nextconfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.tmdb.org',
        port: '',
        pathname: '/t/p/original/**',
      },
    ],
  },
}

module.exports =nextconfig;