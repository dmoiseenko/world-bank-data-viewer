'use strict';

var testsContext = require.context('./src/app/', true, /.spec$/);
testsContext.keys().forEach(testsContext);