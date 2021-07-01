"use strict";

exports.Widget = exports.WidgetProps = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

require("../../../events/click");

require("../../../events/hover");

var _short = require("../../../events/short");

var _combine_classes = require("../../utils/combine_classes");

var _extend = require("../../../core/utils/extend");

var _selectors = require("../../../ui/widget/selectors");

var _style = require("../../../core/utils/style");

var _base_props = require("./base_props");

var _config_context = require("../../common/config_context");

var _config_provider = require("../../common/config_provider");

var _resolve_rtl = require("../../utils/resolve_rtl");

var _resize_callbacks = _interopRequireDefault(require("../../../core/utils/resize_callbacks"));

var _excluded = ["_feedbackHideTimeout", "_feedbackShowTimeout", "accessKey", "activeStateEnabled", "activeStateUnit", "addWidgetClass", "aria", "children", "className", "classes", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "name", "onActive", "onClick", "onDimensionChanged", "onFocusIn", "onFocusOut", "onHoverEnd", "onHoverStart", "onInactive", "onKeyDown", "onVisibilityChange", "rootElementRef", "rtlEnabled", "tabIndex", "visible", "width"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var DEFAULT_FEEDBACK_HIDE_TIMEOUT = 400;
var DEFAULT_FEEDBACK_SHOW_TIMEOUT = 30;

var getAria = function getAria(args) {
  return Object.keys(args).reduce(function (r, key) {
    if (args[key]) {
      return _extends({}, r, _defineProperty({}, key === "role" || key === "id" ? key : "aria-".concat(key), String(args[key])));
    }

    return r;
  }, {});
};

var viewFunction = function viewFunction(viewModel) {
  var widget = (0, _inferno.normalizeProps)((0, _inferno.createVNode)(1, "div", viewModel.cssClasses, viewModel.props.children, 0, _extends({}, viewModel.attributes, {
    "tabIndex": viewModel.tabIndex,
    "title": viewModel.props.hint,
    "hidden": !viewModel.props.visible,
    "style": (0, _vdom.normalizeStyles)(viewModel.styles)
  }), null, viewModel.widgetRef));
  return viewModel.shouldRenderConfigProvider ? (0, _inferno.createComponentVNode)(2, _config_provider.ConfigProvider, {
    "rtlEnabled": viewModel.rtlEnabled,
    children: widget
  }) : widget;
};

exports.viewFunction = viewFunction;

var WidgetProps = _extends({}, _base_props.BaseWidgetProps, {
  _feedbackHideTimeout: DEFAULT_FEEDBACK_HIDE_TIMEOUT,
  _feedbackShowTimeout: DEFAULT_FEEDBACK_SHOW_TIMEOUT,
  aria: {},
  classes: "",
  name: "",
  addWidgetClass: true
});

exports.WidgetProps = WidgetProps;

var Widget = /*#__PURE__*/function (_InfernoWrapperCompon) {
  _inheritsLoose(Widget, _InfernoWrapperCompon);

  function Widget(props) {
    var _this;

    _this = _InfernoWrapperCompon.call(this, props) || this;
    _this.widgetRef = (0, _inferno.createRef)();
    _this.state = {
      active: false,
      focused: false,
      hovered: false
    };
    _this.setRootElementRef = _this.setRootElementRef.bind(_assertThisInitialized(_this));
    _this.activeEffect = _this.activeEffect.bind(_assertThisInitialized(_this));
    _this.clickEffect = _this.clickEffect.bind(_assertThisInitialized(_this));
    _this.focus = _this.focus.bind(_assertThisInitialized(_this));
    _this.activate = _this.activate.bind(_assertThisInitialized(_this));
    _this.deactivate = _this.deactivate.bind(_assertThisInitialized(_this));
    _this.focusEffect = _this.focusEffect.bind(_assertThisInitialized(_this));
    _this.hoverEffect = _this.hoverEffect.bind(_assertThisInitialized(_this));
    _this.keyboardEffect = _this.keyboardEffect.bind(_assertThisInitialized(_this));
    _this.resizeEffect = _this.resizeEffect.bind(_assertThisInitialized(_this));
    _this.windowResizeEffect = _this.windowResizeEffect.bind(_assertThisInitialized(_this));
    _this.visibilityEffect = _this.visibilityEffect.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = Widget.prototype;

  _proto.createEffects = function createEffects() {
    return [new _vdom.InfernoEffect(this.setRootElementRef, []), new _vdom.InfernoEffect(this.activeEffect, [this.props._feedbackHideTimeout, this.props._feedbackShowTimeout, this.props.activeStateEnabled, this.props.activeStateUnit, this.props.disabled, this.props.onActive, this.props.onInactive]), new _vdom.InfernoEffect(this.clickEffect, [this.props.disabled, this.props.name, this.props.onClick]), new _vdom.InfernoEffect(this.focusEffect, [this.props.disabled, this.props.focusStateEnabled, this.props.name, this.props.onFocusIn, this.props.onFocusOut]), new _vdom.InfernoEffect(this.hoverEffect, [this.props.activeStateUnit, this.props.disabled, this.props.hoverStateEnabled, this.props.onHoverEnd, this.props.onHoverStart, this.state.active]), new _vdom.InfernoEffect(this.keyboardEffect, [this.props.focusStateEnabled, this.props.onKeyDown]), new _vdom.InfernoEffect(this.resizeEffect, [this.props.name, this.props.onDimensionChanged]), new _vdom.InfernoEffect(this.windowResizeEffect, [this.props.onDimensionChanged]), new _vdom.InfernoEffect(this.visibilityEffect, [this.props.name, this.props.onVisibilityChange]), (0, _vdom.createReRenderEffect)()];
  };

  _proto.updateEffects = function updateEffects() {
    var _this$_effects$, _this$_effects$2, _this$_effects$3, _this$_effects$4, _this$_effects$5, _this$_effects$6, _this$_effects$7, _this$_effects$8;

    (_this$_effects$ = this._effects[1]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props._feedbackHideTimeout, this.props._feedbackShowTimeout, this.props.activeStateEnabled, this.props.activeStateUnit, this.props.disabled, this.props.onActive, this.props.onInactive]);
    (_this$_effects$2 = this._effects[2]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([this.props.disabled, this.props.name, this.props.onClick]);
    (_this$_effects$3 = this._effects[3]) === null || _this$_effects$3 === void 0 ? void 0 : _this$_effects$3.update([this.props.disabled, this.props.focusStateEnabled, this.props.name, this.props.onFocusIn, this.props.onFocusOut]);
    (_this$_effects$4 = this._effects[4]) === null || _this$_effects$4 === void 0 ? void 0 : _this$_effects$4.update([this.props.activeStateUnit, this.props.disabled, this.props.hoverStateEnabled, this.props.onHoverEnd, this.props.onHoverStart, this.state.active]);
    (_this$_effects$5 = this._effects[5]) === null || _this$_effects$5 === void 0 ? void 0 : _this$_effects$5.update([this.props.focusStateEnabled, this.props.onKeyDown]);
    (_this$_effects$6 = this._effects[6]) === null || _this$_effects$6 === void 0 ? void 0 : _this$_effects$6.update([this.props.name, this.props.onDimensionChanged]);
    (_this$_effects$7 = this._effects[7]) === null || _this$_effects$7 === void 0 ? void 0 : _this$_effects$7.update([this.props.onDimensionChanged]);
    (_this$_effects$8 = this._effects[8]) === null || _this$_effects$8 === void 0 ? void 0 : _this$_effects$8.update([this.props.name, this.props.onVisibilityChange]);
  };

  _proto.setRootElementRef = function setRootElementRef() {
    var rootElementRef = this.props.rootElementRef;

    if (rootElementRef) {
      rootElementRef.current = this.widgetRef.current;
    }
  };

  _proto.activeEffect = function activeEffect() {
    var _this2 = this;

    var _this$props = this.props,
        _feedbackHideTimeout = _this$props._feedbackHideTimeout,
        _feedbackShowTimeout = _this$props._feedbackShowTimeout,
        activeStateEnabled = _this$props.activeStateEnabled,
        activeStateUnit = _this$props.activeStateUnit,
        disabled = _this$props.disabled,
        onActive = _this$props.onActive,
        onInactive = _this$props.onInactive;
    var selector = activeStateUnit;
    var namespace = "UIFeedback";

    if (activeStateEnabled && !disabled) {
      _short.active.on(this.widgetRef.current, function (_ref) {
        var event = _ref.event;

        _this2.setState(function (state) {
          return _extends({}, state, {
            active: true
          });
        });

        onActive === null || onActive === void 0 ? void 0 : onActive(event);
      }, function (_ref2) {
        var event = _ref2.event;

        _this2.setState(function (state) {
          return _extends({}, state, {
            active: false
          });
        });

        onInactive === null || onInactive === void 0 ? void 0 : onInactive(event);
      }, {
        hideTimeout: _feedbackHideTimeout,
        namespace: namespace,
        selector: selector,
        showTimeout: _feedbackShowTimeout
      });

      return function () {
        return _short.active.off(_this2.widgetRef.current, {
          selector: selector,
          namespace: namespace
        });
      };
    }

    return undefined;
  };

  _proto.clickEffect = function clickEffect() {
    var _this3 = this;

    var _this$props2 = this.props,
        disabled = _this$props2.disabled,
        name = _this$props2.name,
        onClick = _this$props2.onClick;
    var namespace = name;

    if (onClick && !disabled) {
      _short.dxClick.on(this.widgetRef.current, onClick, {
        namespace: namespace
      });

      return function () {
        return _short.dxClick.off(_this3.widgetRef.current, {
          namespace: namespace
        });
      };
    }

    return undefined;
  };

  _proto.focusEffect = function focusEffect() {
    var _this4 = this;

    var _this$props3 = this.props,
        disabled = _this$props3.disabled,
        focusStateEnabled = _this$props3.focusStateEnabled,
        name = _this$props3.name,
        onFocusIn = _this$props3.onFocusIn,
        onFocusOut = _this$props3.onFocusOut;
    var namespace = "".concat(name, "Focus");
    var isFocusable = focusStateEnabled && !disabled;

    if (isFocusable) {
      _short.focus.on(this.widgetRef.current, function (e) {
        if (!e.isDefaultPrevented()) {
          _this4.setState(function (state) {
            return _extends({}, state, {
              focused: true
            });
          });

          onFocusIn === null || onFocusIn === void 0 ? void 0 : onFocusIn(e);
        }
      }, function (e) {
        if (!e.isDefaultPrevented()) {
          _this4.setState(function (state) {
            return _extends({}, state, {
              focused: false
            });
          });

          onFocusOut === null || onFocusOut === void 0 ? void 0 : onFocusOut(e);
        }
      }, {
        isFocusable: _selectors.focusable,
        namespace: namespace
      });

      return function () {
        return _short.focus.off(_this4.widgetRef.current, {
          namespace: namespace
        });
      };
    }

    return undefined;
  };

  _proto.hoverEffect = function hoverEffect() {
    var _this5 = this;

    var namespace = "UIFeedback";
    var _this$props4 = this.props,
        activeStateUnit = _this$props4.activeStateUnit,
        disabled = _this$props4.disabled,
        hoverStateEnabled = _this$props4.hoverStateEnabled,
        onHoverEnd = _this$props4.onHoverEnd,
        onHoverStart = _this$props4.onHoverStart;
    var selector = activeStateUnit;
    var isHoverable = hoverStateEnabled && !disabled;

    if (isHoverable) {
      _short.hover.on(this.widgetRef.current, function (_ref3) {
        var event = _ref3.event;
        !_this5.state.active && _this5.setState(function (state) {
          return _extends({}, state, {
            hovered: true
          });
        });
        onHoverStart === null || onHoverStart === void 0 ? void 0 : onHoverStart(event);
      }, function (event) {
        _this5.setState(function (state) {
          return _extends({}, state, {
            hovered: false
          });
        });

        onHoverEnd === null || onHoverEnd === void 0 ? void 0 : onHoverEnd(event);
      }, {
        selector: selector,
        namespace: namespace
      });

      return function () {
        return _short.hover.off(_this5.widgetRef.current, {
          selector: selector,
          namespace: namespace
        });
      };
    }

    return undefined;
  };

  _proto.keyboardEffect = function keyboardEffect() {
    var _this$props5 = this.props,
        focusStateEnabled = _this$props5.focusStateEnabled,
        onKeyDown = _this$props5.onKeyDown;

    if (focusStateEnabled && onKeyDown) {
      var id = _short.keyboard.on(this.widgetRef.current, this.widgetRef.current, function (e) {
        return onKeyDown(e);
      });

      return function () {
        return _short.keyboard.off(id);
      };
    }

    return undefined;
  };

  _proto.resizeEffect = function resizeEffect() {
    var _this6 = this;

    var namespace = "".concat(this.props.name, "VisibilityChange");
    var onDimensionChanged = this.props.onDimensionChanged;

    if (onDimensionChanged) {
      _short.resize.on(this.widgetRef.current, onDimensionChanged, {
        namespace: namespace
      });

      return function () {
        return _short.resize.off(_this6.widgetRef.current, {
          namespace: namespace
        });
      };
    }

    return undefined;
  };

  _proto.windowResizeEffect = function windowResizeEffect() {
    var onDimensionChanged = this.props.onDimensionChanged;

    if (onDimensionChanged) {
      _resize_callbacks.default.add(onDimensionChanged);

      return function () {
        _resize_callbacks.default.remove(onDimensionChanged);
      };
    }

    return undefined;
  };

  _proto.visibilityEffect = function visibilityEffect() {
    var _this7 = this;

    var _this$props6 = this.props,
        name = _this$props6.name,
        onVisibilityChange = _this$props6.onVisibilityChange;
    var namespace = "".concat(name, "VisibilityChange");

    if (onVisibilityChange) {
      _short.visibility.on(this.widgetRef.current, function () {
        return onVisibilityChange(true);
      }, function () {
        return onVisibilityChange(false);
      }, {
        namespace: namespace
      });

      return function () {
        return _short.visibility.off(_this7.widgetRef.current, {
          namespace: namespace
        });
      };
    }

    return undefined;
  };

  _proto.focus = function focus() {
    _short.focus.trigger(this.widgetRef.current);
  };

  _proto.activate = function activate() {
    this.setState(function (state) {
      return _extends({}, state, {
        active: true
      });
    });
  };

  _proto.deactivate = function deactivate() {
    this.setState(function (state) {
      return _extends({}, state, {
        active: false
      });
    });
  };

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      active: this.state.active,
      focused: this.state.focused,
      hovered: this.state.hovered,
      widgetRef: this.widgetRef,
      config: this.config,
      shouldRenderConfigProvider: this.shouldRenderConfigProvider,
      rtlEnabled: this.rtlEnabled,
      attributes: this.attributes,
      styles: this.styles,
      cssClasses: this.cssClasses,
      tabIndex: this.tabIndex,
      restAttributes: this.restAttributes
    });
  };

  _createClass(Widget, [{
    key: "config",
    get: function get() {
      if ("ConfigContext" in this.context) {
        return this.context.ConfigContext;
      }

      return _config_context.ConfigContext;
    }
  }, {
    key: "shouldRenderConfigProvider",
    get: function get() {
      var rtlEnabled = this.props.rtlEnabled;
      return (0, _resolve_rtl.resolveRtlEnabledDefinition)(rtlEnabled, this.config);
    }
  }, {
    key: "rtlEnabled",
    get: function get() {
      var rtlEnabled = this.props.rtlEnabled;
      return (0, _resolve_rtl.resolveRtlEnabled)(rtlEnabled, this.config);
    }
  }, {
    key: "attributes",
    get: function get() {
      var _this$props7 = this.props,
          aria = _this$props7.aria,
          disabled = _this$props7.disabled,
          focusStateEnabled = _this$props7.focusStateEnabled,
          visible = _this$props7.visible;
      var accessKey = focusStateEnabled && !disabled && this.props.accessKey;
      return _extends({}, (0, _extend.extend)({}, this.restAttributes, accessKey && {
        accessKey: accessKey
      }), getAria(_extends({}, aria, {
        disabled: disabled,
        hidden: !visible
      })));
    }
  }, {
    key: "styles",
    get: function get() {
      var _this$props8 = this.props,
          height = _this$props8.height,
          width = _this$props8.width;
      var style = this.restAttributes.style || {};
      var computedWidth = (0, _style.normalizeStyleProp)("width", typeof width === "function" ? width() : width);
      var computedHeight = (0, _style.normalizeStyleProp)("height", typeof height === "function" ? height() : height);
      return _extends({}, style, {
        height: computedHeight !== null && computedHeight !== void 0 ? computedHeight : style.height,
        width: computedWidth !== null && computedWidth !== void 0 ? computedWidth : style.width
      });
    }
  }, {
    key: "cssClasses",
    get: function get() {
      var _classesMap;

      var _this$props9 = this.props,
          activeStateEnabled = _this$props9.activeStateEnabled,
          addWidgetClass = _this$props9.addWidgetClass,
          className = _this$props9.className,
          classes = _this$props9.classes,
          disabled = _this$props9.disabled,
          focusStateEnabled = _this$props9.focusStateEnabled,
          hoverStateEnabled = _this$props9.hoverStateEnabled,
          onVisibilityChange = _this$props9.onVisibilityChange,
          visible = _this$props9.visible;
      var isFocusable = !!focusStateEnabled && !disabled;
      var isHoverable = !!hoverStateEnabled && !disabled;
      var canBeActive = !!activeStateEnabled && !disabled;
      var classesMap = (_classesMap = {
        "dx-widget": !!addWidgetClass
      }, _defineProperty(_classesMap, String(classes), !!classes), _defineProperty(_classesMap, String(className), !!className), _defineProperty(_classesMap, "dx-state-disabled", !!disabled), _defineProperty(_classesMap, "dx-state-invisible", !visible), _defineProperty(_classesMap, "dx-state-focused", !!this.state.focused && isFocusable), _defineProperty(_classesMap, "dx-state-active", !!this.state.active && canBeActive), _defineProperty(_classesMap, "dx-state-hover", !!this.state.hovered && isHoverable && !this.state.active), _defineProperty(_classesMap, "dx-rtl", !!this.rtlEnabled), _defineProperty(_classesMap, "dx-visibility-change-handler", !!onVisibilityChange), _classesMap);
      return (0, _combine_classes.combineClasses)(classesMap);
    }
  }, {
    key: "tabIndex",
    get: function get() {
      var _this$props10 = this.props,
          disabled = _this$props10.disabled,
          focusStateEnabled = _this$props10.focusStateEnabled,
          tabIndex = _this$props10.tabIndex;
      var isFocusable = focusStateEnabled && !disabled;
      return isFocusable ? tabIndex : undefined;
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props11 = this.props,
          _feedbackHideTimeout = _this$props11._feedbackHideTimeout,
          _feedbackShowTimeout = _this$props11._feedbackShowTimeout,
          accessKey = _this$props11.accessKey,
          activeStateEnabled = _this$props11.activeStateEnabled,
          activeStateUnit = _this$props11.activeStateUnit,
          addWidgetClass = _this$props11.addWidgetClass,
          aria = _this$props11.aria,
          children = _this$props11.children,
          className = _this$props11.className,
          classes = _this$props11.classes,
          disabled = _this$props11.disabled,
          focusStateEnabled = _this$props11.focusStateEnabled,
          height = _this$props11.height,
          hint = _this$props11.hint,
          hoverStateEnabled = _this$props11.hoverStateEnabled,
          name = _this$props11.name,
          onActive = _this$props11.onActive,
          onClick = _this$props11.onClick,
          onDimensionChanged = _this$props11.onDimensionChanged,
          onFocusIn = _this$props11.onFocusIn,
          onFocusOut = _this$props11.onFocusOut,
          onHoverEnd = _this$props11.onHoverEnd,
          onHoverStart = _this$props11.onHoverStart,
          onInactive = _this$props11.onInactive,
          onKeyDown = _this$props11.onKeyDown,
          onVisibilityChange = _this$props11.onVisibilityChange,
          rootElementRef = _this$props11.rootElementRef,
          rtlEnabled = _this$props11.rtlEnabled,
          tabIndex = _this$props11.tabIndex,
          visible = _this$props11.visible,
          width = _this$props11.width,
          restProps = _objectWithoutProperties(_this$props11, _excluded);

      return restProps;
    }
  }]);

  return Widget;
}(_vdom.InfernoWrapperComponent);

exports.Widget = Widget;
Widget.defaultProps = _extends({}, WidgetProps);