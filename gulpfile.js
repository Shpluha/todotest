var jshint = require('gulp-jshint');
var gulp = require('gulp');
var watcher = gulp.watch('./js/todo.js', ['lint']);

gulp.task('default', function() {
  // place code for your default task here
}); 

gulp.task('lint', function() {
  return gulp.src('./js/todo.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default', { verbose: true }));
});