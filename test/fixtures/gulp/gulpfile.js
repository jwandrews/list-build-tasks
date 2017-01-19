const gulp = require( 'gulp' );

gulp.task( 'build', function() {
  return gulp.src( './' )
    .pipe( gulp.dest( './' ));
});

gulp.task( 'default', function() {
  return gulp.src( './' )
    .pipe( gulp.dest( './' ));
});
