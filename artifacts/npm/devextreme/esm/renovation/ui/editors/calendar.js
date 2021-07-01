/**
* DevExtreme (esm/renovation/ui/editors/calendar.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["_todayDate", "accessKey", "activeStateEnabled", "className", "defaultValue", "disabled", "firstDayOfWeek", "focusStateEnabled", "hasFocus", "height", "hint", "hoverStateEnabled", "max", "min", "onClick", "onKeyDown", "rtlEnabled", "tabIndex", "value", "valueChange", "visible", "width"];
import { createComponentVNode, normalizeProps } from "inferno";
import { BaseInfernoComponent } from "@devextreme/vdom";
import LegacyCalendar from "../../../ui/calendar";
import { DomComponentWrapper } from "../common/dom_component_wrapper";
import { BaseWidgetProps } from "../common/base_props";

function today() {
  return new Date();
}

function TruePredicate() {
  return true;
}

export var viewFunction = _ref => {
  var {
    props,
    restAttributes
  } = _ref;
  return normalizeProps(createComponentVNode(2, DomComponentWrapper, _extends({
    "componentType": LegacyCalendar,
    "componentProps": props
  }, restAttributes)));
};
export var CalendarProps = _extends({}, BaseWidgetProps, {
  _todayDate: today,
  hasFocus: TruePredicate,
  defaultValue: null
});
export class Calendar extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value !== undefined ? this.props.value : this.props.defaultValue
    };
  }

  get restAttributes() {
    var _this$props$value = _extends({}, this.props, {
      value: this.props.value !== undefined ? this.props.value : this.state.value
    }),
        restProps = _objectWithoutPropertiesLoose(_this$props$value, _excluded);

    return restProps;
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        value: this.props.value !== undefined ? this.props.value : this.state.value
      }),
      restAttributes: this.restAttributes
    });
  }

}
Calendar.defaultProps = _extends({}, CalendarProps);
