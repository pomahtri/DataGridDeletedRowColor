"use strict";

exports.default = void 0;

var _uiSchedulerWork_space = _interopRequireDefault(require("./ui.scheduler.work_space.indicator"));

var _date = _interopRequireDefault(require("../../../localization/date"));

var _utils = _interopRequireDefault(require("../utils.timeZone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var SchedulerWorkspaceVertical = /*#__PURE__*/function (_SchedulerWorkSpaceIn) {
  _inheritsLoose(SchedulerWorkspaceVertical, _SchedulerWorkSpaceIn);

  function SchedulerWorkspaceVertical() {
    return _SchedulerWorkSpaceIn.apply(this, arguments) || this;
  }

  var _proto = SchedulerWorkspaceVertical.prototype;

  _proto._getFormat = function _getFormat() {
    return this._formatWeekdayAndDay;
  };

  _proto.generateRenderOptions = function generateRenderOptions() {
    var _this = this;

    var startViewDate = _utils.default.getDateWithoutTimezoneChange(this.getStartViewDate());

    var _getTimeText = function _getTimeText(row, column) {
      // T410490: incorrectly displaying time slots on Linux
      var index = row % _this._getRowCount();

      if (index % 2 === 0 && column === 0) {
        return _date.default.format(_this._getTimeCellDateCore(startViewDate, row), 'shorttime');
      }

      return '';
    };

    var options = _SchedulerWorkSpaceIn.prototype.generateRenderOptions.call(this);

    options.cellDataGetters.push(function (_, rowIndex, columnIndex) {
      return {
        value: {
          text: _getTimeText(rowIndex, columnIndex)
        }
      };
    });
    return options;
  };

  return SchedulerWorkspaceVertical;
}(_uiSchedulerWork_space.default);

var _default = SchedulerWorkspaceVertical;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;