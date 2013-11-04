/**
 * Created by i.sungurov on 01.11.13.
 */

enterTerminal.directive("daySchedule", function (notifier, $location, settings) {

    "use strict";

    var
        templateUrl = "templates/daySchedule.html",
        replace = true,
        restrict = 'E',
        scope = {
            currentDate: "=",
            schedule: "=",
            clickEvent: "="
        },

        link = function ($scope, iElement, iAttrs) {

            $scope.dayOfWeek = function(date){
                if(date) {
                    return capitalizeString(moment($scope.currentDate).format("dddd, D MMMM "));
                }
            }

            $scope.prevDay = function (){
                $scope.currentDate = new Date(moment($scope.currentDate).subtract('days', 1));
            };

            $scope.nextDay = function (){
                $scope.currentDate = new Date(moment($scope.currentDate).add('days', 1));
            };

            $scope.isEnabledBackDayButton = function () {
                return $scope.currentDate > new Date();
            };

            $scope.select = function($event, item){
                if($($event.target).closest("a").hasClass("disabled")){
                    return;
                }
                clickEvent();
            };

            $scope.$watch("currentDate", function(newDate, oldDate) {
                $scope.nextDayLabel = new Date(moment($scope.currentDate).add('days', 1)).getDate();
                $scope.prevDayLabel = new Date(moment($scope.currentDate).subtract('days', 1)).getDate();
            });

            $scope.$watch("schedule", function(newDate, oldDate) {
      /*          $('.calendar').fullCalendar('render');
                $('.calendar').fullCalendar('removeEvents');
                $('.calendar').fullCalendar('addEventSource', createEventsViewModel(newDate.getFullYear(), newDate.getMonth() , data));*/
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
