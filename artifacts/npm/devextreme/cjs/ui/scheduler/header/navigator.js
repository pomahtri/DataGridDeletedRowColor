/**
* DevExtreme (cjs/ui/scheduler/header/navigator.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.Navigator = void 0;

var _renderer = _interopRequireDefault(require("../../../core/renderer"));

var _common = require("../../../core/utils/common");

var _ui = _interopRequireDefault(require("../../widget/ui.errors"));

var _date = _interopRequireDefault(require("../../../core/utils/date"));

var _extend = require("../../../core/utils/extend");

var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));

var _devices = _interopRequireDefault(require("../../../core/devices"));

var _ui2 = _interopRequireDefault(require("../../widget/ui.widget"));

var _button = _interopRequireDefault(require("../../button"));

var _calendar = _interopRequireDefault(require("../../calendar"));

var _popover = _interopRequireDefault(require("../../popover"));

var _popup = _interopRequireDefault(require("../../popup"));

var _publisher_mixin = _interopRequireDefault(require("../publisher_mixin"));

var _ui3 = _interopRequireDefault(require("../../scroll_view/ui.scrollable"));

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var ELEMENT_CLASS = 'dx-scheduler-navigator';
var CALENDAR_CLASS = 'dx-scheduler-navigator-calendar';
var NEXT_BUTTON_CLASS = 'dx-scheduler-navigator-next';
var CAPTION_BUTTON_CLASS = 'dx-scheduler-navigator-caption';
var PREVIOUS_BUTTON_CLASS = 'dx-scheduler-navigator-previous';
var CALENDAR_POPOVER_CLASS = 'dx-scheduler-navigator-calendar-popover';
var DEFAULT_AGENDA_DURATION = 7;
var ACCEPRED_STEPS = ['day', 'week', 'workWeek', 'month', 'agenda'];

var Navigator = _ui2.default.inherit({
  _getDefaultOptions: function _getDefaultOptions() {
    return (0, _extend.extend)(this.callBase(), {
      date: new Date(),
      displayedDate: undefined,
      step: 'day',
      intervalCount: 1,
      min: undefined,
      max: undefined,
      firstDayOfWeek: undefined,
      _useShortDateFormat: false,
      todayDate: function todayDate() {
        return new Date();
      }
    });
  },
  _defaultOptionsRules: function _defaultOptionsRules() {
    return this.callBase().concat([{
      device: function device() {
        return !_devices.default.real().generic || _devices.default.isSimulator();
      },
      options: {
        _useShortDateFormat: true
      }
    }]);
  },
  _optionChanged: function _optionChanged(args) {
    switch (args.name) {
      case 'step':
      case 'date':
      case 'intervalCount':
      case 'displayedDate':
        this._validateStep();

        this._updateButtonsState();

        this._renderCaption();

        this._setCalendarOption('value', this.option('date'));

        break;

      case 'min':
      case 'max':
        this._updateButtonsState();

        this._setCalendarOption(args.name, args.value);

        break;

      case 'firstDayOfWeek':
        this._setCalendarOption(args.name, args.value);

        break;

      case 'customizeDateNavigatorText':
        this._renderCaption();

        break;

      case 'tabIndex':
      case 'focusStateEnabled':
        this._next.option(args.name, args.value);

        this._caption.option(args.name, args.value);

        this._prev.option(args.name, args.value);

        this._setCalendarOption(args.name, args.value);

        this.callBase(args);
        break;

      case '_useShortDateFormat':
        break;

      default:
        this.callBase(args);
    }
  },
  _init: function _init() {
    this.callBase();
    this.$element().addClass(ELEMENT_CLASS);

    this._initButtons();
  },
  _initButtons: function _initButtons() {
    var $next = (0, _renderer.default)('<div>').addClass(NEXT_BUTTON_CLASS);
    this._next = this._createComponent($next, _button.default, {
      icon: 'chevronnext',
      onClick: this._updateCurrentDate.bind(this, 1),
      focusStateEnabled: this.option('focusStateEnabled'),
      tabIndex: this.option('tabIndex'),
      integrationOptions: {}
    });
    var $caption = (0, _renderer.default)('<div>').addClass(CAPTION_BUTTON_CLASS);
    this._caption = this._createComponent($caption, _button.default, {
      focusStateEnabled: this.option('focusStateEnabled'),
      tabIndex: this.option('tabIndex'),
      integrationOptions: {}
    });
    var $prev = (0, _renderer.default)('<div>').addClass(PREVIOUS_BUTTON_CLASS);
    this._prev = this._createComponent($prev, _button.default, {
      icon: 'chevronprev',
      onClick: this._updateCurrentDate.bind(this, -1),
      focusStateEnabled: this.option('focusStateEnabled'),
      tabIndex: this.option('tabIndex'),
      integrationOptions: {}
    });
    this.setAria('label', 'Next period', $next);
    this.setAria('label', 'Previous period', $prev);

    this._updateButtonsState();

    this.$element().append($prev, $caption, $next);
  },
  _updateButtonsState: function _updateButtonsState() {
    var min = this.option('min');
    var max = this.option('max');
    var date = this.option('displayedDate') || this.option('date');

    var caption = this._getCaption(date);

    min = min ? _date.default.trimTime(min) : min;
    max = max ? _date.default.trimTime(max) : max;
    max && max.setHours(23, 59, 59);

    this._prev.option('disabled', min && !isNaN(min.getTime()) && this._getNextDate(-1, caption.endDate) < min);

    this._next.option('disabled', max && !isNaN(max.getTime()) && this._getNextDate(1, caption.startDate) > max);
  },
  _updateCurrentDate: function _updateCurrentDate(direction) {
    var date = this._getNextDate(direction);

    _date.default.normalizeDate(date, this.option('min'), this.option('max'));

    this.notifyObserver('currentDateUpdated', date);
  },
  _getNextDate: function _getNextDate(direction) {
    var initialDate = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var date = initialDate || this.option('date');

    var options = _extends({}, this._getIntervalOptions(), {
      date: date
    });

    return (0, _utils.getNextIntervalDate)(options, direction);
  },
  _renderFocusTarget: _common.noop,
  _initMarkup: function _initMarkup() {
    this.callBase();

    this._renderCaption();
  },
  _render: function _render() {
    this.callBase();

    this._renderPopover();

    this._renderCaptionKeys();
  },
  _isMobileLayout: function _isMobileLayout() {
    return !_devices.default.current().generic;
  },
  _renderPopover: function _renderPopover() {
    var _this = this;

    var overlayType = this._isMobileLayout() ? _popup.default : _popover.default;
    var popoverContainer = (0, _renderer.default)('<div>').addClass(CALENDAR_POPOVER_CLASS);
    this._popover = this._createComponent(popoverContainer, overlayType, {
      contentTemplate: function contentTemplate() {
        return _this._createPopupContent();
      },
      defaultOptionsRules: [{
        device: function device() {
          return !_devices.default.current().generic;
        },
        options: {
          fullScreen: true,
          showCloseButton: false,
          toolbarItems: [{
            shortcut: 'cancel'
          }]
        }
      }, {
        device: function device() {
          return _devices.default.current().generic;
        },
        options: {
          target: this._caption.$element()
        }
      }]
    });

    this._popover.$element().appendTo(this.$element());
  },
  _createScrollable: function _createScrollable(content) {
    var result = this._createComponent((0, _renderer.default)('<div>'), _ui3.default, {
      direction: 'vertical'
    });

    result.$content().append(content);
    return result;
  },
  _createPopupContent: function _createPopupContent() {
    var result = (0, _renderer.default)('<div>').addClass(CALENDAR_CLASS);
    this._calendar = this._createComponent(result, _calendar.default, this._calendarOptions());

    if (this._isMobileLayout()) {
      var scrollable = this._createScrollable(result);

      return scrollable.$element();
    }

    return result;
  },
  _calendarOptions: function _calendarOptions() {
    return {
      min: this.option('min'),
      max: this.option('max'),
      firstDayOfWeek: this.option('firstDayOfWeek'),
      value: this.option('date'),
      _todayDate: this.option('todayDate'),
      focusStateEnabled: this.option('focusStateEnabled'),
      onValueChanged: function (e) {
        if (!this.option('visible')) return;
        this.notifyObserver('currentDateUpdated', e.value);

        this._popover.hide();
      }.bind(this),
      hasFocus: function hasFocus() {
        return true;
      },
      tabIndex: null
    };
  },
  _getIntervalOptions: function _getIntervalOptions() {
    var step = this.option('step');
    var intervalCount = this.option('intervalCount');
    var firstDayOfWeek = this.option('firstDayOfWeek') || 0; // TODO

    var agendaDuration = this.invoke('getAgendaDuration') || DEFAULT_AGENDA_DURATION;
    return {
      step: step,
      intervalCount: intervalCount,
      firstDayOfWeek: firstDayOfWeek,
      agendaDuration: agendaDuration
    };
  },
  _getCaption: function _getCaption(date) {
    var options = _extends({}, this._getIntervalOptions(), {
      date: date
    });

    var customizationFunction = this.option('customizeDateNavigatorText');
    var useShortDateFormat = this.option('_useShortDateFormat');
    return (0, _utils.getCaption)(options, useShortDateFormat, customizationFunction);
  },
  _renderCaption: function _renderCaption() {
    var _this2 = this;

    var date = this.option('displayedDate') || this.option('date');

    var caption = this._getCaption(date);

    this._caption.option({
      text: caption.text,
      onKeyboardHandled: function onKeyboardHandled(opts) {
        _this2.option('focusStateEnabled') && !_this2.option('disabled') && _this2._calendar._keyboardHandler(opts);
      },
      onClick: function onClick() {
        return _this2._popover.toggle();
      }
    });
  },
  _renderCaptionKeys: function _renderCaptionKeys() {
    if (!this.option('focusStateEnabled') || this.option('disabled')) {
      return;
    }

    var that = this;

    var executeHandler = function executeHandler() {
      if (that._popover.$content().is(':hidden')) {
        that._popover.show();
      } else {
        return true;
      }
    };

    var tabHandler = function tabHandler() {
      that._popover.hide();
    };

    this._caption.registerKeyHandler('enter', executeHandler);

    this._caption.registerKeyHandler('space', executeHandler);

    this._caption.registerKeyHandler('tab', tabHandler);
  },
  _setCalendarOption: function _setCalendarOption(name, value) {
    if (this._calendar) {
      this._calendar.option(name, value);
    }
  },
  _validateStep: function _validateStep() {
    var step = this.option('step');

    if (!ACCEPRED_STEPS.includes(step)) {
      throw _ui.default.Error('E1033', step);
    }
  }
}).include(_publisher_mixin.default);

exports.Navigator = Navigator;
(0, _component_registrator.default)('dxSchedulerNavigator', Navigator);
