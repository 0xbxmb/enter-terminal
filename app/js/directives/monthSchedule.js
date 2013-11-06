/**
 * Created by i.sungurov on 01.11.13.
 */

enterTerminal.directive("monthSchedule", function (notifier, $location, settings) {

    "use strict";

    var
        templateUrl = "templates/monthSchedule.html",
        replace = true,
        restrict = 'E',
        scope = {
            currentDate: "=",
            schedule: "=",
            clickEvent: "="
        },

        capitalizeString = function (str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },

        calculateHeight = function () {
            return $(".wrapper").height() - 100;
        },

        minutesToHours = function (plainMinutes) {
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

        applyStyles = function(){

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
        },

        createEventsViewModel = function (year, month, data) {
            var events = [];
            _.each(data, function(value ,key){
                _.each(value.Schedule.ScheduleIntervals, function(schedule ,index) {
                    events.push({
                        title: minutesToHours(schedule.StartMinutes) + "–" + minutesToHours(schedule.EndMinutes),
                        start: new Date(year, month, value.Day),
                        color: 'transparent',
                        textColor: '#474747'
                    })
                });
            });
            return events;
        },

        link = function ($scope, iElement, iAttrs) {

            var
                calendarName = ".calendar",
                dayClick = function(date) {
                    if($(this).hasClass("disabled")){
                        return;
                    }
                    $scope.clickEvent(date);
                },

                refresh = function (date, cell)  {
                    if(date.getMonth() !== $scope.currentDate.getMonth()){
                        $(cell).addClass("disabled");
                        return;
                    }
                    var
                        day = date.getDate(),
                        hasAny = _.any($scope.schedule, function(value, index){
                            return (value.Day === day);
                        });
                    if (!hasAny) {
                        $(cell).addClass("disabled");
                    }
                };

            $scope.prevMonth = function (){
                $scope.currentDate = new Date(moment($scope.currentDate).subtract('months', 1));
            };

            $scope.nextMonth = function (){
                $scope.currentDate = new Date(moment($scope.currentDate).add('months', 1));
            };

            $scope.isEnabledBackMonthButton = function () {
                return $scope.currentDate > new Date();
            };

            $scope.isEnabledNextMonthButton = function () {
                return Math.abs( $scope.currentDate.getMonth() - (new Date()).getMonth()) < 3;
            };

            $(document).ready(function () {
                $(window).resize(function () {
                    $(calendarName).fullCalendar('option', 'height', calculateHeight());
                });
            });

            $(calendarName).fullCalendar({
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

                dayClick: dayClick,

                eventClick: function(calEvent, jsEvent, view) {
                    dayClick(calEvent.start);
                },

                height: calculateHeight(),

                viewRender: function(view, element){
                    $scope.currentDate = $(calendarName).fullCalendar('getDate');
                }
            });

            $scope.$watch("currentDate", function(newDate, oldDate) {
                if($scope.currentDate) {
                    applyStyles();
                    $(calendarName).fullCalendar('gotoDate', $scope.currentDate);
                    $scope.prevMonthLabel =  capitalizeString(moment($scope.currentDate).subtract('months', 1).format("MMMM"));
                    $scope.nextMonthLabel =  capitalizeString(moment($scope.currentDate).add('months', 1).format("MMMM"));
                }
            });

            $scope.$watch("schedule", function(data) {
                if(data){
                    $(calendarName).fullCalendar('render');
                    $(calendarName).fullCalendar('removeEvents');
                    $(calendarName).fullCalendar('addEventSource', createEventsViewModel($scope.currentDate.getFullYear(), $scope.currentDate.getMonth() , data));
                    _.each($(".calendar td"), function(value, index) {
                        refresh( new Date( $(value).data("date")), $(value));
                    });
                }
            });
        };

    return {
        templateUrl: templateUrl,
        replace: replace,
        restrict: restrict,
        link: link,
        scope: scope
    };
});
