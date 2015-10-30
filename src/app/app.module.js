(function () {
    'use strict';

    angular
        .module('app', [

            'app.core',
            'app.api',
            'app.page',

            'app.filter',
            'app.chart',

            'perfect_scrollbar',
            'rx',
            'angular-spinkit'

        ]);

})();