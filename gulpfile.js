'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');

// Static server
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./src/"
        }
    });
});

gulp.task('sass', function () {
  gulp.src('src/content/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/content/'));
});

gulp.task('sass:watch', function () {
  gulp.watch('*.scss', ['sass']);
});

