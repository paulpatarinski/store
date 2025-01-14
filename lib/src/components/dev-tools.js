"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng_redux_1 = require("./ng-redux");
var core_2 = require("@angular/core");
var environment = typeof window !== 'undefined' ? window : {};
/**
 * An angular-2-ified version of the Redux DevTools chrome extension.
 */
var DevToolsExtension = /** @class */ (function () {
    /** @hidden */
    function DevToolsExtension(appRef, ngRedux) {
        var _this = this;
        this.appRef = appRef;
        this.ngRedux = ngRedux;
        /**
         * A wrapper for the Chrome Extension Redux DevTools.
         * Makes sure state changes triggered by the extension
         * trigger Angular2's change detector.
         *
         * @argument options: dev tool options; same
         * format as described here:
         * [zalmoxisus/redux-devtools-extension/blob/master/docs/API/Arguments.md]
         */
        this.enhancer = function (options) {
            var subscription;
            if (!_this.isEnabled()) {
                return null;
            }
            // Make sure changes from dev tools update angular's view.
            environment.devToolsExtension.listen(function (_a) {
                var type = _a.type;
                if (type === 'START') {
                    subscription = _this.ngRedux.subscribe(function () {
                        if (!core_2.NgZone.isInAngularZone()) {
                            _this.appRef.tick();
                        }
                    });
                }
                else if (type === 'STOP') {
                    subscription();
                }
            });
            return environment.devToolsExtension(options);
        };
        /**
         * Returns true if the extension is installed and enabled.
         */
        this.isEnabled = function () { return environment && environment.devToolsExtension; };
    }
    DevToolsExtension = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.ApplicationRef, ng_redux_1.NgRedux])
    ], DevToolsExtension);
    return DevToolsExtension;
}());
exports.DevToolsExtension = DevToolsExtension;
//# sourceMappingURL=dev-tools.js.map