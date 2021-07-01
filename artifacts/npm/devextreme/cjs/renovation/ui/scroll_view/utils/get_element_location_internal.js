/**
* DevExtreme (cjs/renovation/ui/scroll_view/utils/get_element_location_internal.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.getElementLocationInternal = getElementLocationInternal;

var _inflector = require("../../../../core/utils/inflector");

var _consts = require("../common/consts");

function getElementLocationInternal(element, offset, direction, containerElement) {
  var prop = direction === _consts.DIRECTION_VERTICAL ? "top" : "left";
  var dimension = direction === _consts.DIRECTION_VERTICAL ? "Height" : "Width";
  var relativeLocation = containerElement["scroll".concat((0, _inflector.titleize)(prop))] - containerElement.getBoundingClientRect()[prop] + element.getBoundingClientRect()[prop];
  var containerLocation = containerElement["scroll".concat((0, _inflector.titleize)(prop))];
  var scrollBarSize = containerElement["offset".concat(dimension)] - containerElement["client".concat(dimension)];
  var containerSize = containerElement["offset".concat(dimension)];
  var elementOffset = element["offset".concat(dimension)];
  var offsetStart = offset[prop];
  var offsetEnd = offset[direction === _consts.DIRECTION_VERTICAL ? "bottom" : "right"] || 0;

  if (relativeLocation < containerLocation + offsetStart) {
    if (elementOffset < containerSize - offsetStart - offsetEnd) {
      return relativeLocation - offsetStart;
    }

    return relativeLocation + elementOffset - containerSize + offsetEnd + scrollBarSize;
  }

  if (relativeLocation + elementOffset >= containerLocation + containerSize - offsetEnd - scrollBarSize) {
    if (elementOffset < containerSize - offsetStart - offsetEnd) {
      return relativeLocation + elementOffset + scrollBarSize - containerSize + offsetEnd;
    }

    return relativeLocation - offsetStart;
  }

  return containerLocation;
}
