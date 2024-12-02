import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
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
  // Add additional security headers
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
  // Remove scriptLoader as it's not needed for Three.js
  experimental: {
    // scriptLoader: true,  // removed
  },
  // Ensure proper transpilation of Three.js and Vanta
  transpilePackages: ['three', 'vanta'],
};

export default nextConfig;
