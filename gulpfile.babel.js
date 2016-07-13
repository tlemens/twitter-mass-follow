'use strict'

const paths = { 
  js:   ['src/javascripts/*.js'],
  sass: ['src/stylesheets/extension.scss']
}

import autoprefixer from 'autoprefixer'
import browserify from 'browserify'
import buffer from 'vinyl-buffer'
import babelify from 'babelify'
import gulp from 'gulp'
import nano from 'gulp-cssnano'
import postcss from 'gulp-postcss'
import sass from 'gulp-sass'
import source from 'vinyl-source-stream'
import uglify from 'gulp-uglify'

gulp.task('sass', () => {
  const processors = [autoprefixer({ browsers: ['last 2 versions'] })]

  return gulp.src(paths.sass)
          .pipe(sass().on('error', sass.logError))
          .pipe(postcss(processors))
          .pipe(nano({ zindex: false }))
          .pipe(gulp.dest('extension'))
})

gulp.task('js', () => {
  browserify({ debug: true })
  .transform(babelify)
  .require("./src/javascripts/extension.js", { entry: true })
  .bundle()
  .pipe(source('extension.js'))
  .pipe(gulp.dest('extension'))
})

gulp.task('production', () => {
  browserify()
  .transform(babelify)
  .require("./src/javascripts/extension.js", { entry: true })
  .bundle()
  .pipe(source('extension.js'))
  .pipe(buffer())
  .pipe(uglify({ compress: { drop_console: true }}))
  .pipe(gulp.dest('extension'))
})

gulp.task('watch', () => {
  gulp.watch(paths.js, ['js'])
  gulp.watch(paths.sass, ['sass'])
})

gulp.task('default', ['watch'])
