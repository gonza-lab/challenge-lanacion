const DotenvWebpackPlugin = require('dotenv-webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/server/index.tsx',
  target: 'node',
  mode: process.env.NODE_ENV || 'development',
  output: {
    filename: 'server.bundle.js',
    path: path.resolve(__dirname, 'dist/server'),
    libraryTarget: 'commonjs2',
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: 'ignore-loader',
      },
    ],
  },
  // Inicialmente voy a usar variables de entorno solo en servidor, por esa razón solo agrego el plugin en servidor.
  plugins: [new CleanWebpackPlugin(), new DotenvWebpackPlugin()],
  externals: {
    express: 'express',
  },
}
