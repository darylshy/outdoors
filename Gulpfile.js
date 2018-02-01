var gulp = require('gulp'),
    rename = require('gulp-rename'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    connect = require('gulp-connect'),
    oldie = require('oldie'),
    clean = require('postcss-clean');

gulp.task('serve', ['css'], function () {
    gulp.watch("./css/*.css", ['css']);
});

gulp.task('css', function () {
    var plugins = [
        autoprefixer()
    ];

    var plugins2 = [
        autoprefixer(),
        clean()
    ];

    var plugins3Oldie = [
        autoprefixer(),
        oldie()
    ];

    return gulp.src('./css/*.css')
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./dest'))
        .pipe(postcss(plugins2))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./dest'))
        .pipe(postcss(plugins3Oldie))
        .pipe(rename('style.ie8.min.css'))
        .pipe(gulp.dest('./dest'))
        .pipe(connect.reload());
});

gulp.task('connect', function () {
    connect.server({
        livereload: true
    })
});

gulp.task('default',['serve', 'connect']);