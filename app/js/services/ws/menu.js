/**
 * Created by i.sungurov on 08.10.13.
 */

enterTerminal.service("wsMenu", function (wamp, $rootScope, MENU_URL) {

    'use strict';

    var
        trackMenu = function (onEvent) {
            wamp.subscribe(MENU_URL, onEvent);
        },
        notTrackMenu = function () {
            wamp.subscribe(MENU_URL);
        };

    return {
        trackMenu: trackMenu,
        notTrackMenu: notTrackMenu
    };
});