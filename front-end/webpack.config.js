const webpack = require("webpack");
const dotenv = require("dotenv");
var path = require("path");

var HtmlWebpackPlugin = require("html-webpack-plugin");
var HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + "/public/index.html",
  filename: "index.html",
  inject: "body"
});

module.exports = () => {
  // call dotenv and it will return an Object with a parsed key
  const env = dotenv.config().parsed;
  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    entry: {
      javascript: "./src/index.js"
    },
    output: {
      path: path.join(__dirname, "public"),
      publicPath: "/",
      filename: "bundle.js"
    },
    devServer: {
      host: "0.0.0.0",
      contentBase: "./public",
      hot: true,
      historyApiFallback: true
    },
    node: {
      fs: "empty"
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/react",
              {
                plugins: ["@babel/plugin-proposal-class-properties"]
              }
            ]
          }
        },
        {
          test: /\.scss|css$/,
          loader: "style-loader!css-loader!sass-loader!resolve-url-loader"
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[name].[ext]",
                outputPath: "fonts/"
              }
            }
          ]
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
          exclude: /node_modules/,
          use: ["file-loader?name=[name].[ext]"] // ?name=[name].[ext] is only necessary to preserve the original file name
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin(envKeys),
      new webpack.HotModuleReplacementPlugin(),
      HTMLWebpackPluginConfig
    ],
    watch: true
  };
};
