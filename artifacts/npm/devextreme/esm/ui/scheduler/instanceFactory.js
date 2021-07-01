/**
* DevExtreme (esm/ui/scheduler/instanceFactory.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { isDefined } from '../../core/utils/type';
import { ResourceManager } from './resources/resourceManager';
import { AppointmentDataProvider } from './appointments/DataProvider/appointmentDataProvider';
import { TimeZoneCalculator } from './timeZoneCalculator';
import timeZoneUtils from './utils.timeZone';
var Names = {
  timeZoneCalculator: 'timeZoneCalculator',
  resourceManager: 'resourceManager',
  appointmentDataProvider: 'appointmentDataProvider'
};
var factoryInstances = {};
var tailIndex = -1;
export var createFactoryInstances = options => {
  var key = isDefined(options.key) ? options.key : ++tailIndex;
  var timeZoneCalculator = createTimeZoneCalculator(key, options.timeZone);
  var resourceManager = createResourceManager(key, options.resources);
  createAppointmentDataProvider(key, _extends({}, options, {
    timeZoneCalculator,
    resourceManager
  }));
  return key;
};
export var createInstance = (name, key, callback) => {
  if (!isDefined(factoryInstances[name])) {
    factoryInstances[name] = {};
  }

  var result = callback();
  factoryInstances[name][key] = result;
  return result;
};

var getInstance = (name, key) => {
  return factoryInstances[name] ? factoryInstances[name][key] : undefined;
};

var removeInstance = (name, key) => {
  if (getInstance(name, key)) {
    factoryInstances[name][key] = undefined;
  }
};

var createResourceManager = (key, resources) => {
  return createInstance(Names.resourceManager, key, () => {
    var resourceManager = getInstance(Names.resourceManager, key);

    if (isDefined(resourceManager)) {
      resourceManager.setResources(resources);
      return resourceManager;
    }

    return new ResourceManager(resources);
  });
};

var createAppointmentDataProvider = (key, options) => {
  return createInstance(Names.appointmentDataProvider, key, () => {
    return new AppointmentDataProvider(_extends({}, options, {
      key
    }));
  });
};

var createTimeZoneCalculator = (key, currentTimeZone) => {
  return createInstance(Names.timeZoneCalculator, key, () => {
    return new TimeZoneCalculator({
      getClientOffset: date => timeZoneUtils.getClientTimezoneOffset(date),
      getCommonOffset: (date, timeZone) => timeZoneUtils.calculateTimezoneByValue(timeZone || currentTimeZone, date),
      getAppointmentOffset: (date, appointmentTimezone) => timeZoneUtils.calculateTimezoneByValue(appointmentTimezone, date)
    });
  });
};

export var disposeFactoryInstances = key => {
  Object.getOwnPropertyNames(Names).forEach(name => {
    removeInstance(name, key);
  });
};
export var getResourceManager = key => getInstance(Names.resourceManager, key);
export var getAppointmentDataProvider = function getAppointmentDataProvider() {
  var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  return getInstance(Names.appointmentDataProvider, key);
};
export var getTimeZoneCalculator = key => getInstance(Names.timeZoneCalculator, key);
