import dateUtils from '../../../../core/utils/date';
import { isDefined } from '../../../../core/utils/type';
import dateLocalization from '../../../../localization/date';
export var isDateInRange = (date, startDate, endDate, diff) => {
  return diff > 0 ? dateUtils.dateInRange(date, startDate, new Date(endDate.getTime() - 1)) : dateUtils.dateInRange(date, endDate, startDate, 'date');
};
export var setStartDayHour = (date, startDayHour) => {
  if (!isDefined(startDayHour)) {
    return date;
  }

  var nextDate = new Date(date);
  nextDate.setHours(startDayHour, startDayHour % 1 * 60, 0, 0);
  return nextDate;
};
export var getViewStartByOptions = (startDate, currentDate, intervalDuration, startViewDate) => {
  if (!startDate) {
    return new Date(currentDate);
  } else {
    var _startDate = dateUtils.trimTime(startViewDate);

    var diff = _startDate.getTime() <= currentDate.getTime() ? 1 : -1;
    var endDate = new Date(_startDate.getTime() + intervalDuration * diff);

    while (!isDateInRange(currentDate, _startDate, endDate, diff)) {
      _startDate = endDate;
      endDate = new Date(_startDate.getTime() + intervalDuration * diff);
    }

    return diff > 0 ? _startDate : endDate;
  }
};
export var getCalculatedFirstDayOfWeek = firstDayOfWeekOption => {
  return isDefined(firstDayOfWeekOption) ? firstDayOfWeekOption : dateLocalization.firstDayOfWeekIndex();
};
export var getFirstDayOfWeek = firstDayOfWeekOption => firstDayOfWeekOption;
export var calculateViewStartDate = startDateOption => startDateOption;