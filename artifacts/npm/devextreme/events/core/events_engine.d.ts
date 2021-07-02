/**
* DevExtreme (events/core/events_engine.d.ts)
* Version: 21.2.0
* Build date: Fri Jul 02 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
type EventsEngineType = {
    on: (element: any, eventName: any, handler: any, options?: any) => void;
    off: (element: any, eventName: any, handler: any) => void;
    set: (eventEngine: any) => void;
}

declare const eventsEngine: EventsEngineType;
export declare function set(eventEngine: any): void;
export default eventsEngine;
