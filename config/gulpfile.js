var gulp = require('gulp');

var appDir = '../app';
var pathsSource = {
  main: ['/**/*.json', '/**/*.png', '/**/*.jpg', '/**/*.svg', '/**/*.gif']
};

var paths = {};
paths.main = pathsSource.main.map(function (val) {
  return appDir + val;
});

gulp.task('copy', function() {
  gulp.src(paths.main, {base: appDir})
    .pipe(gulp.dest('../dist'));
});

gulp.task('watch', function() {
  gulp.watch(paths.main, ['copy']);
});

gulp.task('default', ['copy']);
