import dateUtils from '../../../../core/utils/date';
import dateLocalization from '../../../../localization/date';
import { getCalculatedFirstDayOfWeek, getViewStartByOptions, setStartDayHour } from './base';
export var getIntervalDuration = intervalCount => {
  return dateUtils.dateToMilliseconds('day') * 7 * intervalCount;
};
export var calculateStartViewDate = (currentDate, startDayHour, startDate, intervalDuration, firstDayOfWeekOption) => {
  var firstDayOfWeek = getCalculatedFirstDayOfWeek(firstDayOfWeekOption);
  var viewStart = getViewStartByOptions(startDate, currentDate, intervalDuration, startDate);
  var firstViewDate = dateUtils.getFirstWeekDate(viewStart, firstDayOfWeek);
  return setStartDayHour(firstViewDate, startDayHour);
};
export var calculateViewStartDate = (startDateOption, firstDayOfWeek) => {
  var validFirstDayOfWeek = firstDayOfWeek || dateLocalization.firstDayOfWeekIndex();
  return dateUtils.getFirstWeekDate(startDateOption, validFirstDayOfWeek);
};