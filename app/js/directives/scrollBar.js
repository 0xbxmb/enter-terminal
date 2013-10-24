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

        link: function (scope, element, attrs) {

            element.jScrollPane({
                autoReinitialise: true,
                autoReinitialiseDelay: 100
            });

            var
                api = element.data('jsp'),
                applyActualHeight = function () {
                    var scrollPaneHeight = $(".main-column").outerHeight(true) - ($(".general-view-caption").outerHeight(true) +$(".push-bottom").outerHeight(true)),
                        margin = 5;
                    element.css("height", scrollPaneHeight + margin);
                };

            scope.$watch(function () {
                return element.find('.' + attrs.scrollpane).length;
            }, function (length) {
                api.reinitialise();
            });

            applyActualHeight();

            angular.element($window).bind('resize', function (data) {
                applyActualHeight();
                scope.$apply();
            });

        }
    };
});