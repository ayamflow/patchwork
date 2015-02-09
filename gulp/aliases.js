var gulp = require('gulp');

gulp.task('build', ['clean', 'jshint', 'styles', 'browserify']);
gulp.task('dev', ['clean', 'jshint', 'styles']);
gulp.task('default', ['dev', 'watch']);