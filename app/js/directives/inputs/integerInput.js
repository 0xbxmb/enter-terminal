/**
 * Created with JetBrains WebStorm.
 * User: i.sungurov
 * Date: 26.09.13
 * Time: 15:53
 */

adminDashboard.directive('adIntInput', function () {

    'use strict';

    var restrict = 'E',
        replace = true,
        templateUrl = "templates/inputs/intInput.html",
        scope = {
            value: "="
        },

        link = function ($scope, element, attributes) {

            $scope.$watch("value", function (data) {
                $(element).spinner('value', data);
            });

            $(element).change(function (i) {
                $scope.$apply(function () {
                    $scope.value =  $(element).spinner('value');
                });
            });
        };

    return {
        link: link,
        restrict: restrict,
        replace: replace,
        templateUrl: templateUrl,
        scope: scope
    };
});

