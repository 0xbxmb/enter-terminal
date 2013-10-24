/**
 * Created by i.sungurov on 02.10.13.
 */

enterTerminal.service('wamp', function ($q, $log, $rootScope, notifier, settings, SEND_ID_URL) {

    'use strict';

    var _promises = [],
        _session,
        _initialDeferred = $q.defer(),

        _connect = function () {

            ab.connect(
                // The WebSocket URI of the WAMP server
                settings.settings.wampServerUrl.value,

                // The onconnect handler
                function (session) {

                    var subscriptions,
                        deferred = $q.defer(),
                        isReconnect = !!_session;

                    _promises.push(deferred.promise);
                    _initialDeferred.resolve();

                    if (isReconnect && _session._subscriptions) {
                        subscriptions = _session._subscriptions;
                    }
                    _session = session;
                    _session.call(SEND_ID_URL, [ settings.settings.clientId.value, 2]).then(function (data) {

                        $rootScope.workplace = data;
                        notifier.connection.isConnected = true;

                        $rootScope.$apply(function () {
                            deferred.resolve();
                            if (isReconnect) {
                                $rootScope.$broadcast('wampReconnected', session);
                            }
                        });

                        // Prev session has subscriptions
                        if (!!subscriptions) {
                            _resubscribe(session, subscriptions);
                        }

                        $rootScope.$apply(function () {
                            $rootScope.$broadcast('wampConnected', session);
                        });

                        $log.info('wamp: WAMP session was established');

                    }, function (data) {

                        notifier.errors.currentMessage = data.desc;

                    });
                },

                // The onhangup handler
                function (c, r, d) {
                    var reject = {
                        code: c,
                        reason: r,
                        detail: d
                    };
                    $rootScope.$apply(function () {
                        $rootScope.$broadcast('wampDisconnected', reject);
                    });
                    $log.error('wamp: WAMP session was closed');
                    $log.error(reject);
                },

                // The session options
                {
                    'maxRetries': 10000,
                    'retryDelay': 2000,
                    'skipSubprotocolCheck': true // to not disconnect
                }
            );
        },

        subscribe = function (url, onEvent) {
            $q.all(_promises).then(
                function () {
                    if (!_session)
                        return;
                    _subscribe(url, onEvent, _session);
                }
            );
        },

        _subscribe = function (url, onEvent, session) {
            session.subscribe(url, function (topic, event) {
                var e = function () {
                    if (typeof topic === 'object') {
                        event = topic;
                        topic = undefined;
                    }
                    onEvent(event);
                };

                if (!$rootScope.$$phase) {
                    $rootScope.$apply(function () {
                        e();
                    });
                } else {
                    e();
                }

                $log.info('wamp: Receive from ' + topic);
                $log.info(event);
            });
            $log.info('wamp: subscribed on ' + url);
        },

        _resubscribe = function (session, subscriptions) {
            for (var s in subscriptions) {
                if (!_hasSubscriptions(s, session)) {
                    if (subscriptions[s].length > 0) {
                        _subscribe(s, subscriptions[s][0], session);
                    }
                }
            }
        },

        _hasSubscriptions = function (topic, session) {
            var subscriptions = session._subscriptions;
            if (!subscriptions || !subscriptions[topic]) {
                return false;
            }

            return true;
        },

        unsubscribe = function (url) {
            $q.all(_promises).then(
                function () {
                    if (!_session)
                        return;

                    if (!_hasSubscriptions(url, _session)) {
                        return;
                    }

                    _session.unsubscribe(url);
                    $log.info('wamp: unsubscribe from ' + url);
                }
            );
        },

        publish = function (url, data) {
            $q.all(_promises).then(
                function () {
                    if (!_session)
                        return;

                    _session.publish(url, data)
                    $log.info('wamp: publish to ' + url);
                }
            );
        },

        call = function (url, data) {
            var def = $q.defer();
            $q.all(_promises).then(
                function () {
                    if (!_session)
                        return;

                    _session.call(url, data).then(
                        function (result) {
                            $rootScope.$apply(function () {
                                def.resolve(result);
                                $log.info('wamp: Receive from ' + url);
                                $log.info(result);
                            });
                        },
                        function (error) {
                            $rootScope.$apply(function () {
                                def.reject(error);
                            });
                            $log.Error(error);
                        })
                },
                function (error) {
                    def.reject(error);
                }
            );

            return def.promise;
        };

    _promises.push(_initialDeferred.promise);
    _connect();

    return {
        subscribe: subscribe,
        unsubscribe: unsubscribe,
        publish: publish,
        call: call
    }
});
