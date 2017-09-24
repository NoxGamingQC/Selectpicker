var gulp = require('gulp'),
    uglify = require("gulp-uglify"),
    sass = require("gulp-sass"),
    css = require("gulp-clean-css"),
    concat = require("gulp-concat"),
    concatcss = require("gulp-concat-css");

gulp.task('default', function () {
    gulp.src('./dev/js/*.js')
        .pipe(gulp.dest('./dist'));
    gulp.src('./dev/js/*.js')
        .pipe(uglify())
        .pipe(concat('selectpicker.min.js'))
        .pipe(gulp.dest('./dist'));
    gulp.src('./dev/sass/*.scss')
        .pipe(sass())
        .pipe(concatcss('selectpicker.css'))
        .pipe(gulp.dest('./dist'));
    gulp.src('./dev/sass/*.scss')
        .pipe(sass())
        .pipe(css())
        .pipe(concat('selectpicker.min.css'))
        .pipe(gulp.dest('./dist'));
});
