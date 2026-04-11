/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  images:{
    remotePatterns:[
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
        port: '',
        pathname: '/**',
      }
    ]
  }
};

export default nextConfig;
