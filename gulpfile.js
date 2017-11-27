var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');

var paths = {
    scripts: ['Mvc.Sample/Mvc.Sample/Scripts/*.js', '!client/external/**/*.coffee'],
    CustomJavaScript: ['Mvc.Sample/Mvc.Sample/Scripts/CustomJavaScript/*.js']
  };
  
gulp.task('default', ['lint','minify']);

gulp.task('lint', function () {
return gulp.src(paths.CustomJavaScript)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
});

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use any package available on npm
gulp.task('clean', function() {
    // You can use multiple globbing patterns as you would with `gulp.src`
    return del(['build']);
  });
  
  gulp.task('minify', ['clean'], function() {
    // Minify and copy all JavaScript (except vendor scripts)
    // with sourcemaps all the way down
    return gulp.src(paths.scripts)
      .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(concat('all.min.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('build/js'));
  });