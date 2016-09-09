// dependencies
var gulp       = require('gulp');
var ts         = require('gulp-typescript');
var sass       = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

// var paths = {
//     appJavascript: ['**/*.ts', '!node_modules/**/*.*']
// }

// var tsProject = ts.createProject('tsconfig.json'); // loads our configuration

// gulp tasks
// gulp.task('ts', function () {
//    var tsResult = tsProject.src(paths.appJavascript) // load all files from our pathspecification
//         .pipe(ts(tsProject)); // transpile the files into .js
    
//     return tsResult.js.pipe(gulp.dest('')); // save the .js in the same place as the original .ts-file
// });

gulp.task('sass', function () {
  return gulp.src('scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('css/'))
});

// gulp watch
gulp.task('watch', function () {
    // gulp.watch(paths.appJavascript, ['ts']); // run the ts-task any time stuff in appJavascript changes
    gulp.watch(['scss/**/*.scss'], ['sass']);
});

gulp.task('default', ['watch']);