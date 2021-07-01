/**
* DevExtreme (esm/ui/scheduler/workspaces/utils/day.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getViewStartByOptions, setStartDayHour } from './base';
export var calculateStartViewDate = (currentDate, startDayHour, startDate, intervalDuration) => {
  var firstViewDate = getViewStartByOptions(startDate, currentDate, intervalDuration, startDate);
  return setStartDayHour(firstViewDate, startDayHour);
};
