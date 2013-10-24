/**
 * Created by i.sungurov on 02.10.13.
 */

enterTerminal.controller('MainCtrl', function ($rootScope, $scope, $log, $location, ticket, notifier) {

    'use strict';

    $rootScope.footer = {
        templateUrl:"templates/footers/mainFooter.html",
        actions: {
            back: function () {
                $scope.back();
            },
            showTicketProduct: function () {
                $location.path("/ticketProduct");
            }
        }
    };

});