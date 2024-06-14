/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "1hshml50z23rzaog.public.blob.vercel-storage.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
