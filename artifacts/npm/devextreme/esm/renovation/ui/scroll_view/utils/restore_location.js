/**
* DevExtreme (esm/renovation/ui/scroll_view/utils/restore_location.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isDefined, isPlainObject } from "../../../../core/utils/type";
import { ensureDefined } from "../../../../core/utils/common";
import { ScrollDirection } from "./scroll_direction";
export function restoreLocation(location, direction) {
  if (isPlainObject(location)) {
    var left = ensureDefined(location.left, location.x);
    var top = ensureDefined(location.top, location.y);
    return {
      left: isDefined(left) ? -left : undefined,
      top: isDefined(top) ? -top : undefined
    };
  }

  var {
    isHorizontal,
    isVertical
  } = new ScrollDirection(direction);
  return {
    left: isHorizontal ? -location : undefined,
    top: isVertical ? -location : undefined
  };
}
