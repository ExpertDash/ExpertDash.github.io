export declare type Callback<Events, T extends keyof Events> = (details: Events[T]) => any | Promise<any>;
export declare type CallbackFunction = (details: any) => void | Promise<void>;
declare type UnionToTuple<T extends string, U extends string[] = []> = {
    [S in T]: Exclude<T, S> extends never ? [...U, S] : UnionToTuple<Exclude<T, S>, [...U, S]>;
}[T] & string[];
declare type Keys<T extends {
    [index: string]: any;
}> = keyof T extends string ? keyof T : never;
/**
 * Enables dispatching of events in a category
 */
export default class Dispatcher<Events extends Record<string | number, any>> {
    #private;
    /**
     * @param eventsType Type containing all possible events
     */
    constructor(...events: UnionToTuple<Keys<Events>>);
    /**
     * Send out a new event
     * @param event Event type
     * @param details Event details
     */
    fire<T extends keyof Events>(event: T, details?: Events[T]): Promise<void>;
    /**
     * Add an event listener
     * @param event Event to listen for
     * @param callback Listener callback
     * @returns Callback instance
     */
    on<T extends keyof Events>(event: T, callback: Callback<Events, T>): Callback<Events, T>;
    /**
     * Add an event listener that will be removed after its first call
     * @param event Event to listen for
     * @param callback Listener callback
     * @returns Callback instance
     */
    once<T extends keyof Events>(event: T, callback: Callback<Events, T>): Callback<Events, T>;
    /**
     * Remove an event listener
     * @param event Event to stop listening for
     * @param callback Listener callback
     */
    forget<T extends keyof Events>(event: T, callback: Callback<Events, T>): void;
    /**
     * Remove all event listeners
     */
    forgetAll(): void;
    /**
     * Register a new event type
     * @param event Event type
     */
    protected register<T extends keyof Events>(...event: T[]): void;
    /**
     * Register an existing event type
     * @param event Event type
     */
    protected unregister<T extends keyof Events>(...event: T[]): void;
}
export {};
