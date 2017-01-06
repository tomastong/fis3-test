var gulp = require('gulp'),
    less = require('gulp-less'),
    sourcemaps = require('gulp-sourcemaps'),
    tmodjs = require('gulp-tmod');

    gulp.task("lesscss",function(){
        return gulp.src('static/less/live/*.less') 
        // base这里就是设置相对路径下进行dest，如果dest写成绝对的，base无意义
            .pipe(sourcemaps.init())
            .pipe(less())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('static/css/live'));
    });
    // gulp.watch('**/src/temp/**/**.html', function (event) {
    //     if(event&&event.path){
    //         console.log(path + ' was ' + event.type + ', continue...');
    //     }
    //     else{
    //         console.log("less has reset;watch....");   
    //     }
    //     gulp.src('**/src/temp/**/**.html')
    //     .pipe(tmodjs({
    //         "charset": "utf-8",    
    //         "compress": true,
    //         "type": "default",
    //         "syntax": "simple",
    //         "minify": true,
    //         "combo": true,
    //         "cache": false,
    //         templateBase:'./h5_source/src/temp/',   
    //                  这个是模板目录tmodjs执行目标，也就是package.json所在位置
    //         runtime:"temp.js" // 固定写法
    //     }))
    //     .pipe(gulp.dest('./h5_source/static/js/'));   输出目录，以gulpfile.js为参考
    // });
    gulp.watch('static/less/live/*.less', function (event) {
        if(event&&event.path){
            console.log(path + ' was ' + event.type + ', continue...');
        }
        else{
            console.log("less has reset;watch....");   
        }
        gulp.src('static/less/live/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('static/css/live'));
    });

    gulp.task('default',['lesscss']);

