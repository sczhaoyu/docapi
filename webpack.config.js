var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var loaders = ['react-hot', 'jsx?harmony'];
var entry = [
    'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server',
    __dirname + '/src/main.jsx'
];

var plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
];

var less = {
    test:/\.less$/,
    loader:"style-loader!css-loader!less-loader"
};

if(process.argv.length > 2 && process.argv[2] == 'deploy'){
    loaders.shift();

    entry.shift();
    entry.shift();

    less.loader = ExtractTextPlugin.extract("style-loader", "css-loader!less-loader");
    plugins = [new ExtractTextPlugin("bundle.css"),
               new webpack.optimize.UglifyJsPlugin(),
               new webpack.optimize.DedupePlugin()];
}

module.exports = {
    // context: __dirname + '/src',
    devtools: 'eval',
    entry: entry,
    output: {
        path: __dirname + '/build',
        filename:'bundle.js',
        publicPath:'/build/'
    },

    module: {
        loaders: [
            {test:/\.jsx$/, loaders:loaders},
            {test:/\.css$/,loader:"style-loader!css-loader"},
            less
        ]
    },
    plugins: plugins
};
