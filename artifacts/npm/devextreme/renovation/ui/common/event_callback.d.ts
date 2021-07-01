/**
* DevExtreme (renovation/ui/common/event_callback.d.ts)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
// eslint-disable-next-line @typescript-eslint/no-type-alias
export type EventCallback<T = undefined> = T extends undefined ? () => void : (value: T) => void;
