var path = require('path')
var webpack = require('webpack')
const BabiliPlugin = require("babili-webpack-plugin")

var output = {
  path: path.resolve(__dirname, 'lib'),
  filename: 'index.js',
  library: "neutroniumVmLoader",
  libraryTarget: "commonjs2"
};

var webpackOptions = {
  output: output,
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.cjson$/,
        loader: 'raw-loader'
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  resolve: {
    extensions: ['.js', '.json', '.cjson'],
    alias: {
      'src': path.resolve(__dirname, '../src')
    }
  },
  entry: './src/index.js',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new BabiliPlugin({}, { comments: false }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]
}

module.exports = webpackOptions