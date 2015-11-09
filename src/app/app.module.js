'use strict';

require('angular');
require('rx');
require('rx-angular');
require('n3-line-chart');
require('bootstrap-dropdown');
//require('bootstrap-sass-loader!../../bootstrap-sass.config.js');

angular.module('app', [
    'rx',
    'n3-line-chart',
    require('./core/core.module').name,
    require('./api/api.module').name,
    require('./page/page.module').name,
    require('./filter/filter.module').name,
    require('./chart/chart.module').name
]);