/**
* DevExtreme (cjs/ui/scheduler/appointments/DataProvider/appointmentDataProvider.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.AppointmentDataProvider = void 0;

var _appointmentDataSource = require("./appointmentDataSource");

var _appointmentFilter = require("./appointmentFilter");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var FilterStrategies = {
  virtual: 'virtual',
  standard: 'standard'
};

var AppointmentDataProvider = /*#__PURE__*/function () {
  function AppointmentDataProvider(options) {
    this.options = options;
    this.key = this.options.key;
    this.scheduler = this.options.scheduler;
    this.dataSource = this.options.dataSource;
    this.dataAccessors = this.options.getDataAccessors(this.key);
    this.filteredItems = [];
    this.appointmentDataSource = new _appointmentDataSource.AppointmentDataSource(this.dataSource);
    this.initFilterStrategy();
  }

  var _proto = AppointmentDataProvider.prototype;

  _proto.getFilterStrategy = function getFilterStrategy() {
    if (!this.filterStrategy || this.filterStrategy.strategyName !== this.filterStrategyName) {
      this.initFilterStrategy();
    }

    return this.filterStrategy;
  };

  _proto.initFilterStrategy = function initFilterStrategy() {
    var filterOptions = {
      key: this.key,
      scheduler: this.scheduler,
      dataSource: this.dataSource,
      dataAccessors: this.dataAccessors,
      startDayHour: this.options.startDayHour,
      endDayHour: this.options.endDayHour,
      appointmentDuration: this.options.appointmentDuration,
      showAllDayPanel: this.options.showAllDayPanel,
      timeZoneCalculator: this.options.timeZoneCalculator,
      resourceManager: this.options.resourceManager
    };
    this.filterStrategy = this.filterStrategyName === FilterStrategies.virtual ? new _appointmentFilter.AppointmentFilterVirtualStrategy(filterOptions) : new _appointmentFilter.AppointmentFilterBaseStrategy(filterOptions);
  };

  _proto.setDataSource = function setDataSource(dataSource) {
    this.dataSource = dataSource;
    this.initFilterStrategy();
    this.appointmentDataSource.setDataSource(this.dataSource);
  };

  _proto.updateDataAccessors = function updateDataAccessors(dataAccessors) {
    this.dataAccessors = dataAccessors;
    this.initFilterStrategy();
  } // Filter mapping
  ;

  _proto.filter = function filter() {
    this.filteredItems = this.getFilterStrategy().filter();
  };

  _proto.filterByDate = function filterByDate(min, max, remoteFiltering, dateSerializationFormat) {
    this.getFilterStrategy().filterByDate(min, max, remoteFiltering, dateSerializationFormat);
  };

  _proto.appointmentTakesAllDay = function appointmentTakesAllDay(appointment, startDayHour, endDayHour) {
    return this.getFilterStrategy().appointmentTakesAllDay(appointment, startDayHour, endDayHour);
  };

  _proto.hasAllDayAppointments = function hasAllDayAppointments(appointments) {
    return this.getFilterStrategy().hasAllDayAppointments(appointments);
  };

  _proto.filterLoadedAppointments = function filterLoadedAppointments(filterOption, timeZoneCalculator) {
    return this.getFilterStrategy().filterLoadedAppointments(filterOption, timeZoneCalculator);
  } // From subscribe
  ;

  _proto.replaceWrongEndDate = function replaceWrongEndDate(appointment, startDate, endDate) {
    this.getFilterStrategy().replaceWrongEndDate(appointment, startDate, endDate);
  };

  _proto.calculateAppointmentEndDate = function calculateAppointmentEndDate(isAllDay, startDate) {
    return this.getFilterStrategy().calculateAppointmentEndDate(isAllDay, startDate);
  };

  _proto.appointmentTakesSeveralDays = function appointmentTakesSeveralDays(appointment) {
    return this.getFilterStrategy().appointmentTakesSeveralDays(appointment);
  } // Appointment data source mappings
  ;

  _proto.cleanState = function cleanState() {
    this.appointmentDataSource.cleanState();
  };

  _proto.getUpdatedAppointment = function getUpdatedAppointment() {
    return this.appointmentDataSource._updatedAppointment;
  };

  _proto.getUpdatedAppointmentKeys = function getUpdatedAppointmentKeys() {
    return this.appointmentDataSource._updatedAppointmentKeys;
  };

  _proto.add = function add(rawAppointment) {
    return this.appointmentDataSource.add(rawAppointment);
  };

  _proto.update = function update(target, rawAppointment) {
    return this.appointmentDataSource.update(target, rawAppointment);
  };

  _proto.remove = function remove(rawAppointment) {
    return this.appointmentDataSource.remove(rawAppointment);
  };

  _createClass(AppointmentDataProvider, [{
    key: "filterMaker",
    get: function get() {
      return this.getFilterStrategy().filterMaker;
    }
  }, {
    key: "keyName",
    get: function get() {
      return this.appointmentDataSource.keyName;
    }
  }, {
    key: "filterStrategyName",
    get: function get() {
      return this.options.getIsVirtualScrolling() ? FilterStrategies.virtual : FilterStrategies.standard;
    }
  }]);

  return AppointmentDataProvider;
}();

exports.AppointmentDataProvider = AppointmentDataProvider;
