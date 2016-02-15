var path = require('path');

var configurations = {
    entry: {
        app: "./index.js",
    },
    output: {
        path: path.join(__dirname, "./"),
        filename: "dist.js"
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
        {
          test: /\.css$/,
          loaders: [
            'style?sourceMap',
            'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
          ]
        }
      ]
    }
};

module.exports = configurations;
