/**
* DevExtreme (esm/ui/scheduler/workspaces/ui.scheduler.timeline_day.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import registerComponent from '../../../core/component_registrator';
import SchedulerTimeline from './ui.scheduler.timeline';
import { calculateStartViewDate } from './utils/day';
var TIMELINE_CLASS = 'dx-scheduler-timeline-day';

class SchedulerTimelineDay extends SchedulerTimeline {
  _getElementClass() {
    return TIMELINE_CLASS;
  }

  _calculateStartViewDate() {
    return calculateStartViewDate(this.option('currentDate'), this.option('startDayHour'), this.option('startDate'), this._getIntervalDuration());
  }

  _needRenderWeekHeader() {
    return this._isWorkSpaceWithCount();
  }

}

registerComponent('dxSchedulerTimelineDay', SchedulerTimelineDay);
export default SchedulerTimelineDay;
