/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'aceternity.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    config.externals = [...(config.externals || []), { canvas: 'canvas' }];
    
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve.alias,
        'three': path.resolve(__dirname, './node_modules/three'),
        'vanta': path.resolve(__dirname, './node_modules/vanta'),
      },
      fallback: {
        ...config.resolve.fallback,
        'canvas': false,
        'jsdom': false
      }
    };

    return config;
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cross-Origin-Opener-Policy',
          value: 'same-origin',
        },
      ],
    },
  ],
  transpilePackages: ['three', 'vanta'],
};

module.exports = nextConfig; 