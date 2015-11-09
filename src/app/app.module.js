'use strict';

require('angular');
require('rx');
require('rx-angular');
require('perfect-scrollbar');
require('angular-perfect-scrollbar');
require('n3-line-chart');
require('bootstrap-sass-loader!../../bootstrap-sass.config.js');
require('../content/scss/styles.scss');

angular.module('app', [
    'rx',
    'n3-line-chart',
    'perfect_scrollbar',
    require('./core/core.module').name,
    require('./api/api.module').name,
    require('./page/page.module').name,
    require('./filter/filter.module').name,
    require('./chart/chart.module').name
]);