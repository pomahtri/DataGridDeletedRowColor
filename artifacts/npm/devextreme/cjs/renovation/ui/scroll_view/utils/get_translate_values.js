/**
* DevExtreme (cjs/renovation/ui/scroll_view/utils/get_translate_values.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getTranslateValues = getTranslateValues;

var _get_computed_style = _interopRequireDefault(require("../../../utils/get_computed_style"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTranslateValues(element) {
  var _getElementComputedSt, _getElementComputedSt2;

  if (!element) return {
    left: 0,
    top: 0
  };
  var matrix = (_getElementComputedSt = (_getElementComputedSt2 = (0, _get_computed_style.default)(element)) === null || _getElementComputedSt2 === void 0 ? void 0 : _getElementComputedSt2.transform) !== null && _getElementComputedSt !== void 0 ? _getElementComputedSt : "";
  var regex = /matrix.*\((.+)\)/;
  var matrixValues = regex.exec(matrix);

  if (matrixValues) {
    var result = matrixValues[1].split(", ");
    return {
      left: Number(result[4]),
      top: Number(result[5])
    };
  }

  return {
    left: 0,
    top: 0
  };
}
