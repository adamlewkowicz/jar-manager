// const path = require('path');
// const glob = require('glob');
// const webpack = require('webpack');

module.exports = {
  webpack: (config, { dev, isServer }) => {
    config.node = { fs: 'empty', module: 'empty' };
    config.module.rules.push({
      test: /\.spec.tsx$/,
      loader: 'ignore-loader',
    });
    config.module.rules.push({
      test: /\.spec.ts$/,
      loader: 'ignore-loader',
    });
    config.module.rules.push({
      test: /\.spec.js$/,
      loader: 'ignore-loader',
    });
    // config.plugins.push(new webpack.IgnorePlugin(\*.spec.*/));
    return config;
  },
};
