/**
* DevExtreme (cjs/ui/data_grid/ui.data_grid.columns_controller.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _uiData_grid = _interopRequireDefault(require("./ui.data_grid.core"));

var _uiGrid_core = require("../grid_core/ui.grid_core.columns_controller");

var _extend = require("../../core/utils/extend");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_uiData_grid.default.registerModule('columns', {
  defaultOptions: function defaultOptions() {
    return (0, _extend.extend)(true, {}, _uiGrid_core.columnsControllerModule.defaultOptions(), {
      commonColumnSettings: {
        allowExporting: true
      }
    });
  },
  controllers: _uiGrid_core.columnsControllerModule.controllers
});
