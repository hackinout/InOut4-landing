'use strtict'
var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var reload = browserSync.reload
var concat = require('gulp-concat')
var minify = require('gulp-minify')
var cleanCss = require('gulp-clean-css')
var rename = require('gulp-rename')
var htmlmin = require('gulp-htmlmin')
var del = require('del')
var uncss = require('gulp-uncss')
var uglify = require('gulp-uglify')
var pump = require('pump')
var imagemin = require('gulp-imagemin')

// Default Gulp task to run including all necessary dependencies
gulp.task('default', ['browser-sync', 'build'], function () {
  gulp.watch(['source/**/*.html', 'source/js/*.js',
    'source/css/*.css'
  ], ['build'])
  gulp.watch(['public/**/*.html', 'public/js/*.js',
    'public/css/*.css'
  ], reload)
})

// Task to initiate browser-sync proxy server
// var src = {
//     js: 'source/js/*.js',
//     css:  'source/css/*.css',
//     html: 'source/*.html'
// }
gulp.task('browser-sync', function () {
  browserSync.init({
    server: './public'
  })
  // gulp.watch(src.html, src.css, src.js, ['build'])
  // gulp.watch(src.html, src.css, src.js).on('change', reload)
})


// Build task to initiate minify tasks for CSS and JS
gulp.task('build', ['minify-html', 'pack-minify-js', 'pack-minify-css', 'pack-minify-sponsor-css', 'gulp-uncss',
  'copy-sponsor', 'copy-fonts', 'copy-css', 'image-optim'
])

// Task to minify HTML
gulp.task('minify-html', function () {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('public/'))
})

// Task to uglify JS
gulp.task('pack-minify-js', function (cb) {
  pump([
    gulp.src(['source/js/*.js', '!source/js/*.min.js'])
      .pipe(minify({
        ext: {
          min: '.min.js'
        },
        noSource: true
      })),
    uglify(),
    gulp.dest('./public/js')
  ],
    cb
  )
})

// Task to minify CSS
gulp.task('pack-minify-css', function () {
  return gulp.src(['source/css/*.css', '!source/css/*.min.css'])
    .pipe(concat('main.css'))
    .pipe(cleanCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('public/css'))
})

// Task to minify sponsor CSS
gulp.task('pack-minify-sponsor-css', function () {
  return gulp.src(['source/css/*.css', '!source/css/*.min.css'])
    .pipe(concat('sponsor.css'))
    .pipe(cleanCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('public/css'))
})

// Task to remove unused css
gulp.task('gulp-uncss', function () {
  return gulp.src('./css/bootstrap-custom.css')
    .pipe(uncss({
      html: ['index.html'],
      ignore: [/\modal/]
    }))
    .pipe(gulp.dest('public/css'))
})

gulp.task('image-optim', function () {
  return gulp.src('source/assets/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/assets/img'))
})

// // Task to copy assets
gulp.task('copy-sponsor', function () {
  return gulp.src('source/sponsor/*')
    .pipe(gulp.dest('public/sponsor'))
})

// // Task to copy assets
gulp.task('copy-fonts', function () {
  return gulp.src('source/assets/fonts/*')
    .pipe(gulp.dest('public/assets/fonts'))
})

gulp.task('copy-css', function () {
  return gulp.src('source/css/*.min.css')
    .pipe(gulp.dest('public/css'))
})

// Task to delete target assets folder for recreation
gulp.task('clean', function () {
  return del(['public/**', '!public'])
})


