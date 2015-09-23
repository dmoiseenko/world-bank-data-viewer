var args = require('yargs').argv;
var gulp = require('gulp');
var browserSync = require('browser-sync');
var config = require('./gulp.config')();
var path = require('path');
var del = require('del');
var _ = require('lodash');
var $ = require('gulp-load-plugins')({ lazy: true });

/**
 * List the available gulp tasks
 */
gulp.task('help', $.taskListing);
gulp.task('default', ['serve-dev']);

/**
 * vet the code and create coverage report
 * @return {Stream}
 */
gulp.task('vet', function () {
    log('Analyzing source with JSHint and JSCS');

    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
        .pipe($.jshint.reporter('fail'))
        .pipe($.jscs());
});

/**
 * Compile scss to css
 * @return {Stream}
 */
gulp.task('compile-styles', function () {
    log('Compiling SCSS --> CSS');

    return gulp
        .src(config.scss)
        .pipe($.plumber())
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer({ browsers: ['last 2 version', '> 5%'] }))
        .pipe(gulp.dest(config.temp));
});


/**
 * Compile scss to css and reload browsersync
 * @return {Stream}
 */
gulp.task('compile-styles-reload-browsersync', function () {
    log('Compiling SCSS --> CSS');

    return gulp
        .src(config.scss)
        .pipe($.plumber())
        .pipe($.sass().on('error', $.sass.logError))
        .pipe($.autoprefixer({ browsers: ['last 2 version', '> 5%'] }))
        .pipe(gulp.dest(config.temp))
        .pipe(browserSync.stream());
});

/**
 * Copy fonts
 * @return {Stream}
 */
gulp.task('copy-fonts', function () {
    log('Copying fonts');

    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts'));
});

/**
 * Prepare fonts for production
 * @return {Stream}
 */
gulp.task('fonts', $.sequence('clean-fonts', 'copy-fonts'));

/**
 * Prepare CSS for production
 * @return {Stream}
 */
gulp.task('styles', function (callback) {
    $.sequence('clean-styles', 'compile-styles')(callback)
});


/**
 * Prepare images
 * @return {Stream}
 */
gulp.task('images', $.sequence('clean-images', 'compress-images'));

/**
 * Compress images
 * @return {Stream}
 */
gulp.task('compress-images', function () {
    log('Compressing and copying images');

    return gulp
        .src(config.images)
        .pipe($.imagemin({ optimizationLevel: 4 }))
        .pipe(gulp.dest(config.build + 'images'));
});

/**
 * Create $templateCache from the html templates
 * @return {Stream}
 */
gulp.task('compose-templatecache', function () {
    log('Creating an AngularJS $templateCache');

    return gulp
        .src(config.htmltemplates)
        .pipe($.if(args.verbose, $.bytediff.start()))
        .pipe($.minifyHtml({ empty: true }))
        .pipe($.if(args.verbose, $.bytediff.stop(bytediffFormatter)))
        .pipe($.angularTemplatecache(
            config.templateCache.file,
            config.templateCache.options
            ))
        .pipe(gulp.dest(config.temp));
});

/**
 * Create $templateCache from the html templates
 * @return {Stream}
 */
gulp.task('templatecache', $.sequence('clean-code', 'compose-templatecache'));

/**
 * Wire-up the bower dependencies
 * @return {Stream}
 */
gulp.task('wiredep', function () {
    log('Wiring the bower dependencies into the html');

    var wiredep = require('wiredep').stream;
    var options = config.getWiredepDefaultOptions();

    // Only include stubs if flag is enabled
    var js = args.stubs ? [].concat(config.js, config.stubsjs) : config.js;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe(inject(js, '', config.jsOrder))
        .pipe(gulp.dest(config.client));
});

/**
 * inject-css-templatecache
 * @return {Stream}
 */
gulp.task('inject-css-templatecache', function () {
    log('Inject css into the html, after files are ready');

    return gulp
        .src(config.index)
        .pipe(inject(config.css))
        .pipe(gulp.dest(config.client));
});

