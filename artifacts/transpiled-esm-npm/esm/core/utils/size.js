import { getWindow } from '../../core/utils/window';
import domAdapter from '../../core/dom_adapter';
import { isWindow, isString, isNumeric } from '../utils/type';
var window = getWindow();
var SPECIAL_HEIGHT_VALUES = ['auto', 'none', 'inherit', 'initial'];

var getSizeByStyles = function getSizeByStyles(elementStyles, styles) {
  var result = 0;
  styles.forEach(function (style) {
    result += parseFloat(elementStyles[style]) || 0;
  });
  return result;
};

export var getElementBoxParams = function getElementBoxParams(name, elementStyles) {
  var beforeName = name === 'width' ? 'Left' : 'Top';
  var afterName = name === 'width' ? 'Right' : 'Bottom';
  return {
    padding: getSizeByStyles(elementStyles, ['padding' + beforeName, 'padding' + afterName]),
    border: getSizeByStyles(elementStyles, ['border' + beforeName + 'Width', 'border' + afterName + 'Width']),
    margin: getSizeByStyles(elementStyles, ['margin' + beforeName, 'margin' + afterName])
  };
};

var getBoxSizingOffset = function getBoxSizingOffset(name, elementStyles, boxParams) {
  var size = elementStyles[name];

  if (elementStyles.boxSizing === 'border-box' && size.length && size[size.length - 1] !== '%') {
    return boxParams.border + boxParams.padding;
  }

  return 0;
};

export var getSize = function getSize(element, name, include) {
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

var getContainerHeight = function getContainerHeight(container) {
  return isWindow(container) ? container.innerHeight : container.offsetHeight;
};

export var parseHeight = function parseHeight(value, container) {
  if (value.indexOf('px') > 0) {
    value = parseInt(value.replace('px', ''));
  } else if (value.indexOf('%') > 0) {
    value = parseInt(value.replace('%', '')) * getContainerHeight(container) / 100;
  } else if (!isNaN(value)) {
    value = parseInt(value);
  }

  return value;
};

var getHeightWithOffset = function getHeightWithOffset(value, offset, container) {
  if (!value) {
    return null;
  }

  if (SPECIAL_HEIGHT_VALUES.indexOf(value) > -1) {
    return offset ? null : value;
  }

  if (isString(value)) {
    value = parseHeight(value, container);
  }

  if (isNumeric(value)) {
    return Math.max(0, value + offset);
  }

  var operationString = offset < 0 ? ' - ' : ' ';
  return 'calc(' + value + operationString + Math.abs(offset) + 'px)';
};

export var addOffsetToMaxHeight = function addOffsetToMaxHeight(value, offset, container) {
  var maxHeight = getHeightWithOffset(value, offset, container);
  return maxHeight !== null ? maxHeight : 'none';
};
export var addOffsetToMinHeight = function addOffsetToMinHeight(value, offset, container) {
  var minHeight = getHeightWithOffset(value, offset, container);
  return minHeight !== null ? minHeight : 0;
};
export var getVerticalOffsets = function getVerticalOffsets(element, withMargins) {
  if (!element) {
    return 0;
  }

  var boxParams = getElementBoxParams('height', window.getComputedStyle(element));
  return boxParams.padding + boxParams.border + (withMargins ? boxParams.margin : 0);
};
export var getVisibleHeight = function getVisibleHeight(element) {
  if (element) {
    var boundingClientRect = element.getBoundingClientRect();

    if (boundingClientRect.height) {
      return boundingClientRect.height;
    }
  }

  return 0;
};
export var getWidth = el => elementSize(el, 'width');
export var setWidth = (el, value) => elementSize(el, 'width', value);
export var getHeight = el => elementSize(el, 'height');
export var setHeight = (el, value) => elementSize(el, 'height', value);
export var getOuterWidth = el => elementSize(el, 'outerWidth');
export var setOuterWidth = (el, value) => elementSize(el, 'outerWidth', value);
export var getOuterHeight = el => elementSize(el, 'outerHeight');
export var setOuterHeight = (el, value) => elementSize(el, 'outerHeight', value);
export var getInnerWidth = el => elementSize(el, 'innerWidth');
export var setInnerWidth = (el, value) => elementSize(el, 'innerWidth', value);
export var getInnerHeight = el => elementSize(el, 'innerHeight');
export var setInnerHeight = (el, value) => elementSize(el, 'innerHeight', value);
export var elementSize = function elementSize(el, sizeProperty, value) {
  var partialName = sizeProperty.toLowerCase().indexOf('width') >= 0 ? 'Width' : 'Height';
  var propName = partialName.toLowerCase();
  var isOuter = sizeProperty.indexOf('outer') === 0;
  var isInner = sizeProperty.indexOf('inner') === 0;

  if (isWindow(el)) {
    return isOuter ? el['inner' + partialName] : domAdapter.getDocumentElement()['client' + partialName];
  }

  if (domAdapter.isDocument(el)) {
    var documentElement = domAdapter.getDocumentElement();
    var body = domAdapter.getBody();
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

  if (isNumeric(value)) {
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

  value += isNumeric(value) ? 'px' : '';
  domAdapter.setStyle(el, propName, value);
  return null;
};
export var getWindowByElement = el => {
  return isWindow(el) ? el : el.defaultView;
};
export var getOffset = el => {
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