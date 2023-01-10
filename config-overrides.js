const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = function override (config, env) {
  if (!config.plugins) {
    config.plugins = [];
  }
  config.plugins.push(
    new FaviconsWebpackPlugin('./src/assets/favicon.png')

  );
  return config;
}