const path = require('path');

module.exports = (env, argv) => ({
    entry: path.join(__dirname, 'src/rpg-tools.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader',
                ],
            },
        ],
    },
    devtool: argv.mode === 'production' ? 'source-map' : 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 9000,
    }
});
