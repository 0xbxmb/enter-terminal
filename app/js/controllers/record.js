/**
 * Created by i.sungurov on 24.10.13.
 */

enterTerminal.controller('RecordCtrl', function ($rootScope, $scope, $log, $location, ticket, notifier) {

    'use strict';

    $('.calendar').fullCalendar({
        editable: true,
        header: {
            left: '', //prev,next
            center: 'title',
            right: 'today'//,month,agendaWeek,agendaDay
        },
        titleFormat: {
            month: 'MMMM'
        },
        firstDay: 1,
        dayNamesShort : [ 'вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
                     'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        dayClick: function() {
            alert('a day has been clicked!');
        }
    });

    $('.calendar').fullCalendar('today');


/*
    //function to calculate window height
    function get_calendar_height() {
        return $(window).height() - 30;
    }

//attacht resize event to window and set fullcalendar height property
    $(document).ready(function() {
        $(window).resize(function() {
            $('#calendar').fullCalendar('option', 'height', get_calendar_height());
        });


//set fullcalendar height property
        $('#calendar').fullCalendar({
            //options
            height: get_calendar_height
        });
    */


/*        $rootScope.footer = {

    };*/
});