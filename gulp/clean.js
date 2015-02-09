var gulp = require('gulp'),
    del = require('del');

gulp.task('clean', function (cb) {
    del.sync(process.cwd() + '/static/build/');
    cb();
});