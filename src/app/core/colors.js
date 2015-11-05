'use strict';

module.exports = colors;

colors.$inject = [];

function colors() {
    var service = {
        getColor: getColor,
        clearColor: clearColor
    };

    var availableColors = ['#1F77B4', '#FF7F0E', '#2CA02C', '#D62728', '#9467BD', '#8C564B',
        '#E377C2', '#7F7F7F', '#BCBD22', '#17BECF', '#1F77B4'];
    var selectedColors = {};

    return service;

    ////////////////

    function getColor(isoCode) {
        if (isoCode in selectedColors) {
            return selectedColors[isoCode];
        }

        var color = availableColors.pop();

        selectedColors[isoCode] = color;

        return color;
    }

    function clearColor(isoCode) {
        var color = selectedColors[isoCode];

        delete selectedColors[isoCode];

        availableColors.push(color);
    }

}