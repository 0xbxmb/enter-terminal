/**
 * Created by i.sungurov on 03.10.13.
 */

enterTerminal.service('ticketOperations', function ($q, $log, $rootScope, wamp, SELECT_PRODUCT_URL, UNSELECT_PRODUCT_URL,
                                                                                CONFIRM_TICKET_URL, CANCEL_TICKET_URL,
                                                                                GET_MONTH_SCHEDULE, GET_DAY_SCHEDULE) {
    'use strict';

    var
        selectProduct = function (params) {
            return wamp.call(SELECT_PRODUCT_URL, params);
        },
        unselectProduct = function (params) {
            return wamp.call(UNSELECT_PRODUCT_URL, params);
        },

        getMonthSchedule = function(params){
            return wamp.call(GET_MONTH_SCHEDULE, params);
        },

        getDaySchedule = function(params){
            return wamp.call(GET_DAY_SCHEDULE, params);
        },

        confirmTicket = function (id) {
            return wamp.call(CONFIRM_TICKET_URL, id);
        },

        cancelTicket = function (id) {
            return wamp.call(CANCEL_TICKET_URL, id);
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