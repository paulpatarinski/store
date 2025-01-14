import { Observable } from 'rxjs';
/**
 * Custom equality checker that can be used with `.select` and `@select`.
 * ```ts
 * const customCompare: Comparator = (x: any, y: any) => {
 *  return x.id === y.id
 * }
 *
 * @select(selector, customCompare)
 * ```
 */
export declare type Comparator = (x: any, y: any) => boolean;
export declare type Transformer<RootState, V> = (store$: Observable<RootState>, scope: any) => Observable<V>;
export declare type PropertySelector = string | number | symbol;
export declare type PathSelector = (string | number)[];
export declare type FunctionSelector<RootState, S> = ((s: RootState) => S);
export declare type Selector<RootState, S> = PropertySelector | PathSelector | FunctionSelector<RootState, S>;
/** @hidden */
export declare const sniffSelectorType: <RootState, S>(selector?: string | number | symbol | (string | number)[] | ((s: RootState) => S) | undefined) => "function" | "nil" | "path" | "property";
/** @hidden */
export declare const resolver: <RootState, S>(selector?: string | number | symbol | (string | number)[] | ((s: RootState) => S) | undefined) => {
    property: (state: any) => any;
    path: (state: RootState) => any;
    function: (s: RootState) => S;
    nil: (state: RootState) => RootState;
};
/** @hidden */
export declare const resolveToFunctionSelector: <RootState, S>(selector?: string | number | symbol | (string | number)[] | ((s: RootState) => S) | undefined) => ((s: RootState) => S) | ((state: RootState) => RootState) | ((state: RootState) => any) | ((state: any) => any);
