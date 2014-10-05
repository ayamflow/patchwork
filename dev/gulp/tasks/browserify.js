// Uncomment to debug browserify + shim
// process.env.BROWSERIFYSHIM_DIAGNOSTICS = 1;

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),
    notify = require("gulp-notify"),
    argv = require('yargs').argv,
    browserify = require('browserify'),
    watchify = require('watchify'),
    remapify = require('remapify'),
    gStreamify = require('gulp-streamify'),
    uglify = require('gulp-uglify'),
    bundleLogger = require('../utils/bundleLogger'),
    handleErrors = require('../utils/handleErrors'),
    source = require('vinyl-source-stream');

var env = argv.env != "production";

gulp.task('browserify', function()
{
    var b = browserify("./src/index.js",
    {
        cache: {},
        packageCache: {},
        debug: env,
        fullPaths: true
    }),
    file = 'build.js',
    folder = './build/';

    var bundler = global.isWatching ? watchify(b) : b;

    bundler.plugin(remapify, [{
        src: './**/*.js',
        expose: 'common',
        cwd: __dirname + '/../../src/common/'
    },
    {
        src: './**/*.js',
        expose: 'base',
        cwd: __dirname + '/../../src/base/'
    }]);

    var bundle = function() {
        bundleLogger.start();

        return bundler.bundle()
        .on('error', handleErrors)
        .pipe(source(file))
        .pipe(argv.env != "production" ? gutil.noop() : gStreamify(uglify()))
        .pipe(gulp.dest(folder))
        .on('end', bundleLogger.end);
    };

    if(global.isWatching) bundler.on('update', bundle);

    return bundle();
});