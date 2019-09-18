var gulp = require('gulp')
var sass = require('gulp-sass')
var sourcemaps = require('gulp-sourcemaps')
var autoprefixer = require('gulp-autoprefixer')
var browserSyncLib = require('browser-sync').create()

var input = './src/scss/*.scss'
var output = './css'

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
}

gulp.task('sass', function() {
  return gulp
      .src(input)
      .pipe(sourcemaps.init())
      .pipe(sass(sassOptions).on('error', sass.logError))
      .pipe(autoprefixer())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(output))
      .pipe(browserSyncLib.stream())
})

gulp.task('serve', gulp.series('sass', function browserSync() {
  browserSyncLib.init({
    server: {
        baseDir: './'
    }
  })

  gulp.watch('src/scss/**/*.scss', gulp.series('sass'))
  gulp.watch('*.html').on('change', browserSyncLib.reload)
}))

gulp.task('default', gulp.series('serve'))

gulp.task('prod', function () {
  return gulp
    .src(input)
    .pipe(sass({ outputStyle: 'compressed' }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(output));
})
