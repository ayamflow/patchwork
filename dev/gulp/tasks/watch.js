
var gulp = require('gulp');

gulp.task('watch', ['setWatch', 'browserify'], function() {
    gulp.watch('./**/*.scss', ['styles']);
});