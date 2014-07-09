
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    // cache = require('gulp-cached'),
    browserify = require('browserify'),
    watchify = require('watchify'),
    remapify = require('remapify'),
    source = require('vinyl-source-stream');

gulp.task('browserify', function() {
    var bundler = (global.isWatching ? watchify : browserify)('./src/index.js');

    var basePath = require('path').resolve(__dirname + '../../../');
    
    bundler.plugin(remapify, [{
        src: './src/common/**/*.js',
        expose: 'common',
        cwd: __dirname + '../../../'
    }]);

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
        // .pipe(cache('bundling'))
        .pipe(gulp.dest(dest));
}