var gulp = require('gulp'),
    clean = require('gulp-clean');

gulp.task('clean', function () {
    return gulp.src('./build', {read: false})
        .pipe(clean());
});
