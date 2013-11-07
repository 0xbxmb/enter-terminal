/**
 * Created by i.sungurov on 11.10.13.
 */

enterTerminal.directive('scrollBar', function ($window) {

    "use strict";

    return {
        restrict: 'E',
        replace: true,
        transclude: true,
        template: '<div class="scroll-pane" ng-transclude></div>',
        scope: {
            applyHeightCallback: "="
        },

        link: function (scope, element, attrs) {

            element.jScrollPane({
                autoReinitialise: true,
                autoReinitialiseDelay: 100
            });

            var api = element.data('jsp');

            scope.$watch(function () {
                return element.find('.' + attrs.scrollpane).length;
            }, function (length) {
                api.reinitialise();
            });

            if(scope.applyHeightCallback){
                scope.applyHeightCallback(element);
            }

            angular.element($window).bind('resize', function (data) {
                scope.applyHeightCallback(element);
                scope.$apply();
            });

        }
    };
});