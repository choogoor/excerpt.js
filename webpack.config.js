const path = require('path');

module.exports = {
  mode: 'production',
  entry: require.resolve('./src/excerpt.js'),
  context: __dirname,
  output: {
    path: path.resolve(__dirname, './'),
    filename: 'dist/excerpt.min.js',
    libraryExport: 'default',
    library: 'Excerpt',
    libraryTarget: 'umd'
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }],
  },
};
