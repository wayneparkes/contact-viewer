/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**/**' // wildcard pattern for variety of avatar urls
      }
    ]
  }
}

module.exports = nextConfig
