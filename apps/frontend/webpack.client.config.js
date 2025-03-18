const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DotenvWebpackPlugin = require('dotenv-webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const glob = require('glob-all')
const webpack = require('webpack')

module.exports = {
  entry: './src/client/index.tsx',
  target: 'web',
  mode: process.env.NODE_ENV || 'development',
  output: {
    filename: 'client.bundle.js',
    path: path.resolve(__dirname, 'dist/client'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(), // Minifica el CSS
    ],
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    ...(process.env.ANALYZE === 'true' ? [new BundleAnalyzerPlugin()] : []),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new DotenvWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new PurgeCSSPlugin({
      paths: glob.sync([
        path.join(__dirname, 'src/**/*.js'),
        path.join(__dirname, 'src/**/*.jsx'),
        path.join(__dirname, 'src/**/*.ts'),
        path.join(__dirname, 'src/**/*.tsx'),
        path.join(__dirname, 'public/index.html'),
      ]),
      safelist: {
        standard: [
          'lay', // Evita eliminar clases que comiencen con "lay"
        ],
        deep: [/^lay/, /lay$/], // Asegura que detecte clases con este patrón
        greedy: [/^lay/, /lay$/], // Mantiene atributos CSS como `[class^="lay"]`
      },
    }),
    new CssMinimizerPlugin(), // Minifica el CSS final
  ],
}
