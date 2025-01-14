"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ng_redux_1 = require("./components/ng-redux");
var root_store_1 = require("./components/root-store");
var dev_tools_1 = require("./components/dev-tools");
/** @hidden */
function _ngReduxFactory(ngZone) {
    return new root_store_1.RootStore(ngZone);
}
exports._ngReduxFactory = _ngReduxFactory;
var NgReduxModule = /** @class */ (function () {
    function NgReduxModule() {
    }
    NgReduxModule = __decorate([
        core_1.NgModule({
            providers: [
                dev_tools_1.DevToolsExtension,
                { provide: ng_redux_1.NgRedux, useFactory: _ngReduxFactory, deps: [core_1.NgZone] },
            ],
        })
    ], NgReduxModule);
    return NgReduxModule;
}());
exports.NgReduxModule = NgReduxModule;
//# sourceMappingURL=ng-redux.module.js.map