const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
    mode : 'development',
    target : 'node',
	externals : [nodeExternals()],
	node: { __dirname : true },
    entry: ['@babel/polyfill', path.join(__dirname, 'src/server/index.js')],
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'server.js',
    },
	module: {
		rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
						// plugins: ["@babel/plugin-proposal-class-properties"]
                    }
                }
			},			
		]
	},
	resolve : {
		extensions: ['.js', '.jsx'],
		alias: {
			"client" : path.join(__dirname, 'src/client'),
			"shared" : path.join(__dirname, 'src/shared'),
		}		
	},
}