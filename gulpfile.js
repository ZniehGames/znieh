
var gulp       = require('gulp'),
	sass       = require('gulp-sass'),
    minifyCSS  = require('gulp-minify-css'),
    jshint     = require('gulp-jshint'),
    concat     = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    uglify     = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    to5        = require('gulp-6to5'),
    cache      = require('gulp-cached'),
    scsslint   = require('gulp-scss-lint'),
    jade       = require('gulp-jade'),
    plumber    = require('gulp-plumber'),
    rename     = require('gulp-rename'),
    wrap       = require('gulp-wrap'),
    traceur    = require('gulp-traceur'),
    csslint    = require('gulp-csslint');

var paths = {};
paths.app = './client/app/';
paths.dist = './client/dist/';
paths.tmp = './client/tmp/';
paths.config = './client/config/';
paths.images = paths.app + 'images/**/*';
paths.fonts = paths.app + 'fonts/**/*';

paths.jade = [
    paths.app + 'index.jade',
    paths.app + 'partials/**/*.jade',
];
paths.sass = [
    paths.app + 'styles/**/*.scss'
];
paths.css = [
    paths.app + 'vendor/angular-toastr/dist/angular-toastr.css',
];
paths.js = [
    paths.app + 'js/app.js',
    paths.app + 'js/**/*.js',
];
paths.jsvendor = [
    paths.app + 'vendor/jquery/dist/jquery.js',
    paths.app + 'vendor/angular/angular.js',
    paths.app + 'vendor/angular-route/angular-route.js',
    paths.app + 'vendor/angular-toastr/dist/angular-toastr.js',
    paths.app + 'vendor/lodash/dist/lodash.js',
    paths.app + 'vendor/restangular/dist/restangular.js',
    paths.app + 'vendor/phaser.js',
];

var options = {};
options.sass = {
    errLogToConsole: true,
    sourceComments: 'none',
    sourceMap: 'scss',
}

// Layout
gulp.task('jade-deploy', function() {
  gulp.src(paths.jade)
      .pipe(plumber())
      .pipe(cache('jade'))
      .pipe(jade({pretty: false}))
      .pipe(gulp.dest(paths.dist + 'partials/'))
});

gulp.task('jade-watch', function() {
  gulp.src(paths.jade)
        .pipe(plumber())
        .pipe(cache('jade'))
        //.pipe(jadeInheritance({basedir: './client/app'}))
        .pipe(jade({pretty: true}))
        .pipe(gulp.dest(paths.dist + 'partials/'))
});

gulp.task('templates', function() {
    gulp.src(paths.app + 'index.jade')
        .pipe(plumber())
        .pipe(jade({pretty: true, locals:{v:(new Date()).getTime()}}))
        .pipe(gulp.dest(paths.dist))
});

// CSS related tasks
gulp.task('sass-lint', function() {
    gulp.src(paths.sass)
        .pipe(cache('sasslint'))
        .pipe(scsslint({config: './client/scsslint.yml'}))
});

gulp.task('sass', function() {
    return gulp.src([paths.app + '/styles/layout.scss'])
        .pipe(plumber())
        .pipe(concat('all.scss'))
        .pipe(sass(options.sass))
        .pipe(rename('app.css'))
        .pipe(gulp.dest(paths.tmp))
});

gulp.task('css-vendor', function() {
    return gulp.src(paths.css)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest(paths.tmp))
});

gulp.task('css-lint-app', ['sass'], function() {
    gulp.src(paths.tmp + 'app.css')
        .pipe(csslint('./client/csslintrc.json'))
        .pipe(csslint.reporter())
});

gulp.task('styles-watch', ['sass', 'css-vendor', 'css-lint-app'], function() {
    gulp.src([
            paths.tmp + 'vendor.css',
            paths.tmp + 'app.css'
        ])
        .pipe(concat('layout.css'))
        .pipe(gulp.dest(paths.dist + 'styles/'))
});

gulp.task('styles-deploy', ['sass', 'css-vendor'], function() {
    gulp.src([
            paths.tmp + 'vendor.css',
            paths.tmp + 'app.css'
        ])
        .pipe(concat('layout.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(paths.dist + 'styles/'))
});

// JS Related tasks
gulp.task('js-config', function() {
    return gulp.src(paths.config + 'main.json')
        .pipe(wrap("var config = <%= contents %>;"))
        .pipe(concat('conf.js'))
        .pipe(gulp.dest(paths.tmp));
});

gulp.task('js-lint', function() {
    return gulp.src(paths.js)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('js-build', ['js-lint'], function(cb) {
    return gulp.src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(to5())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify({preserveComments: false}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.tmp));
});

gulp.task('js', ['js-config', 'js-build'], function() {
    _paths = [paths.tmp + 'conf.js', paths.tmp + 'app.js'];
    gulp.src(_paths)
        .pipe(concat('app.js'))
        .pipe(gulp.dest(paths.dist + 'js/'))
});

gulp.task('js-vendor', function() {
    gulp.src(paths.jsvendor)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        .pipe(uglify({mangle:false, preserveComments: false}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.dist + 'js/'))
});

// Common tasks
gulp.task('copy-images', function() {
    gulp.src(paths.images)
        .pipe(gulp.dest(paths.dist +'/images/'))
});

gulp.task('copy-fonts', function() {
    gulp.src(paths.fonts)
        .pipe(gulp.dest(paths.dist +'/fonts/'))
});

gulp.task('copy', ['copy-images', 'copy-fonts']);

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(paths.jade, ['jade-watch']);
    gulp.watch(paths.app + 'index.jade', ['templates']);
    gulp.watch(paths.sass, ['styles-watch']);
    gulp.watch(paths.js, ['js']);
    gulp.watch(paths.jsvendor, ['js-vendor']);
    gulp.watch(paths.images, ['copy-images']);
});

// The default task (called when you run gulp from cli)
gulp.task('default', [
  'jade-deploy',
  'templates',
  'styles-deploy',
  'js',
  'js-vendor',
  'copy'
]);
