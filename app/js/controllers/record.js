/**
 * Created by i.sungurov on 24.10.13.
 */

enterTerminal.controller('RecordCtrl', function ($rootScope, $scope, $log, $location, ticketOperations, notifier) {

    'use strict';

    moment.lang("ru");

    var
        capitalizeString = function (string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },

        calculateHeight = function () {
            return $(".wrapper").height() - 100;
        },

        createEventsViewModel = function (year, month, data) {
            var events = [];
            _.each(data, function(value ,key){
                _.each(value.Schedule.ScheduleIntervals, function(schedule ,index) {
                    events.push({
                        title: rectime(schedule.StartMinutes) + "–" + rectime(schedule.EndMinutes),
                        start: new Date(year, month, value.Day),
                        color: 'transparent',     // an option!
                        textColor: '#474747' // an option!
                    })
                });
            });
            return events;
        },

        rectime = function (plainMinutes) {

            var
                secs = plainMinutes * 60,
                hr = Math.floor(secs / 3600),
                min = Math.floor((secs - (hr * 3600))/60);

            if (hr < 10) {
                hr = "0" + hr;
            }
            if (min < 10) {
                min = "0" + min;
            }

            return hr + ':' + min;
        },

        getMonthEvents = function(date) {
            ticketOperations.getMonthSchedule([$rootScope.selectedService.Id, date.getFullYear(), date.getMonth() + 1])
                .then(function (data) {
                    $scope.monthSchedule = data;
                    $('.calendar').fullCalendar( 'addEventSource', createEventsViewModel(date.getFullYear(), date.getMonth(), data));
                }, function (data) {
                    notifier.errors.currentMessage = data.desc;
                });
        };

    $('.calendar').fullCalendar({
        weekMode: "liquid",
        firstDay: 1,
        dayNamesShort: [ 'вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
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
        dayClick: function (clickedDate) {
            $scope.$apply(function () {
                $scope.timeSelecting = true;
                $scope.currentDate = clickedDate;
            });
        },
        eventRender: function(event, element, view) {

            if (view.name == 'agendaWeek' && event.allDay) {
                $('.fc-col' + event.start.getDay()).not('.fc-widget-header').css('background-color', 'blue');
            }
        },
        eventClick: function(calEvent, jsEvent, view) {

            alert('Event: ' + calEvent.title);
            alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
            alert('View: ' + view.name);

            // change the border color just for fun
            $(this).css('border-color', 'red');

        },
        height: calculateHeight(),
        viewRender: function(view, element){
            $scope.currentDate = $('.calendar').fullCalendar('getDate');
        }
    });

    $(document).ready(function () {
        $(window).resize(function () {
            $('.calendar').fullCalendar('option', 'height', calculateHeight());
        });
    });

    $scope.rectime = rectime;

    $scope.dayOfWeek = function(date){
        if(date) {
            return capitalizeString(moment($scope.currentDate).format("dddd, D MMMM "));
        }
    };

    $scope.prevMonth = function (){
        $scope.currentDate = new Date(moment($scope.currentDate).subtract('months', 1));
    };

    $scope.nextMonth = function (){
        $scope.currentDate = new Date(moment($scope.currentDate).add('months', 1));
    };

    $scope.prevDay = function (){
        $scope.currentDate = new Date(moment($scope.currentDate).subtract('days', 1));
    };

    $scope.nextDay = function (){
        $scope.currentDate = new Date(moment($scope.currentDate).add('days', 1));
    };

    $scope.$watch("currentDate", function(newDate, oldDate) {

        if($scope.currentDate) {


            $(".fc-day, .fc-day>div,.fc-event, .fc-event-title, .fc-event-inner")
                .hover(function () {
                    if(!$(this).closest(".fc-day").hasClass("disabled")){
                        $(this).closest(".fc-day").addClass("hovered");
                    }
                }, function(){
                    $(this).closest(".fc-day").removeClass("hovered").removeClass("active");
                })
                .mouseup(function (event) {
                    $(this).closest(".fc-day").removeClass("active");
                })
                .mousedown(function (event) {
                    var left = 1;
                    if(event.which === left && !$(this).closest(".fc-day").hasClass("disabled")) {
                        $(this).closest(".fc-day").addClass("active");
                    }
                });


            $('.calendar').fullCalendar('gotoDate', $scope.currentDate);
            $('.calendar').fullCalendar('removeEvents');

            if(!oldDate || (newDate.getMonth() !== oldDate.getMonth())) { //Изменился месяц
                getMonthEvents(newDate);
            } else {

                if(newDate.getDay() !== oldDate.getDay()) { //Изменился день
              /*      [$rootScope.selectedService.Id, newDate.getFullYear(),
                        newDate.getMonth() + 1, newDate.getDate()]*/
                    ticketOperations.getDaySchedule([$rootScope.selectedService.Id, newDate.getFullYear()  + "|" + (newDate.getMonth() + 1) + "|" +newDate.getDate()])
                        .then(function (data) {
                            $scope.daySchedule = data;
                        }, function (data) {
                            notifier.errors.currentMessage = data.desc;
                        });
                }
            }
            $scope.prevMonthLabel =  capitalizeString(moment($scope.currentDate).subtract('months', 1).format("MMMM"));
            $scope.nextMonthLabel =  capitalizeString(moment($scope.currentDate).add('months', 1).format("MMMM"));
            $scope.nextDayLabel = new Date(moment($scope.currentDate).add('days', 1)).getDate();
            $scope.prevDayLabel = new Date(moment($scope.currentDate).subtract('days', 1)).getDate();
        }
    });


    $scope.isEnabledBackMonthButton = function () {
        return $scope.currentDate > new Date();
    };

    $scope.isEnabledBackDayButton = function () {
        return $scope.currentDate > new Date();
    };


    $scope.select = function($event, item){
        ticketOperations.selectProduct([$rootScope.selectedService.Id, null, null]).then(function (data) {
            $rootScope.ticketProduct = data;
            $location.path("/ticketProduct");
        }, function (data) {
            notifier.errors.currentMessage = data.desc;
        });
    };

    getMonthEvents($scope.currentDate);
});