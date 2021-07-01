"use strict";

exports.calculateStartViewDate = exports.getViewStartByOptions = void 0;

var _date = _interopRequireDefault(require("../../../../core/utils/date"));

var _base = require("./base");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getViewStartByOptions = function getViewStartByOptions(startDate, currentDate, intervalCount, startViewDate) {
  if (!startDate) {
    return new Date(currentDate);
  } else {
    var _startDate = new Date(startViewDate);

    var validStartViewDate = new Date(startViewDate);
    var diff = _startDate.getTime() <= currentDate.getTime() ? 1 : -1;
    var endDate = new Date(new Date(validStartViewDate.setMonth(validStartViewDate.getMonth() + diff * intervalCount)));

    while (!(0, _base.isDateInRange)(currentDate, _startDate, endDate, diff)) {
      _startDate = new Date(endDate);

      if (diff > 0) {
        _startDate.setDate(1);
      }

      endDate = new Date(new Date(endDate.setMonth(endDate.getMonth() + diff * intervalCount)));
    }

    return diff > 0 ? _startDate : endDate;
  }
};

exports.getViewStartByOptions = getViewStartByOptions;

var calculateStartViewDate = function calculateStartViewDate(currentDate, startDayHour, startDate, intervalCount, firstDayOfWeekOption) {
  var viewStart = getViewStartByOptions(startDate, currentDate, intervalCount, _date.default.getFirstMonthDate(startDate));

  var firstMonthDate = _date.default.getFirstMonthDate(viewStart);

  var firstDayOfWeek = (0, _base.getCalculatedFirstDayOfWeek)(firstDayOfWeekOption);

  var firstViewDate = _date.default.getFirstWeekDate(firstMonthDate, firstDayOfWeek);

  return (0, _base.setStartDayHour)(firstViewDate, startDayHour);
};

exports.calculateStartViewDate = calculateStartViewDate;