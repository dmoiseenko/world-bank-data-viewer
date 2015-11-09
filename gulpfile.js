var gulp = require('gulp');
var path = require('path');

var gutil = require('gutil');
var opn = require('opn');

var jade = require('gulp-jade');

var webpack = require('webpack');
var webpackDevServer = require("webpack-dev-server");

var browserSync = require('browser-sync');
var reload      = browserSync.reload;

var fs = require('fs');
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var argv = require('optimist').argv;

var karma = require('karma').server;

var buildConfig = {};

/** Type of build: production or development. */
buildConfig.type = argv['build-type'] || 'development';
/** The environment that the build uses. */
buildConfig.environment = argv['build-environment'] || 'development';
buildConfig.testing = false;

/** Read the environment variables. */
var environmentConfig = JSON.parse(fs.readFileSync('./config/environments.json', 'utf8'));
buildConfig.gtmID = environmentConfig[buildConfig.environment].gtmID;

/** Override the host. */
var host = argv['host'] ? argv['host'] : '127.0.0.1';

/**
 * Vars
 * Sets watch / development specific variables.
 * Used for the dev task.
 */
gulp.task('vars:dev', function() {
    /** The build directory. */
    buildConfig.dir = '.build';
});

/**
 * Vars
 * Sets build specific variables.
 * Used for the build task.
 */
gulp.task('vars:build', function() {
    /** The build directory. */
    buildConfig.dir = 'build';
});

/**
 * Clean
 * Cleans the build directory before a build.
 * Used for the build task.
 */
gulp.task('clean', function() {
    return gulp.src(buildConfig.dir).pipe(clean());
});

/**
 * Index
 * Converts the main index template to a html file and copies it to the build directory.
 * Used for the build and dev tasks.
 */
gulp.task('index', function () {
    return gulp.src('src/index.html')
        .pipe(gulp.dest(buildConfig.dir));
});

/**
 * Build
 * Performs all the build tasks except webpack.
 */
gulp.task('pre-build', function(done) {
    runSequence(
        'vars:build',
        'clean',
        ['index'],
        done
    );
});


/**
 * Dev
 * Performs all the build tasks except webpack.
 */
gulp.task('pre-dev', function(done) {
    runSequence(
        'vars:dev',
        'clean',
        ['index'],
        done
    );
});

/**
 * Webpack
 * Processes the Webpack configuration file.
 */
function webpackConfig() {
    var options = {};

    options.dir = path.resolve(__dirname, buildConfig.dir);

    options.defines = {
        __TESTING__: buildConfig.testing,
        __DEV__: buildConfig.environment === 'development',
        __STAGE__: buildConfig.environment === 'stage',
        __PRODUCTION__: buildConfig.environment === 'production'
    };

    if (buildConfig.type === 'development') {
        options.sourcemaps = true;
        options.devtool = 'eval';
        options.debug = true;
        options.minimize = false;
        options.chunk = !buildConfig.testing;
    }
    else if (buildConfig.type === 'stage') {
        options.sourcemaps = true;
        options.devtool = 'eval';
        options.debug = true;
        options.minimize = false;
        options.chunk = !buildConfig.testing;
    }
    else {
        options.sourcemaps = false;
        options.devtool = '';
        options.debug = false;
        options.minimize = true;
        options.chunk = !buildConfig.testing;
    }

    return require('./config/webpack-make-config')(options);
}

/**
 * Webpack
 * Starts a webpack dev server that rebuilds the app bundle on file changes.
 * Used for the dev task.
 */
gulp.task('webpack-dev-server', ['vars:dev', 'index'], function(done) {

    //var compiler = webpack(webpackConfig());
    var compiler = webpack(require('./webpack.config.js'));

    compiler.plugin("done", function(stats) {
        /** Reload all connected browsers. */
        reload();
    });

    new webpackDevServer(compiler, {
        contentBase: buildConfig.dir,
        quiet: false,
        noInfo: false,
        watchDelay: 300,
        historyApiFallback: true,
        stats: {
            colors: true
        }
    }).listen(8080, host, function(err) {
            if(err) {
                throw new gutil.PluginError('webpack-dev-server', err);
            }

            done();
        });
});

/**
 * BrowserSync
 * Reloads the browsers after the other tasks have finished.
 */
gulp.task('index-watch', ['index'], browserSync.reload);


/**
 * Development
 * Starts a development environment that reloads on code changes.
 */
gulp.task('dev', ['webpack-dev-server'], function () {
    gulp.watch(['app/index.html'], ['index-watch']);

    browserSync({
        proxy: '127.0.0.1:8080',
        open: false
    }, function () {
        opn('http://127.0.0.1:3000');
    });
});

/** Default task: development. */
gulp.task('default', ['dev']);
