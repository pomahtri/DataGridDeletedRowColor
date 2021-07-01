/**
* DevExtreme (cjs/ui/scheduler/workspaces/utils/base.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.calculateViewStartDate = exports.getFirstDayOfWeek = exports.getCalculatedFirstDayOfWeek = exports.getViewStartByOptions = exports.setStartDayHour = exports.isDateInRange = void 0;

var _date = _interopRequireDefault(require("../../../../core/utils/date"));

var _type = require("../../../../core/utils/type");

var _date2 = _interopRequireDefault(require("../../../../localization/date"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isDateInRange = function isDateInRange(date, startDate, endDate, diff) {
  return diff > 0 ? _date.default.dateInRange(date, startDate, new Date(endDate.getTime() - 1)) : _date.default.dateInRange(date, endDate, startDate, 'date');
};

exports.isDateInRange = isDateInRange;

var setStartDayHour = function setStartDayHour(date, startDayHour) {
  if (!(0, _type.isDefined)(startDayHour)) {
    return date;
  }

  var nextDate = new Date(date);
  nextDate.setHours(startDayHour, startDayHour % 1 * 60, 0, 0);
  return nextDate;
};

exports.setStartDayHour = setStartDayHour;

var getViewStartByOptions = function getViewStartByOptions(startDate, currentDate, intervalDuration, startViewDate) {
  if (!startDate) {
    return new Date(currentDate);
  } else {
    var _startDate = _date.default.trimTime(startViewDate);

    var diff = _startDate.getTime() <= currentDate.getTime() ? 1 : -1;
    var endDate = new Date(_startDate.getTime() + intervalDuration * diff);

    while (!isDateInRange(currentDate, _startDate, endDate, diff)) {
      _startDate = endDate;
      endDate = new Date(_startDate.getTime() + intervalDuration * diff);
    }

    return diff > 0 ? _startDate : endDate;
  }
};

exports.getViewStartByOptions = getViewStartByOptions;

var getCalculatedFirstDayOfWeek = function getCalculatedFirstDayOfWeek(firstDayOfWeekOption) {
  return (0, _type.isDefined)(firstDayOfWeekOption) ? firstDayOfWeekOption : _date2.default.firstDayOfWeekIndex();
};

exports.getCalculatedFirstDayOfWeek = getCalculatedFirstDayOfWeek;

var getFirstDayOfWeek = function getFirstDayOfWeek(firstDayOfWeekOption) {
  return firstDayOfWeekOption;
};

exports.getFirstDayOfWeek = getFirstDayOfWeek;

var calculateViewStartDate = function calculateViewStartDate(startDateOption) {
  return startDateOption;
};

exports.calculateViewStartDate = calculateViewStartDate;
