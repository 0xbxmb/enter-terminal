/**
 * Created by i.sungurov on 28.10.13.
 */

enterTerminal.service('httpTicketOperations', function ($q, $log, $http, defferedHttpJsonp,
                                                                         HTTP_GET_PRODUCT_MONTH_SCHEDULE_URL,
                                                                         HTTP_GET_PRODUCT_DAY_SCHEDULE_URL,
                                                                         HTTP_GET_TICKET_PDF_FILE_URL,
                                                                         HTTP_RESERVE_TICKET_PRODUCT_URL,
                                                                         HTTP_CANCEL_TICKET_PRODUCT_URL,
                                                                         HTTP_CONFIRM_TICKET_URL,
                                                                         HTTP_CANCEL_TICKET_URL) {
    'use strict';

    var
        selectProduct = function (params, dateTime) {

            var formattedDateTime = moment(dateTime.currentDate).hours(Math.floor(dateTime.item.Minutes/60)).minutes(dateTime.item.Minutes%60).format("DD.MM.YYYY-HH:mm");

            var url = HTTP_RESERVE_TICKET_PRODUCT_URL
                .replace("{productmenulinkid}", params[0])
                .replace("{datetime}", formattedDateTime);

            return defferedHttpJsonp.get(url);
        },

        unselectProduct = function (id) {

            var url = HTTP_CANCEL_TICKET_PRODUCT_URL
                        .replace("{ticketproductid}", id);

            return defferedHttpJsonp.get(url);
        },

        getMonthSchedule = function(params){

            var url = HTTP_GET_PRODUCT_MONTH_SCHEDULE_URL
                            .replace("{productid}", params[0])
                            .replace("{year}",      params[1])
                            .replace("{month}",     params[2]);

            return defferedHttpJsonp.get(url);
        },

        getDaySchedule = function(params){

            var date = moment({year: params[1], month: params[2] - 1, day: params[3]}).format("DD.MM.YYYY");
            var url = HTTP_GET_PRODUCT_DAY_SCHEDULE_URL
                            .replace("{productid}", params[0])
                            .replace("{date}",      date );

            return defferedHttpJsonp.get(url);
        },

        confirmTicket = function (params) {
            var promise = defferedHttpJsonp.get(HTTP_CONFIRM_TICKET_URL)
            promise.then( function (){
                getPdfFile(params);
            })
            return promise;
        },

        cancelTicket = function (id) {
            return defferedHttpJsonp.get(HTTP_CANCEL_TICKET_URL);
        },

        getPdfFile = function (id){

            var url = HTTP_GET_TICKET_PDF_FILE_URL
                        .replace("{ticketid}", id);

            return defferedHttpJsonp.getFile(url);
        };

    return {
        selectProduct: selectProduct,
        unselectProduct: unselectProduct,
        getMonthSchedule: getMonthSchedule,
        getDaySchedule:getDaySchedule,
        confirmTicket: confirmTicket,
        cancelTicket: cancelTicket,
        getPdfFile: getPdfFile
    };
});