    var gulp = require('gulp'),
    // minifycss = require('gulp-minify-css'),  //- 压缩CSS为一行；
    // concat = require('gulp-concat'),   //- 多个文件合并为一个；
    // uglify = require('gulp-uglify'),
    // rename = require('gulp-rename'),
    // del = require('del'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps');
    // rev = require('gulp-rev');      //- 对文件名加MD5后缀

    
    gulp.task('testless', function () {
        gulp.src(['css/less/*.less'])
        .pipe(less())
        .pipe(gulp.dest('css')); 

        gulp.watch('css/less/*.less', function (event) {
            if(event&&event.path){
                console.log('less continue...');
            }
            else{
                console.log("less has reset;watch....");   
            }
            gulp.src('css/less/*.less',{base:'css/less'})
            .pipe(sourcemaps.init())
            .pipe(less())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./css'));
        });
    });

    gulp.task('default',  function() {
        gulp.start('testless');
    });