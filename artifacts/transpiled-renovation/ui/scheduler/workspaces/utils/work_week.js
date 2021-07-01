"use strict";

exports.calculateStartViewDate = exports.getWeekendsCount = exports.getFirstDayOfWeek = exports.isDataOnWeekend = void 0;

var _date = _interopRequireDefault(require("../../../../core/utils/date"));

var _base = require("./base");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var MONDAY_INDEX = 1;
var SATURDAY_INDEX = 6;
var SUNDAY_INDEX = 0;

var isDataOnWeekend = function isDataOnWeekend(date) {
  var day = date.getDay();
  return day === SATURDAY_INDEX || day === SUNDAY_INDEX;
};

exports.isDataOnWeekend = isDataOnWeekend;

var getFirstDayOfWeek = function getFirstDayOfWeek(firstDayOfWeekOption) {
  return firstDayOfWeekOption || MONDAY_INDEX;
};

exports.getFirstDayOfWeek = getFirstDayOfWeek;

var getWeekendsCount = function getWeekendsCount(days) {
  return 2 * Math.floor(days / 7);
};

exports.getWeekendsCount = getWeekendsCount;

var calculateStartViewDate = function calculateStartViewDate(currentDate, startDayHour, startDate, intervalDuration, firstDayOfWeekOption) {
  var viewStart = (0, _base.getViewStartByOptions)(startDate, currentDate, intervalDuration, startDate);

  var firstViewDate = _date.default.getFirstWeekDate(viewStart, getFirstDayOfWeek(firstDayOfWeekOption));

  var normalizedDate = _date.default.normalizeDateByWeek(firstViewDate, viewStart);

  return (0, _base.setStartDayHour)(normalizedDate, startDayHour);
};

exports.calculateStartViewDate = calculateStartViewDate;