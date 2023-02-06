const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const CracoEsbuildPlugin = require('craco-esbuild');
module.exports = {
	// ...
	plugins: [{ plugin: CracoEsbuildPlugin }],
	style: {
		postcss: {
			mode: 'file',
		},
	},
	webpack: {
		plugins: {

			add: [
				new FaviconsWebpackPlugin({
					logo: './src/assets/favicon.png',
					publicPath: '/react-template'
				})
			],
		},
	},
};