'use strict';

var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var ngAnnotate = require('gulp-ng-annotate');
var replace = require('gulp-replace');
var rimraf = require('gulp-rimraf');
var uglify = require('gulp-uglify');
var util = require('gulp-util');


var app = {
  basedir:'app',
  js: 'app/js/**/*.js',
  less :'app/less/*.less',
  html : 'app/**/*.html',
  dist: 'dist',
  errorHandler: function(title) {
    return function(err) {
      util.log(util.colors.red('[' + title + ']'), err.toString());
      this.emit('end');
    };
  }
};

gulp.task('clean', function() {
  return gulp.src([app.dist], {read: false})
    .pipe(rimraf());
});

gulp.task('less', function() {
  return gulp.src(app.less)
    .pipe(less())
    .on('error', app.errorHandler)
    .pipe(gulp.dest(app.basedir + '/css'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('html', ['less'], function () {
  gulp.src(app.html)
    .pipe(browserSync.reload({stream: true}));
});

// Static server
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: app.basedir
    }
  });

  gulp.watch(app.less, ['less']);
  gulp.watch([app.html, app.js], ['html']);
});


gulp.task('default', function() {
  runSequence('clean', 'serve');
});