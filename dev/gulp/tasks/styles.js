
var gulp = require('gulp'),
    cache = require('gulp-cache'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    handleErrors = require('../util/handleErrors');

gulp.task('styles', function() {
    gulp.src('./src/**/*.scss')
    .pipe(cache('styling'))
    .pipe(plumber({
        errorHandler: handleErrors
    }))
    .pipe(sass({style: 'expanded'}))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./build/'));
});