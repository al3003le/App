var gulp = require('gulp');

var clean = require('gulp-clean');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var filesize = require('gulp-filesize');
var inject = require('gulp-inject');
var gulpRemoveHtml = require('gulp-remove-html');
var runSequence = require('run-sequence');

gulp.task('clean', function () {  
    return gulp.src('./build/', {read: false})
        .pipe(clean());
});
 
gulp.task('scripts', function() {
  return gulp.src(['./app/*.js', '!./app/protractor/*.js', './app/**/**/*.js'])
    .pipe(concat('./js/all.js'))
    .pipe(gulp.dest('./build/'))
    .pipe(uglify())
    .pipe(rename('./js/all.min.js'))
    .pipe(gulp.dest('./build/'))
    .pipe(filesize());
});

gulp.task('vendor-js', function() {
  return gulp.src(['./bower_components/angular/angular.min.js', 
  	'./bower_components/angular-ui-router/release/angular-ui-router.min.js', 
  	'./bower_components/angular-translate/angular-translate.min.js'])
    .pipe(concat('./js/all-vendors.min.js'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('vendor-css', function() {
  return gulp.src(['./bower_components/bootstrap/dist/css/bootstrap.min.css'])
    .pipe(concat('./css/css-vendors.min.css'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('node-tpl', function(){
	return gulp.src(['./app/note/components/*.tpl.html'])
	.pipe(gulp.dest('./build/app/note/components/'))
});
gulp.task('translate-tpl', function(){
	return gulp.src(['./app/translate/*.tpl.html'])
	.pipe(gulp.dest('./build/app/translate/'))
});

gulp.task('index-remove-tags', function () {
  return gulp.src('index.html')
    .pipe(gulpRemoveHtml())
    .pipe(gulp.dest('./build/'));
});

gulp.task('index-insert-min', function () {
  var target = gulp.src('./build/index.html');
  var sources = gulp.src(['./build/js/*.min.js', './build/css/*.min.css'], {read: false});
 
  return target.pipe(inject(sources, {ignorePath: 'build'}))
    .pipe(gulp.dest('./build/'));
});

gulp.task('build', function (cb) {
	runSequence('clean', 'vendor-js', 'vendor-css', 'scripts', 'node-tpl', 'translate-tpl', 'index-remove-tags', 'index-insert-min', cb);
});