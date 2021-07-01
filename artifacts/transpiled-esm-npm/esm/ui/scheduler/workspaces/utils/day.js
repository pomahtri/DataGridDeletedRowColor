import { getViewStartByOptions, setStartDayHour } from './base';
export var calculateStartViewDate = (currentDate, startDayHour, startDate, intervalDuration) => {
  var firstViewDate = getViewStartByOptions(startDate, currentDate, intervalDuration, startDate);
  return setStartDayHour(firstViewDate, startDayHour);
};