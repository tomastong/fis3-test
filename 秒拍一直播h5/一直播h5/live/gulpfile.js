var gulp = require('gulp'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    tmodjs = require('gulp-tmod');
gulp.task("default",function(){
    gulp.watch('**/src/temp/**.html', function (event) {
        if(event&&event.path){
            var path  = event.path.replace(/\\/g,'/');
            path = path.replace(/^[\s\S]*h5_source/,''); 
            console.log(path + ' was ' + event.type + ', continue...');   
        }
        else{
            console.log("tpl has reset;watch....");   
        }
        gulp.src('**/src/temp/**.html')
        .pipe(tmodjs({
            "charset": "utf-8",
            "compress": true,
            "type": "default",
            "syntax": "simple",
            "minify": true,
            "combo": true,
            "cache": false,
            templateBase:'./h5_source/src/temp/',
            runtime:"temp.js"
        }))
        .pipe(gulp.dest('./h5_source/static/js/'));
    });
    gulp.watch('h5_source/src/*.less', function (event) {
        if(event&&event.path){
            var path  = event.path.replace(/\\/g,'/');
            path = path.replace(/^[\s\S]*h5_source/,''); 
            console.log(path + ' was ' + event.type + ', continue...');
        }
        else{
            console.log("less has reset;watch....");   
        }
        gulp.src('h5_source/src/*.less',{base:'./h5_source/src/'})
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./h5_source/static/css/'));
    });
});