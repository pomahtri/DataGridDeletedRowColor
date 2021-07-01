/**
* DevExtreme (esm/renovation/component_wrapper/utils/utils.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { each } from "../../../core/utils/iterator";
export var addAttributes = ($element, attributes) => {
  each(attributes, (_, _ref) => {
    var {
      name,
      value
    } = _ref;

    if (name === "class") {
      $element.addClass(value);
    } else {
      $element.attr(name, value);
    }
  });
};
export function getAriaName(name) {
  return name === "role" || name === "id" ? name : "aria-".concat(name);
}
export var removeDifferentElements = ($children, $newChildren) => {
  each($newChildren, (__, element) => {
    var hasComponent = false;
    each($children, (_, oldElement) => {
      if (element === oldElement) {
        hasComponent = true;
      }
    });

    if (!hasComponent && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  });
};
