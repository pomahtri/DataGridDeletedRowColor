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