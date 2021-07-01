/**
* DevExtreme (esm/renovation/ui/scroll_view/utils/get_element_location_internal.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { titleize } from "../../../../core/utils/inflector";
import { DIRECTION_VERTICAL } from "../common/consts";
export function getElementLocationInternal(element, offset, direction, containerElement) {
  var prop = direction === DIRECTION_VERTICAL ? "top" : "left";
  var dimension = direction === DIRECTION_VERTICAL ? "Height" : "Width";
  var relativeLocation = containerElement["scroll".concat(titleize(prop))] - containerElement.getBoundingClientRect()[prop] + element.getBoundingClientRect()[prop];
  var containerLocation = containerElement["scroll".concat(titleize(prop))];
  var scrollBarSize = containerElement["offset".concat(dimension)] - containerElement["client".concat(dimension)];
  var containerSize = containerElement["offset".concat(dimension)];
  var elementOffset = element["offset".concat(dimension)];
  var offsetStart = offset[prop];
  var offsetEnd = offset[direction === DIRECTION_VERTICAL ? "bottom" : "right"] || 0;

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
