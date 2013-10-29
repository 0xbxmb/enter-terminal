/**
 * Created by i.sungurov on 28.10.13.
 */

enterTerminal.service('httpTicketOperations', function ($q, $log, $http,  HTTP_SERVER_URL,
                                                                          HTTP_MENU_URL, HTTP_GET_PRODUCT_MONTH_SCHEDULE_URL,
                                                                          HTTP_GET_PRODUCT_DAY_SCHEDULE_URL, HTTP_GET_FILE) {
    'use strict';


    var
        selectProduct = function (params) {
            return $http.get(HTTP_SERVER_URL + HTTP_MENU_URL);
        },

        getMonthSchedule = function(params){

            var url = HTTP_SERVER_URL + HTTP_GET_PRODUCT_MONTH_SCHEDULE_URL;

            url = url.replace("{productid}", params[0]);
            url = url.replace("{year}",     params[1]);
            url = url.replace("{month}",    params[2]);

            return $http.get(url);
        },

        getDaySchedule = function(params){

            var url = HTTP_SERVER_URL + HTTP_GET_PRODUCT_DAY_SCHEDULE_URL;
            //TODO: Проверить
            url = url.replace("{productid}", params[0]);
            url = url.replace("{date}",     params[1]);

            return $http.get(url);
        },

        confirmTicket = function (params) {
            var url = HTTP_SERVER_URL + HTTP_GET_FILE;

            url = url.replace("{productid}", params[0]);
            url = url.replace("{datetime}", params[0]);

            return $http.get(url);
        },

        cancelTicket = function (id) {
//            return ticketOperations.delete(id);
        };

    return {
        selectProduct: selectProduct,
        unselectProduct: unselectProduct,
        getMonthSchedule: getMonthSchedule,
        getDaySchedule:getDaySchedule,
        confirmTicket: confirmTicket,
        cancelTicket: cancelTicket
    };
});