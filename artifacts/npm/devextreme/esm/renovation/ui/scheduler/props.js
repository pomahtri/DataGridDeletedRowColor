/**
* DevExtreme (esm/renovation/ui/scheduler/props.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
export var ResourceProps = {};
var BaseSchedulerProps = {};
export var ViewProps = _extends({}, BaseSchedulerProps);
export var AppointmentEditingProps = {};
export var AppointmentDraggingProps = {};
export var ScrollingProps = {};
export var SchedulerProps = _extends({}, BaseSchedulerProps, {
  defaultCurrentDate: new Date(),
  currentDateChange: () => {},
  defaultCurrentView: "day",
  currentViewChange: () => {}
});
