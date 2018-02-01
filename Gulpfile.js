var gulp = require('gulp'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    connect = require('gulp-connect'),
    oldie = require('oldie'),
    clean = require('postcss-clean');

gulp.task('sass', function () {
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
        .pipe(connect.reload());
});

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('connect', function () {
    connect.server({
        livereload: true
    })
});

gulp.task('default',['sass', 'sass:watch', 'connect']);