/**
 * Created by i.sungurov on 02.10.13.
 */

enterTerminal.controller('IndexCtrl', function ($rootScope, $scope, $location,  $log, wamp,
                                                ticketOperations, httpTicketOperations,
                                                menu, httpMenu,
                                                notifier, settings) {

    'use strict';



    if (settings.settings.httpVersion) {

        $rootScope.to = httpTicketOperations;
        $rootScope.m  = httpMenu;

    } else {

        $rootScope.to = ticketOperations;
        $rootScope.m  = menu;

        $rootScope.$on("wampDisconnected", function (rejectObject) {
            notifier.connection.isConnected = false;
            $rootScope.user = null;
            $rootScope.data = null;
            $rootScope.ticketProduct = null;
        });

        $rootScope.$on("wampConnected", function (session) {
            notifier.connection.isConnected = true;
        });
    }

    $rootScope.m.trackMenu(function (data) {
        $rootScope.menu = data;
        $rootScope.$broadcast("menu")
    });


    $rootScope.ticketProduct = null;

    $scope.$on('$routeChangeStart', function(next, current) {
        if(!$rootScope.ticketProduct &&
            ($location.path() !== "/main" && $location.path() !== "/settings")){
            $location.path("/main");
        }
        $rootScope.footer = null;
    });

    $rootScope.settings = settings;

});