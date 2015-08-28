var jshint = require('gulp-jshint');
var gulp = require('gulp');
var watcher = gulp.watch('./js/todo.js', ['lint']);
var sass = require('gulp-sass');

gulp.task('default', function() {
  // place code for your default task here
}); 

gulp.task('lint', function() {
  return gulp.src('./js/todo.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default', { verbose: true }));
});

gulp.task('sass', function () {
  gulp.src('./sass/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./sass/*.scss', ['sass']);
});