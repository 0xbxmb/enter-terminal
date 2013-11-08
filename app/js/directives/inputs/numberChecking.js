/**
 * Created with JetBrains WebStorm.
 * User: i.sungurov
 * Date: 25.09.13
 * Time: 11:29
 */
adminDashboard.directive('numberChecking', function () {

    'use strict';

    var INTEGER_REGEXP = /^\-?\d*$/,
        POSITIVE_INTEGER_REGEXP = /^\d*$/;
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {
                if ((INTEGER_REGEXP.test(viewValue)) || !viewValue) {
                    // it is valid
                    ctrl.$setValidity('integer', true);
                    return viewValue;
                }
                // it is invalid, return undefined (no model update)
                ctrl.$setValidity('integer', false);
                return undefined;
            });
        }
    };
});