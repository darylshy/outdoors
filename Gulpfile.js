var gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    connect = require('gulp-connect'),
    oldie = require('oldie'),
    cssbeautify = require('gulp-cssbeautify'),
    clean = require('postcss-clean');

gulp.task('sass', function () {
    var plugins = [
        autoprefixer()
    ];

    var plugins2 = [
        clean()
    ];

    var plugins3Oldie = [
        oldie()
    ];

    return gulp.src('./sass/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dest'))
        .pipe(postcss(plugins))
        .pipe(gulp.dest('./dest'))
        .pipe(postcss(plugins2))
        .pipe(rename('style.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dest'))
        .pipe(postcss(plugins3Oldie))
        .pipe(rename('style.ie8.min.css'))
        .pipe(gulp.dest('./dest'))
        .pipe(cssbeautify())
        .pipe(rename('style.ie8.css'))
        .pipe(gulp.dest('./dest'))
        .pipe(connect.reload());
});

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});
gulp.task('html:watch', function () {
    gulp.watch('./view/**/*.html',['html']);
});

gulp.task('html', function () {
    gulp.src('./view/*.html')
        .pipe(gulp.dest('./'))
        .pipe(connect.reload());
});

gulp.task('connect', function () {
    connect.server({
        livereload: true
    })
});

gulp.task('default',['sass', 'html','sass:watch', 'html:watch', 'connect']);