/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // static export for Netlify publish dir `out`
  images: { unoptimized: true }, // ensures next/image works in static export
  trailingSlash: true,        // optional: makes Netlify-style static hosting happier
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
