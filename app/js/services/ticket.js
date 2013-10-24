/**
 * Created by i.sungurov on 03.10.13.
 */

enterTerminal.service('ticket', function ($q, $log, $rootScope, wamp, INVITE_NEW_URL, INVITE_AGAIN_URL, HOLD_URL,
                                          INVITE_HOLDED_URL, START_OPERATION_URL, COMPLETE_OPERATION_URL,
                                          CANCEL_OPERATION_URL, REDIRECT_TICKET_URL, ACTIVE_TICKET_PRODUCT_COUNT_URL,
                                          PERSONAL_QUEUE_URL, WORK_PLACE_CLIENT_URL) {
    'use strict';
    var
        inviteNew = function () {
            return wamp.call(INVITE_NEW_URL);
        },
        inviteAgain = function () {
            return wamp.call(INVITE_AGAIN_URL);
        },
        holdCurrent = function () {
            return wamp.call(HOLD_URL);
        },
        inviteHolded = function (id) {
            return wamp.call(INVITE_HOLDED_URL, id);
        },
        startOperation = function () {
            return wamp.call(START_OPERATION_URL);
        },
        completeOperation = function () {
            return wamp.call(COMPLETE_OPERATION_URL);
        },
        cancelOperation = function () {
            return wamp.call(CANCEL_OPERATION_URL);
        },
        redirectOperation = function (objectParameter) {
            return wamp.call(REDIRECT_TICKET_URL, objectParameter);
        },

        trackActiveTicketProductCount = function (onEvent) {
            wamp.subscribe(ACTIVE_TICKET_PRODUCT_COUNT_URL, onEvent);
        },

        notTrackActiveTicketProductCount = function () {
            wamp.unsubscribe(ACTIVE_TICKET_PRODUCT_COUNT_URL);
        },

        trackPersonalQueue = function (onEvent) {
            wamp.subscribe(PERSONAL_QUEUE_URL, onEvent);
        },

        notTrackPersonalQueue = function () {
            wamp.unsubscribe(PERSONAL_QUEUE_URL);
        },

        trackWorkPlaceClient = function (onEvent) {
            wamp.subscribe(WORK_PLACE_CLIENT_URL, onEvent);
        },

        notTrackWorkPlaceClient = function () {
            wamp.unsubscribe(WORK_PLACE_CLIENT_URL);
        };

    return {
        inviteNew: inviteNew,
        inviteAgain: inviteAgain,
        holdCurrent: holdCurrent,
        inviteHolded: inviteHolded,
        startOperation: startOperation,
        completeOperation: completeOperation,
        cancelOperation: cancelOperation,
        redirectOperation: redirectOperation,

        trackActiveTicketProductCount: trackActiveTicketProductCount,
        notTrackActiveTicketProductCount: notTrackActiveTicketProductCount,

        trackPersonalQueue: trackPersonalQueue,
        notTrackPersonalQueue: notTrackPersonalQueue,

        trackWorkPlaceClient: trackWorkPlaceClient,
        notTrackWorkPlaceClient: notTrackWorkPlaceClient
    };
});