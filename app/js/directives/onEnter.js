/**
 * Created by i.sungurov on 16.10.13.
 */

enterTerminal.directive('onEnter', function () {

    "use strict";

    return function ($scope, element, attrs) {
        element.bind("keydown keypress", function (event) {

            if (event.which === 13) {

                $scope.$apply(function () {
                    $scope.$eval(attrs.onEnter);
                });

                event.preventDefault();
            }
        });
    };
});