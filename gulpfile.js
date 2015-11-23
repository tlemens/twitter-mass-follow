var gulp = require('gulp');
var postcss = require('gulp-postcss');
var nano = require('gulp-cssnano');
var autoprefixer = require('autoprefixer');
var rename = require("gulp-rename");

gulp.task('css', function() {
  var processors = [autoprefixer({ browsers: ['last 2 versions'] })];

  return gulp.src('./src/twitter_mass_follow.css')
          .pipe(postcss(processors))
          .pipe(nano({zindex: false}))
          .pipe(rename({ suffix: '.min' }))
          .pipe(gulp.dest("./css"));
});

var uglify = require('gulp-uglify');

gulp.task('js', function() {

  return gulp.src('./src/twitter_mass_follow.js')
          .pipe(uglify())
          .pipe(rename({ suffix: '.min' }))
          .pipe(gulp.dest("./js"));
});
