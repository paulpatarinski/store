"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ng_redux_1 = require("../components/ng-redux");
var helpers_1 = require("./helpers");
/**
 * Auto-dispatches the return value of the decorated function.
 *
 * Decorate a function creator method with @dispatch and its return
 * value will automatically be passed to ngRedux.dispatch() for you.
 */
function dispatch() {
    return function decorate(target, key, descriptor) {
        var originalMethod;
        var wrapped = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var result = originalMethod.apply(this, args);
            if (result !== false) {
                var store = helpers_1.getBaseStore(this) || ng_redux_1.NgRedux.instance;
                if (store) {
                    store.dispatch(result);
                }
            }
            return result;
        };
        descriptor = descriptor || Object.getOwnPropertyDescriptor(target, key);
        if (descriptor === undefined) {
            var dispatchDescriptor = {
                get: function () { return wrapped; },
                set: function (setMethod) { return (originalMethod = setMethod); },
            };
            Object.defineProperty(target, key, dispatchDescriptor);
            return dispatchDescriptor;
        }
        else {
            originalMethod = descriptor.value;
            descriptor.value = wrapped;
            return descriptor;
        }
    };
}
exports.dispatch = dispatch;
//# sourceMappingURL=dispatch.js.map