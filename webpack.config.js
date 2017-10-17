const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const developmentMode = process.env.NODE_ENV !== 'production';

const plugins = [new ExtractTextPlugin('styles.css')];
if (!developmentMode) {
  plugins.push(new UglifyJSPlugin())
}


module.exports = {
  context: __dirname,
  entry: './app/index.js',
  devtool: developmentMode ? 'inline-cheap-source-map': false,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: "build/"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: '/tmp',
          presets: ['es2016'],
          plugins: [
            'transform-function-bind'
          ]
        }
      }
    ],
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }
    ]
  },
  plugins
};