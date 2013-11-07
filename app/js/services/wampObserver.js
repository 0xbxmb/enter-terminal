/**
 * Created by i.sungurov on 06.11.13.
 */

enterTerminal.service("wampObserver", function ($rootScope, notifier) {

    'use strict';

    return {

        init: function() {

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
    };
});