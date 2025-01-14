"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var store_1 = require("@angular-redux/store");
var observable_store_mock_1 = require("./observable-store.mock");
// tslint:disable:member-ordering
/**
 * Convenience mock to make it easier to control selector
 * behaviour in unit tests.
 */
var MockNgRedux = /** @class */ (function (_super) {
    __extends(MockNgRedux, _super);
    /** @hidden */
    function MockNgRedux() {
        var _this = _super.call(this) || this;
        _this.mockRootStore = new observable_store_mock_1.MockObservableStore();
        _this.provideStore = function (_) { };
        _this.configureStore = function (_, __, ___, ____) { };
        _this.configureSubStore = _this.mockRootStore.configureSubStore;
        _this.select = _this.mockRootStore.select;
        _this.dispatch = _this.mockRootStore.dispatch;
        _this.getState = _this.mockRootStore.getState;
        _this.subscribe = _this.mockRootStore.subscribe;
        _this.replaceReducer = _this.mockRootStore.replaceReducer;
        // This hooks the mock up to @select.
        store_1.NgRedux.instance = _this;
        return _this;
    }
    /**
     * Returns a subject that's connected to any observable returned by the
     * given selector. You can use this subject to pump values into your
     * components or services under test; when they call .select or @select
     * in the context of a unit test, MockNgRedux will give them the values
     * you pushed onto your stub.
     */
    MockNgRedux.getSelectorStub = function (selector, comparator) {
        return MockNgRedux.getInstance().mockRootStore.getSelectorStub(selector, comparator);
    };
    /**
     * Returns a mock substore that allows you to set up selectorStubs for
     * any 'fractal' stores your app creates with NgRedux.configureSubStore.
     *
     * If your app creates deeply nested substores from other substores,
     * pass the chain of pathSelectors in as ordered arguments to mock
     * the nested substores out.
     * @param pathSelectors
     */
    MockNgRedux.getSubStore = function () {
        var pathSelectors = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            pathSelectors[_i] = arguments[_i];
        }
        return pathSelectors.length
            ? (_a = MockNgRedux.getInstance().mockRootStore).getSubStore.apply(_a, pathSelectors) : MockNgRedux.getInstance().mockRootStore;
        var _a;
    };
    /**
     * Reset all previously configured stubs.
     */
    MockNgRedux.reset = function () {
        MockNgRedux.getInstance().mockRootStore.reset();
        store_1.NgRedux.instance = MockNgRedux.mockInstance;
    };
    /**
     * Gets the singleton MockNgRedux instance. Useful for cases where your
     * tests need to spy on store methods, for example.
     */
    MockNgRedux.getInstance = function () {
        MockNgRedux.mockInstance = MockNgRedux.mockInstance || new MockNgRedux();
        return MockNgRedux.mockInstance;
    };
    /** @deprecated Use MockNgRedux.getInstance() instead. */
    MockNgRedux.mockInstance = undefined;
    return MockNgRedux;
}(store_1.NgRedux));
exports.MockNgRedux = MockNgRedux;
//# sourceMappingURL=ng-redux.mock.js.map