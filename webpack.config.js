var path = require('path')
module.exports = {
	entry:{
		index:'./src/app.js'
	},
	output:{
		path:path.resolve(__dirname,'build'),
		filename:'app.bundle.js',
		publicPath:'/build/'
	},
	module:{
		loaders:[
			{
				test: /\.jsx?$/,
		      	loader: 'babel-loader',
		      	include:path.resolve(__dirname,'src'),
			  	exclude:path.resolve(__dirname,'node_modules'),
		  	 	options: {
		          presets: ["react","es2015","stage-0"]
		        },
			},
			{
				test:/\.(css|less)$/,
				loader:"style-loader!css-loader!less-loader"
			}
		]
	}
}
