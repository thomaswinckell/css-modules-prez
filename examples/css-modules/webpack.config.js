const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const createMinifier = require("css-loader-minify-class");
const path = require("path");


const buildPath = path.join(__dirname, './build');
const sourcePath = './src';
const context = path.join(__dirname, sourcePath);

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';
const port = 9018;


let plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(nodeEnv),
        },
    }),
    new HtmlWebpackPlugin({
        template: './index.html',
        path: buildPath,
        appMountId: 'app',
        filename: 'index.html',
        title: "CSS modules demo"
    })
];

if(isProduction) {
    plugins.push(new ExtractTextPlugin({
        filename: 'css/style-[hash].css',
        disable: false,
        allChunks: true
    }));
} else {
    plugins.push(
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    )
}

let rules = [
    {
        test: /\.js?$/,
        exclude: /node_modules/,
        enforce : "pre",
        loader:  "source-map-loader"
    },
];

if(isProduction) {
    rules.push({
        test: /\.css$/,
        use : ExtractTextPlugin.extract({
            fallback : [{
                loader : "style-loader"
            }],
            use : [{
                loader : "css-loader",
                options : {
                    sourceMap: true,
                    minimize: true,
                    modules: true,
                    localIdentName: "[hash:base64]",
                    ident: "css",
                    getLocalIdent: createMinifier()
                }
            }]
        })
    });
} else {
    rules.push({
        test: /\.css$/,
        use : [ {
            loader : "style-loader"
        }, {
            loader : "css-loader",
            options : {
                sourceMap: true,
                modules: true,
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
            }
        }]
    });
}


module.exports = {
    devtool: isProduction ? 'hidden-source-map' : 'eval-source-map',
    context,
    entry: {
        app: './app.js'
    },
    output: {
        path: buildPath,
        filename: 'js/[name]-[hash].js',
    },
    module: {
        rules,
    },
    resolve: {
        extensions: ['.js'],
        modules: [
            'node_modules',
            sourcePath,
        ]
    },
    plugins,
    devServer: {
        contentBase: isProduction ? buildPath : sourcePath,
        port,
        compress: isProduction,
        inline: !isProduction,
        hot: true,
        host: '0.0.0.0'
    }
};