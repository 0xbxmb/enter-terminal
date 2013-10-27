/**
 * Created by i.sungurov on 24.10.13.
 */

enterTerminal.controller('RecordCtrl', function ($rootScope, $scope, $log, $location, ticketOperations, notifier) {

    'use strict';

/**/
    $scope.monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль',
        'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];


    function getMonthName(){

    }

    function calculateHeight() {
        return $(".wrapper").height() - 100;
    }
    $('.calendar').fullCalendar({
        weekMode: "liquid",
        firstDay: 1,
        dayNamesShort: [ 'вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
        monthNames: $scope.monthNames,
        monthNamesShort: ['Янв.', 'Фев.', 'Март', 'Апр.', 'Май', 'οюнь', 'οюль', 'Авг.', 'Сент.', 'Окт.', 'Ноя.', 'Дек.'],
        dayNames: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"],
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
            right: ''//today,month,agendaWeek,agendaDay
        },
        titleFormat: {
            month: 'MMMM'
        },
        dayClick: function () {
            alert('a day has been clicked!');
        },
        height: calculateHeight(),
        viewRender: function(view, element){
            $scope.currentDate = $('.calendar').fullCalendar('getDate')
        }
    });

    $('.calendar').fullCalendar('render');

    $(document).ready(function () {
        $(window).resize(function () {
            $('.calendar').fullCalendar('option', 'height', calculateHeight());
        });
    });

    $scope.prev = function (){
        $('.calendar').fullCalendar('prev');
    };

    $scope.next = function (){
        $('.calendar').fullCalendar('next');
    };

    $scope.$watch("currentDate", function() {

        if($scope.currentDate) {
            var month = $scope.currentDate.getMonth(),
                lastMonthIndex = 11,
                firstMonthIndex = 0;

            $scope.prevMonthName =  $scope.monthNames[ ((month == firstMonthIndex ) ?  lastMonthIndex :  month - 1) ];
            $scope.nextMonthName =  $scope.monthNames[ ((month == lastMonthIndex ) ? firstMonthIndex : month + 1) ] ;
        }
    });



});