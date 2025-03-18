const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/server/index.tsx',
  target: 'node',
  mode: process.env.NODE_ENV || 'development',
  output: {
    filename: 'server.bundle.js',
    path: path.resolve(__dirname, 'dist/server'),
    libraryTarget: 'commonjs2'
  },
	// excluimos los módulos de node_modules
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  }
};
