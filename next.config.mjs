/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "zh-CN"],
    defaultLocale: "en",
  },
  /**
   * Redirect to xdevbase.com policy page as it's better managed there.
   */
  redirects: async () => {
    return [
      {
        source: "/privacy-policy",
        destination: "https://xdevbase.com/privacy-policy",
        permanent: true,
      },
      {
        source: "/data-deletion-policy",
        destination: "https://xdevbase.com/data-deletion-policy",
        permanent: true,
      },
    ];
  },
  /**
   * Allowed remote image domains
   */
  images: {
    remotePatterns: [
      { hostname: "avatars.githubusercontent.com" },
      { hostname: "illustrations.popsy.co" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "platform-lookaside.fbsbx.com" },
    ],
  },
};

export default nextConfig;
