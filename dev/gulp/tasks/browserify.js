
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    cache = require('gulp-cache'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    source = require('vinyl-source-stream'),
    bundleLogger = require('../util/bundleLogger'),
    handleErrors = require('../util/handleErrors');

gulp.task('browserify', function() {
    var bundler = (global.isWatching ? watchify : browserify)('./src/index.js');

    if(global.isWatching) {
        bundler.on('update', bundle);
    }

    return bundle(bundler, 'build.js', './build');
});

function bundle(bundler, name, dest) {
    bundleLogger.start();

    return bundler
        .bundle({debug: true}) // source maps
        .pipe(plumber({
            errorHandler: handleErrors
        }))
        .pipe(source(name))
        .pipe(cache('bundling'))
        .pipe(gulp.dest(dest))
        .on('end', bundleLogger.end);
}