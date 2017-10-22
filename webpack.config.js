var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const cssIdentifier = process.env.NODE_ENV === 'production' ? '[hash:base64:10]' : '[path][name]---[local]';

const sassLoader = process.env.NODE_ENV === 'production'
? ExtractTextPlugin.extract({
  use: 'css-loader?minimize!sass-loader?localIdentName=' + cssIdentifier
})
:   ['style-loader', 'css-loader?localIdentName=' + cssIdentifier, 'sass-loader'];

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: process.env.NODE_ENV === 'production' ? '' : 'dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        loaders: {
            // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
            // the "scss" and "sass" values for the lang attribute to the right configs here.
            // other preprocessors should work out of the box, no loader config like this necessary.
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
            css: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader' // <- this is a dep of vue-loader, so no need to explicitly install if using npm3
            })
          },
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.quark$/,
        loaders: ['babel-loader'],
        exclude: '/node_modules/'
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.scss$/,
        use: sassLoader,
        exclude: '/node_modules/'
      },
      { 
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        use: "file-loader?name=fonts/[hash:12].[ext]" 
      }, 
      { 
        test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        use: "svg-url-loader?noquotes&limit=1024&prefix=svg/[hash:12].[ext]"
      },
      {  
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,  
        use: "url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[hash:12].[ext]"  
      }
      ]
    },
    plugins: [
    new ExtractTextPlugin("style.css")
    ],
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js'
      }
    },
    devServer: {
      historyApiFallback: true,
      noInfo: true
    },
    performance: {
      hints: false
    },
    devtool: '#eval-source-map'
  }

  if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
    ])
}
