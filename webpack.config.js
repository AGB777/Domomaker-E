const path = require('path');

module.exports = {
    entry: {
        app: './client/maker.jsx',
        login: './client/login.jsx',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_madules/,
                use: {
                    loader: "babel-loader",
                },
            },
        ],
    },
    mode: 'none',
    watchOptions: {
        aggregateTimeout: 200,
    },
    output: {
        path: path.resolve(__dirname, 'hosted'),
        filename: '[name]bundle.js',
    },
};