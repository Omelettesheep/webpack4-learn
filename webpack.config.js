const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg|jpeg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10 * 1024, // 10KB以下文件base64
                        fallback: 'file-loader' // 其他情况下使用fileloader
                    }
                }
                // use: ['file-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        // webpack 3可用
        // new ExtractTextPlugin({
        //     filename: `[name]_[md5:contenthash:hex:8].css`
        // })

    ]
};