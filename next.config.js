/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "fonts.googleapis.com"],
  },
  env: {
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    PROJECT_ID: process.env.PROJECT_ID,
    STORAGE_BUCKET: process.env.STORAGE_BUCKET,
    MESSAGING_SENDER_ID: process.env.MESSAGING_SENDER_ID,
    APP_ID: process.env.APP_ID,
    DB_URI: process.env.DB_URI,
    ENDPOINT: process.env.ENDPOINT,
    FIREBASE_ADMIN_JSON: process.env.FIREBASE_ADMIN_JSON,
  },
};

module.exports = nextConfig;
