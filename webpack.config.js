const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');



module.exports = {
    entry: './GitHubSDK.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'GHSDK.js'
    }, 
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html'
        })
    ],
    target: 'web'
}