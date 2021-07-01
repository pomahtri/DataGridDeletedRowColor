/**
* DevExtreme (core/options/utils.d.ts)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    Device
} from '../devices';

export type RecursivePartial<T> = {
    [P in keyof T]?: RecursivePartial<T[P]>;
};

export declare type Rule<T> = {
    device: ((device: Device) => boolean) | Device | Device[];
    options: RecursivePartial<T>;
};

export declare function convertRulesToOptions<T>(rules: Rule<T>[]): T;

export declare function normalizeOptions(options: string | object, value): { [name: string]: string };

export declare function deviceMatch(device: Device, filter): boolean;

export declare function getFieldName(fullName: string): string;

export declare function getParentName(fullName: string): string;

export function createDefaultOptionRules<T>(options?: Rule<T>[]): Rule<T>[];
