var path = require('path');

var configurations = {
    entry: {
        app: "./src/index.js",
    },
    output: {
        path: path.join(__dirname, "./lib"),
        filename: "index.js"
    },
    module: {
      loaders: [
        { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
      ]
    }
};

module.exports = configurations;
