var webpack = require('webpack');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var env = process.env.WEBPACK_ENV;
var WebpackDevServer = require('webpack-dev-server');
var path = require('path');
var filenameResolver = require('./filenameResolver');
var autoprefixer = require('autoprefixer');


var plugins = [new filenameResolver()];


var config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        exclude: /node_modules/,
        loaders: ["babel?stage=1&optional=runtime"]
      },
      {
        test: /\.html$/,
        loader: "file?name=[name].[ext]",
      },
      {
        test: /\.json$/,
        loader: "json-loader",
      },
      {
        test: /\.less$/, 
        loaders: ['style', 'css', 'autoprefixer?browsers=last 4 versions', 'less', 'less-autoimports']
      },
      {
        test: /\.css$/, 
        loaders: ['style', 'css', 'autoprefixer?browsers=last 4 versions']
      },
     
      { 
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "url-loader?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff" 
      },
      { 
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "file-loader?name=fonts/[name].[ext]" 
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/,
        loader: "file-loader?name=img/[name].[ext]"
      }
    ]
  },
  resolve: {
    root: path.resolve('./src'),
    extensions: ['', '.js', '.json', '.jsx'],
    modulesDirectories: ['web_modules', 'node_modules', 'local_modules']
  },
  resolveLoader: {
    modulesDirectories: ['loaders', 'web_loaders', 'web_modules', 'node_loaders', 'node_modules', '`local_modules`']
  },
  plugins: plugins
};

module.exports = config;