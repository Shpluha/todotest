var jshint      = require('gulp-jshint'),
	gulp        = require('gulp'),
	watcher     = gulp.watch(['./src/js/*.js', './src/js/**/*.js'], ['lint']),
	sass        = require('gulp-sass'),
	concat      = require('gulp-concat'),
	uglify      = require('gulp-uglify'),
	rename      = require('gulp-rename'),
	runSequence = require('run-sequence'),
	gutil 		= require('gulp-util'),
	Server      = require('karma').Server;

gulp.task('default', function() {
  // place code for your default task here
}); 

gulp.task('lint', function() {
  return gulp.src([
  	'./src/js/*.js',
  	'./src/js/**/*.js'
  	])
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
			'./bower_components/jquery/dist/jquery.js',
			'./bower_components/jquery-ui/jquery-ui.js',
			'./bower_components/underscore/underscore.js',
			'./bower_components/backbone/backbone.js',
			'./bower_components/backbone.localStorage/backbone.localStorage.js',
			'./src/templates/template.js',
			'./src/js/models/*.js',
			'./src/js/collections/*.js',
			'./src/js/views/*.js',
			'./src/js/*.js'
		])
		.pipe(concat('script.js'))
		.pipe(gulp.dest('./build/js/'));
});

gulp.task('compress', function() {
	return gulp.src('./build/js/script.js')
		.pipe(uglify().on('error', gutil.log))
		.pipe(rename({
			extname: '.min.js'
		}))
		.pipe(gulp.dest('./build/js/'));
});

gulp.task('buildjs', function() {
	runSequence('concatjs', 'compress');
});

gulp.task('watchjs', function() {
	gulp.watch(['./src/js/*.js', './src/js/**/*.js'], function() {
		runSequence('lint', 'buildjs');
	});
});