var gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload;

// Watch Files For Changes & Reload
gulp.task('serve', ['clean', 'jshint', 'styles', 'watch'], function () {
    browserSync.init(null, {
        watchTask: true,
        notify: false,
        server: {
          baseDir: './static/',
          index: 'index.html'
        }
    });

    gulp.watch(['./static/build/**/*.*'], reload);
});