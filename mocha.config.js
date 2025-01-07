/** Configuration for test with Mocha.
 * npm test
 */
var webpack = require('webpack');

var config = {
  mode: 'development',
  entry: './test/no-node.ts',
  output: {
    filename: 'testBundle.js'
  },
  target: 'node',

  plugins: [ ],

  resolve: {
	extensions: ['.ts', '.js']
  },

  module: {
	rules: [
		{ test: /\.ts$/,
			loader: 'babel-loader',
			options: {
			  presets: [
          '@babel/preset-typescript',
          '@babel/preset-env' 
        ] }
		},
		{ test: /\.js$/,
			loader: 'babel-loader',
			options: {
			  presets: [
          '@babel/preset-env' 
        ] }
		},

	]
  }
};

module.exports = config;
