const Path = require('path');
const LiveReloadPlugin = require('webpack-livereload-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebPack = require('webpack');

module.exports = {
  entry: ['babel-polyfill', './client/src'],
  output: {
    path: Path.resolve(__dirname, 'client/'),
    filename: 'js/bundle.min.js'
  },
  context: __dirname,
  module: {
    rules: [
      {
        test: /\.jsx|\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['react', 'es2015', 'stage-1']
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            {
              loader: 'postcss-loader',
              options: {
                plugins: (loader) => [
                  require('postcss-import')({ root: loader.resourcePath }),
                  require('postcss-cssnext')(),
                  require('autoprefixer')(),
                  require('cssnano')()
                ]
              }
            }
          ]
        })
      }
    ]
  },
  resolve: {
    extensions: ['json', '.js', '.jsx']
  },
  plugins: [
    new WebPack.BannerPlugin(`Developed by Carlos Roman <ricardo.roman.ag@gmail.com>`),
    new ExtractTextPlugin('css/styles.min.css'),
    new LiveReloadPlugin({ appendScriptTag: true }),
  ]
};
