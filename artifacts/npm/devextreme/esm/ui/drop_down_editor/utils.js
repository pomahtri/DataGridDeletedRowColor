/**
* DevExtreme (esm/ui/drop_down_editor/utils.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { hasWindow } from '../../core/utils/window';

var getElementWidth = function getElementWidth($element) {
  if (hasWindow()) {
    return $element.outerWidth();
  }
};

var getSizeValue = function getSizeValue(size) {
  if (size === null) {
    size = undefined;
  }

  if (typeof size === 'function') {
    size = size();
  }

  return size;
};

export { getElementWidth, getSizeValue };
