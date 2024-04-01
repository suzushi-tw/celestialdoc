/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'celestialdoc.s3.eu-central-1.amazonaws.com',
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
