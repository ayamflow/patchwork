var gulp = require('gulp');

gulp.task('build', ['clean', 'jshint', 'styles', 'images', 'statics', 'browserify']);
gulp.task('dev', ['clean', 'jshint', 'styles', 'images', 'statics']);
gulp.task('default', ['dev', 'watch']);