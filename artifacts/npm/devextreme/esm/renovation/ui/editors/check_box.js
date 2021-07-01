/**
* DevExtreme (esm/renovation/ui/editors/check_box.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["accessKey", "activeStateEnabled", "className", "defaultValue", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "isValid", "name", "onClick", "onFocusIn", "onKeyDown", "readOnly", "rtlEnabled", "saveValueChangeEvent", "tabIndex", "text", "validationError", "validationErrors", "validationMessageMode", "validationStatus", "value", "valueChange", "visible", "width"];
import { createVNode, createComponentVNode, normalizeProps } from "inferno";
import { InfernoEffect, InfernoWrapperComponent } from "@devextreme/vdom";
import { createDefaultOptionRules, convertRulesToOptions } from "../../../core/options/utils";
import devices from "../../../core/devices";
import Guid from "../../../core/guid";
import { Widget } from "../common/widget";
import { BaseWidgetProps } from "../common/base_props";
import { combineClasses } from "../../utils/combine_classes";
import { ValidationMessage } from "../overlays/validation_message";

var getCssClasses = model => {
  var {
    isValid,
    readOnly,
    text,
    value
  } = model;
  var checked = value;
  var indeterminate = checked === null;
  var classesMap = {
    "dx-checkbox": true,
    "dx-state-readonly": !!readOnly,
    "dx-checkbox-checked": checked === true,
    "dx-checkbox-has-text": !!text,
    "dx-invalid": !isValid,
    "dx-checkbox-indeterminate": indeterminate
  };
  return combineClasses(classesMap);
};

export var viewFunction = viewModel => {
  var {
    name,
    text
  } = viewModel.props;
  return normalizeProps(createComponentVNode(2, Widget, _extends({
    "rootElementRef": viewModel.target,
    "accessKey": viewModel.props.accessKey,
    "activeStateEnabled": viewModel.props.activeStateEnabled,
    "className": viewModel.props.className,
    "classes": viewModel.cssClasses,
    "disabled": viewModel.props.disabled,
    "focusStateEnabled": viewModel.props.focusStateEnabled,
    "height": viewModel.props.height,
    "hint": viewModel.props.hint,
    "hoverStateEnabled": viewModel.props.hoverStateEnabled,
    "onFocusIn": viewModel.onFocusIn,
    "aria": viewModel.aria,
    "onClick": viewModel.onWidgetClick,
    "onKeyDown": viewModel.onWidgetKeyDown,
    "rtlEnabled": viewModel.props.rtlEnabled,
    "tabIndex": viewModel.props.tabIndex,
    "visible": viewModel.props.visible,
    "width": viewModel.props.width
  }, viewModel.restAttributes, {
    children: [normalizeProps(createVNode(64, "input", null, null, 1, _extends({
      "type": "hidden",
      "value": "".concat(viewModel.props.value)
    }, name && {
      name
    }), null, viewModel.inputRef)), createVNode(1, "div", "dx-checkbox-container", [createVNode(1, "span", "dx-checkbox-icon", null, 1, null, null, viewModel.iconRef), text && createVNode(1, "span", "dx-checkbox-text", text, 0)], 0), viewModel.showValidationMessage && createComponentVNode(2, ValidationMessage, {
      "validationErrors": viewModel.validationErrors,
      "mode": viewModel.props.validationMessageMode,
      "positionRequest": "below",
      "rtlEnabled": viewModel.props.rtlEnabled,
      "target": viewModel.targetCurrent,
      "boundary": viewModel.targetCurrent,
      "container": viewModel.targetCurrent
    })]
  }), null, viewModel.widgetRef));
};
export var CheckBoxProps = _extends({}, BaseWidgetProps, {
  activeStateEnabled: true,
  hoverStateEnabled: true,
  validationError: null,
  validationErrors: null,
  text: "",
  validationMessageMode: "auto",
  validationStatus: "valid",
  name: "",
  readOnly: false,
  isValid: true,
  defaultValue: false,
  valueChange: () => {}
});
export var defaultOptionRules = createDefaultOptionRules([{
  device: () => devices.real().deviceType === "desktop" && !devices.isSimulator(),
  options: {
    focusStateEnabled: true
  }
}]);
import { createReRenderEffect } from "@devextreme/vdom";
import { createRef as infernoCreateRef } from "inferno";
export class CheckBox extends InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this.iconRef = infernoCreateRef();
    this.inputRef = infernoCreateRef();
    this.widgetRef = infernoCreateRef();
    this.target = infernoCreateRef();
    this.state = {
      showValidationMessage: false,
      value: this.props.value !== undefined ? this.props.value : this.props.defaultValue
    };
    this.updateValidationMessageVisibility = this.updateValidationMessageVisibility.bind(this);
    this.focus = this.focus.bind(this);
    this.onFocusIn = this.onFocusIn.bind(this);
    this.onWidgetClick = this.onWidgetClick.bind(this);
    this.onWidgetKeyDown = this.onWidgetKeyDown.bind(this);
  }

  createEffects() {
    return [new InfernoEffect(this.updateValidationMessageVisibility, [this.props.isValid, this.props.validationStatus, this.props.validationError, this.props.validationErrors]), createReRenderEffect()];
  }

  updateEffects() {
    var _this$_effects$;

    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.isValid, this.props.validationStatus, this.props.validationError, this.props.validationErrors]);
  }

  updateValidationMessageVisibility() {
    this.setState(state => _extends({}, state, {
      showValidationMessage: this.shouldShowValidationMessage
    }));
    return undefined;
  }

  onFocusIn(event) {
    var {
      onFocusIn
    } = this.props;
    onFocusIn === null || onFocusIn === void 0 ? void 0 : onFocusIn(event);
  }

  onWidgetClick(event) {
    var _ref;

    var {
      readOnly,
      saveValueChangeEvent
    } = this.props;
    var value = (_ref = this.props.value !== undefined ? this.props.value : this.state.value) !== null && _ref !== void 0 ? _ref : false;

    if (!readOnly) {
      saveValueChangeEvent === null || saveValueChangeEvent === void 0 ? void 0 : saveValueChangeEvent(event);
      {
        var __newValue;

        this.setState(state => {
          __newValue = !value;
          return {
            value: __newValue
          };
        });
        this.props.valueChange(__newValue);
      }
    }
  }

  onWidgetKeyDown(e) {
    var {
      onKeyDown
    } = this.props;
    var {
      keyName,
      originalEvent,
      which
    } = e;
    var result = onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(e);

    if (result !== null && result !== void 0 && result.cancel) {
      return result;
    }

    if (keyName === "space" || which === "space") {
      originalEvent.preventDefault();
      this.onWidgetClick(originalEvent);
    }

    return undefined;
  }

  get cssClasses() {
    return getCssClasses(_extends({}, this.props, {
      value: this.props.value !== undefined ? this.props.value : this.state.value
    }));
  }

  get shouldShowValidationMessage() {
    var _this$validationError;

    var {
      isValid,
      validationStatus
    } = this.props;
    var validationErrors = (_this$validationError = this.validationErrors) !== null && _this$validationError !== void 0 ? _this$validationError : [];
    return !isValid && validationStatus === "invalid" && validationErrors.length > 0;
  }

  get aria() {
    var {
      isValid,
      readOnly
    } = this.props;
    var checked = (this.props.value !== undefined ? this.props.value : this.state.value) === true;
    var indeterminate = (this.props.value !== undefined ? this.props.value : this.state.value) === null;
    var result = {
      role: "checkbox",
      checked: indeterminate ? "mixed" : "".concat(checked),
      readonly: readOnly ? "true" : "false",
      invalid: !isValid ? "true" : "false"
    };

    if (this.shouldShowValidationMessage) {
      result.describedby = "dx-".concat(new Guid());
    }

    return result;
  }

  get validationErrors() {
    var {
      validationError,
      validationErrors
    } = this.props;
    var allValidationErrors = validationErrors;

    if (!allValidationErrors && validationError) {
      allValidationErrors = [validationError];
    }

    return allValidationErrors;
  }

  get targetCurrent() {
    var _this$target;

    return (_this$target = this.target) === null || _this$target === void 0 ? void 0 : _this$target.current;
  }

  get restAttributes() {
    var _this$props$value = _extends({}, this.props, {
      value: this.props.value !== undefined ? this.props.value : this.state.value
    }),
        restProps = _objectWithoutPropertiesLoose(_this$props$value, _excluded);

    return restProps;
  }

  focus() {
    this.widgetRef.current.focus();
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        value: this.props.value !== undefined ? this.props.value : this.state.value
      }),
      showValidationMessage: this.state.showValidationMessage,
      iconRef: this.iconRef,
      inputRef: this.inputRef,
      target: this.target,
      widgetRef: this.widgetRef,
      onFocusIn: this.onFocusIn,
      onWidgetClick: this.onWidgetClick,
      onWidgetKeyDown: this.onWidgetKeyDown,
      cssClasses: this.cssClasses,
      shouldShowValidationMessage: this.shouldShowValidationMessage,
      aria: this.aria,
      validationErrors: this.validationErrors,
      targetCurrent: this.targetCurrent,
      restAttributes: this.restAttributes
    });
  }

}

function __processTwoWayProps(defaultProps) {
  var twoWayProps = ["value"];
  return Object.keys(defaultProps).reduce((props, propName) => {
    var propValue = defaultProps[propName];
    var defaultPropName = twoWayProps.some(p => p === propName) ? "default" + propName.charAt(0).toUpperCase() + propName.slice(1) : propName;
    props[defaultPropName] = propValue;
    return props;
  }, {});
}

function __createDefaultProps() {
  return _extends({}, CheckBoxProps, __processTwoWayProps(convertRulesToOptions(defaultOptionRules)));
}

CheckBox.defaultProps = __createDefaultProps();
var __defaultOptionRules = [];
export function defaultOptions(rule) {
  __defaultOptionRules.push(rule);

  CheckBox.defaultProps = _extends({}, __createDefaultProps(), __processTwoWayProps(convertRulesToOptions(__defaultOptionRules)));
}
