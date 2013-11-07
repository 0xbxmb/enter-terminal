/**
 * Created by i.sungurov on 03.10.13.
 */

enterTerminal.service('ticketOperations', function (settings, httpTicketOperations, wsTicketOperations) {
    return (settings.settings.httpVersion.value) ? httpTicketOperations : wsTicketOperations;
});