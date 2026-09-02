/** @type {import('next').NextConfig} */
const nextConfig = {
  // Permite que Next.js optimice fuentes de Google automáticamente
  // Si no hay internet en dev, las fuentes se cargan desde el CDN en el browser
  optimizeFonts: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

module.exports = nextConfig
