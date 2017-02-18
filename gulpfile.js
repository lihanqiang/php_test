var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var jade = require('gulp-jade');
var livereload = require('gulp-livereload');
var watch = require('gulp-watch');
var webserver = require('gulp-webserver');
var plumber = require('gulp-plumber');
var webserver = require('gulp-webserver');
var clean = require('gulp-clean');
var sequence = require('run-sequence');


//自定义路径
var path = {
	app: 'app',
	dist: 'dist',
	assets: ['app/assets/**/*'],
	js: ['app/scripts/*.js'],
	sass: ['app/styles/*scss'],
	indexJade: 'app/index.jade'
};
gulp.task('clean', function() {
	return gulp.src(path.dist)
	.pipe(plumber())
	.pipe(clean());
})
gulp.task('copy', ['clean'], function() {
	return gulp.src(path.assets)
	.pipe(plumber())
	.pipe(gulp.dest('dist/assets'));
});
gulp.task('sass', function() {
	return gulp.src(path.sass)
	.pipe(plumber())
	.pipe(sass())
	.pipe(gulp.dest(path.dist + '/css'));
})
gulp.task('jade', function() {
	return gulp.src(path.indexJade)
	.pipe(plumber())
	.pipe(jade())
	.pipe(gulp.dest(path.dist));
})
gulp.task('default', function() {
	sequence(
		'clean',
		'copy',
		'sass',
		'jade'
	)
})
