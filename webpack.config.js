const path = require('path');
console.log("Current directory:", __dirname);

const HtmlWebpackPlugin = require('html-webpack-plugin');


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
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000
    }
}