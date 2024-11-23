import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Add canvas to externals for Three.js compatibility
    config.externals = [...(config.externals || []), { canvas: 'canvas' }];
    
    // Enhanced alias configuration
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
