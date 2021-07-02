/**
* DevExtreme (cjs/ui/scheduler/resources/utils.js)
* Version: 21.2.0
* Build date: Fri Jul 02 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getWrappedDataSource = exports.getFieldExpr = exports.getDisplayExpr = exports.getValueExpr = void 0;

var _utils = require("../../../data/data_source/utils");

var _data_source = require("../../../data/data_source/data_source");

var getValueExpr = function getValueExpr(resource) {
  return resource.valueExpr || 'id';
};

exports.getValueExpr = getValueExpr;

var getDisplayExpr = function getDisplayExpr(resource) {
  return resource.displayExpr || 'text';
};

exports.getDisplayExpr = getDisplayExpr;

var getFieldExpr = function getFieldExpr(resource) {
  return resource.fieldExpr || resource.field;
};

exports.getFieldExpr = getFieldExpr;

var getWrappedDataSource = function getWrappedDataSource(dataSource) {
  if (dataSource instanceof _data_source.DataSource) {
    return dataSource;
  }

  var result = {
    store: (0, _utils.normalizeDataSourceOptions)(dataSource).store,
    pageSize: 0
  };

  if (!Array.isArray(dataSource)) {
    result.filter = dataSource.filter;
  }

  return new _data_source.DataSource(result);
};

exports.getWrappedDataSource = getWrappedDataSource;
