(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('charts', charts);

    charts.$inject = ['worldBank', 'rx', 'plot'];

    function charts(worldBank, Rx, plot) {
        var service = {
            dataObservable: new Rx.BehaviorSubject(null),
            setCountriesAndIndicator: setCountriesAndIndicator
        };

        return service;

        ////////////////


        function setCountriesAndIndicator(countries, selectedIndicator) {
            console.log("load plot data");
            console.log(countries);
            console.log(selectedIndicator);

            if(countries && selectedIndicator) {
                worldBank.getDataByIndicator(selectedIndicator).then(function(data){
                    var composedData = composeData(countries, data);
                    service.dataObservable.onNext(composedData);
                });
            }
        }

        function composeData(countries, data){

            var filteredByCountries = data.filter(function(item){

                var selectedCountryIndex = _.findIndex(countries, function(country){
                    return country.iso2Code === item.country.id;
                });

                return selectedCountryIndex !== -1;
            });

            return plot.composePlotData(filteredByCountries);
        }
    }

})();