var gulp = require("gulp");
var plumber = require("gulp-plumber");

// ------------
// sass
// ------------
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");

gulp.task("sass", function() {
    gulp.src("src/sass/**/*.scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("./dst/css"))
        .pipe(browser.reload({stream: true}));
});

// ------------
// typings
// ------------
var gulpTypings = require("gulp-typings");

gulp.task("typings", function() {
    return gulp.src("./src/typings.json")
               .pipe(gulpTypings());        
});

// ------------
// webpack
// ------------
var webpack = require('gulp-webpack');;
var webpackConfig = require('./webpack.config.js');

gulp.task("webpack", ["typings"], function() {
    gulp.src(["src/ts/**/*.ts"])
        .pipe(plumber())
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest("./dst/js"))
        .pipe(browser.reload({stream: true}));
});

// ------------
// server
// ------------
var browser = require("browser-sync");

gulp.task("server", ["webpack", "sass"], function() {
    browser({
        server: {
            baseDir: "./dst/"
        }
    });
});

// ------------
// default
// ------------
gulp.task("default", ["server"], function() {
    gulp.watch("src/ts/**/*.ts", ["webpack"]);
    gulp.watch("src/sass/**/*.scss", ["sass"]);
})