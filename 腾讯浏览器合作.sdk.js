/*
    core.android.js
    v1.0
    create bridge for qq browser
    client environment can only be Android-Ex
    date:2014-08-13
*/

; !function (window, ns, bridge) {

    "use strict";

    var exports = window[ns] = window[ns] || {};

    // 此方法用于创建 qb_channel
    !function () {
        var QbChannel = function (type) {
            this.type = type;
            this.handlers = {};
            this.numHandlers = 0;
            this.onHasSubscribersChange = null;
        };

        QbChannel.prototype.subscribe = function (f) {
            var func = f,
                guid = f.observer_guid;

            if (!guid) {
                // first time any channel has seen this subscriber
                guid = '' + window.qb_channel.nextGuid++;
            }
            func.observer_guid = guid;
            f.observer_guid = guid;

            // Don't add the same handler more than once.
            if (!this.handlers[guid]) {
                this.handlers[guid] = func;
                this.numHandlers++;
                if (this.numHandlers == 1) {
                    this.onHasSubscribersChange && this.onHasSubscribersChange();
                }
            }
        };

        /**
         * Unsubscribes the function with the given guid from the channel.
         */
        QbChannel.prototype.unsubscribe = function (f) {
            var guid = f.observer_guid,
                handler = this.handlers[guid];
            if (handler) {
                delete this.handlers[guid];
                this.numHandlers--;
                if (this.numHandlers === 0) {
                    this.onHasSubscribersChange && this.onHasSubscribersChange();
                }
            }
        };

        /**
         * Calls all functions subscribed to this channel.
         */
        QbChannel.prototype.fire = function (e) {
            if (this.numHandlers) {
                // Copy the values first so that it is safe to modify it from within
                // callbacks.
                var toCall = [];
                for (var item in this.handlers) {
                    toCall.push(this.handlers[item]);
                }
                for (var i = 0; i < toCall.length; ++i) {
                    toCall[i](e);
                }
            }
        };

        window.qb_channel = {
            create: function (type) {
                return window.qb_channel[type] = new QbChannel(type);
            },
            nextGuid: 0
        };
    }();

    // 调用bridge
    if (typeof bridge === 'function') {
        bridge();
    }

    // 创建命名空间
    var createNamespace = function (name) {
        var arr = name.split('.'),
            space = window;
        arr.forEach(function (a) {
            !space[a] && (space[a] = {});
            space = space[a];
        });
        return space;
    };

    //用来对API进行定义
    exports.define = function (name, fn) {
        var index = name.lastIndexOf('.'),
            ns = createNamespace(name.substring(0, index));
        ns[name.substring(index + 1)] = fn;
    };

}(window, 'browser', function () {
    // 大包版直接使用qb_bridge对象
    var qb_bridge = window.qb_bridge;
    // 注：有些Webview中未注入qb_bridge对象，直接使用内核对象
    if (!qb_bridge) {
        return;
    }
    
    qb_bridge.callbackId = Math.floor(Math.random() * 2000000000);
    qb_bridge.callbacks = {};

    qb_bridge.exec = function (success, fail, service, action, args) {
        var callbackId = service + qb_bridge.callbackId++,
            argsJson = args ? JSON.stringify(args) : "";

        if (success || fail) {
            qb_bridge.callbacks[callbackId] = { success: success, fail: fail };
        }

        var ret = qb_bridge.nativeExec(service, action, callbackId, argsJson);
        if (ret === 'true') {
            return true;
        } else if (ret === 'false') {
            return false;
        } else {
            return ret;
        }
    };

    qb_bridge.callbackFromNative = function (callbackId, args) {
        var callback = qb_bridge.callbacks[callbackId];
        var argsJson = JSON.parse(args);

        if (callback) {
            if (argsJson.succ) {
                callback.success && callback.success(argsJson.msg);
            } else {
                callback.fail && callback.fail(argsJson.msg);
            }

            if (!argsJson.keep) {
                delete qb_bridge.callbacks[callbackId];
            }
        }
    };

    qb_bridge.createEvent = function (type, data) {
        var event = document.createEvent('Events');
        event.initEvent(type, false, false);
        if (data) {
            for (var i in data) {
                if (data.hasOwnProperty(i)) {
                    event[i] = data[i];
                }
            }
        }
        return event;
    };

    qb_bridge.fireEvent = function (type, params) {
        var channel = window.qb_channel[type];
        if (channel) {
            var data = params && JSON.parse(params);
            var evt = qb_bridge.createEvent(type, data);
            channel.fire(evt);
        };
    }
});browser.define("browser.live.getVersion", function(options, callback){
   var version = qb_bridge.exec(callback, null, "live", "getVersion", options );
   if(callback)
   {
     callback(version);
   }
   return version;
});browser.define("browser.live.getBalance", function(options, callback){
    /*请在这里输入API的实现代码*/
     qb_bridge.exec(callback, null, "live", "getBalance", options );
});browser.define("browser.live.getUserInfo", function(options,callback){
    return qb_bridge.exec(callback, null, "live", "getUserInfo", options);
});browser.define("browser.live.showRechargePanel", function(options,callback){
    /*请在这里输入API的实现代码*/
    return qb_bridge.exec(callback, null, "live", "showRechargePanel", options);
});browser.define("browser.live.login", function(options, callback){
       qb_bridge.exec(callback, null, "live", "login", options );
});browser.define("browser.live.onUserSwitch", function(options, handler){
    var str = new Date().getTime();
    window[str] = handler;
    var channel = qb_channel['onUserSwitch'];
    if (!channel) {
        channel = qb_channel.create('onUserSwitch');
        channel.onHasSubscribersChange = function () {
            qb_bridge.exec(null, null, "live", "subscribeChanged", { numHandlers: this.numHandlers, type: "onUserSwitch",params:options });
        }
    }
    channel.subscribe(handler);
});browser.define("browser.live.pay", function(options, callback){
     qb_bridge.exec(callback, null, "live", "pay", options );
});browser.define("browser.live.refreshToken", function(options, callback){
       qb_bridge.exec(callback, null, "live", "refreshToken", options );
});browser.define("browser.live.recharge", function(options, callback){
    /*请在这里输入API的实现代码*/
  qb_bridge.exec(callback, null, "live", "recharge", options );
});