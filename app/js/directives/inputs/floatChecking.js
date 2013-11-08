/**
 * Created with JetBrains WebStorm.
 * User: i.sungurov
 * Date: 25.09.13
 * Time: 11:27
 */

adminDashboard.directive('floatChecking', function () {

    'use strict';

    var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/,
        POSITIVE_FLOAT_REGEXP = /^\d+((\.|\,)\d+)?$/;

    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctrl) {
            ctrl.$parsers.unshift(function (viewValue) {

                if ((POSITIVE_FLOAT_REGEXP.test(viewValue)) || !viewValue) {
                    ctrl.$setValidity('float', true);
                    return parseFloat(viewValue.replace(',', '.'));
                }

                ctrl.$setValidity('float', false);
                return undefined;

            });
        }
    };
});