/**
* DevExtreme (cjs/ui/scheduler/workspaces/ui.scheduler.work_space_day.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;

var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));

var _uiScheduler = _interopRequireDefault(require("./ui.scheduler.work_space_vertical"));

var _day = require("./utils/day");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var DAY_CLASS = 'dx-scheduler-work-space-day';

var SchedulerWorkSpaceDay = /*#__PURE__*/function (_SchedulerWorkSpaceVe) {
  _inheritsLoose(SchedulerWorkSpaceDay, _SchedulerWorkSpaceVe);

  function SchedulerWorkSpaceDay() {
    return _SchedulerWorkSpaceVe.apply(this, arguments) || this;
  }

  var _proto = SchedulerWorkSpaceDay.prototype;

  _proto._getElementClass = function _getElementClass() {
    return DAY_CLASS;
  };

  _proto._getRowCount = function _getRowCount() {
    return this._getCellCountInDay();
  };

  _proto._getCellCount = function _getCellCount() {
    return this.option('intervalCount');
  };

  _proto._calculateStartViewDate = function _calculateStartViewDate() {
    return (0, _day.calculateStartViewDate)(this.option('currentDate'), this.option('startDayHour'), this.option('startDate'), this._getIntervalDuration());
  };

  _proto._getDateByIndex = function _getDateByIndex(headerIndex) {
    if (this.option('intervalCount') === 1) {
      return this._startViewDate;
    }

    var resultDate = new Date(this._startViewDate);
    resultDate.setDate(this._startViewDate.getDate() + headerIndex);
    return resultDate;
  };

  _proto._renderDateHeader = function _renderDateHeader() {
    return this.option('intervalCount') === 1 ? null : _SchedulerWorkSpaceVe.prototype._renderDateHeader.call(this);
  };

  _proto.renderRHeaderPanel = function renderRHeaderPanel() {
    if (this.option('intervalCount') === 1) {
      _SchedulerWorkSpaceVe.prototype.renderRHeaderPanel.call(this, false);
    } else {
      _SchedulerWorkSpaceVe.prototype.renderRHeaderPanel.call(this, true);
    }
  };

  return SchedulerWorkSpaceDay;
}(_uiScheduler.default);

(0, _component_registrator.default)('dxSchedulerWorkSpaceDay', SchedulerWorkSpaceDay);
var _default = SchedulerWorkSpaceDay;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
