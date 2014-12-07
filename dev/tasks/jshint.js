var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    jshint = require('gulp-jshint');

gulp.task('jshint', function() {
    return gulp.src('./src/**/*.js')
    .pipe(plumber())
    .pipe(jshint('./.jshintrc', {fail: true}))
    .pipe(jshint.reporter('jshint-stylish'));
});
