/**
* DevExtreme (renovation/viz/sparklines/types.d.ts)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export interface ArgumentAxisRange {
  invert: boolean;
  min?: number;
  max?: number;
  axisType: string;
  dataType: string;
}

export interface ValueAxisRange {
  min?: number;
  max?: number;
  axisType: string;
  dataType: string;
}

export interface BulletScaleProps {
  inverted: boolean;
  value: number;
  target: number;
  startScaleValue: number;
  endScaleValue: number;
}
