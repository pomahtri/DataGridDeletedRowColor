/**
* DevExtreme (renovation/ui/scheduler/scheduler.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.Scheduler = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _props = require("./props");

var _widget = require("../common/widget");

var _excluded = ["adaptivityEnabled", "allDayExpr", "appointmentCollectorTemplate", "appointmentDragging", "appointmentTemplate", "appointmentTooltipTemplate", "cellDuration", "crossScrollingEnabled", "currentDate", "currentDateChange", "currentView", "currentViewChange", "customizeDateNavigatorText", "dataCellTemplate", "dataSource", "dateCellTemplate", "dateSerializationFormat", "defaultCurrentDate", "defaultCurrentView", "descriptionExpr", "editing", "endDateExpr", "endDateTimeZoneExpr", "endDayHour", "firstDayOfWeek", "focusStateEnabled", "groupByDate", "groups", "indicatorUpdateInterval", "max", "maxAppointmentsPerCell", "min", "noDataText", "onAppointmentAdded", "onAppointmentAdding", "onAppointmentClick", "onAppointmentContextMenu", "onAppointmentDblClick", "onAppointmentDeleted", "onAppointmentDeleting", "onAppointmentFormOpening", "onAppointmentRendered", "onAppointmentUpdated", "onAppointmentUpdating", "onCellClick", "onCellContextMenu", "recurrenceEditMode", "recurrenceExceptionExpr", "recurrenceRuleExpr", "remoteFiltering", "resourceCellTemplate", "resources", "scrolling", "selectedCellData", "shadeUntilCurrentTime", "showAllDayPanel", "showCurrentTimeIndicator", "startDateExpr", "startDateTimeZoneExpr", "startDayHour", "textExpr", "timeCellTemplate", "timeZone", "useDropDownViewSwitcher", "views"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var viewFunction = function viewFunction(viewModel) {
  var restAttributes = viewModel.restAttributes;
  return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _widget.Widget, _extends({}, restAttributes)));
};

exports.viewFunction = viewFunction;

var getTemplate = function getTemplate(TemplateProp) {
  return TemplateProp && (TemplateProp.defaultProps ? function (props) {
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)));
  } : TemplateProp);
};

var Scheduler = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(Scheduler, _InfernoComponent);

  function Scheduler(props) {
    var _this;

    _this = _InfernoComponent.call(this, props) || this;
    _this.state = {
      instance: undefined,
      currentDate: _this.props.currentDate !== undefined ? _this.props.currentDate : _this.props.defaultCurrentDate,
      currentView: _this.props.currentView !== undefined ? _this.props.currentView : _this.props.defaultCurrentView
    };
    _this.getComponentInstance = _this.getComponentInstance.bind(_assertThisInitialized(_this));
    _this.addAppointment = _this.addAppointment.bind(_assertThisInitialized(_this));
    _this.deleteAppointment = _this.deleteAppointment.bind(_assertThisInitialized(_this));
    _this.updateAppointment = _this.updateAppointment.bind(_assertThisInitialized(_this));
    _this.getDataSource = _this.getDataSource.bind(_assertThisInitialized(_this));
    _this.getEndViewDate = _this.getEndViewDate.bind(_assertThisInitialized(_this));
    _this.getStartViewDate = _this.getStartViewDate.bind(_assertThisInitialized(_this));
    _this.hideAppointmentPopup = _this.hideAppointmentPopup.bind(_assertThisInitialized(_this));
    _this.hideAppointmentTooltip = _this.hideAppointmentTooltip.bind(_assertThisInitialized(_this));
    _this.scrollTo = _this.scrollTo.bind(_assertThisInitialized(_this));
    _this.scrollToTime = _this.scrollToTime.bind(_assertThisInitialized(_this));
    _this.showAppointmentPopup = _this.showAppointmentPopup.bind(_assertThisInitialized(_this));
    _this.showAppointmentTooltip = _this.showAppointmentTooltip.bind(_assertThisInitialized(_this));
    _this.dispose = _this.dispose.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = Scheduler.prototype;

  _proto.createEffects = function createEffects() {
    return [new _vdom.InfernoEffect(this.dispose, [])];
  };

  _proto.dispose = function dispose() {
    var _this2 = this;

    return function () {
      _this2.state.instance.dispose();
    };
  };

  _proto.getComponentInstance = function getComponentInstance() {
    return this.state.instance;
  };

  _proto.addAppointment = function addAppointment(appointment) {
    this.state.instance.addAppointment(appointment);
  };

  _proto.deleteAppointment = function deleteAppointment(appointment) {
    this.state.instance.deleteAppointment(appointment);
  };

  _proto.updateAppointment = function updateAppointment(target, appointment) {
    this.state.instance.updateAppointment(target, appointment);
  };

  _proto.getDataSource = function getDataSource() {
    return this.state.instance.getDataSource();
  };

  _proto.getEndViewDate = function getEndViewDate() {
    return this.state.instance.getEndViewDate();
  };

  _proto.getStartViewDate = function getStartViewDate() {
    return this.state.instance.getStartViewDate();
  };

  _proto.hideAppointmentPopup = function hideAppointmentPopup(saveChanges) {
    this.state.instance.hideAppointmentPopup(saveChanges);
  };

  _proto.hideAppointmentTooltip = function hideAppointmentTooltip() {
    this.state.instance.hideAppointmentTooltip();
  };

  _proto.scrollTo = function scrollTo(date, group, allDay) {
    this.state.instance.scrollTo(date, group, allDay);
  };

  _proto.scrollToTime = function scrollToTime(hours, minutes, date) {
    this.state.instance.scrollToTime(hours, minutes, date);
  };

  _proto.showAppointmentPopup = function showAppointmentPopup(appointmentData, createNewAppointment, currentAppointmentData) {
    this.state.instance.showAppointmentPopup(appointmentData, createNewAppointment, currentAppointmentData);
  };

  _proto.showAppointmentTooltip = function showAppointmentTooltip(appointmentData, target, currentAppointmentData) {
    this.state.instance.showAppointmentTooltip(appointmentData, target, currentAppointmentData);
  };

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        currentDate: this.props.currentDate !== undefined ? this.props.currentDate : this.state.currentDate,
        currentView: this.props.currentView !== undefined ? this.props.currentView : this.state.currentView,
        dataCellTemplate: getTemplate(props.dataCellTemplate),
        dateCellTemplate: getTemplate(props.dateCellTemplate),
        timeCellTemplate: getTemplate(props.timeCellTemplate),
        resourceCellTemplate: getTemplate(props.resourceCellTemplate),
        appointmentCollectorTemplate: getTemplate(props.appointmentCollectorTemplate),
        appointmentTemplate: getTemplate(props.appointmentTemplate),
        appointmentTooltipTemplate: getTemplate(props.appointmentTooltipTemplate)
      }),
      instance: this.state.instance,
      restAttributes: this.restAttributes
    });
  };

  _createClass(Scheduler, [{
    key: "restAttributes",
    get: function get() {
      var _this$props$currentDa = _extends({}, this.props, {
        currentDate: this.props.currentDate !== undefined ? this.props.currentDate : this.state.currentDate,
        currentView: this.props.currentView !== undefined ? this.props.currentView : this.state.currentView
      }),
          adaptivityEnabled = _this$props$currentDa.adaptivityEnabled,
          allDayExpr = _this$props$currentDa.allDayExpr,
          appointmentCollectorTemplate = _this$props$currentDa.appointmentCollectorTemplate,
          appointmentDragging = _this$props$currentDa.appointmentDragging,
          appointmentTemplate = _this$props$currentDa.appointmentTemplate,
          appointmentTooltipTemplate = _this$props$currentDa.appointmentTooltipTemplate,
          cellDuration = _this$props$currentDa.cellDuration,
          crossScrollingEnabled = _this$props$currentDa.crossScrollingEnabled,
          currentDate = _this$props$currentDa.currentDate,
          currentDateChange = _this$props$currentDa.currentDateChange,
          currentView = _this$props$currentDa.currentView,
          currentViewChange = _this$props$currentDa.currentViewChange,
          customizeDateNavigatorText = _this$props$currentDa.customizeDateNavigatorText,
          dataCellTemplate = _this$props$currentDa.dataCellTemplate,
          dataSource = _this$props$currentDa.dataSource,
          dateCellTemplate = _this$props$currentDa.dateCellTemplate,
          dateSerializationFormat = _this$props$currentDa.dateSerializationFormat,
          defaultCurrentDate = _this$props$currentDa.defaultCurrentDate,
          defaultCurrentView = _this$props$currentDa.defaultCurrentView,
          descriptionExpr = _this$props$currentDa.descriptionExpr,
          editing = _this$props$currentDa.editing,
          endDateExpr = _this$props$currentDa.endDateExpr,
          endDateTimeZoneExpr = _this$props$currentDa.endDateTimeZoneExpr,
          endDayHour = _this$props$currentDa.endDayHour,
          firstDayOfWeek = _this$props$currentDa.firstDayOfWeek,
          focusStateEnabled = _this$props$currentDa.focusStateEnabled,
          groupByDate = _this$props$currentDa.groupByDate,
          groups = _this$props$currentDa.groups,
          indicatorUpdateInterval = _this$props$currentDa.indicatorUpdateInterval,
          max = _this$props$currentDa.max,
          maxAppointmentsPerCell = _this$props$currentDa.maxAppointmentsPerCell,
          min = _this$props$currentDa.min,
          noDataText = _this$props$currentDa.noDataText,
          onAppointmentAdded = _this$props$currentDa.onAppointmentAdded,
          onAppointmentAdding = _this$props$currentDa.onAppointmentAdding,
          onAppointmentClick = _this$props$currentDa.onAppointmentClick,
          onAppointmentContextMenu = _this$props$currentDa.onAppointmentContextMenu,
          onAppointmentDblClick = _this$props$currentDa.onAppointmentDblClick,
          onAppointmentDeleted = _this$props$currentDa.onAppointmentDeleted,
          onAppointmentDeleting = _this$props$currentDa.onAppointmentDeleting,
          onAppointmentFormOpening = _this$props$currentDa.onAppointmentFormOpening,
          onAppointmentRendered = _this$props$currentDa.onAppointmentRendered,
          onAppointmentUpdated = _this$props$currentDa.onAppointmentUpdated,
          onAppointmentUpdating = _this$props$currentDa.onAppointmentUpdating,
          onCellClick = _this$props$currentDa.onCellClick,
          onCellContextMenu = _this$props$currentDa.onCellContextMenu,
          recurrenceEditMode = _this$props$currentDa.recurrenceEditMode,
          recurrenceExceptionExpr = _this$props$currentDa.recurrenceExceptionExpr,
          recurrenceRuleExpr = _this$props$currentDa.recurrenceRuleExpr,
          remoteFiltering = _this$props$currentDa.remoteFiltering,
          resourceCellTemplate = _this$props$currentDa.resourceCellTemplate,
          resources = _this$props$currentDa.resources,
          scrolling = _this$props$currentDa.scrolling,
          selectedCellData = _this$props$currentDa.selectedCellData,
          shadeUntilCurrentTime = _this$props$currentDa.shadeUntilCurrentTime,
          showAllDayPanel = _this$props$currentDa.showAllDayPanel,
          showCurrentTimeIndicator = _this$props$currentDa.showCurrentTimeIndicator,
          startDateExpr = _this$props$currentDa.startDateExpr,
          startDateTimeZoneExpr = _this$props$currentDa.startDateTimeZoneExpr,
          startDayHour = _this$props$currentDa.startDayHour,
          textExpr = _this$props$currentDa.textExpr,
          timeCellTemplate = _this$props$currentDa.timeCellTemplate,
          timeZone = _this$props$currentDa.timeZone,
          useDropDownViewSwitcher = _this$props$currentDa.useDropDownViewSwitcher,
          views = _this$props$currentDa.views,
          restProps = _objectWithoutProperties(_this$props$currentDa, _excluded);

      return restProps;
    }
  }]);

  return Scheduler;
}(_vdom.InfernoComponent);

exports.Scheduler = Scheduler;
Scheduler.defaultProps = _extends({}, _props.SchedulerProps);
