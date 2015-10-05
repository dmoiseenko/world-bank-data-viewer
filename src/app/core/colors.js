(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('colors', colors);

    colors.$inject = [];

    function colors() {
        var service = {
            getColor: getColor,
            clearColor: clearColor
        };

        var colorCssMapping = {
            'red': 'selected-country--red',
            'green': 'selected-country--green',
            'blue': 'selected-country--blue'
        };

        var availableColors = ['red', 'green', 'blue'];
        var selectedColors = {};

        return service;

        ////////////////

        function getColor(isoCode) {
            if (isoCode in selectedColors){
                return selectedColors[isoCode];
            }

            var color = availableColors.pop();

            selectedColors[isoCode] = color;

            return colorCssMapping[color];
        }

        function clearColor(isoCode) {
            var color = selectedColors[isoCode];

            delete selectedColors[isoCode];

            availableColors.push(color);
        }

    }

})();