/**
 * Wire-up css into the html, after files are ready
 * @return {Stream}
 */
gulp.task('inject', $.sequence(['wiredep', 'styles', 'templatecache'], 'inject-css-templatecache'));

/**
 * Build everything
 * This is separate so we can run tests on
 * optimize before handling image or fonts
 */
gulp.task('build', $.sequence(['optimize', 'images', 'fonts'], 'build-finished'));

/**
 * Finishing build
 * Delete temp folder and pop up a message.
 */
gulp.task('build-finished', function () {
    log('Building everything');

    var msg = {
        title: 'gulp build',
        subtitle: 'Deployed to the build folder',
        message: 'Running `gulp serve-build`'
    };
    del(config.temp);
    log(msg);
    notify(msg);
});

/**
 * Serve the build environment
 * --debug-brk or --debug
 * --nosync
 */
gulp.task('serve-build', function () { //['build']
    serve(false);
});

/**
 * serve the dev environment
 * --debug-brk or --debug
 * --nosync
 */
gulp.task('serve-dev', ['inject'], function() {
    serve(true /*isDev*/);
});

/**
 * Inject and optimize all files, move to a build folder,
 * and inject them into the new index.html
 * @return {Stream}
 */
gulp.task('optimize', $.sequence('inject', 'optimize-assets'));

/**
 * Optimize all files, move to a build folder,
 * and inject them into the new index.html
 * @return {Stream}
 */
gulp.task('optimize-assets', function () {
    log('Optimizing the js, css, and html');

    var assets = $.useref.assets(); //{searchPath: './'}
    // Filters are named for the gulp-useref path
    var cssFilter = $.filter('**/*.css', { restore: true });
    var jsAppFilter = $.filter('**/' + config.optimized.app, { restore: true });
    var jslibFilter = $.filter('**/' + config.optimized.lib, { restore: true });

    var templateCache = config.temp + config.templateCache.file;

    return gulp
        .src(config.index)
        .pipe($.plumber())
        .pipe(inject(templateCache, 'templates'))
        .pipe(assets) // Gather all assets from the html with useref
        .pipe($.print())
    // Get the css
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore)
    // Get the custom javascript
        .pipe(jsAppFilter)
        .pipe($.ngAnnotate({ add: true }))
        //.pipe($.uglify())
    //.pipe(getHeader())
        .pipe(jsAppFilter.restore)
    // Get the vendor javascript
        .pipe(jslibFilter)
        .pipe($.uglify()) // another option is to override wiredep to use min files
        .pipe(jslibFilter.restore)
    // Take inventory of the file names for future rev numbers
        .pipe($.rev())
    // Apply the concat and file replacement with useref
        .pipe(assets.restore())
        .pipe($.useref())
    // Replace the file names in the html with rev numbers
        .pipe($.revReplace())
        .pipe(gulp.dest(config.build));
});

/**
 * Re-load browserSync
 */
gulp.task('reload-browserSync', browserSync.reload);

/**
 * Optimize the code and re-load browserSync
 */
gulp.task('browserSyncReload', $.sequence('optimize', 'reload-browserSync'));

/**
 * Remove all files from the build, temp, and reports folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean', function (done) {
    var delconfig = [].concat(config.build, config.temp);
    log('Cleaning: ' + $.util.colors.blue(delconfig));
    del(delconfig, done);
});

/**
 * Remove all styles from the build and temp folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-styles', function () {
    var files = [].concat(
        config.temp + '**/*.css',
        config.build + 'styles/**/*.css'
        );
    clean(files);
});

/**
 * Remove all fonts from the build folder
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-fonts', function () {
    clean(config.build + 'fonts/**/*.*');
});

/**
 * Remove all images from the build folder
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-images', function () {
    clean(config.build + 'images/**/*.*');
});

/**
 * Remove all js and html from the build and temp folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-code', function () {
    var files = [].concat(
        config.temp + '**/*.js',
        config.build + 'js/**/*.js',
        config.build + '**/*.html'
        );
    clean(files);
});

