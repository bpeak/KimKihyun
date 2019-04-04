const path = require('path')
const nodeExternals = require('webpack-node-externals')
const webpack = require('webpack')

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
	plugins : [
        new webpack.DefinePlugin({
            'process.env.APP_ENV' : JSON.stringify("server")
        })
    ],
	module: {
		rules: [
			{ 
				test: /\.css$/, 
				loader: 'ignore-loader' 
			},
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
						presets: ['@babel/preset-env', '@babel/preset-react'],
						plugins : ["@babel/plugin-proposal-class-properties"],
                    }
                }
			},
			{
				test: /\.scss$/,
				use : [
					{
						loader : "css-loader",
						options: {
							sourceMap: true,             
							modules: true,
							localIdentName: '[name]__[local]--[hash:base64:5]',
							exportOnlyLocals: true,
						}
					},
					{
						loader: 'sass-loader'
					}
				]
			},	
            {
                test: /\.(ico|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            publicPath : '/public/imgs', // file-loader 사용시에 이미지가 사용할 기준경로
                            outputPath : '../public/imgs', // file-lodaer 사용시에 결과물위치 ( dist 폴더기준 )
                            name: '[name].[ext]',
                            limit: 10000,
                        }
                    }
                ]
            }								
		]
	},
	resolve : {
		extensions: ['.js', '.jsx'],
		alias: {
			"shared" : path.join(__dirname, 'src/shared'),
			'components' : path.join(__dirname, 'src/shared/components'),
            'containers' : path.join(__dirname, 'src/shared/containers'),
		}		
	},
}