/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = nextConfig

const webpack = require('webpack');
const Dotenv = require('dotenv-webpack'); // Import the dotenv-webpack plugin

module.exports = {
  webpack: (config) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        // Add more environment variables as needed
      })
    );

    // Use the Dotenv Webpack plugin to load environment variables from a .env file
    config.plugins.push(new Dotenv());

    return config;
  },
};
