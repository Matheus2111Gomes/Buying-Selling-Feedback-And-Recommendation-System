const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './src/handler.ts', // Change entry point to TypeScript file
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'], // Resolve both .ts and .js files
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, '.webpack'),
    filename: 'handler.js',
  },
};
