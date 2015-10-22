(function () {
    'use strict';

    angular
        .module('app', [

            'app.core',
            'app.api',
            'app.layout',

            'app.filter',
            'app.chart',
            'app.widgets',

            'perfect_scrollbar',
            'rx'

        ]);

})();