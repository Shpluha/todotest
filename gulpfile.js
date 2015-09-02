var jshint  = require('gulp-jshint'),
	gulp    = require('gulp'),
	watch   = require('gulp-watch'),
	watcher = gulp.watch('./js/todo.js', ['lint']),
	sass    = require('gulp-sass'),
	concat  = require('gulp-concat'),
	Server  = require('karma').Server;

gulp.task('default', function() {
  // place code for your default task here
}); 

gulp.task('lint', function() {
  return gulp.src('./js/todo.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default', { verbose: true }));
});

gulp.task('sass', function () {
  gulp.src('./src/sass/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./build/css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/*.scss', ['sass']);
});

gulp.task('concatjs', function() {
	return gulp.src([
			'./src/js/models/*.js',
			'./src/js/collections/*.js',
			'./src/js/views/*.js',
			'./src/js/*.js'
		])
		.pipe(concat('todo.js'))
		.pipe(gulp.dest('./build/js/'));
});