/**
* DevExtreme (cjs/ui/scheduler/workspaces/utils/agenda.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.calculateStartViewDate = void 0;

var _base = require("./base");

var calculateStartViewDate = function calculateStartViewDate(currentDate, startDayHour) {
  var validCurrentDate = new Date(currentDate);
  return (0, _base.setStartDayHour)(validCurrentDate, startDayHour);
};

exports.calculateStartViewDate = calculateStartViewDate;
