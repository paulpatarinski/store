"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ng_redux_1 = require("../components/ng-redux");
var operators_1 = require("rxjs/operators");
/**
 * OPTIONS_KEY: this is per-class (static) and holds the config from the
 * @SubStore decorator.
 */
var OPTIONS_KEY = '@angular-redux::substore::class::options';
/**
 * INSTANCE_SUBSTORE_KEY, INSTANCE_SELECTIONS_KEY: these are per-instance
 * (non-static) and holds references to the substores/selected observables
 * to be used by an instance of a decorated class. I'm not using
 * reflect-metadata here because I want
 *
 * 1. different instances to have different substores in the case where
 * `basePathMethodName` is dynamic.
 * 2. the instance substore to be garbage collected when the instance is no
 * longer reachable.
 * This is therefore an own-property on the actual instance of the decorated
 * class.
 */
var INSTANCE_SUBSTORE_KEY = '@angular-redux::substore::instance::store';
var INSTANCE_SELECTIONS_KEY = '@angular-redux::substore::instance::selections';
/**
 * Used to detect when the base path changes - this allows components to
 * dynamically adjust their selections if necessary.
 */
var INSTANCE_BASE_PATH_KEY = '@angular-redux::substore::instance::basepath';
var getClassOptions = function (decoratedInstance) {
    return decoratedInstance.constructor[OPTIONS_KEY];
};
var ɵ0 = getClassOptions;
exports.ɵ0 = ɵ0;
/** @hidden */
exports.setClassOptions = function (decoratedClassConstructor, options) {
    decoratedClassConstructor[OPTIONS_KEY] = options;
};
// I want the store to be saved on the actual instance so
// 1. different instances can have distinct substores if necessary
// 2. the substore/selections will be marked for garbage collection when the
//    instance is destroyed.
var setInstanceStore = function (decoratedInstance, store) { return (decoratedInstance[INSTANCE_SUBSTORE_KEY] = store); };
var ɵ1 = setInstanceStore;
exports.ɵ1 = ɵ1;
var getInstanceStore = function (decoratedInstance) {
    return decoratedInstance[INSTANCE_SUBSTORE_KEY];
};
var ɵ2 = getInstanceStore;
exports.ɵ2 = ɵ2;
var getInstanceSelectionMap = function (decoratedInstance) {
    var map = decoratedInstance[INSTANCE_SELECTIONS_KEY] || {};
    decoratedInstance[INSTANCE_SELECTIONS_KEY] = map;
    return map;
};
var ɵ3 = getInstanceSelectionMap;
exports.ɵ3 = ɵ3;
var hasBasePathChanged = function (decoratedInstance, basePath) {
    return decoratedInstance[INSTANCE_BASE_PATH_KEY] !== (basePath || []).toString();
};
var ɵ4 = hasBasePathChanged;
exports.ɵ4 = ɵ4;
var setInstanceBasePath = function (decoratedInstance, basePath) {
    decoratedInstance[INSTANCE_BASE_PATH_KEY] = (basePath || []).toString();
};
var ɵ5 = setInstanceBasePath;
exports.ɵ5 = ɵ5;
var clearInstanceState = function (decoratedInstance) {
    decoratedInstance[INSTANCE_SELECTIONS_KEY] = null;
    decoratedInstance[INSTANCE_SUBSTORE_KEY] = null;
    decoratedInstance[INSTANCE_BASE_PATH_KEY] = null;
};
var ɵ6 = clearInstanceState;
exports.ɵ6 = ɵ6;
/**
 * Gets the store associated with a decorated instance (e.g. a
 * component or service)
 * @hidden
 */
exports.getBaseStore = function (decoratedInstance) {
    // The root store hasn't been set up yet.
    if (!ng_redux_1.NgRedux.instance) {
        return undefined;
    }
    var options = getClassOptions(decoratedInstance);
    // This is not decorated with `@WithSubStore`. Return the root store.
    if (!options) {
        return ng_redux_1.NgRedux.instance;
    }
    // Dynamic base path support:
    var basePath = decoratedInstance[options.basePathMethodName]();
    if (hasBasePathChanged(decoratedInstance, basePath)) {
        clearInstanceState(decoratedInstance);
        setInstanceBasePath(decoratedInstance, basePath);
    }
    if (!basePath) {
        return ng_redux_1.NgRedux.instance;
    }
    var store = getInstanceStore(decoratedInstance);
    if (!store) {
        setInstanceStore(decoratedInstance, ng_redux_1.NgRedux.instance.configureSubStore(basePath, options.localReducer));
    }
    return getInstanceStore(decoratedInstance);
};
/**
 * Creates an Observable from the given selection parameters,
 * rooted at decoratedInstance's store, and caches it on the
 * instance for future use.
 * @hidden
 */
exports.getInstanceSelection = function (decoratedInstance, key, selector, transformer, comparator) {
    var store = exports.getBaseStore(decoratedInstance);
    if (store) {
        var selections = getInstanceSelectionMap(decoratedInstance);
        selections[key] =
            selections[key] ||
                (!transformer
                    ? store.select(selector, comparator)
                    : store
                        .select(selector)
                        .pipe(function (obs$) { return transformer(obs$, decoratedInstance); }, operators_1.distinctUntilChanged(comparator)));
        return selections[key];
    }
    return undefined;
};
//# sourceMappingURL=helpers.js.map