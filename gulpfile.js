var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var minimist = require("minimist");
var browserSync = require("browser-sync");

var config = require("./webpack.config.js");

gulp.task("webpack", function(callback) {
  var env = minimist(process.argv.slice(2));
  var options = Object.create(config);
  if (env["min"]) {
    options.output.filename = "./js/build/bundle.min.js";
    options.plugins = [new webpack.optimize.UglifyJsPlugin()];
  }
  if (env["watch"]) {
    options.watch = true;
  }
  var compiler = webpack(options, function(err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString());
  });
  if (env["browser-sync"]) {
    browserSync({
      server: {
        baseDir: "./",
        index: "index.html"
      }
    });
    gulp.watch(["./js/**", "./index.html", "./css/**"], function() {
      //--------------^ 実際にブラウザに関係するのはbuild/以下なのでそれでいいような
      browserSync.reload();
    });
  }
});

// Gulp コマンド
// readme.mdに書いてもいいが、開発時はgulpをグローバルにインストールしたくないため、
// npm run から叩くので、ここに書いておく。
// gulp webpack -> 普通に1回ビルド
// 引数:
//  --min : UglifyJsPluginをかける。出力はbundle.min.jsなので注意
//  --browser-sync : browser-syncで監視する。--watchもされる。
