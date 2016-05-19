var path = require('path');
module.exports = {
    entry: {
        app :'./src/ts/app.ts'
    },
    output: {
        path: require("path").resolve("./dst/js/"),
        filename: '[name].bundle.js'
    },
    resolve: {
        root:[path.join(__dirname,'node_modules')],
        extensions:['', '.ts', '.webpack.js', '.web.js', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
}