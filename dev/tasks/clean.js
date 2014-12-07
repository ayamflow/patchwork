var gulp = require('gulp'),
    del = require('del');

gulp.task('clean', function (cb) {
    del.sync(join(process.cwd(), 'static/build'));
});