/**
 * Created by i.sungurov on 02.10.13.
 */

enterTerminal.controller('MainCtrl', function ($rootScope, $scope, $log, $location, ticketOperations, notifier) {

    'use strict';

    $scope.selectedService = null;

    $scope.recordMethod = function () {
        $location.path("/record");
    };

    $scope.toQueueMethod = function () {
        ticketOperations.selectProduct([$scope.selectedService.Id, null, null]).then(function (data) {
            $rootScope.ticketProduct = data;
            $location.path("/ticketProduct");
        }, function (data) {
            notifier.errors.currentMessage = data.desc;
        });
    };

    $rootScope.footer = {
        templateUrl:"templates/footers/main.html",
        actions: {
            back: function () {
                $scope.back();
            },
            showTicketProduct: function () {
                $location.path("/ticketProduct");
            }
        },
        states: {
            back:{
                isActive: false
            }/*,
            showTicketProduct:{
                isActive: true
            }*/
        }
    };

});