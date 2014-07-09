
var gulp = require('gulp'),
    // cache = require('gulp-cached'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function() {
    gulp.src('./sass/styles.scss')
    .pipe(plumber())
    // .pipe(cache('styling'))
    .pipe(sass({
        style: 'expanded',
        sourceComments: 'nope'
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./build/'));
});