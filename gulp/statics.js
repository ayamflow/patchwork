var gulp = require('gulp');

/*
  Just copy everything to the /deploy folder.
  You can use this to plug some processing on the fonts for instance.
*/

gulp.task('statics', ['clean'], function(cb) {
  ['/assets/data', '/assets/fonts'].forEach(function(path) {
    gulp.src([process.cwd() + path])
        .pipe(gulp.dest(process.cwd() + '/deploy' + path));
  });

  cb();
});