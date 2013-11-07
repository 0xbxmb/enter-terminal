/**
 * Created by i.sungurov on 08.10.13.
 */


enterTerminal.service("httpMenu", function ( $log, $http, defferedHttpJsonp, HTTP_MENU_URL) {

    'use strict';

    var
        trackMenu = function (onEvent) {
            defferedHttpJsonp.get(HTTP_MENU_URL).then(function (data) {
                onEvent(data);
            }, function(data){
                onEvent(data);
            });
        },
        notTrackMenu = function () {
        };
    return {
        trackMenu: trackMenu,
        notTrackMenu: notTrackMenu
    };
});