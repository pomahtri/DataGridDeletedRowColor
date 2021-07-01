import { setStartDayHour } from './base';
export var calculateStartViewDate = (currentDate, startDayHour) => {
  var validCurrentDate = new Date(currentDate);
  return setStartDayHour(validCurrentDate, startDayHour);
};