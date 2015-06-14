/* Main runners */
var gulp        = require('gulp');
var livereload  = require('gulp-livereload');
var jslint      = require('gulp-jslint');
var runSequence = require('run-sequence');
var http        = require('gulp-webserver');

var plugins     = require('gulp-load-plugins')();

var WEB_PORT    = 9000;
var APP_DIR     = 'app';
var DIST_DIR    = 'dist';

/* Build steps */
var wiredep     = require('wiredep');
var uglify      = require('gulp-uglify'),
    clean       = require('rimraf'),
    concat      = require('gulp-concat'),
    imagemin    = require('gulp-imagemin'),
    inject      = require('gulp-inject');

/* Compilers */
var riot        = require('gulp-riot'),
    less        = require('gulp-less');
// var coffee     = require('gulp-coffee');


/* Src/Dest paths */
var paths      = {
    scripts    : ['app/scripts/**/*.js', 'app/scripts/**/*.tag'],
    styles     : ['app/styles/**/*.css', 'app/styles/**/*.less'],
    images     : ['app/images/**/*'],
    index      : 'app/index.html'
};
var dest       = {
    scripts    : 'dist/scripts',
    styles     : 'dist/styles',
    images     : 'dist/images'
};

// Clean the dist directory
gulp.task('clean', function (next) {
    clean('dist/**/*', next)
});

// Fill out the index file with the coorrecct dependencies and move to dist
gulp.task('index', function () {
    var options = { };
    var src = dest.scripts + '/*.js'
    gulp.src(paths.index)

        //.pipe(wiredep.stream({
        //    fileTypes: {
        //        html: {
        //            replace: {
        //                js: function(filePath) {
        //                    return '<script src="' + 'vendor/' + filePath.split('/').pop() + '"></script>';
        //                },
        //                css: function(filePath) {
        //                    return '<link rel="stylesheet" href="' + 'vendor/' + filePath.split('/').pop() + '"/>';
        //                }
        //            }
        //        }
        //    }
        //}))

        // Inject all javascript files into the index html app
        .pipe(inject(
            gulp.src(src, { read: false }), {
                addRootSlash: false,
                transform: function(filePath, file, i, length) {
                    return '<script src="' + filePath.replace('dist/', '') + '"></script>';
                }
            }
        ))

        // Inject all css files into the index html app
        .pipe(inject(
            gulp.src([dest.styles + '/*.css'], { read: false }), {
                addRootSlash: false,
                transform: function(filePath, file, i, length) {
                    return '<link rel="stylesheet" href="' + filePath.replace('dist/', '') + '"/>';
                }
            }
        ))

        .pipe(gulp.dest('dist'));
});

// Handle the bower controlled scripts
gulp.task('bower-scripts', function () {
    var js = wiredep().js
    return !js ? undefined
        : gulp.src(js)
        // .pipe(concat('lib.js'))
        .pipe(gulp.dest(dest.scripts))
});

// Handle the bower controlled styles
gulp.task('bower-styles', function () {
    var css = wiredep().css;
    return !css ? undefined
        : gulp.src(wiredep().css)
        .pipe(gulp.dest(dest.styles))
});

// Handle the scripts
gulp.task('scripts', function () {
    return gulp.src(paths.scripts)
        .pipe(riot())
        //.pipe(jslint())
        .pipe(uglify())
        .pipe(concat('scripts.min.js'))
        .pipe(gulp.dest(dest.scripts))
        .pipe(livereload());
});

// Handle the styles
gulp.task('styles', function () {
    return gulp.src(paths.styles)
        .pipe(less()).on('error', console.log)
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest(dest.styles))
        .pipe(livereload());
});

// Handle the Images
gulp.task('images', function () {
    return gulp.src(paths.images)
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest(dest.images))
        .pipe(livereload());
});

gulp.task('server', function () {
    return gulp.src('dist')
    .pipe(http(
        {
            liveReload: true,
            open: true
        }
    ))
});

gulp.task('watch', function () {

    livereload.listen();

    gulp.watch('app/scripts/**', ['scripts']);
    gulp.watch('app/styles/**' , ['styles']);
    gulp.watch('app/images/**' , ['images']);

});

// Clean and build
gulp.task('build', function () {
    runSequence(
        'clean',
        ['styles', 'scripts', 'images'],
        ['bower-scripts', 'bower-styles'],
        ['index']

    );
});

// start local http server with watch and livereload set up
gulp.task('default', function () {
    runSequence(
        'build',
        ['watch', 'server']
    );
});

