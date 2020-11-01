const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
// const css = require('file.css');





module.exports = {
    entry: './api.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'GitHubSDK-final.js'
    }, 
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: ['babel-loader', 'source-map-loader']
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html'
        })
    ],
}
