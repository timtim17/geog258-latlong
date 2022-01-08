const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    compress: true,
    port: 3000,
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
