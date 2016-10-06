'use strict';
var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function(callback) {
  runSequence(
    'clean',
    ['common', 'build:vendor:js', 'build:css', 'build:vendor:css'],
    'delete-empty-directories',
    callback
  );
});
