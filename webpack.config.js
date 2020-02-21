console.log('I am webpack.');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { lstatSync, readdirSync } = require('fs');
const source = path.resolve(__dirname, 'src/components');
const isDirectory = source => lstatSync(source).isDirectory();
const dirs = readdirSync(source).map(name => path.join(source, name)).filter(isDirectory);
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const debug = process.env.NODE_ENV !== "production";

module.exports = {
	entry: {
	    app: [
	        './src/app.js',
	        './src/app.scss'
	    ],
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: "bundle.js"
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [
                    /node_modules/
                ],
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                },
            },
            {
                test: /\.hbs$/,
                use: [{
                    loader: 'handlebars-loader',
                    options: {
                        partialDirs: [path.resolve(__dirname, 'src/'), ...dirs],
                    }
                }]
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                 test: /\.(woff|woff2|ttf|jpg|png)(\?[a-z0-9=.]+)?$/,
                 use: [
                     'file-loader'
                 ]
            }
       ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            { from: './src/assets/img', to: './assets/img' },
            { from: './src/assets/docs', to: './assets/docs' },
        ]),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'index.hbs'),
            title: 'Webpack project set up', // needs updating with each project!
            // templateParameters: require('./src/portfolio-config.json'),
            // data: require('./src/portfolio-config.json')
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ]
};
