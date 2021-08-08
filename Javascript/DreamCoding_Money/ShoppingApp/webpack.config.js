const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AddAsset = require('add-asset-html-webpack-plugin');

module.exports = {
    entry: {
        app: "./index.js",
    },
    output: {
        path: __dirname + "/dist",
        filename: "build.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    devServer: {
        contentBase : __dirname + "/dist", //브라우저에 제공할 정적파일들이 담긴 경로
        inline : true,
        hot : true,
        host : 'localhost',
        compress: true, //모든 항목에 대해 gzip을 사용할 것인가.
        port: 9000
        // historyApiFallback: true,
        // port: 9000,
        // publicPath: '/dist/',
        // proxy: {
        //     '/api/': {
        //         target: '백엔드주소',
        //         changeOrigin: true,
        //     }
        // }
    },
    plugins: [
        /**
         * All files inside webpack's output.path directory will be removed once, but the
         * directory itself will not be. If using webpack 4+'s default configuration,
         * everything under <PROJECT_DIR>/dist/ will be removed.
         * Use cleanOnceBeforeBuildPatterns to override this behavior.
         *
         * During rebuilds, all webpack assets that are not used anymore
         * will be removed automatically.
         *
         * See `Options and Defaults` for information
         */
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({ template: 'index.html' }),
        new AddAsset({ filepath: 'style.css' })
    ],
};