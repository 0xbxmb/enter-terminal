/**
 * Created by i.sungurov on 02.10.13.
 */

enterTerminal.controller('IndexCtrl', function ($rootScope, $scope, $location,  $log,
                                                wamp, ticketOperations, menu, notifier) {

    'use strict';

    $rootScope.$on("wampDisconnected", function (rejectObject) {
        notifier.connection.isConnected = false;
        $rootScope.user = null;
        $rootScope.data = null;
        $rootScope.ticketProduct = null;
    });

    $rootScope.$on("wampConnected", function (session) {
        notifier.connection.isConnected = true;
    });

    menu.trackMenu(function (data) {
        $rootScope.menu = data;
    });

    $rootScope.ticketProduct = null;

    $scope.$on('$routeChangeStart', function(next, current) {
     /*   if(!$rootScope.ticketProduct && ($location.path() !== "/main" && $location.path() !== "/settings")){
            $location.path("/main");
        }*/
        $rootScope.footer = null;
    });

});