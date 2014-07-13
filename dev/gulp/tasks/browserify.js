
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    cache = require('gulp-cached'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    remapify = require('remapify'),
    source = require('vinyl-source-stream');

gulp.task('browserify', function() {
    var bundler = (global.isWatching ? watchify : browserify)('./src/index.js');

    // Expose all files in common as 'common/file'
    bundler.plugin(remapify, {
        src: './**/*.js',
        expose: 'common',
        cwd: __dirname + '/../../src/common/'
    });

    var file = 'build.js',
        folder = './build/';

    if(global.isWatching) {
        bundler.on('update', bundle.bind(null, bundler, file, folder));
    }

    return bundle(bundler, file, folder);
});

function bundle(bundler, name, dest) {
    return bundler
        .bundle({debug: false}) // source maps
        .pipe(plumber())
        .pipe(source(name))
        .pipe(cache('bundling'))
        .pipe(gulp.dest(dest));
}