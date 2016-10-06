'use strict';
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var debug = require('gulp-debug');
var gulp  = require('gulp');
var gutil = require("gulp-util");
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var tsify = require('tsify');
var uglify = require('gulp-uglify');
var watchify = require("watchify");

var config = require('../build.config.json');
var buildDir = config.build_dir;
var appDir = config.app_dir;
var vendorFiles = config.vendor_files.js;

/////////////////////////////////////////////////////////////
// TYPESCRIPT
/////////////////////////////////////////////////////////////

var watchedBrowserify = watchify(browserify({
  basedir: appDir,
  debug: true,
  entries: ['app.module.ts'],
  cache: {},
  packageCache: {}
}).plugin(tsify));

function bundle() {
  return watchedBrowserify
    .bundle()
    .pipe(source('app.js'))
    .pipe(gulp.dest(buildDir));
}

gulp.task('watch:ts', ['common'], bundle);

watchedBrowserify.on('update', bundle);
watchedBrowserify.on('log', gutil.log);

gulp.task('build:ts', function () {
  return browserify({
    basedir: '.',
    debug: true,
    entries: ['app/app.module.ts'],
    cache: {},
    packageCache: {}
  })
      .plugin(tsify)
    .transform('babelify', {
      presets: ['es2015'],
      extensions: ['.ts']
    })
    .bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    // .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(buildDir));
});

/////////////////////////////////////////////////////////////
// VENDOR JS
/////////////////////////////////////////////////////////////

gulp.task('vendor:js', function () {
  return gulp.src(vendorFiles)
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(buildDir))
});

gulp.task('build:vendor:js', function () {
  return gulp.src(vendorFiles)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(buildDir))
});
