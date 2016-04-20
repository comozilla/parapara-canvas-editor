var gulp = require("gulp");
var webpack = require("gulp-webpack");
var rename = require("gulp-rename")
var WebpackDevServer = require("webpack-dev-server");
var minimist = require("minimist");

var config = require("./webpack.config.js");

gulp.task("webpack", function(callback) {
  return gulp.src("js/main.js").pipe(webpack()).pipe(rename({ basename: "bundle" })).pipe(gulp.dest("js/"));
});
