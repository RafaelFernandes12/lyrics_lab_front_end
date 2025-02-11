/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        pathname: '/**', // Pode ajustar o pathname conforme necessário
      },
    ],
  },
}

export default nextConfig
