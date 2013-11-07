/**
 * Created by i.sungurov on 02.10.13.
 */

enterTerminal.controller('IndexCtrl', function ($rootScope, $scope, $location, settings, menu, wampObserver) {

    'use strict';

    $rootScope.ticketProduct = null;
    $rootScope.settings = settings;

    menu.trackMenu(function (data) {
        $rootScope.menu = data;
        $rootScope.$broadcast("menu")
    });

    if(settings.settings.httpVersion) {
        wampObserver.init();
    }

    $scope.$on('$routeChangeStart', function(next, current) {
        if(!$rootScope.ticketProduct &&
            ($location.path() !== "/main" && $location.path() !== "/settings")){
            $location.path("/main");
        }
        $rootScope.footer = null;
    });

});