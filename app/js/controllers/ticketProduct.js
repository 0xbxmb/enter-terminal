/**
 * Created by i.sungurov on 03.10.13.
 */

enterTerminal.controller('TicketProductCtrl', function ($rootScope, $scope, $log,  $location, ticket, notifier) {

    'use strict';

    $scope.getLocalDate = function (item) {
        //TODO: пока так.
        return item.StartTime.substr(item.StartTime.indexOf("T") + 1, 5);
    };

    $scope.cancel = function () {
        $location.path("/main");
    };

    $rootScope.footer = {
        templateUrl:"templates/footers/ticketProductFooter.html",
        actions: {
            cancelAll: function () {
                alert("cancelAll");
            },
            addNew: function () {
                $location.path("/main");
            },
            printTicket: function () {
                alert("printTicket");
            }
        }
    };

});