/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ceea2674bbf2e4bc6d1b80b67768b695.r2.cloudflarestorage.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'pub-547e64706ac94f28bb62c2bcb0d608db.r2.dev',
                port: '',
            },
        ],
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.resolve.alias.canvas = false;
        config.resolve.alias.encoding = false;
        return config;
    },


};

export default nextConfig;
