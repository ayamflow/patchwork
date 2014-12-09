var gulp = require('gulp');
var copy = require('gulp-copy');

/*
  Copy images to deploy folder
  can be used to process images (imagemin, svgo...)
*/

gulp.task('images', ['clean'], function() {
  return gulp.src(process.cwd() + '/static/assets/images')
    // .pipe(imagemin({optimizationLevel: 5})) // for instance
    .pipe(copy(process.cwd() + '/deploy/assets/images')); // if no processing
});
