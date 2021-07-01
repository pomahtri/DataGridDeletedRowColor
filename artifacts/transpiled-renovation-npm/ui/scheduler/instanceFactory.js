"use strict";

exports.getTimeZoneCalculator = exports.getAppointmentDataProvider = exports.getResourceManager = exports.disposeFactoryInstances = exports.createInstance = exports.createFactoryInstances = void 0;

var _type = require("../../core/utils/type");

var _resourceManager = require("./resources/resourceManager");

var _appointmentDataProvider = require("./appointments/DataProvider/appointmentDataProvider");

var _timeZoneCalculator = require("./timeZoneCalculator");

var _utils = _interopRequireDefault(require("./utils.timeZone"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Names = {
  timeZoneCalculator: 'timeZoneCalculator',
  resourceManager: 'resourceManager',
  appointmentDataProvider: 'appointmentDataProvider'
};
var factoryInstances = {};
var tailIndex = -1;

var createFactoryInstances = function createFactoryInstances(options) {
  var key = (0, _type.isDefined)(options.key) ? options.key : ++tailIndex;
  var timeZoneCalculator = createTimeZoneCalculator(key, options.timeZone);
  var resourceManager = createResourceManager(key, options.resources);
  createAppointmentDataProvider(key, _extends({}, options, {
    timeZoneCalculator: timeZoneCalculator,
    resourceManager: resourceManager
  }));
  return key;
};

exports.createFactoryInstances = createFactoryInstances;

var createInstance = function createInstance(name, key, callback) {
  if (!(0, _type.isDefined)(factoryInstances[name])) {
    factoryInstances[name] = {};
  }

  var result = callback();
  factoryInstances[name][key] = result;
  return result;
};

exports.createInstance = createInstance;

var getInstance = function getInstance(name, key) {
  return factoryInstances[name] ? factoryInstances[name][key] : undefined;
};

var removeInstance = function removeInstance(name, key) {
  if (getInstance(name, key)) {
    factoryInstances[name][key] = undefined;
  }
};

var createResourceManager = function createResourceManager(key, resources) {
  return createInstance(Names.resourceManager, key, function () {
    var resourceManager = getInstance(Names.resourceManager, key);

    if ((0, _type.isDefined)(resourceManager)) {
      resourceManager.setResources(resources);
      return resourceManager;
    }

    return new _resourceManager.ResourceManager(resources);
  });
};

var createAppointmentDataProvider = function createAppointmentDataProvider(key, options) {
  return createInstance(Names.appointmentDataProvider, key, function () {
    return new _appointmentDataProvider.AppointmentDataProvider(_extends({}, options, {
      key: key
    }));
  });
};

var createTimeZoneCalculator = function createTimeZoneCalculator(key, currentTimeZone) {
  return createInstance(Names.timeZoneCalculator, key, function () {
    return new _timeZoneCalculator.TimeZoneCalculator({
      getClientOffset: function getClientOffset(date) {
        return _utils.default.getClientTimezoneOffset(date);
      },
      getCommonOffset: function getCommonOffset(date, timeZone) {
        return _utils.default.calculateTimezoneByValue(timeZone || currentTimeZone, date);
      },
      getAppointmentOffset: function getAppointmentOffset(date, appointmentTimezone) {
        return _utils.default.calculateTimezoneByValue(appointmentTimezone, date);
      }
    });
  });
};

var disposeFactoryInstances = function disposeFactoryInstances(key) {
  Object.getOwnPropertyNames(Names).forEach(function (name) {
    removeInstance(name, key);
  });
};

exports.disposeFactoryInstances = disposeFactoryInstances;

var getResourceManager = function getResourceManager(key) {
  return getInstance(Names.resourceManager, key);
};

exports.getResourceManager = getResourceManager;

var getAppointmentDataProvider = function getAppointmentDataProvider() {
  var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return getInstance(Names.appointmentDataProvider, key);
};

exports.getAppointmentDataProvider = getAppointmentDataProvider;

var getTimeZoneCalculator = function getTimeZoneCalculator(key) {
  return getInstance(Names.timeZoneCalculator, key);
};

exports.getTimeZoneCalculator = getTimeZoneCalculator;