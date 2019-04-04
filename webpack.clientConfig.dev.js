const path = require('path')
const webpack = require('webpack')

module.exports = {
    mode : 'development',
    entry: ['@babel/polyfill', path.join(__dirname, 'src/client/index.js')],
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, 'public'),
    },
    plugins : [
        new webpack.DefinePlugin({
            'process.env.APP_ENV' : JSON.stringify("browser")
        })
    ],
	module: {
		rules: [
			{
                test: /\.jsx?$/,
                exclude : /node_modules/,
				loader: "babel-loader",
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                }
			},
		]
	},
	resolve : {
		extensions: [".js", ".jsx"],
		alias: {
            'shared' : path.join(__dirname, 'src/shared'),
		}		
	},
}
