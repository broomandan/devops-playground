var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var jasmine = require('gulp-jasmine');
var jasmineReporters = require('jasmine-reporters');
var covereage = require('gulp-coverage');

var paths = {
    scripts: ['Mvc.Sample/Mvc.Sample/Scripts/*.js', '!client/external/**/*.coffee'],
    customJavaScript: 'Mvc.Sample/Mvc.Sample/Scripts/js/*.js',
    specs: 'Mvc.Sample/Mvc.Sample/Scripts/**/*-spec.js',
    buildOutput: 'build',
    testResult: 'build/test-result',
    publishOutput: 'build/publish'
  };
  
gulp.task('default', ['lint', 'testAndCover','minify']);

gulp.task('lint', function () {
return gulp.src(paths.customJavaScript)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
});

gulp.task('clean', function() {
    return del(paths.buildOutput);
  });
  
gulp.task('minify', ['clean'], function() {
return gulp.src(paths.scripts)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(concat('all.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.publishOutput));
});

gulp.task('watch', function() {
    gulp.watch(paths.scripts, ['minify']);
  });
  
gulp.task('testAndCover', ['clean'], function () {
    return gulp.src(paths.specs)
            .pipe(covereage.instrument({
                pattern: ['src/**/*.js'],
                debugDirectory: 'debug'
            }))
            .pipe(jasmine({
                reporter: new jasmineReporters.JUnitXmlReporter({
                    savePath: paths.testResult,
                    consolidateAll: false
                }
                )}))
            .pipe(covereage.gather())
            .pipe(covereage.format())
            .pipe(gulp.dest(paths.testResult));
});