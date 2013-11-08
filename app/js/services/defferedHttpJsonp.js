/**
 * Created by i.sungurov on 30.10.13.
 */

function JSON_CALLBACK(){
}

enterTerminal.service('defferedHttpJsonp', function ($q, $log, $http, settings) {

    "use strict";

    var
        callbackString = "?jsonp=JSON_CALLBACK",
        get = function (url){
            var deferredData = $q.defer();
            $http.jsonp(settings.settings.httpServerUrl.value + url + callbackString).success(function(data) {
                $log.info(data);
                deferredData.resolve(data);
            }).error(function(err) {
               $log.info(err);
               deferredData.reject(err);
            });
            return deferredData.promise;
        },
        getFile = function(url) {
            window.open(settings.settings.httpServerUrl.value + url,'_blank');
        };
    return {
        get: get,
        getFile: getFile
    };
});