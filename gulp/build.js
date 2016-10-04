'use strict';
var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build', function(callback) {
  runSequence(
    'clean',
    ['common', 'build:js', 'build:vendor:js', 'build:css', 'build:css:vendor'],
    'delete-empty-directories',
    callback
  );
});
