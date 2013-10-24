'use strict';

/*
 * AngularJS Toaster
 *
 * Copyright 2013 Jiri Kavulak.  
 * All Rights Reserved.  
 * Use, reproduction, distribution, and modification of this code is subject to the terms and 
 * conditions of the MIT license, available at http://www.opensource.org/licenses/mit-license.php
 *
 * Author: Jiri Kavulak
 * Related to project of John Papa and Hans Fjällemark
 */

angular.module('toaster', [])
.service('toaster', function ($rootScope) {
    this.pop = function (type, title, body, clickCallback) {
        this.toast = {
            type: type,
            title: title,
            body: body,
            clickCallback: clickCallback
        };
        $rootScope.$broadcast('toaster-newToast');
    };
})
.constant('toasterConfig', {
					'tap-to-dismiss': true,
					'newest-on-top': true,
					//'fade-in': 1000,            // done in css
					//'on-fade-in': undefined,    // not implemented
					//'fade-out': 1000,           // done in css
					// 'on-fade-out': undefined,  // not implemented
					//'extended-time-out': 1000,    // not implemented
					'time-out': 5000, // Set timeOut and extendedTimeout to 0 to make it sticky
					'icon-classes': {
						error: 'toast-error',
						info: 'toast-info',
						success: 'toast-success',
						warning: 'toast-warning'
					},
					'icon-class': 'toast-info',
					'position-class': 'toast-bottom-right',
					'title-class': 'toast-title',
					'message-class': 'toast-message'
				})
.directive('toasterContainer', ['$compile', '$timeout', 'toasterConfig', 'toaster',
function ($compile, $timeout, toasterConfig, toaster) {
  return {
    replace: true,
    restrict: 'EA',
    link: function (scope, elm, attrs){
      
      var id = 0;
      
      var mergedConfig = toasterConfig;
      if (attrs.toasterOptions) {
          angular.extend(mergedConfig, scope.$eval(attrs.toasterOptions));
      }
      
      scope.config = {
          position: mergedConfig['position-class'],
          title: mergedConfig['title-class'],
          message: mergedConfig['message-class'],
          tap: mergedConfig['tap-to-dismiss']
      };
      
      function addToast (toast){
        toast.type = mergedConfig['icon-classes'][toast.type];
        if (!toast.type)
            toast.type = mergedConfig['icon-class'];
        
        id++;
        angular.extend(toast, { id: id });
        
        if (mergedConfig['time-out'] > 0)
            setTimeout(toast, mergedConfig['time-out']);
        
        if (mergedConfig['newest-on-top'] === true)
            scope.toasters.unshift(toast);
        else
            scope.toasters.push(toast);
      }
      
      function setTimeout(toast, time){
          toast.timeout= $timeout(function (){ 
              scope.removeToast(toast.id);
            }, time);
      }
      
      scope.toasters = [];
      scope.$on('toaster-newToast', function () {
        addToast(toaster.toast);
      });
    },
    controller: function($scope, $element, $attrs) {
      
      $scope.stopTimer = function(toast){
        if(toast.timeout)
          $timeout.cancel(toast.timeout);
      };
      
      $scope.removeToast = function (id){
        var i = 0;
        for (i; i < $scope.toasters.length; i++){
            if($scope.toasters[i].id === id)
                break;
        }
        $scope.toasters.splice(i, 1);
      };
      
      $scope.click = function(toaster){
        if ($scope.config.tap === true){
            if(toaster.clickCallback != null){
                toaster.clickCallback(toaster);
            }
            $scope.removeToast(toaster.id);
        }
      };

      $scope.close = function(toaster){
        if ($scope.config.tap === true){
            $scope.removeToast(toaster.id);
        }
      };
    },

    template:
    '<div  id="toast-container" ng-class="config.position">' +
      '<div ng-animate="\'animateToaster\'" ng-repeat="toaster in toasters" class="clearfix">' +
        '<div class="toast pull-left" ng-class="toaster.type" ng-click="click(toaster)" ng-mouseover="stopTimer(toaster)">' +
          '<div ng-class="config.title">{{toaster.title}}</div>' +
          '<div ng-class="config.message" ng-bind-html-unsafe="toaster.body">' +
          '</div>' +
        '</div>' +
        '<span class="pull-left close-toast" ng-click="close(toaster)">' +
            '<i class="icon-remove icon-alt text-white"></i>' +
        '</span>'+
      '</div>' +
    '</div>'
  };
}]);

 
