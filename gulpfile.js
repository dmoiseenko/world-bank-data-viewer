var gulp = require('gulp');
var path = require('path');
var eslint = require('gulp-eslint');
var gutil = require('gutil');
var opn = require('opn');
var webpack = require('webpack');
var webpackDevServer = require("webpack-dev-server");
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var runSequence = require('run-sequence');
var clean = require('gulp-clean');
var argv = require('optimist').argv;
var Server = require('karma').Server;

var buildConfig = {};
buildConfig.environment = argv['build-environment'] || 'development';
buildConfig.testing = false;

var testConfig = {};
testConfig.type = argv['type'] || 'unit';
testConfig.watch = argv['watch'] ? true : false;

/** Override the host. */
var host = argv['host'] ? argv['host'] : '127.0.0.1';

/**
 * Vars
 * Sets watch / development specific variables.
 * Used for the dev task.
 */
gulp.task('vars:dev', function() {
    buildConfig.dir = '.build';
    buildConfig.type = 'development';
});

/**
 * Vars
 * Sets build specific variables.
 * Used for the build task.
 */
gulp.task('vars:build', function() {
    buildConfig.dir = 'build';
    buildConfig.type = 'production';
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
 * Copies the main index template to the build directory.
 * Used for the build and dev tasks.
 */
gulp.task('index', function () {
    return gulp.src('src/index.html')
        .pipe(gulp.dest(buildConfig.dir));
});

/**
 * ESLint
 * Checks the sourcecode for errors with ESLint. Used for the build and dev tasks.
 */
gulp.task('lint', function () {
    return gulp.src(['src/app/**/*.js'])
        .pipe(eslint({ useEslintrc: true }))
        .pipe(eslint.format());
});

/**
 * Build
 * Performs all the build tasks except webpack.
 */
gulp.task('pre-build', function(done) {
    runSequence(
        'vars:build',
        'clean',
        ['lint', 'index'], // todo lint
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
        ['lint', 'index'],
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

    if (buildConfig.type === 'development') {
        options.sourcemaps = true;
        options.devtool = 'eval';
        options.debug = true;
        options.minimize = false;
        options.chunk = !buildConfig.testing;
    }
    else {
        options.sourcemaps = false;
        options.devtool = 'source-map';
        options.debug = false;
        options.minimize = true;
        options.chunk = !buildConfig.testing;
    }

    return require('./config/webpack-make-config')(options);
}

/**
 * Testing
 * Unit tests.
 */
gulp.task('test-unit', function (done) {
    var config = {
        configFile: __dirname + '/config/karma.config.js',
        singleRun: false
    };

    var server = new Server(config, done);
    server.start();
});

/**
 * Webpack
 * Starts a webpack dev server that rebuilds the app bundle on file changes.
 * Used for the dev task.
 */
gulp.task('webpack-dev-server', ['pre-dev'], function(done) {

    var compiler = webpack(require('./config/webpack-dev.config.js'));

    compiler.plugin("done", function() {
        /** Reload all connected browsers. */
        reload();
    });

    new webpackDevServer(compiler, {
        contentBase: buildConfig.dir,
        quiet: false,
        noInfo: false,
        watchOptions: {aggregateTimeout: 300},
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

/**
 * Build
 * Builds the project.
 */
gulp.task('build', ['webpack-build'], function () {
    gutil.log((buildConfig.type == 'development' ? 'Development' : 'Production') + ' build done for environment ' + buildConfig.environment + ' in ./' + buildConfig.dir + '.');
});

/**
 * Webpack
 * Builds an app bundle once. Used for the build task.
 */
gulp.task('webpack-build', ['pre-build'], function(callback) {
    var compiler = webpack(webpackConfig());

    compiler.run(function(err, stats) {
        if (err) {
            throw new gutil.PluginError('webpack-build', err);
        }

        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));

        callback();
    });
});

/** Default task: development. */
gulp.task('default', ['dev']);
