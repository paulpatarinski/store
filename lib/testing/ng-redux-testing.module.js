"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var store_1 = require("@angular-redux/store");
var ng_redux_mock_1 = require("./ng-redux.mock");
var dev_tools_mock_1 = require("./dev-tools.mock");
// Needs to be initialized early so @select's use the mocked version too.
var mockNgRedux = ng_redux_mock_1.MockNgRedux.getInstance();
/** @hidden */
function _mockNgReduxFactory() {
    return mockNgRedux;
}
exports._mockNgReduxFactory = _mockNgReduxFactory;
var NgReduxTestingModule = /** @class */ (function () {
    function NgReduxTestingModule() {
    }
    NgReduxTestingModule = __decorate([
        core_1.NgModule({
            imports: [],
            providers: [
                { provide: store_1.NgRedux, useFactory: _mockNgReduxFactory },
                { provide: store_1.DevToolsExtension, useClass: dev_tools_mock_1.MockDevToolsExtension },
            ],
        })
    ], NgReduxTestingModule);
    return NgReduxTestingModule;
}());
exports.NgReduxTestingModule = NgReduxTestingModule;
//# sourceMappingURL=ng-redux-testing.module.js.map