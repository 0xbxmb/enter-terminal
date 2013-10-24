/**
 * Created by i.sungurov on 08.10.13.
 */

enterTerminal.directive("osNotifier", function (notifier) {

    "use strict";

    var
        templateUrl = "templates/notifier.html",
        replace = true,
        restrict = 'E',
        link = function ($scope, iElement, iAttrs) {
            $scope.details = notifier.details;
            $scope.errors = notifier.errors;
            $scope.connection = notifier.connection;

        };

    return {
        templateUrl: templateUrl,
        replace: replace,
        restrict: restrict,
        link: link
    };

});