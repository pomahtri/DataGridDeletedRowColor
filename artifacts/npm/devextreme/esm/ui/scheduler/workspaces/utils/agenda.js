/**
* DevExtreme (esm/ui/scheduler/workspaces/utils/agenda.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { setStartDayHour } from './base';
export var calculateStartViewDate = (currentDate, startDayHour) => {
  var validCurrentDate = new Date(currentDate);
  return setStartDayHour(validCurrentDate, startDayHour);
};
