var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function() {
    gulp.src('./sass/styles.scss')
    .pipe(plumber())
    .pipe(sass({
        style: 'expanded',
        sourceComments: 'nope'
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./build/'));
});