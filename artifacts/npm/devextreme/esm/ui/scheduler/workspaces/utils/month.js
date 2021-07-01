/**
* DevExtreme (esm/ui/scheduler/workspaces/utils/month.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dateUtils from '../../../../core/utils/date';
import { getCalculatedFirstDayOfWeek, isDateInRange, setStartDayHour } from './base';
export var getViewStartByOptions = (startDate, currentDate, intervalCount, startViewDate) => {
  if (!startDate) {
    return new Date(currentDate);
  } else {
    var _startDate = new Date(startViewDate);

    var validStartViewDate = new Date(startViewDate);
    var diff = _startDate.getTime() <= currentDate.getTime() ? 1 : -1;
    var endDate = new Date(new Date(validStartViewDate.setMonth(validStartViewDate.getMonth() + diff * intervalCount)));

    while (!isDateInRange(currentDate, _startDate, endDate, diff)) {
      _startDate = new Date(endDate);

      if (diff > 0) {
        _startDate.setDate(1);
      }

      endDate = new Date(new Date(endDate.setMonth(endDate.getMonth() + diff * intervalCount)));
    }

    return diff > 0 ? _startDate : endDate;
  }
};
export var calculateStartViewDate = (currentDate, startDayHour, startDate, intervalCount, firstDayOfWeekOption) => {
  var viewStart = getViewStartByOptions(startDate, currentDate, intervalCount, dateUtils.getFirstMonthDate(startDate));
  var firstMonthDate = dateUtils.getFirstMonthDate(viewStart);
  var firstDayOfWeek = getCalculatedFirstDayOfWeek(firstDayOfWeekOption);
  var firstViewDate = dateUtils.getFirstWeekDate(firstMonthDate, firstDayOfWeek);
  return setStartDayHour(firstViewDate, startDayHour);
};
