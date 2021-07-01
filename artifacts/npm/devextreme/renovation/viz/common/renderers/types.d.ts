/**
* DevExtreme (renovation/viz/common/renderers/types.d.ts)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export type PathType = 'line' | 'area' | 'bezier' | 'bezierarea';
export type LineCap = 'square' | 'butt' | 'round' | 'inherit';
export interface Point { x: number; y: number }
export type LabelAlignment = 'center' | 'left' | 'right';
export type SharpDirection = 'forward' | 'backward';
export interface ExtraProps { transform?: string; 'stroke-dasharray'?: string }
// eslint-disable-next-line @typescript-eslint/no-type-alias
export type Segment = ['M' | 'L' | 'Z' | 'C', number?, number?, number?, number?, number?, number?];
