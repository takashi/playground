var path = require('path');
var webpack = require('webpack');
var bowerRoot = path.join(__dirname, "bower_components");

module.exports = {
    entry: {
        index: "./app/assets/javascripts/app.js",
        // mobile: "./app/assets/javascripts/mobile.js"
    },
    output: {
        path: path.join(__dirname, "app/assets/javascripts/dist/"),
        filename: "bundle.[name].js"
    },
    loaders: [
      { test: /\.html$/, loader: "html?minimize" },
    ],
    plugins: [
      new webpack.ResolverPlugin(
          new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin('.bower.json', ['main'])
      ),
      new webpack.ProvidePlugin({
        $: "jquery",
      })
    ],
    externals: ['$', 'jquery-ui'],
    resolve: {
      modulesDirectories: ['node_modules', 'bower_components'],
      extenstions: ['', '.js']
    }
}
