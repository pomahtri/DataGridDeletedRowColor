"use strict";

exports.Calendar = exports.CalendarProps = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _calendar = _interopRequireDefault(require("../../../ui/calendar"));

var _dom_component_wrapper = require("../common/dom_component_wrapper");

var _base_props = require("../common/base_props");

var _excluded = ["_todayDate", "accessKey", "activeStateEnabled", "className", "defaultValue", "disabled", "firstDayOfWeek", "focusStateEnabled", "hasFocus", "height", "hint", "hoverStateEnabled", "max", "min", "onClick", "onKeyDown", "rtlEnabled", "tabIndex", "value", "valueChange", "visible", "width"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function today() {
  return new Date();
}

function TruePredicate() {
  return true;
}

var viewFunction = function viewFunction(_ref) {
  var props = _ref.props,
      restAttributes = _ref.restAttributes;
  return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _dom_component_wrapper.DomComponentWrapper, _extends({
    "componentType": _calendar.default,
    "componentProps": props
  }, restAttributes)));
};

exports.viewFunction = viewFunction;

var CalendarProps = _extends({}, _base_props.BaseWidgetProps, {
  _todayDate: today,
  hasFocus: TruePredicate,
  defaultValue: null
});

exports.CalendarProps = CalendarProps;

var Calendar = /*#__PURE__*/function (_BaseInfernoComponent) {
  _inheritsLoose(Calendar, _BaseInfernoComponent);

  function Calendar(props) {
    var _this;

    _this = _BaseInfernoComponent.call(this, props) || this;
    _this.state = {
      value: _this.props.value !== undefined ? _this.props.value : _this.props.defaultValue
    };
    return _this;
  }

  var _proto = Calendar.prototype;

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        value: this.props.value !== undefined ? this.props.value : this.state.value
      }),
      restAttributes: this.restAttributes
    });
  };

  _createClass(Calendar, [{
    key: "restAttributes",
    get: function get() {
      var _this$props$value = _extends({}, this.props, {
        value: this.props.value !== undefined ? this.props.value : this.state.value
      }),
          _todayDate = _this$props$value._todayDate,
          accessKey = _this$props$value.accessKey,
          activeStateEnabled = _this$props$value.activeStateEnabled,
          className = _this$props$value.className,
          defaultValue = _this$props$value.defaultValue,
          disabled = _this$props$value.disabled,
          firstDayOfWeek = _this$props$value.firstDayOfWeek,
          focusStateEnabled = _this$props$value.focusStateEnabled,
          hasFocus = _this$props$value.hasFocus,
          height = _this$props$value.height,
          hint = _this$props$value.hint,
          hoverStateEnabled = _this$props$value.hoverStateEnabled,
          max = _this$props$value.max,
          min = _this$props$value.min,
          onClick = _this$props$value.onClick,
          onKeyDown = _this$props$value.onKeyDown,
          rtlEnabled = _this$props$value.rtlEnabled,
          tabIndex = _this$props$value.tabIndex,
          value = _this$props$value.value,
          valueChange = _this$props$value.valueChange,
          visible = _this$props$value.visible,
          width = _this$props$value.width,
          restProps = _objectWithoutProperties(_this$props$value, _excluded);

      return restProps;
    }
  }]);

  return Calendar;
}(_vdom.BaseInfernoComponent);

exports.Calendar = Calendar;
Calendar.defaultProps = _extends({}, CalendarProps);