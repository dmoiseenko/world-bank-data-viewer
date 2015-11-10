'use strict';

require('angular');
require('angular-ui-router');
require('rx');
require('rx-angular');
require('n3-line-chart');
require('bootstrap-dropdown');
//require('bootstrap-sass-loader!../../bootstrap-sass.config.js');

angular.module('app', [
    'rx',
    'n3-line-chart',
    require('./core/_core.module.js').name,
    require('./api/_api.module.js').name,
    require('./page/_page.module.js').name,
    require('./topics/_topics.module.js').name,
    require('./chart/_chart.module.js').name,
    require('./spinner/_spinner.module.js').name,
    require('./series-view/_series-view.module.js').name,
    require('./countries/_countries.module.js').name,
    require('./indicator-info/_indicator-info.module.js').name,
    require('./indicators/_indicators.module.js').name,
    require('./selected-countries/_selected-countries.module.js').name
]);