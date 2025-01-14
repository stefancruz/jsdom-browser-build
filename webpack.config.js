const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  mode: 'production', // Or 'development' based on your environment
  entry: './entry.js', // Entry file
  output: {
    filename: 'jsdom.js',
    path: __dirname + '/dist',
    library: 'jsdom', // The name of the global variable
    libraryTarget: 'umd', // Universal module definition
  },
  plugins: [
    new NodePolyfillPlugin(), // Adds polyfills for Node.js modules
  ],
  resolve: {
    fallback: {
      fs: false, // Disable 'fs' since it's not needed in the browser
      path: require.resolve('path-browserify'),
      util: require.resolve('util/'),
      canvas: false, // Disable 'canvas'
      net: false, // Disable 'net' (used by http-proxy-agent)
      tls: false, // Disable 'tls' (used by https-proxy-agent)
      child_process: false, // Disable 'child_process'
    },
  },
  // Module rules for loading various files
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader', // Ensure you have babel to support ES6+ code
        exclude: /node_modules/,
      },
    ],
  },
  stats: {
    errorDetails: true, // To get more detailed error logs
  },
};
