/**
* DevExtreme (esm/ui/scheduler/workspaces/ui.scheduler.timeline_month.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import registerComponent from '../../../core/component_registrator';
import SchedulerTimeline from './ui.scheduler.timeline';
import dateUtils from '../../../core/utils/date';
import dxrDateHeader from '../../../renovation/ui/scheduler/workspaces/base/header_panel/layout.j';
import { getViewStartByOptions } from './utils/month';
import { calculateStartViewDate } from './utils/timeline_month';
import { setStartDayHour } from './utils/base';
var TIMELINE_CLASS = 'dx-scheduler-timeline-month';
var DAY_IN_MILLISECONDS = 86400000;
var toMs = dateUtils.dateToMilliseconds;

class SchedulerTimelineMonth extends SchedulerTimeline {
  get isDateAndTimeView() {
    return false;
  }

  get viewDirection() {
    return 'horizontal';
  }

  get renovatedHeaderPanelComponent() {
    return dxrDateHeader;
  }

  _renderView() {
    super._renderView();

    this._updateScrollable();
  }

  _getElementClass() {
    return TIMELINE_CLASS;
  }

  _getDateHeaderTemplate() {
    return this.option('dateCellTemplate');
  }

  _getHiddenInterval() {
    return 0;
  }

  _calculateDurationInCells(timeDiff) {
    return timeDiff / this.getCellDuration();
  }

  getCellDuration() {
    return toMs('day');
  }

  calculateEndViewDate(dateOfLastViewCell) {
    return new Date(dateOfLastViewCell.getTime() + this._calculateDayDuration() * toMs('hour'));
  }

  isIndicatorVisible() {
    return true;
  }

  _getCellCount() {
    var currentDate = this.option('currentDate');
    var cellCount = 0;

    if (this._isWorkSpaceWithCount()) {
      var intervalCount = this.option('intervalCount');

      for (var i = 1; i <= intervalCount; i++) {
        cellCount += new Date(currentDate.getFullYear(), currentDate.getMonth() + i, 0).getDate();
      }
    } else {
      cellCount = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    }

    return cellCount;
  }

  _calculateStartViewDate() {
    return calculateStartViewDate(this.option('currentDate'), this.option('startDayHour'), this.option('startDate'), this.option('intervalCount'));
  }

  _getFormat() {
    return this._formatWeekdayAndDay;
  }

  _getDateByIndex(headerIndex) {
    var resultDate = new Date(this._startViewDate);
    resultDate.setDate(this._startViewDate.getDate() + headerIndex);
    return resultDate;
  }

  _getInterval() {
    return DAY_IN_MILLISECONDS;
  }

  _getIntervalBetween(currentDate) {
    var firstViewDate = this.getStartViewDate();
    var timeZoneOffset = dateUtils.getTimezonesDifference(firstViewDate, currentDate);
    return currentDate.getTime() - (firstViewDate.getTime() - this.option('startDayHour') * 3600000) - timeZoneOffset;
  }

  calculateEndDate(startDate) {
    var startDateCopy = new Date(startDate);
    return new Date(startDateCopy.setHours(this.option('endDayHour')));
  }

  _calculateHiddenInterval() {
    return 0;
  }

  _getDateByCellIndexes(rowIndex, columnIndex) {
    var date = super._getDateByCellIndexes(rowIndex, columnIndex);

    return setStartDayHour(date, this.option('startDayHour'));
  }

  getPositionShift() {
    return {
      top: 0,
      left: 0,
      cellPosition: 0
    };
  }

  _getViewStartByOptions() {
    return getViewStartByOptions(this.option('startDate'), this.option('currentDate'), this.option('intervalCount'), dateUtils.getFirstMonthDate(this.option('startDate')));
  }

}

registerComponent('dxSchedulerTimelineMonth', SchedulerTimelineMonth);
export default SchedulerTimelineMonth;
