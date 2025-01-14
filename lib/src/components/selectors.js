"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var get_in_1 = require("../utils/get-in");
/** @hidden */
exports.sniffSelectorType = function (selector) {
    return !selector
        ? 'nil'
        : Array.isArray(selector)
            ? 'path'
            : 'function' === typeof selector ? 'function' : 'property';
};
/** @hidden */
exports.resolver = function (selector) { return ({
    property: function (state) {
        return state ? state[selector] : undefined;
    },
    path: function (state) { return get_in_1.getIn(state, selector); },
    function: selector,
    nil: function (state) { return state; },
}); };
/** @hidden */
exports.resolveToFunctionSelector = function (selector) { return exports.resolver(selector)[exports.sniffSelectorType(selector)]; };
//# sourceMappingURL=selectors.js.map