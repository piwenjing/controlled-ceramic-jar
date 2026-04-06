import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ligeyuanshan.oss-cn-beijing.aliyuncs.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ceramic-jar.oss-ap-southeast-1.aliyuncs.com",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
