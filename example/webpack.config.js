const path = require('path');
const WebpackChunkProgress = require('../lib/index')
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => ({
    entry: './example/index.js',
    mode: "production",
    output: {
        filename: "[name].[chunkhash].js",
        chunkFilename: "[name].[chunkhash].chunk.js",
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/, // Transform all .js and .jsx files required somewhere with Babel
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-react", "@babel/preset-env"],
                    },
                },
            },]
    },
    devServer: {
        contentBase: path.join(__dirname, './dist'),
        compress: true,
        port: 9000
    },
    optimization: {
        minimize: false,
        splitChunks: {
            chunks: "all",
            maxInitialRequests: 10,
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name(module) {
                        const packageName = module.context.match(
                            /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
                        )[1];
                        return `npm.${packageName.replace("@", "")}`;
                    },
                },
            },
        }
    },
    plugins: [
        new WebpackChunkProgress(),
        new CompressionPlugin({
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 0,
            minRatio: 0.8,
        }),
        new HtmlWebpackPlugin({
            template: "./example/public/index.html",
            inject: 'body',
        }),
    ],

});
