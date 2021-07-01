/**
* DevExtreme (esm/ui/scheduler/workspaces/utils/work_week.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dateUtils from '../../../../core/utils/date';
import { getViewStartByOptions, setStartDayHour } from './base';
var MONDAY_INDEX = 1;
var SATURDAY_INDEX = 6;
var SUNDAY_INDEX = 0;
export var isDataOnWeekend = date => {
  var day = date.getDay();
  return day === SATURDAY_INDEX || day === SUNDAY_INDEX;
};
export var getFirstDayOfWeek = firstDayOfWeekOption => {
  return firstDayOfWeekOption || MONDAY_INDEX;
};
export var getWeekendsCount = days => {
  return 2 * Math.floor(days / 7);
};
export var calculateStartViewDate = (currentDate, startDayHour, startDate, intervalDuration, firstDayOfWeekOption) => {
  var viewStart = getViewStartByOptions(startDate, currentDate, intervalDuration, startDate);
  var firstViewDate = dateUtils.getFirstWeekDate(viewStart, getFirstDayOfWeek(firstDayOfWeekOption));
  var normalizedDate = dateUtils.normalizeDateByWeek(firstViewDate, viewStart);
  return setStartDayHour(normalizedDate, startDayHour);
};
