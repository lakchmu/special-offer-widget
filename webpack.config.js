const path = require('path');

module.exports = {
  entry: {
    tbfSpecialOffers: './src/index.js',
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  plugins: [],
  output: {
    filename: '[name].latest.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader/useable' },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
    ],
  },
};
