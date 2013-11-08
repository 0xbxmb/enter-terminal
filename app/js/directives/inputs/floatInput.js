/**
 * Created with JetBrains WebStorm.
 * User: i.sungurov
 * Date: 26.09.13
 * Time: 15:54
 */

adminDashboard.directive('adFloatInput', function () {

    'use strict';

    var restrict = 'E',
        replace = true,
        templateUrl = "templates/inputs/floatInput.html",
        scope = {
            value: "="
        };

    return {
        restrict: restrict,
        replace: replace,
        templateUrl: templateUrl,
        scope: scope
    };
});
