/**
 * Created with JetBrains WebStorm.
 * User: i.sungurov
 * Date: 26.09.13
 * Time: 15:53
 */



adminDashboard.directive('adDateInput', function () {

    'use strict';

    var restrict = 'E',
        replace = true,
        templateUrl = "templates/inputs/dateInput.html",
        scope = {
            value: "="
        },
        link = function ($scope, element, attributes) {

            $(element).children(".datepicker").datepicker({
                autoclose: true,
                language: 'ru'
            }).bind('changeDate', function (i, o, p) {
                $scope.$apply(function () {
                    $scope.value = i.target.value;
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