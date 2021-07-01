/**
* DevExtreme (esm/renovation/ui/overlays/validation_message.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["accessKey", "activeStateEnabled", "boundary", "className", "container", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "mode", "offset", "onClick", "onKeyDown", "positionRequest", "rtlEnabled", "tabIndex", "target", "validationErrors", "visible", "width"];
import { createComponentVNode, normalizeProps } from "inferno";
import { BaseInfernoComponent } from "@devextreme/vdom";
import LegacyValidationMessage from "../../../ui/validation_message";
import { DomComponentWrapper } from "../common/dom_component_wrapper";
import { BaseWidgetProps } from "../common/base_props";
export var viewFunction = _ref => {
  var {
    props,
    restAttributes
  } = _ref;
  return normalizeProps(createComponentVNode(2, DomComponentWrapper, _extends({
    "componentType": LegacyValidationMessage,
    "componentProps": props
  }, restAttributes)));
};
export var ValidationMessageProps = _extends({}, BaseWidgetProps, {
  mode: "auto",
  offset: {
    h: 0,
    v: 0
  }
});
export class ValidationMessage extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get restAttributes() {
    var _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);

    return restProps;
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      restAttributes: this.restAttributes
    });
  }

}
ValidationMessage.defaultProps = _extends({}, ValidationMessageProps);
