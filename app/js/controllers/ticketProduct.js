/**
 * Created by i.sungurov on 03.10.13.
 */

enterTerminal.controller('TicketProductCtrl', function ($rootScope, $scope, $log,  $location, $timeout, ticketOperations, notifier ) {

    'use strict';

    $scope.ticket = null;

    $scope.getDate = function (date) {
        var monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
                            'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            d = new Date(date);

        return d.getDate() + " " + monthNames[d.getMonth()];
    };

    $scope.getTime = function (date) {
        return date.substr(date.indexOf("T") + 1, 5);
    };

    $scope.finish = function () {
        $scope.ticket = null;
        $rootScope.ticketProduct = null;
        $location.path("/main");
    };

    $scope.cancel = function (product) {
        $rootScope.to.unselectProduct(product.Id).then(function (data) {
            $rootScope.ticketProduct = data;
            if (!data) {
                $location.path("/main");
            }
        }, function (data) {
            notifier.errors.currentMessage = data;
        });
    };

    $rootScope.footer = {

        templateUrl:"templates/footers/ticketProduct.html",

        actions: {

            cancelAll: function () {
                $rootScope.to.cancelTicket($rootScope.ticketProduct.Id).then( function (data) {
                    $rootScope.ticketProduct = null;
                    $location.path("/main");
                }, function (data) {
                    notifier.errors.currentMessage = data;
                });
            },

            addNew: function () {
                $location.path("/main");
            },

            printTicket: function () {
                $rootScope.to.confirmTicket($rootScope.ticketProduct.Id).then(function (data) {
                    $scope.ticket = data;
                    $rootScope.footer = null;
                }, function (data) {
                    notifier.errors.currentMessage = data;
                })
            }
        }
    };

    $scope.$watch("ticket", function (data) {
        if (data) {
            var showTicketDelay = 15000;
            $timeout($scope.finish, showTicketDelay);
        }
    });

    //TODO:
//    $rootScope.footer.actions.printTicket();
    //TODO:
});