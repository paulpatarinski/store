import { NgRedux, Selector, Comparator, PathSelector } from '@angular-redux/store';
import { AnyAction, Reducer, Dispatch, Middleware, Store, StoreEnhancer } from 'redux';
import { Observable, Subject } from 'rxjs';
import { MockObservableStore } from './observable-store.mock';
/**
 * Convenience mock to make it easier to control selector
 * behaviour in unit tests.
 */
export declare class MockNgRedux<T = {}> extends NgRedux<T> {
    /** @deprecated Use MockNgRedux.getInstance() instead. */
    static mockInstance?: MockNgRedux<any>;
    private mockRootStore;
    /**
     * Returns a subject that's connected to any observable returned by the
     * given selector. You can use this subject to pump values into your
     * components or services under test; when they call .select or @select
     * in the context of a unit test, MockNgRedux will give them the values
     * you pushed onto your stub.
     */
    static getSelectorStub<R, S>(selector?: Selector<R, S>, comparator?: Comparator): Subject<S>;
    /**
     * Returns a mock substore that allows you to set up selectorStubs for
     * any 'fractal' stores your app creates with NgRedux.configureSubStore.
     *
     * If your app creates deeply nested substores from other substores,
     * pass the chain of pathSelectors in as ordered arguments to mock
     * the nested substores out.
     * @param pathSelectors
     */
    static getSubStore<S>(...pathSelectors: PathSelector[]): MockObservableStore<S>;
    /**
     * Reset all previously configured stubs.
     */
    static reset(): void;
    /**
     * Gets the singleton MockNgRedux instance. Useful for cases where your
     * tests need to spy on store methods, for example.
     */
    static getInstance(): MockNgRedux<any>;
    provideStore: (_: Store<any, AnyAction>) => void;
    configureStore: (_: Reducer<any, AnyAction>, __: any, ___?: Middleware<{}, any, Dispatch<AnyAction>>[] | undefined, ____?: StoreEnhancer<any, {}>[] | undefined) => void;
    configureSubStore: <SubState>(basePath: (string | number)[], _: Reducer<SubState, AnyAction>) => MockObservableStore<SubState>;
    select: <SelectedType>(selector?: Selector<T, SelectedType>, comparator?: Comparator) => Observable<SelectedType>;
    dispatch: Dispatch<any>;
    getState: () => any;
    subscribe: () => () => null;
    replaceReducer: () => null;
    /** @hidden */
    private constructor();
}
