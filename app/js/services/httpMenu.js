/**
 * Created by i.sungurov on 08.10.13.
 */

enterTerminal.service("httpMenu", function ($resource, $log, HTTP_MENU_URL) {
    'use strict';
    var
        menu = $resource(HTTP_MENU_URL, {}, {
            query: {
                method:'GET',
                params:{
                    entryId:''
                },
                isArray:true
            }
        }),
        trackMenu = function (onEvent) {
            return menu;
        },
        notTrackMenu = function () {
        };
    return {
        trackMenu: trackMenu,
        notTrackMenu: notTrackMenu
    };
});