/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure TypeScript
  typescript: {
    // Only ignore build errors in production
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
  
  // Configure image optimization
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  
  // Enable experimental features
  experimental: {
    // Server Actions are stable in Next.js 14+
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  
  // Configure Turbopack with proper path resolution
  turbopack: {
    root: process.cwd(),
  },
  
  // Add security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ]
  },
  
  // Configure webpack
  webpack: (config, { isServer }) => {
    // Important: return the modified config
    return config;
  },
  
  // Configure logging in development
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
}

// In development, log more detailed error information
if (process.env.NODE_ENV === 'development') {
  console.log('Next.js config loaded in development mode')
}

export default nextConfig