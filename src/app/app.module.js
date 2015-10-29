(function () {
    'use strict';

    angular
        .module('app', [

            'app.core',
            'app.api',
            'app.layout',

            'app.filter',
            'app.chart',

            'perfect_scrollbar',
            'rx',
            'angular-spinkit'

        ]);

})();