var gulp = require('gulp'),
    gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    argv = require('yargs').argv,
    handleErrors = require('../utils/handleErrors'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css');

var env = argv.env != "production";

gulp.task('styles', function() {
    gulp.src('./sass/styles.scss')
    .pipe(plumber())
    .pipe(sass({
        style: 'expanded',
        sourceComments: 'nope'
    }))
    .on('error', handleErrors)
    .pipe(autoprefixer())
    .pipe(env ? gutil.noop() : minifyCSS())
    .pipe(gulp.dest('./build/'));
});
