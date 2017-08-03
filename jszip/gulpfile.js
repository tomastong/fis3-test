var gulp = require('gulp');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var cssmin = require('gulp-minify-css');
// var sourcemaps = require('gulp-sourcemaps');
var notify = require('gulp-notify');
var plumber= require('gulp-plumber');
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');
var del = require('del');

gulp.task('js',function(){
	gulp.src('src/gift.js')
		.pipe(rename({suffix:'.min'}))
		.pipe(uglify())
		.pipe(gulp.dest('dist'));
});

// gulp.task('ls',function(){
// 	gulp.src('less/*.less')
// 		// .pipe(sourcemaps.init())
// 		.pipe(plumber({errorHandler: notify.onError('Error:<%= error.message %>')}))
// 		.pipe(less())
// 		// .pipe(sourcemaps.write())
// 		.pipe(cssmin())
// 		.pipe(gulp.dest('dist/css')
// 		.pipe(livereload())
// 		);

// });
gulp.task('auto',function(){
	// livereload.listen();
	gulp.watch('src/gift.js',['js']);
	// gulp.watch('less/*.less',['ls'])

});



gulp.task('default',['auto']);