/////////////////////////////////////

/**
 * Inject files in a sorted sequence at a specified inject label
 * @param   {Array} src   glob pattern for source files
 * @param   {String} label   The label name
 * @param   {Array} order   glob pattern for sort order of the files
 * @returns {Stream}   The stream
 */
function inject(src, label, order) {
    var options = { read: false };
    if (label) {
        options.name = 'inject:' + label;
    }

    return $.inject(orderSrc(src, order), options);
}

/**
 * Order a stream
 * @param   {Stream} src   The gulp.src stream
 * @param   {Array} order Glob array pattern
 * @returns {Stream} The ordered stream
 */
function orderSrc(src, order) {
    //order = order || ['**/*'];
    return gulp
        .src(src)
        .pipe($.if(order, $.order(order)));
}

/**
 * Format a number as a percentage
 * @param  {Number} num       Number to format as a percent
 * @param  {Number} precision Precision of the decimal
 * @return {String}           Formatted perentage
 */
function formatPercent(num, precision) {
    return (num * 100).toFixed(precision);
}

/**
 * Formatter for bytediff to display the size changes after processing
 * @param  {Object} data - byte data
 * @return {String}      Difference in bytes, formatted
 */
function bytediffFormatter(data) {
    var difference = (data.savings > 0) ? ' smaller.' : ' larger.';
    return data.fileName + ' went from ' +
        (data.startSize / 1000).toFixed(2) + ' kB to ' +
        (data.endSize / 1000).toFixed(2) + ' kB and is ' +
        formatPercent(1 - data.percent, 2) + '%' + difference;
}

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}

/**
 * Delete all files in a given path
 * @param  {Array}   path - array of paths to delete
 * @param  {Function} done - callback when complete
 */
function clean(path, done) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
    log('Cleaned: ' + $.util.colors.blue(path));
}

/**
 * Show OS level notification using node-notifier
 */
function notify(options) {
    var notifier = require('node-notifier');
    var notifyOptions = {
        sound: 'Bottle',
        contentImage: path.join(__dirname, 'gulp.png'),
        icon: path.join(__dirname, 'gulp.png')
    };
    _.assign(notifyOptions, options);
    notifier.notify(notifyOptions);
}

/**
 * Format and return the header for files
 * @return {String}           Formatted file header
 */
function getHeader() {
    var pkg = require('./package.json');
    var template = ['/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @authors <%= pkg.authors %>',
        ' * @version v<%= pkg.version %>',
        ' * @link <%= pkg.homepage %>',
        ' * @license <%= pkg.license %>',
        ' */',
        ''
    ].join('\n');
    return $.header(template, {
        pkg: pkg
    });
}

/**
 * serve the code
 * --debug-brk or --debug
 * --nosync
 * @param  {Boolean} isDev - dev or build mode
 */
function serve(isDev) {
    startBrowserSync(isDev);
}

/**
 * Start BrowserSync
 * --nosync will avoid browserSync
 */
function startBrowserSync(isDev) {
    if (args.nosync || browserSync.active) {
        return;
    }

    if (isDev) {
        // If build: watches the files, builds, and restarts browser-sync.
        // If dev: watches less, compiles it to css, browser-sync handles reload
        gulp.watch([config.scss], ['compile-styles-reload-browsersync'])
            .on('change', changeEvent);
    } else {
        gulp.watch([config.scss, config.js, config.html], ['browserSyncReload'])
            .on('change', changeEvent);
    }

    var options = {
        server: {
            baseDir: isDev ? './src/' : './build',
            routes: {
                "/bower_components": "bower_components",
                "/src": "src",
                "/.tmp": ".tmp"
            }
        },
        files: isDev ? [
            config.client + '**/*.*',
            '!' + '**/*.scss',
            config.temp + '**/*.css'
        ] : [],
        ghostMode: { // these are the defaults t,f,t,t
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        notify: true,
        reloadDelay: 0 //1000
    };

    browserSync(options);
}

/**
 * When files change, log it
 * @param  {Object} event - event that fired
 */
function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}