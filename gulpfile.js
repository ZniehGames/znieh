
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
    to5        = require('gulp-6to5');

var paths = {
	scss: './client/src/scss',
	css_compiled: './client/css',
	js_compiled: './client/js',
	js: './client/src/js',
	img: './client/img'
};

var jsFile = 'app.js';

var options = {};

options.sass = {
    errLogToConsole: true,
    sourceComments: 'none',
    sourceMap: 'scss',
    outputStyle: 'compressed'
}

gulp.task('sass', function() {
  gulp.src(paths.scss + '/**/*.scss')
  .pipe(sass(options.sass))
  .pipe(gulp.dest(paths.css_compiled))
  .pipe(minifyCSS())
});

gulp.task('browserify', function() {
    gulp.src([paths.js+ '/**/*.js'])
        .pipe(browserify({
          insertGlobals : true,
          debug : true
        }))
        .pipe(concat(jsFile))
        .pipe(gulp.dest(paths.js_compiled + jsFile))
});

gulp.task('lint', function() {
  gulp.src(paths.js + '/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
});

gulp.task('js', function () {
  gulp.src([paths.js + '/**/module.js', paths.js + '/**/*.js'])
  .pipe(sourcemaps.init())
    .pipe(to5())
    .pipe(concat('app.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(paths.js_compiled))
});

gulp.task('watch', function() {
    gulp.watch(paths.scss + '/**/*.scss', ['sass']);
    gulp.watch(paths.js + '/**/*.js', ['lint', 'js']);
});

gulp.task('default', ['sass', 'lint', 'js']);
