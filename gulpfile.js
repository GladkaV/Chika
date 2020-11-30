let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    del = require('del'),
    autoprefixer = require('gulp-autoprefixer'),
    fileinclude = require('gulp-file-include');

gulp.task('clean', async function(){
    del.sync('dist');
});

gulp.task('fileinclude', function () {
    return gulp.src(['app/*.html', '!app/blocks/**/*.html'])
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('scss', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass({ outputStyle: 'compressed' }))  //expanded
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 8 versions']
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('css', function () {
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
        'node_modules/slick-carousel/slick/slick.css',
        'node_modules/magnific-popup/dist/magnific-popup.css',
        'node_modules/air-datepicker/dist/css/datepicker.css',
        'node_modules/jquery-form-styler/dist/jquery.formstyler.css',
        'node_modules/jquery-form-styler/dist/jquery.formstyler.theme.css',
        'node_modules/ion-rangeslider/css/ion.rangeSlider.css',
    ])
        .pipe(concat('_libs.scss'))
        .pipe(gulp.dest('app/scss'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task('script', function () {
    return gulp.src('app/js/*.js')
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task('js', function () {
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
        'node_modules/mixitup/dist/mixitup.js',
        'node_modules/air-datepicker/dist/js/datepicker.js',
        'node_modules/jquery-mask-plugin/dist/jquery.mask.min.js',
        'node_modules/jquery-form-styler/dist/jquery.formstyler.js',
        'node_modules/ion-rangeslider/js/ion.rangeSlider.js',
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
});

gulp.task('img', function () {
    let buildImg = gulp.src('app/img/**/*.*')
        .pipe(gulp.dest('dist/img'));
})

gulp.task('watch', function () {
    gulp.watch('app/**/**/*.scss', gulp.parallel('scss'))
    gulp.watch('app/**/**/*.html', gulp.parallel('html', 'fileinclude'))
    gulp.watch('app/**/**/*.js', gulp.parallel('script'))
});

gulp.task('default', gulp.parallel('clean', 'css', 'scss', 'js', 'script', 'img', 'browser-sync', 'watch', 'fileinclude'));