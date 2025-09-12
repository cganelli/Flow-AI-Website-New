/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  webpack: (config) => {
    // If anything still tries to import bippy's JSX runtime,
    // send it to the normal React JSX runtime instead.
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'bippy/dist/jsx-runtime': 'react/jsx-runtime',
      bippy: 'react', // extra belt-and-suspenders
    };
    return config;
  },
};

module.exports = nextConfig;
