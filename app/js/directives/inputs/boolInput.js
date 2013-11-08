/**
 * Created with JetBrains WebStorm.
 * User: i.sungurov
 * Date: 26.09.13
 * Time: 15:53
 */

enterTerminal.directive('boolInput', function () {

    'use strict';

    var
        restrict = 'E',
        replace = true,
        templateUrl = "templates/inputs/boolInput.html",
        scope = {
            value: "="
        },
        link = function (scope, element, attributes) {
            scope.$watch("value", function (data) {
                if (data === true) {
                    $(element).find("input").attr('checked', true);
                } else {
                    $(element).find("input").removeAttr('checked');
                }
                $(element).find('input').checkbox("setState", $(element).find("input"));
            });

            $(element).find('input').checkbox().change(function (i) {
                scope.$apply(function () {
                    scope.value = $(i.target).is(':checked');
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