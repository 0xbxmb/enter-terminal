/**
 * Created by i.sungurov on 30.10.13.
 */

function JSON_CALLBACK(){

}

enterTerminal.service('defferedHttpJsonp', function ($q, $log, $http,  HTTP_SERVER_URL) {

    "use strict";

    var

        callbackString = "?jsonp=JSON_CALLBACK",

        get = function (url){
            var deferredData = $q.defer();
            $http.jsonp(HTTP_SERVER_URL + url + callbackString).success(function(data) {

                $log.info(data);
                deferredData.resolve(data);

            }).error(function(err) {

               $log.info(err);
               deferredData.reject(err);

            });
            return deferredData.promise;
        },

        post = function(url) {
            var deferredData = $q.defer();
            $http.jsonp(HTTP_SERVER_URL + url + callbackString).success(function(data) {
                $log.info(data);
                deferredData.resolve(data);
            }).error(function(err) {
                    $log.info(data);
                    deferredData.reject(err);
                });
            return deferredData.promise;
        };

    return {
        get: get,
        post: post
    };
});