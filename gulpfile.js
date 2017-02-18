var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var jade = require('gulp-jade');
var livereload = require('gulp-livereload');
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
	.pipe(clean());
})
gulp.task('copy', function() {
	return gulp.src(path.assets)
	.pipe(plumber())
	.pipe(gulp.dest('dist/assets'));
});
gulp.task('copyJs', function() {
	return gulp.src(path.js)
	.pipe(plumber())
	.pipe(gulp.dest(path.dist + '/js'))
})
gulp.task('sass', function() {
	return gulp.src(path.sass)
	.pipe(plumber())
	.pipe(sass())
	.pipe(gulp.dest(path.dist + '/css'));
})
gulp.task('jade', function() {
	return gulp.src(path.indexJade)
	.pipe(plumber())
	.pipe(jade({
		pretty: true
	}))
	.pipe(gulp.dest(path.dist));
})
gulp.task('server', function() {
	return gulp.src(path.dist)
	.pipe(webserver({
		livereload: true,
		open: true,
		port: '8080'
	}))
})
gulp.task('watch', function() {
	//重启相关gulp服务
	gulp.watch(path.sass, ['sass']);
	gulp.watch(path.assets, ['copy']);
	gulp.watch(path.js, ['js']);
	gulp.watch(path.indexJade, ['jade']);
	//页面自动刷新
  	gulp.watch(["dist/js/*.js","dist/css/*.css","dist/index.html"])
    .on("change", livereload.changed)
});
gulp.task('default', function() {
	sequence(
		'clean',
		'copy',
		'copyJs',
		'sass',
		'jade',
		'server',
		'watch'
	)
})
