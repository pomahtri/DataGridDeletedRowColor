"use strict";

exports.utils = void 0;

var _renderer = _interopRequireDefault(require("../../core/renderer"));

var _extend = require("../../core/utils/extend");

var _iterator = require("../../core/utils/iterator");

var _instanceFactory = require("./instanceFactory");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var utils = {
  dataAccessors: {
    getAppointmentSettings: function getAppointmentSettings(element) {
      return (0, _renderer.default)(element).data(_constants.APPOINTMENT_SETTINGS_KEY);
    },
    getAppointmentInfo: function getAppointmentInfo(element) {
      var settings = utils.dataAccessors.getAppointmentSettings(element);
      return settings === null || settings === void 0 ? void 0 : settings.info;
    },
    combine: function combine(key, dataAccessors) {
      // TODO get rid of it and rework resourceManager
      var result = (0, _extend.extend)(true, {}, dataAccessors);
      var resourceManager = (0, _instanceFactory.getResourceManager)(key);

      if (dataAccessors && resourceManager) {
        (0, _iterator.each)(resourceManager._dataAccessors, function (type, accessor) {
          result[type].resources = accessor;
        });
      }

      return result;
    }
  }
};
exports.utils = utils;