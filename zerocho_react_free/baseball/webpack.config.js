//이정도는 다 알고 넘어가야 함
//node에서 씀, 모르면 그냥 외워라
//노드에서 경로를 쉽게 조작하는 것
//노드깔려있으면 자동으로 path 깔려 있음
//웹팩은 노드로 돌리니 const / require 로 해야함
const path = require('path');
const webpack = require('webpack');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
    name: 'wordrelay-setting',
    mode: 'development', //실 서비스 : production
    devtool: 'eval', //빠르게 하겠다
    //웹팩이 알아서 확장자 하나씩 붙여가면서 파일을 찾음
    resolve: {
        extensions: ['.js', '.jsx']
    },

    //입력
    entry: { //제일 중요
        //app : ['./client.jsx', 'WordRelayClass.jsx'],
        //다른 파일이 불러오는 파일은 적을 필요 없음, 확장자도 필요없음
        app: ['./client'],
    },

    //entry의 파일을 읽고 modules를 적용하고 output으로 뺀다
    module: { //애가 Loader
        rules: [{
            test: /\.jsx?/, //js랑 jsx파일에 룰을 적용하겠다(정규표현식)
            loader: 'babel-loader',
            options: { //바벨의 옵션
                //presets: 플러그인들의 모음
                presets: [//옛날브라우저 호환관련 (중요)
                    ['@babel/preset-env', {
                        targets: {
                            //https://github.com/browserslist/browserslist
                            //퍼센트 숫자가 중요
                            browsers: ['> 5% in KR', 'last 2 chrome versions'],
                        },
                        debug: true,
                    }],
                    '@babel/preset-react'
                ],
                plugins: [
                    '@babel/plugin-proposal-class-properties',
                    'react-refresh/babel',
                ],
            },
        }],
    },
    plugins: [
        //new webpack.LoaderOptionsPlugin({debug: true }), //모든 로더에 debug:true를 다 넣어줌
        new ReactRefreshWebpackPlugin(),
    ],
    //출력
    output: { //제일 중요, __dirname : 현재 폴더 경로
        path: path.join(__dirname, 'dist'), //
        filename: 'app.js',
        publicPath: '/dist/',
    },

    //웹펙데브서버 : 소스코드의 변경점을 감지할 수 있음
    devServer:{
        devMiddleware: { publicPath: '/dist' }, //가상경로
        static: { directory: path.resolve(__dirname) }, //실제경로
        hot: true,
        open: true
    },

};