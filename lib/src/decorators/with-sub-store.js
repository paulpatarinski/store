"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./helpers");
/**
 * Modifies the behaviour of any `@select`, `@select$`, or `@dispatch`
 * decorators to operate on a substore defined by the IFractalStoreOptions.
 *
 * See:
 * https://github.com/angular-redux/store/blob/master/articles/fractal-store.md
 * for more information about SubStores.
 */
function WithSubStore(_a) {
    var basePathMethodName = _a.basePathMethodName, localReducer = _a.localReducer;
    return function decorate(constructor) {
        helpers_1.setClassOptions(constructor, {
            basePathMethodName: basePathMethodName,
            localReducer: localReducer,
        });
    };
}
exports.WithSubStore = WithSubStore;
//# sourceMappingURL=with-sub-store.js.map