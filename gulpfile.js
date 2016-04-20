var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var minimist = require("minimist");

var config = require("./webpack.config.js");

gulp.task("webpack", function(callback) {
  var env = minimist(process.argv.slice(2));
  var options = Object.create(config);
  if (env["min"]) {
    options.output.filename = "./js/bundle.min.js";
    options.plugins = [new webpack.optimize.UglifyJsPlugin()];
  }
  var compiler = webpack(options, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString());
    callback();
  });
  if (env["dev-server"]) {
    // webpack-dev-serverで監視する
    new WebpackDevServer(compiler, { }).listen(8080, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
    });
  }
});
