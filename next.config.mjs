/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Only ignore build errors in production
    ignoreBuildErrors: process.env.NODE_ENV === 'production',
  },
  images: {
    unoptimized: true,
    domains: [
      'localhost',
      'your-supabase-url.supabase.co', // Add your Supabase URL here
    ],
  },
  experimental: {
    // Enable React 18 concurrent features
    serverActions: true,
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
        ],
      },
    ]
  },
}

// In development, log more detailed error information
if (process.env.NODE_ENV === 'development') {
  console.log('Next.js config loaded in development mode')
}

export default nextConfig