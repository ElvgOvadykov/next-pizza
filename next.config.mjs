/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.dodostatic.net",
        port: "",
        pathname: "/image/**",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
