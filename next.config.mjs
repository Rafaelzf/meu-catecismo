/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "*.public.blob.vercel-storage.com" }],
  },

  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
      {
        source: "/api/upload",
        headers: [
          {
            key: "Content-Type",
            value: "image/*",
          },
          {
            key: "Content-Disposition",
            value: "inline",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
