/**
* DevExtreme (renovation/ui/editors/check_box.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.defaultOptions = defaultOptions;
exports.CheckBox = exports.defaultOptionRules = exports.CheckBoxProps = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _utils = require("../../../core/options/utils");

var _devices = _interopRequireDefault(require("../../../core/devices"));

var _guid = _interopRequireDefault(require("../../../core/guid"));

var _widget = require("../common/widget");

var _base_props = require("../common/base_props");

var _combine_classes = require("../../utils/combine_classes");

var _validation_message = require("../overlays/validation_message");

var _excluded = ["accessKey", "activeStateEnabled", "className", "defaultValue", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "isValid", "name", "onClick", "onFocusIn", "onKeyDown", "readOnly", "rtlEnabled", "saveValueChangeEvent", "tabIndex", "text", "validationError", "validationErrors", "validationMessageMode", "validationStatus", "value", "valueChange", "visible", "width"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var getCssClasses = function getCssClasses(model) {
  var isValid = model.isValid,
      readOnly = model.readOnly,
      text = model.text,
      value = model.value;
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
  return (0, _combine_classes.combineClasses)(classesMap);
};

var viewFunction = function viewFunction(viewModel) {
  var _viewModel$props = viewModel.props,
      name = _viewModel$props.name,
      text = _viewModel$props.text;
  return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _widget.Widget, _extends({
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
    children: [(0, _inferno.normalizeProps)((0, _inferno.createVNode)(64, "input", null, null, 1, _extends({
      "type": "hidden",
      "value": "".concat(viewModel.props.value)
    }, name && {
      name: name
    }), null, viewModel.inputRef)), (0, _inferno.createVNode)(1, "div", "dx-checkbox-container", [(0, _inferno.createVNode)(1, "span", "dx-checkbox-icon", null, 1, null, null, viewModel.iconRef), text && (0, _inferno.createVNode)(1, "span", "dx-checkbox-text", text, 0)], 0), viewModel.showValidationMessage && (0, _inferno.createComponentVNode)(2, _validation_message.ValidationMessage, {
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

exports.viewFunction = viewFunction;

var CheckBoxProps = _extends({}, _base_props.BaseWidgetProps, {
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
  valueChange: function valueChange() {}
});

exports.CheckBoxProps = CheckBoxProps;
var defaultOptionRules = (0, _utils.createDefaultOptionRules)([{
  device: function device() {
    return _devices.default.real().deviceType === "desktop" && !_devices.default.isSimulator();
  },
  options: {
    focusStateEnabled: true
  }
}]);
exports.defaultOptionRules = defaultOptionRules;

var CheckBox = /*#__PURE__*/function (_InfernoWrapperCompon) {
  _inheritsLoose(CheckBox, _InfernoWrapperCompon);

  function CheckBox(props) {
    var _this;

    _this = _InfernoWrapperCompon.call(this, props) || this;
    _this.iconRef = (0, _inferno.createRef)();
    _this.inputRef = (0, _inferno.createRef)();
    _this.widgetRef = (0, _inferno.createRef)();
    _this.target = (0, _inferno.createRef)();
    _this.state = {
      showValidationMessage: false,
      value: _this.props.value !== undefined ? _this.props.value : _this.props.defaultValue
    };
    _this.updateValidationMessageVisibility = _this.updateValidationMessageVisibility.bind(_assertThisInitialized(_this));
    _this.focus = _this.focus.bind(_assertThisInitialized(_this));
    _this.onFocusIn = _this.onFocusIn.bind(_assertThisInitialized(_this));
    _this.onWidgetClick = _this.onWidgetClick.bind(_assertThisInitialized(_this));
    _this.onWidgetKeyDown = _this.onWidgetKeyDown.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = CheckBox.prototype;

  _proto.createEffects = function createEffects() {
    return [new _vdom.InfernoEffect(this.updateValidationMessageVisibility, [this.props.isValid, this.props.validationStatus, this.props.validationError, this.props.validationErrors]), (0, _vdom.createReRenderEffect)()];
  };

  _proto.updateEffects = function updateEffects() {
    var _this$_effects$;

    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.isValid, this.props.validationStatus, this.props.validationError, this.props.validationErrors]);
  };

  _proto.updateValidationMessageVisibility = function updateValidationMessageVisibility() {
    var _this2 = this;

    this.setState(function (state) {
      return _extends({}, state, {
        showValidationMessage: _this2.shouldShowValidationMessage
      });
    });
    return undefined;
  };

  _proto.onFocusIn = function onFocusIn(event) {
    var onFocusIn = this.props.onFocusIn;
    onFocusIn === null || onFocusIn === void 0 ? void 0 : onFocusIn(event);
  };

  _proto.onWidgetClick = function onWidgetClick(event) {
    var _ref;

    var _this$props = this.props,
        readOnly = _this$props.readOnly,
        saveValueChangeEvent = _this$props.saveValueChangeEvent;
    var value = (_ref = this.props.value !== undefined ? this.props.value : this.state.value) !== null && _ref !== void 0 ? _ref : false;

    if (!readOnly) {
      saveValueChangeEvent === null || saveValueChangeEvent === void 0 ? void 0 : saveValueChangeEvent(event);
      {
        var __newValue;

        this.setState(function (state) {
          __newValue = !value;
          return {
            value: __newValue
          };
        });
        this.props.valueChange(__newValue);
      }
    }
  };

  _proto.onWidgetKeyDown = function onWidgetKeyDown(e) {
    var onKeyDown = this.props.onKeyDown;
    var keyName = e.keyName,
        originalEvent = e.originalEvent,
        which = e.which;
    var result = onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(e);

    if (result !== null && result !== void 0 && result.cancel) {
      return result;
    }

    if (keyName === "space" || which === "space") {
      originalEvent.preventDefault();
      this.onWidgetClick(originalEvent);
    }

    return undefined;
  };

  _proto.focus = function focus() {
    this.widgetRef.current.focus();
  };

  _proto.render = function render() {
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
  };

  _createClass(CheckBox, [{
    key: "cssClasses",
    get: function get() {
      return getCssClasses(_extends({}, this.props, {
        value: this.props.value !== undefined ? this.props.value : this.state.value
      }));
    }
  }, {
    key: "shouldShowValidationMessage",
    get: function get() {
      var _this$validationError;

      var _this$props2 = this.props,
          isValid = _this$props2.isValid,
          validationStatus = _this$props2.validationStatus;
      var validationErrors = (_this$validationError = this.validationErrors) !== null && _this$validationError !== void 0 ? _this$validationError : [];
      return !isValid && validationStatus === "invalid" && validationErrors.length > 0;
    }
  }, {
    key: "aria",
    get: function get() {
      var _this$props3 = this.props,
          isValid = _this$props3.isValid,
          readOnly = _this$props3.readOnly;
      var checked = (this.props.value !== undefined ? this.props.value : this.state.value) === true;
      var indeterminate = (this.props.value !== undefined ? this.props.value : this.state.value) === null;
      var result = {
        role: "checkbox",
        checked: indeterminate ? "mixed" : "".concat(checked),
        readonly: readOnly ? "true" : "false",
        invalid: !isValid ? "true" : "false"
      };

      if (this.shouldShowValidationMessage) {
        result.describedby = "dx-".concat(new _guid.default());
      }

      return result;
    }
  }, {
    key: "validationErrors",
    get: function get() {
      var _this$props4 = this.props,
          validationError = _this$props4.validationError,
          validationErrors = _this$props4.validationErrors;
      var allValidationErrors = validationErrors;

      if (!allValidationErrors && validationError) {
        allValidationErrors = [validationError];
      }

      return allValidationErrors;
    }
  }, {
    key: "targetCurrent",
    get: function get() {
      var _this$target;

      return (_this$target = this.target) === null || _this$target === void 0 ? void 0 : _this$target.current;
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props$value = _extends({}, this.props, {
        value: this.props.value !== undefined ? this.props.value : this.state.value
      }),
          accessKey = _this$props$value.accessKey,
          activeStateEnabled = _this$props$value.activeStateEnabled,
          className = _this$props$value.className,
          defaultValue = _this$props$value.defaultValue,
          disabled = _this$props$value.disabled,
          focusStateEnabled = _this$props$value.focusStateEnabled,
          height = _this$props$value.height,
          hint = _this$props$value.hint,
          hoverStateEnabled = _this$props$value.hoverStateEnabled,
          isValid = _this$props$value.isValid,
          name = _this$props$value.name,
          onClick = _this$props$value.onClick,
          onFocusIn = _this$props$value.onFocusIn,
          onKeyDown = _this$props$value.onKeyDown,
          readOnly = _this$props$value.readOnly,
          rtlEnabled = _this$props$value.rtlEnabled,
          saveValueChangeEvent = _this$props$value.saveValueChangeEvent,
          tabIndex = _this$props$value.tabIndex,
          text = _this$props$value.text,
          validationError = _this$props$value.validationError,
          validationErrors = _this$props$value.validationErrors,
          validationMessageMode = _this$props$value.validationMessageMode,
          validationStatus = _this$props$value.validationStatus,
          value = _this$props$value.value,
          valueChange = _this$props$value.valueChange,
          visible = _this$props$value.visible,
          width = _this$props$value.width,
          restProps = _objectWithoutProperties(_this$props$value, _excluded);

      return restProps;
    }
  }]);

  return CheckBox;
}(_vdom.InfernoWrapperComponent);

exports.CheckBox = CheckBox;

function __processTwoWayProps(defaultProps) {
  var twoWayProps = ["value"];
  return Object.keys(defaultProps).reduce(function (props, propName) {
    var propValue = defaultProps[propName];
    var defaultPropName = twoWayProps.some(function (p) {
      return p === propName;
    }) ? "default" + propName.charAt(0).toUpperCase() + propName.slice(1) : propName;
    props[defaultPropName] = propValue;
    return props;
  }, {});
}

function __createDefaultProps() {
  return _extends({}, CheckBoxProps, __processTwoWayProps((0, _utils.convertRulesToOptions)(defaultOptionRules)));
}

CheckBox.defaultProps = __createDefaultProps();
var __defaultOptionRules = [];

function defaultOptions(rule) {
  __defaultOptionRules.push(rule);

  CheckBox.defaultProps = _extends({}, __createDefaultProps(), __processTwoWayProps((0, _utils.convertRulesToOptions)(__defaultOptionRules)));
}
