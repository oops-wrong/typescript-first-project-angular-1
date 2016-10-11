var gulp = require('gulp');

var paths = {
  main: ['app/**/*.json', 'app/**/*.png', 'app/**/*.jpg', 'app/**/*.svg', 'app/**/*.gif']
};

gulp.task('copy', function() {
  gulp.src(paths.main, {base: 'app'})
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch(paths.main, ['copy']);
});

gulp.task('default', ['copy']);
