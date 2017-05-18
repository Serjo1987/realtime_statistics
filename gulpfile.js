var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');

gulp.task('apply-prod-environment', function() {
	process.env.NODE_ENV = 'production';
});

gulp.task('build', function () {
	return browserify({entries: './app/app.js', extensions: ['.js'], debug: true})
		.transform('babelify', {presets: ['es2015', 'react']})
		.bundle()
		.pipe(source('app.js'))
		.pipe(buffer())
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('./assets/js'))
		.pipe(livereload());
});

gulp.task('watch', ['apply-prod-environment', 'build'], function () {
	livereload.listen();
	gulp.watch('./app/**/*.js', ['build']);
});

gulp.task('default', ['apply-prod-environment', 'build', 'watch']);