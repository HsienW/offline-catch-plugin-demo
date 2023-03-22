const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OfflinePackage = require('../plugin/plugin');
const path = require('path');

module.exports = {
    entry: () => './web/index.js',
    module: {
        rules: [
            {
                test: /\.(jsx|js)?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
        ]
    },
    devServer: {
        // eslint-disable-next-line no-undef
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080
    },
    resolve: {
        extensions: [
            '.js',
            '.json',
            '.jsx'
        ]
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'web/index.html',
            filename: 'index.html',
        }),
        new CompressionPlugin({
            test: /\.js(\?.*)?$/i
        }),
        new OfflinePackage({
            packageNameKey: 'packageId',
            packageNameValue: 'meeting',
            version: 1,
            baseUrl: 'http://192.168.88.88:5000/',
            fileTypes: ['html', 'js', 'css', 'png']
        })
    ],
};
