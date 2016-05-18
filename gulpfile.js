var gulp = require("gulp");
var plumber = require("gulp-plumber");

// ------------
// server
// ------------
var browser = require("browser-sync");

gulp.task("server", function() {
    browser({
        server: {
            baseDir: "./dst/"
        }
    });
});

// ------------
// sass
// ------------
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");

gulp.task("sass", function() {
    gulp.src("src/sass/**/*scss")
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("./dst/css"))
        .pipe(browser.reload({stream: true}));
});

// ------------
// js
// ------------
var uglify = require("gulp-uglify");

gulp.task("js", function() {
    gulp.src(["dst/js/**/*.js", "!dst/js/min/**/*.js"])
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest("./dst/js/min"))
        .pipe(browser.reload({stream: true}));
});

// ------------
// webpack
// ------------
var webpack = require('gulp-webpack');;
var webpackConfig = require('./webpack.config.js');

gulp.task("webpack", function() {
    gulp.src(["src/ts/**/*.ts"])
        .pipe(plumber())
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest("./dst/js"))
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
// default
// ------------
gulp.task("default", ["server", "typings"], function() {
    gulp.watch("src/ts/**/*.ts", ["webpack"]);
    gulp.watch(["dst/js/**/*.js", "!dst/js/min/**/*.js"], ["js"]);
    gulp.watch("src/sass/**/*.scss", ["sass"]);
})