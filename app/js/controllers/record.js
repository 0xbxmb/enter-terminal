/**
 * Created by i.sungurov on 24.10.13.
 */

enterTerminal.controller('RecordCtrl', function ($rootScope, $scope, $log, $location, ticketOperations, notifier) {

    'use strict';

    $('.calendar').fullCalendar({

        weekMode:"liquid",

        firstDay: 1,

        dayNamesShort : [ 'вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],

        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
                     'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],

        monthNamesShort: ['Янв.','Фев.','Март','Апр.','Май','οюнь','οюль','Авг.','Сент.','Окт.','Ноя.','Дек.'],

        dayNames: ["Воскресенье","Понедельник","Вторник","Среда","Четверг","Пятница","Суббота"],

        buttonText: {
            prev: "&nbsp;&#9668;&nbsp;",
            next: "&nbsp;&#9658;&nbsp;",
            prevYear: "&nbsp;&lt;&lt;&nbsp;",
            nextYear: "&nbsp;&gt;&gt;&nbsp;",
            today: "Сегодня",
            month: "Месяц",
            week: "Неделя",
            day: "День"
        },

        header: {
            left: '', //prev,next
            center: 'title',
            right: 'today'//,month,agendaWeek,agendaDay
        },

        titleFormat: {
            month: 'MMMM'
        },

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