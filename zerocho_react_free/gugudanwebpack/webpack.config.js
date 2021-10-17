const path = require('path');

module.exports = {
    name: 'gugudan-setting',
    mode: 'development',
    devtool: 'eval', //운영일대는 hidden-source-map
    resolve: {
        extensions: ['.js', '.jsx']
    },

    entry: {
        app: ['./index'],
    },

    module: {
        rules: [{
            test: /\.jsx?/, //js랑 jsx파일에 룰을 적용하겠다(정규표현식)
            loader: 'babel-loader',
            options: { //바벨의 옵션
                presets: ['@babel/preset-env', '@babel/preset-react'],
            },
        }],
    },

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    }

}