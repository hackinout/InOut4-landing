var gulp = require('gulp');
var uncss = require('gulp-uncss');

gulp.task('default', function () {
    return gulp.src('./css/bootstrap-custom.css')
        .pipe(uncss({
            html: ['index.html'],
            ignore: [ /\modal/]
        }))
        .pipe(gulp.dest(''));
})