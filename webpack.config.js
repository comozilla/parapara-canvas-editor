var webpack = require("webpack");

module.exports = {
  cache: true,
  entry: "./js/main.js",
  output: {
    path: __dirname,
    filename: "./js/build/bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel",
        query: {
          cacheDirectory: true,
          presets: ["es2015"]
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      // 下のものは、url-loaderでやると１ファイルにまとまっていいが、
      // font-awesomeが特別な種類のフォントを使っている問題でまとめられないからfile-loaderでやっている
      {
        test: /\.(ttf|eot|svg|woff2|woff)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file?name=js/build/[path][name].[ext]"
      }
    ]
  },
  resolve: {
    modulesDirectories: ["web_modules", "node_modules", "bower_components"],
    alias: {
      "font-awesome": "font-awesome/css/font-awesome.css"
    }
  },
  plugins: [new webpack.ResolverPlugin(
    new webpack.ResolverPlugin
      .DirectoryDescriptionFilePlugin("bower.json", ["main"])
  )]
};
