/**
* DevExtreme (cjs/ui/scheduler/workspaces/utils/day.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.calculateStartViewDate = void 0;

var _base = require("./base");

var calculateStartViewDate = function calculateStartViewDate(currentDate, startDayHour, startDate, intervalDuration) {
  var firstViewDate = (0, _base.getViewStartByOptions)(startDate, currentDate, intervalDuration, startDate);
  return (0, _base.setStartDayHour)(firstViewDate, startDayHour);
};

exports.calculateStartViewDate = calculateStartViewDate;
