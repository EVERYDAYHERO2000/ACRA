const gulp = require('gulp');
const babelify = require('babelify');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');

gulp.task('scripts', () => {
  browserify(['source/app/app.js']).transform("babelify", {presets: ["es2015"]})
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('dist/scripts'))
  .pipe(buffer())     // You need this if you want to continue using the stream with other plugins
  .pipe(uglify())
  .pipe(gulp.dest('dist/scripts'))
});