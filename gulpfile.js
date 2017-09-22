var gulp = require('gulp'),
    uglify = require("gulp-uglify"),
    sass = require("gulp-sass"),
    concat = require("gulp-concat");


gulp.task('default', function () {
    gulp.src('./dev/*.js')
        .pipe(uglify())
        .pipe(concat('selectpicker.js'))
        .pipe(gulp.dest('./dist'));
    gulp.src('./dev/*.sass')
        .pipe(sass())
        .pipe(concat('selectpicker.sass'))
        .pipe(gulp.dest('./dist'));
});
