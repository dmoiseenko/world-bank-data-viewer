(function () {
    'use strict';

    angular
        .module('app', [

            'app.core',
            'app.api',
            'app.layout',

            'rx',

            'app.filter',
            'app.chart',

            'perfect_scrollbar'

        ])

})();