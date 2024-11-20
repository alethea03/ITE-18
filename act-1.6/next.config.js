/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true, // Enables React Strict Mode
    swcMinify: true,      // Enables faster SWC compiler for minification
    
    eslint: {
        ignoreDuringBuilds: true,
    },
    
};
  
  module.exports = nextConfig;

  module.exports = {
    images: {
      domains: ['example.com', 'anotherdomain.com'], // Add allowed image domains
    },
  };

  
  module.exports = {
    env: {
      API_URL: 'https://api.example.com',
    },
  };

  
