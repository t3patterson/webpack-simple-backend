const webpack = require('webpack')
const nodeEnv = process.env.NODE_ENV || 'production'
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssnano = require('cssnano');

module.exports = {
  devtool : 'source-map',
  entry:   { filename: './src/clientApp/index.js' },
  output : { filename: './js/bundle.js', path: `${__dirname}/dist/` },
  context : `${__dirname}` ,
  module: {
    loaders: [
		 {
        test: /\.js$/,
			  exclude: /node_modules/,
			  loader: 'babel-loader',
        query: {
           babelrc: false,
           presets: ['es2015', 'react']
        }
		 },
	    {
		    test: /\.scss$/,
				loader: ExtractTextPlugin.extract({fallbackLoader: "style-loader", loader: "css-loader!sass-loader!resolve-url-loader"})
		 },
		 {
			  test: /\.(jpe?g|png|gif|svg)$/i,
			  loader: 'file-loader?name=[name].[ext]&emitFile=false&publicPath=../images/&context=./src/clientApp/images'
		 }
	 ]
  },
  plugins: [
     //uglify js
     new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false },
			output: {comments: false},
      sourceMap: true
	  }),

     //env plugin
	  new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
	  }),

	  new CopyWebpackPlugin([
	     {from : 'src/clientApp/images', to: 'images'}
	  ]),

     //env plugin -- css
    new ExtractTextPlugin({filename: './css/styles.min.css', allChunks: true}),
    new OptimizeCssAssetsPlugin({
      cssProcessor: cssnano,
      cssProcessorOptions: { discardComments: {removeAll: true } },
      canPrint: true
    })
  ]
}
