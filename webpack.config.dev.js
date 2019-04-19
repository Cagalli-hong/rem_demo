const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = {
    entry: {
        index: __dirname + '/src/index.js',
        vendor: ['react', 'react-dom']
    },
    output: {
        path: __dirname + '/build',
        filename: '[name]-[hash:10].js',
        publicPath: '',
        chunkFilename: '[name]-[hash:10].js'
    },
    devServer: {
        contentBase: "./build",
        historyApiFallback: true,
        inline: true,
        host: '0.0.0.0',
        port: 5127,
        hot: true
    },
    module: {
        rules: [
            {
                test: /(\.js|\.jsx)$/,
                use: { 
                    loader: 'babel-loader',
                    // options: {
                    //     presets: ["es2015", "react"]
                    // }
                },
                exclude: /node_modules/
            },{
                test: /(\.css)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader'
                        // options: {
                        //     modules: true
                        // }
                    }]
                })
            },{
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader",
            }
        ]
    },
    plugins: [ 
        new webpack.BannerPlugin('这里是banner,请添加信息'),
        new webpack.HotModuleReplacementPlugin(),  //热更新
        new HtmlWebpackPlugin({
            template:__dirname + '/src/components/template.html'
        }),
        new webpack.optimize.UglifyJsPlugin({
            beautify: false,  // 最紧凑的输出
            comments: false,  // 不要注释
            compress: {
                drop_console: true, // 删除console语句
                collapse_vars: true, // 内嵌定义了但是只用到一次的变量
                reduce_vars: true // 提取出出现多次但是没有定义成变量去引用的静态值
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor']
        }),
        new ExtractTextPlugin('[name]-[hash:10].css')
    ]
}
module.exports = config;