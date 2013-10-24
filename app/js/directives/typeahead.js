/**
 * Created by i.sungurov on 02.10.13.
 */

enterTerminal.directive('osTypeahead', function () {

    'use strict';

    return {
        restrict: 'ACE',
        scope: {
            datasets: '=',
            ngModel: '=',
            onSelect: '&'
        },
        link: function (scope, element) {
            element.typeahead(scope.datasets);
            element.bind('typeahead:selected', function (object, datum) {
                scope.$apply(function () {
                    scope.ngModel = datum;
                });
                if (angular.isFunction(scope.onSelect)) {
                    scope.onSelect();
                }
            });
            element.bind('typeahead:autocompleted', function (object, datum) {
                scope.$apply(function () {
                    scope.ngModel = datum;
                });
            });
        }
    };
});