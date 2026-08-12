/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Ajoute ici les domaines depuis lesquels tu chargeras tes vraies photos
    // (ex: 'images.unsplash.com' en attendant, ou ton CDN / Supabase Storage)
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
    ],
  },
};

export default nextConfig;
