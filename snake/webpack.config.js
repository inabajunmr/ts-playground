module.exports = {
  entry: './src/index.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['ts-loader'],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  }
};

const webpackModule = require('webpack');      

config.plugins.push(
  new webpackModule.IgnorePlugin(/pty.js/, /blessed\/lib\/widgets$/)
);

config.plugins.push(
  new webpackModule.IgnorePlugin(/term.js/, /blessed\/lib\/widgets$/)
);
