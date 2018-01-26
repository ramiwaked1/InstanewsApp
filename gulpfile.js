var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var eslint = require('gulp-eslint');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cssnano = require('gulp-cssnano');
var prettyError = require('gulp-prettyerror');

gulp.task('scripts', function() {
  gulp.src('./assets/js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(uglify())
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(gulp.dest('./dist/js'))
});
// Modify our default task method by passing an array of task names
gulp.task('default', ['serve', 'scripts']);

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// Save a reference to the `reload` method

// Watch scss AND html files, doing different things with each.
gulp.task('serve', function() {

  // Serve files from the root of this project
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });

  gulp.watch('./assets/js/*.js', ['scripts']);
  gulp.watch('./assets/scss/*.scss', ['sass']);
  gulp.watch("*.html").on("change", reload);
  gulp.watch("./dist/*.js").on("change", reload);
  gulp.watch("./assets/scss/*.scss").on("change", reload);
});
gulp.task('sass', function() {
  gulp.src('./assets/scss/*.scss')
    .pipe(prettyError()) // ADD THIS LINE
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(cssnano())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('./dist/css'));
});
