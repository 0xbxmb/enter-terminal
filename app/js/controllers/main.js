/**
 * Created by i.sungurov on 02.10.13.
 */

enterTerminal.controller('MainCtrl', function ($rootScope, $scope, $log, $location,
                                               ticketOperations, settings, notifier) {

    'use strict';

    var
        getMonthEvents = function(date) {
            ticketOperations.getMonthSchedule([$scope.selectedService.ProductId, date.getFullYear(), date.getMonth() + 1])
                .then(function (data) {
                    $scope.monthSchedule = data;
                }, function (data) {
                    notifier.errors.currentMessage = data || data.desc;
                });
        },

        getDayEvents = function(date) {
            ticketOperations.getDaySchedule([$scope.selectedService.ProductId, date.getFullYear(), date.getMonth() + 1, date.getDate()])
                .then(function (data) {
                    $scope.daySchedule = data;
                }, function (data) {
                    notifier.errors.currentMessage = data || data.desc;
                });
        },

        dayClick = function (date) {
            $scope.$apply(function () {
                $scope.phase = 2;
                $scope.currentDate = date;
                getDayEvents($scope.currentDate);
            });
        },

        timeClick = function(item){
            ticketOperations.selectProduct([$scope.selectedService.Id, null, null], {
                currentDate: $scope.currentDate,
                item: item
            }).then(function (data) {
                $rootScope.ticketProduct = data;
                $location.path("/ticketProduct");
            }, function (data) {
                notifier.errors.currentMessage = data.desc;
            });
        };

    $scope.phase = 0;
    $scope.currentDate = new Date();
    $scope.dayClick = dayClick;
    $scope.timeClick = timeClick;

    $scope.recordMethod = function () {
        $scope.phase = 1;
        $rootScope.footer.states.back.isActive = true;
        getMonthEvents($scope.currentDate);
    };

    $scope.toQueueMethod = function () {
        ticketOperations.selectProduct([$scope.selectedService.Id, null, null]).then(function (data) {
            $rootScope.ticketProduct = data;
            $location.path("/ticketProduct");
        }, function (data) {
            notifier.errors.currentMessage = data.desc;
            $location.path("/main");
        });
    };

    $scope.$watch("currentDate", function(newDate, oldDate) {
        if(newDate.getDay() !== oldDate.getDay()) { //Изменился день
            getDayEvents(newDate);
        }
        if(!oldDate || (newDate.getMonth() !== oldDate.getMonth())) { //Изменился месяц
            getMonthEvents(newDate);
        }
    });




    $rootScope.footer = {
        templateUrl:"templates/footers/main.html",
        actions: {
            back: function () {
                if($scope.phase == 2){
                    $scope.phase = 1;
                    getMonthEvents($scope.currentDate);
                    return;
                }
                if($scope.phase == 1){
                    $scope.phase = 0;
                    if((settings.settings.liveQueue.value && !settings.settings.bookingByRecord.value)  ||
                        (!settings.settings.liveQueue.value && settings.settings.bookingByRecord.value) ) {
                        $scope.selectedService = null;
                        $scope.back();
                    }
                    return;
                }
                $scope.back();
            },
            showTicketProduct: function () {
                $location.path("/ticketProduct");
            }
        },
        states: {
            back:{
                isActive: false
            }
        }
    };

});