/**
* DevExtreme (cjs/renovation/ui/scheduler/props.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.SchedulerProps = exports.ScrollingProps = exports.AppointmentDraggingProps = exports.AppointmentEditingProps = exports.ViewProps = exports.ResourceProps = void 0;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ResourceProps = {};
exports.ResourceProps = ResourceProps;
var BaseSchedulerProps = {};

var ViewProps = _extends({}, BaseSchedulerProps);

exports.ViewProps = ViewProps;
var AppointmentEditingProps = {};
exports.AppointmentEditingProps = AppointmentEditingProps;
var AppointmentDraggingProps = {};
exports.AppointmentDraggingProps = AppointmentDraggingProps;
var ScrollingProps = {};
exports.ScrollingProps = ScrollingProps;

var SchedulerProps = _extends({}, BaseSchedulerProps, {
  defaultCurrentDate: new Date(),
  currentDateChange: function currentDateChange() {},
  defaultCurrentView: "day",
  currentViewChange: function currentViewChange() {}
});

exports.SchedulerProps = SchedulerProps;
