var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
// Development Tasks 
// -----------------


gulp.task('sass', function() {
  return gulp.src('scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write('../maps'))
    .pipe(gulp.dest('css/')) 
    .pipe(browserSync.stream());
})

gulp.task('sass:production', function() {
  return gulp.src('scss/**/*.scss') 
    .pipe(sass({ outputStyle: 'compressed' })) 
    .pipe(gulpIf('*.css', cssnano())) 
    .pipe(gulp.dest('css/')); 
})

var config = {
  browsersync: {
    watch: [
      '../index.html',
      'js/core.js',
    ]
  }
}

// Watchers
gulp.task('watch', function() {
  browserSync.init({
    server: {
      baseDir: "../",
      index: "index.html"
    }
  });
  gulp.watch('scss/**/*.scss', ['sass']);
  gulp.watch(config.browsersync.watch).on('change', browserSync.reload);
});

// Build Sequences
// ---------------


gulp.task('default', function(callback) {
  runSequence(['sass', 'watch'],
    callback
  )
})

gulp.task('build', function(callback) {
  runSequence(
    ['sass'],
    callback
  )
})

gulp.task('build:production', function(callback) {
  runSequence(
    ['sass:production'],
    callback
  )
})
