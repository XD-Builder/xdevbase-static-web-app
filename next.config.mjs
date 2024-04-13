/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  reactStrictMode: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
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
};

export default nextConfig;
