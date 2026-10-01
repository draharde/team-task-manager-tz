import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: [
    '@dnd-kit/core',
    '@hookform/resolvers',
    '@tanstack/react-query',
    '@tanstack/react-query-devtools',
  ],
}

export default nextConfig
