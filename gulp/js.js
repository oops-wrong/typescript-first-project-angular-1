'use strict';
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var gulp  = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');

var config = require('../build.config.json');
var buildDir = config.build_dir;
var vendorFiles = config.vendor_files.js;

/////////////////////////////////////////////////////////////
// TYPESCRIPT
/////////////////////////////////////////////////////////////

var tsProject = ts.createProject('tsconfig.json');

gulp.task('ts', function () {
  return tsProject.src()
    .pipe(tsProject())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('main.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(buildDir));
});

gulp.task('build:ts', function () {
  return tsProject.src()
    .pipe(tsProject())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('main.js'))
    .pipe(uglify())
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
