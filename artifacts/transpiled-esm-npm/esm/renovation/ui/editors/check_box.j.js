import registerComponent from "../../../core/component_registrator";
import BaseComponent from "../../component_wrapper/editors/check_box";
import { CheckBox as CheckBoxComponent, defaultOptions } from "./check_box";
export default class CheckBox extends BaseComponent {
  getProps() {
    var props = super.getProps();
    props.onKeyDown = this._wrapKeyDownHandler(props.onKeyDown);
    return props;
  }

  focus() {
    var _this$viewRef;

    return (_this$viewRef = this.viewRef) === null || _this$viewRef === void 0 ? void 0 : _this$viewRef.focus(...arguments);
  }

  _getActionConfigs() {
    return {
      onFocusIn: {},
      onClick: {}
    };
  }

  get _propsInfo() {
    return {
      twoWay: [["value", "defaultValue", "valueChange"]],
      allowNull: ["validationError", "validationErrors", "defaultValue", "value"],
      elements: [],
      templates: [],
      props: ["activeStateEnabled", "hoverStateEnabled", "validationError", "validationErrors", "text", "validationMessageMode", "validationStatus", "name", "readOnly", "isValid", "onFocusIn", "saveValueChangeEvent", "defaultValue", "valueChange", "className", "accessKey", "disabled", "focusStateEnabled", "height", "hint", "onClick", "onKeyDown", "rtlEnabled", "tabIndex", "visible", "width", "value"]
    };
  }

  get _viewComponent() {
    return CheckBoxComponent;
  }

}
registerComponent("dxCheckBox", CheckBox);
CheckBox.defaultOptions = defaultOptions;