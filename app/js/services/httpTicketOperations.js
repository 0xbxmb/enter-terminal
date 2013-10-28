/**
 * Created by i.sungurov on 28.10.13.
 */

enterTerminal.service('httpTicketOperations', function ($q, $log,  HTTP_TICKET_OPERATIONS) {
    'use strict';

    var
        ticketOperations = $resource(HTTP_TICKET_OPERATIONS, {}, {
/*            query: {
                method:'GET',
                params:{
                    Id:''
                }*//*,
                isArray:true*//*
            },
            delete: {
                method:'DELETE',
                params:{
                    Id:''
                }
            },
            create: {
                method:'POST',
                params:{
                    Id:''
                }
            }*/
        }),


        selectProduct = function (params) {
            return ticketOperations.post();
        },
/*        unselectProduct = function (params) {
            return wamp.call(UNSELECT_PRODUCT_URL, params);
        },*/
        confirmTicket = function (id) {
//            return wamp.call(CONFIRM_TICKET_URL, id);
            return ticketOperations.call(CONFIRM_TICKET_URL, id);
        },
        cancelTicket = function (id) {
            return ticketOperations.delete(id);
        };

    return {
        selectProduct: selectProduct,
        unselectProduct: unselectProduct,
        confirmTicket: confirmTicket,
        cancelTicket: cancelTicket
    };
});