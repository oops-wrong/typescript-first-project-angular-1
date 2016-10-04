'use strict';
var clean = require('gulp-clean');
var deleteEmpty = require('delete-empty');
var gulp  = require('gulp');

var config = require('../build.config.json');
var appDir = config.app_dir;
var buildDir = config.build_dir;
var commonFiles = [
  appDir + '**/*',
  '!**/*.css',
  '!**/*.js'
];

gulp.task('clean', function () {
  return gulp.src(buildDir, {read: false})
    .pipe(clean())
});

gulp.task('common', function () {
  return gulp.src(commonFiles, {base: appDir})
    .pipe(gulp.dest(buildDir))
});

gulp.task('delete-empty-directories', function() {
  deleteEmpty.sync('./' + buildDir);
});

gulp.task('watch', ['watch:ts'], function () {
  gulp.watch(commonFiles, ['common']);
  gulp.watch(appDir + '**/*.css', ['css']);
});
