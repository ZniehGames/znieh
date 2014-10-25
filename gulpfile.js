
var gulp       = require('gulp'),
	  sass       = require('gulp-sass'),
    minifyCSS  = require('gulp-minify-css'),
    browserify = require('gulp-browserify'),
    jshint     = require('gulp-jshint'),
    concat     = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    coffeeify  = require('gulp-coffeeify'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify     = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    to5        = require('gulp-6to5'),
    cache      = require("gulp-cached"),
    scsslint   = require("gulp-scss-lint"),
    jade       = require("gulp-jade"),
    plumber    = require("gulp-plumber"),
    rename     = require("gulp-rename"),
    csslint    = require("gulp-csslint");

/*
var paths = {
  dist: './client/dist',
	scss: './client/src/scss',
	css_compiled: './client/css',
	js_compiled: './client/js',
	js: './client/src/js',
	img: './client/img'
};
*/

var paths = {};

paths.app = './client/app/';
paths.dist = './client/dist/';
paths.tmp = './client/tmp/';

paths.jade = [
    paths.app + "index.jade",
    paths.app + "partials/**/*.jade",
];

paths.images = paths.app + "images/**/*";

paths.css = paths.app + "styles/vendor/*.css";
paths.sass = [
    paths.app + "styles/**/*.scss"
]

paths.js = [
    paths.app + 'js/**/module.js',
    paths.app + 'js/**/*.js'
]

var jsFile = 'app.js';

var options = {};

options.sass = {
    errLogToConsole: true,
    sourceComments: 'none',
    sourceMap: 'scss',
    outputStyle: 'compressed'
}

gulp.task('jade-deploy', function() {
  gulp.src(paths.jade)
      .pipe(plumber())
      .pipe(cache("jade"))
      .pipe(jade({pretty: false}))
      .pipe(gulp.dest(paths.dist + "partials/"))
});

gulp.task('jade-watch', function() {
  gulp.src(paths.jade)
        .pipe(plumber())
        .pipe(cache("jade"))
        //.pipe(jadeInheritance({basedir: "./client/app"}))
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(paths.dist))
});

gulp.task('templates', function() {
    gulp.src(paths.app + "index.jade")
        .pipe(plumber())
        .pipe(jade({pretty: true, locals:{v:(new Date()).getTime()}}))
        .pipe(gulp.dest(paths.dist))
});

gulp.task('sass-lint', function() {
    gulp.src(paths.sass)
        .pipe(cache('sasslint'))
        .pipe(scsslint({config: './client/scsslint.yml'}))
});

gulp.task('sass', function() {
    gulp.src([paths.app + '/styles/layout.scss'])
        .pipe(plumber())
        .pipe(concat("all.scss"))
        .pipe(sass(options.sass))
        .pipe(rename("app.css"))
        .pipe(gulp.dest(paths.tmp))
});

gulp.task('css-vendor', function() {
    gulp.src(paths.css)
        .pipe(concat("vendor.css"))
        .pipe(gulp.dest(paths.tmp))
});

gulp.task('css-lint-app', ['sass'], function() {
    gulp.src(paths.tmp + 'app.css')
        .pipe(csslint('./client/csslintrc.json'))
        .pipe(csslint.reporter())
});

gulp.task('styles-watch', ['sass', 'css-vendor', 'css-lint-app'], function() {
    gulp.src([
            paths.tmp + "vendor.css",
            paths.tmp + "app.css"
        ])
        .pipe(concat("main.css"))
        .pipe(gulp.dest(paths.dist + "styles/"))
});

gulp.task('styles-deploy', ['sass', "css-vendor"], function() {
    gulp.src([
            paths.tmp + "vendor.css",
            paths.tmp + "app.css"
        ])
        .pipe(concat("main.css"))
        .pipe(minifyCSS())
        .pipe(gulp.dest(paths.dist + "styles/"))
});




// JS Related tasks

gulp.task('js-lint', function() {
  gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
});

gulp.task('js', ['js-lint'], function () {
  gulp.src(paths.js)
  .pipe(sourcemaps.init())
    .pipe(to5())
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(uglify({preserveComments: false}))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(paths.dist + 'js/'))
});


// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.jade, ['jade-watch']);
    gulp.watch(paths.sass, ['styles-watch']);
    gulp.watch(paths.js, ['js-lint', 'js']);
});

// The default task (called when you run gulp from cli)
gulp.task('default', [
  'jade-deploy',
  'templates',
  'styles-watch',
  'js'
]);
