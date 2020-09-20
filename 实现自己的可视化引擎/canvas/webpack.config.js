/*
    webpack.congig.js webpack的配置文件
    作用： 只是webpack干哪些活
*/

const {
    resolve
} = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
module.exports = {
    // 入口
    entry: './src/index.js',
    // 输出
    output: {
        filename: 'build.js',
        path: resolve(__dirname, '../build')
    },
    module: {
        rules: [
            // 匹配哪些文件
            {
                test: /\.css$/,
                use: [
                    // use 数组中loader执行顺序： 从右到左，从下到上依次执行
                    // 创建style标签，将js中的样式资源插入进行添加到head中生效
                    'style-loader',
                    //将css文件变成commonjs模块加载到js中，里面内容是字符串
                    'css-loader'
                ]
            },
            {
                enforce: "pre",
                test: /\.js$/,
                exclude: /node_modules/,
                include: resolve(__dirname, "/src/js"),
                loader: "eslint-loader"
            },
            {
                oneOf: [{
                    test: /\.(js|jsx)$/,
                    use: [{
                        loader: "babel-loader",
                        options: {
                            //jsx语法
                            presets: [
                                "@babel/preset-react",
                                //tree shaking 按需加载babel-polifill
                                [
                                    "@babel/preset-env",
                                    {
                                        modules: false,
                                        useBuiltIns: "entry",
                                        corejs: 2
                                    }
                                ]
                            ],
                            cacheDirectory: true
                        }
                    }]
                }]
            },
            // 打包其他资源
            {
                exclude: /\.(css|js|html)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]'
                }
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            // 复制'./src/index.html,自动引入打包输出的所有资源（js/css）'
            template: './src/index.html'
        })
    ],
    mode: 'development',
    // 开发服务器，devServer: 用来自动化（自动编译，自动打开浏览器，自动刷新浏览器）
    // 特点：只会在内存中编译打包，不会有任何输出
    // 启动devServer指令为：npx webpack-dev-server
    devServer: {
        contentBase: resolve(__dirname, '../build'),
        // 启动gzip压缩
        compress: true,
        // 端口号
        port: 3002,
        // 自动打开浏览器
        open: true
    }
}