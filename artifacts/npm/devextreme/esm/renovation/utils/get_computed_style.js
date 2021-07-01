/**
* DevExtreme (esm/renovation/utils/get_computed_style.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export default function getElementComputedStyle(el) {
  var _window$getComputedSt, _window;

  return el ? (_window$getComputedSt = (_window = window).getComputedStyle) === null || _window$getComputedSt === void 0 ? void 0 : _window$getComputedSt.call(_window, el) : null;
}
