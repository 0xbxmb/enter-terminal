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

            $scope.minutesToHours = function (plainMinutes) {
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
            };

            $scope.capitalizeString = function (str) {
                return str.charAt(0).toUpperCase() + str.slice(1);
            };


            $scope.dayOfWeek = function(date){
                if(date) {
                    return $scope.capitalizeString(moment($scope.currentDate).format("dddd, D MMMM "));
                }
            };

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
                $scope.clickEvent(item);
            };

            $scope.$watch("currentDate", function(newDate, oldDate) {
                $scope.nextDayLabel = new Date(moment($scope.currentDate).add('days', 1)).getDate();
                $scope.prevDayLabel = new Date(moment($scope.currentDate).subtract('days', 1)).getDate();
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
