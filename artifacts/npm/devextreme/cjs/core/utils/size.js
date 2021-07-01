/**
* DevExtreme (cjs/core/utils/size.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getOffset = exports.getWindowByElement = exports.elementSize = exports.setInnerHeight = exports.getInnerHeight = exports.setInnerWidth = exports.getInnerWidth = exports.setOuterHeight = exports.getOuterHeight = exports.setOuterWidth = exports.getOuterWidth = exports.setHeight = exports.getHeight = exports.setWidth = exports.getWidth = exports.getVisibleHeight = exports.getVerticalOffsets = exports.addOffsetToMinHeight = exports.addOffsetToMaxHeight = exports.parseHeight = exports.getSize = exports.getElementBoxParams = void 0;

var _window = require("../../core/utils/window");

var _dom_adapter = _interopRequireDefault(require("../../core/dom_adapter"));

var _type = require("../utils/type");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var window = (0, _window.getWindow)();
var SPECIAL_HEIGHT_VALUES = ['auto', 'none', 'inherit', 'initial'];

var getSizeByStyles = function getSizeByStyles(elementStyles, styles) {
  var result = 0;
  styles.forEach(function (style) {
    result += parseFloat(elementStyles[style]) || 0;
  });
  return result;
};

var getElementBoxParams = function getElementBoxParams(name, elementStyles) {
  var beforeName = name === 'width' ? 'Left' : 'Top';
  var afterName = name === 'width' ? 'Right' : 'Bottom';
  return {
    padding: getSizeByStyles(elementStyles, ['padding' + beforeName, 'padding' + afterName]),
    border: getSizeByStyles(elementStyles, ['border' + beforeName + 'Width', 'border' + afterName + 'Width']),
    margin: getSizeByStyles(elementStyles, ['margin' + beforeName, 'margin' + afterName])
  };
};

exports.getElementBoxParams = getElementBoxParams;

var getBoxSizingOffset = function getBoxSizingOffset(name, elementStyles, boxParams) {
  var size = elementStyles[name];

  if (elementStyles.boxSizing === 'border-box' && size.length && size[size.length - 1] !== '%') {
    return boxParams.border + boxParams.padding;
  }

  return 0;
};

var getSize = function getSize(element, name, include) {
  var elementStyles = window.getComputedStyle(element);
  var boxParams = getElementBoxParams(name, elementStyles);
  var clientRect = element.getClientRects().length;
  var boundingClientRect = element.getBoundingClientRect()[name];
  var result = clientRect ? boundingClientRect : 0;

  if (result <= 0) {
    result = parseFloat(elementStyles[name] || element.style[name]) || 0;
    result -= getBoxSizingOffset(name, elementStyles, boxParams);
  } else {
    result -= boxParams.padding + boxParams.border;
  }

  if (include.paddings) {
    result += boxParams.padding;
  }

  if (include.borders) {
    result += boxParams.border;
  }

  if (include.margins) {
    result += boxParams.margin;
  }

  return result;
};

exports.getSize = getSize;

var getContainerHeight = function getContainerHeight(container) {
  return (0, _type.isWindow)(container) ? container.innerHeight : container.offsetHeight;
};

var parseHeight = function parseHeight(value, container) {
  if (value.indexOf('px') > 0) {
    value = parseInt(value.replace('px', ''));
  } else if (value.indexOf('%') > 0) {
    value = parseInt(value.replace('%', '')) * getContainerHeight(container) / 100;
  } else if (!isNaN(value)) {
    value = parseInt(value);
  }

  return value;
};

exports.parseHeight = parseHeight;

var getHeightWithOffset = function getHeightWithOffset(value, offset, container) {
  if (!value) {
    return null;
  }

  if (SPECIAL_HEIGHT_VALUES.indexOf(value) > -1) {
    return offset ? null : value;
  }

  if ((0, _type.isString)(value)) {
    value = parseHeight(value, container);
  }

  if ((0, _type.isNumeric)(value)) {
    return Math.max(0, value + offset);
  }

  var operationString = offset < 0 ? ' - ' : ' ';
  return 'calc(' + value + operationString + Math.abs(offset) + 'px)';
};

var addOffsetToMaxHeight = function addOffsetToMaxHeight(value, offset, container) {
  var maxHeight = getHeightWithOffset(value, offset, container);
  return maxHeight !== null ? maxHeight : 'none';
};

exports.addOffsetToMaxHeight = addOffsetToMaxHeight;

var addOffsetToMinHeight = function addOffsetToMinHeight(value, offset, container) {
  var minHeight = getHeightWithOffset(value, offset, container);
  return minHeight !== null ? minHeight : 0;
};

exports.addOffsetToMinHeight = addOffsetToMinHeight;

var getVerticalOffsets = function getVerticalOffsets(element, withMargins) {
  if (!element) {
    return 0;
  }

  var boxParams = getElementBoxParams('height', window.getComputedStyle(element));
  return boxParams.padding + boxParams.border + (withMargins ? boxParams.margin : 0);
};

exports.getVerticalOffsets = getVerticalOffsets;

var getVisibleHeight = function getVisibleHeight(element) {
  if (element) {
    var boundingClientRect = element.getBoundingClientRect();

    if (boundingClientRect.height) {
      return boundingClientRect.height;
    }
  }

  return 0;
};

exports.getVisibleHeight = getVisibleHeight;

var getWidth = function getWidth(el) {
  return elementSize(el, 'width');
};

exports.getWidth = getWidth;

var setWidth = function setWidth(el, value) {
  return elementSize(el, 'width', value);
};

exports.setWidth = setWidth;

var getHeight = function getHeight(el) {
  return elementSize(el, 'height');
};

exports.getHeight = getHeight;

var setHeight = function setHeight(el, value) {
  return elementSize(el, 'height', value);
};

exports.setHeight = setHeight;

var getOuterWidth = function getOuterWidth(el) {
  return elementSize(el, 'outerWidth');
};

exports.getOuterWidth = getOuterWidth;

var setOuterWidth = function setOuterWidth(el, value) {
  return elementSize(el, 'outerWidth', value);
};

exports.setOuterWidth = setOuterWidth;

var getOuterHeight = function getOuterHeight(el) {
  return elementSize(el, 'outerHeight');
};

exports.getOuterHeight = getOuterHeight;

var setOuterHeight = function setOuterHeight(el, value) {
  return elementSize(el, 'outerHeight', value);
};

exports.setOuterHeight = setOuterHeight;

var getInnerWidth = function getInnerWidth(el) {
  return elementSize(el, 'innerWidth');
};

exports.getInnerWidth = getInnerWidth;

var setInnerWidth = function setInnerWidth(el, value) {
  return elementSize(el, 'innerWidth', value);
};

exports.setInnerWidth = setInnerWidth;

var getInnerHeight = function getInnerHeight(el) {
  return elementSize(el, 'innerHeight');
};

exports.getInnerHeight = getInnerHeight;

var setInnerHeight = function setInnerHeight(el, value) {
  return elementSize(el, 'innerHeight', value);
};

exports.setInnerHeight = setInnerHeight;

var elementSize = function elementSize(el, sizeProperty, value) {
  var partialName = sizeProperty.toLowerCase().indexOf('width') >= 0 ? 'Width' : 'Height';
  var propName = partialName.toLowerCase();
  var isOuter = sizeProperty.indexOf('outer') === 0;
  var isInner = sizeProperty.indexOf('inner') === 0;

  if ((0, _type.isWindow)(el)) {
    return isOuter ? el['inner' + partialName] : _dom_adapter.default.getDocumentElement()['client' + partialName];
  }

  if (_dom_adapter.default.isDocument(el)) {
    var documentElement = _dom_adapter.default.getDocumentElement();

    var body = _dom_adapter.default.getBody();

    return Math.max(body['scroll' + partialName], body['offset' + partialName], documentElement['scroll' + partialName], documentElement['offset' + partialName], documentElement['client' + partialName]);
  }

  if (arguments.length === 2 || typeof value === 'boolean') {
    var include = {
      paddings: isInner || isOuter,
      borders: isOuter,
      margins: value
    };
    return getSize(el, propName, include);
  }

  if ((0, _type.isNumeric)(value)) {
    var elementStyles = window.getComputedStyle(el);
    var sizeAdjustment = getElementBoxParams(propName, elementStyles);
    var isBorderBox = elementStyles.boxSizing === 'border-box';
    value = Number(value);

    if (isOuter) {
      value -= isBorderBox ? 0 : sizeAdjustment.border + sizeAdjustment.padding;
    } else if (isInner) {
      value += isBorderBox ? sizeAdjustment.border : -sizeAdjustment.padding;
    } else if (isBorderBox) {
      value += sizeAdjustment.border + sizeAdjustment.padding;
    }
  }

  value += (0, _type.isNumeric)(value) ? 'px' : '';

  _dom_adapter.default.setStyle(el, propName, value);

  return null;
};

exports.elementSize = elementSize;

var getWindowByElement = function getWindowByElement(el) {
  return (0, _type.isWindow)(el) ? el : el.defaultView;
};

exports.getWindowByElement = getWindowByElement;

var getOffset = function getOffset(el) {
  if (!el.getClientRects().length) {
    return {
      top: 0,
      left: 0
    };
  }

  var rect = el.getBoundingClientRect();
  var win = getWindowByElement(el.ownerDocument);
  var docElem = el.ownerDocument.documentElement;
  return {
    top: rect.top + win.pageYOffset - docElem.clientTop,
    left: rect.left + win.pageXOffset - docElem.clientLeft
  };
};

exports.getOffset = getOffset;
