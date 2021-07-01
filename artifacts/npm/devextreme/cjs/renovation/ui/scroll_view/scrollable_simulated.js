/**
* DevExtreme (cjs/renovation/ui/scroll_view/scrollable_simulated.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.ScrollableSimulated = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _subscribe_to_event = require("../../utils/subscribe_to_event");

var _load_panel = require("./load_panel");

var _animated_scrollbar = require("./animated_scrollbar");

var _widget = require("../common/widget");

var _combine_classes = require("../../utils/combine_classes");

var _get_boundary_props = require("./utils/get_boundary_props");

var _get_element_location_internal = require("./utils/get_element_location_internal");

var _index = require("../../../events/utils/index");

var _window = require("../../../core/utils/window");

var _type = require("../../../core/utils/type");

var _scrollable_simulated_props = require("./scrollable_simulated_props");

require("../../../events/gesture/emitter.gesture.scroll");

var _events_engine = _interopRequireDefault(require("../../../events/core/events_engine"));

var _scroll_direction = require("./utils/scroll_direction");

var _consts = require("./common/consts");

var _get_element_offset = require("../../utils/get_element_offset");

var _get_computed_style = _interopRequireDefault(require("../../utils/get_computed_style"));

var _top_pocket = require("./top_pocket");

var _bottom_pocket = require("./bottom_pocket");

var _short = require("../../../events/short");

var _get_offset_distance = require("./utils/get_offset_distance");

var _restore_location = require("./utils/restore_location");

var _get_scroll_top_max = require("./utils/get_scroll_top_max");

var _get_scroll_left_max = require("./utils/get_scroll_left_max");

var _math = require("../../../core/utils/math");

var _is_element_visible = require("./utils/is_element_visible");

var _excluded = ["aria", "bounceEnabled", "children", "classes", "contentTranslateOffsetChange", "direction", "disabled", "forceGeneratePockets", "height", "inertiaEnabled", "needScrollViewContentWrapper", "needScrollViewLoadPanel", "onBounce", "onEnd", "onKeyDown", "onPullDown", "onReachBottom", "onScroll", "onStart", "onUpdated", "onVisibilityChange", "pocketStateChange", "pullDownEnabled", "pulledDownText", "pullingDownText", "reachBottomEnabled", "reachBottomText", "refreshingText", "rtlEnabled", "scrollByContent", "scrollByThumb", "scrollLocationChange", "showScrollbar", "useKeyboard", "useNative", "useSimulatedScrollbar", "visible", "width"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var DEFAULT_OFFSET = {
  top: 0,
  left: 0
};

var viewFunction = function viewFunction(viewModel) {
  var bottomPocketClientHeight = viewModel.bottomPocketClientHeight,
      bottomPocketRef = viewModel.bottomPocketRef,
      containerClientHeight = viewModel.containerClientHeight,
      containerClientWidth = viewModel.containerClientWidth,
      containerRef = viewModel.containerRef,
      containerStyles = viewModel.containerStyles,
      contentHeight = viewModel.contentHeight,
      contentRef = viewModel.contentRef,
      contentStyles = viewModel.contentStyles,
      contentTranslateOffsetChange = viewModel.contentTranslateOffsetChange,
      contentWidth = viewModel.contentWidth,
      cssClasses = viewModel.cssClasses,
      cursorEnterHandler = viewModel.cursorEnterHandler,
      cursorLeaveHandler = viewModel.cursorLeaveHandler,
      direction = viewModel.direction,
      forceUpdateHScrollbarLocation = viewModel.forceUpdateHScrollbarLocation,
      forceUpdateVScrollbarLocation = viewModel.forceUpdateVScrollbarLocation,
      hScrollLocation = viewModel.hScrollLocation,
      hScrollbarRef = viewModel.hScrollbarRef,
      handleKeyDown = viewModel.handleKeyDown,
      isHovered = viewModel.isHovered,
      isLoadPanelVisible = viewModel.isLoadPanelVisible,
      onBounce = viewModel.onBounce,
      onEnd = viewModel.onEnd,
      onPullDown = viewModel.onPullDown,
      onReachBottom = viewModel.onReachBottom,
      onRelease = viewModel.onRelease,
      onScroll = viewModel.onScroll,
      onVisibilityChangeHandler = viewModel.onVisibilityChangeHandler,
      pocketStateChange = viewModel.pocketStateChange,
      _viewModel$props = viewModel.props,
      aria = _viewModel$props.aria,
      bounceEnabled = _viewModel$props.bounceEnabled,
      children = _viewModel$props.children,
      disabled = _viewModel$props.disabled,
      forceGeneratePockets = _viewModel$props.forceGeneratePockets,
      height = _viewModel$props.height,
      inertiaEnabled = _viewModel$props.inertiaEnabled,
      needScrollViewContentWrapper = _viewModel$props.needScrollViewContentWrapper,
      needScrollViewLoadPanel = _viewModel$props.needScrollViewLoadPanel,
      pullDownEnabled = _viewModel$props.pullDownEnabled,
      pulledDownText = _viewModel$props.pulledDownText,
      pullingDownText = _viewModel$props.pullingDownText,
      reachBottomEnabled = _viewModel$props.reachBottomEnabled,
      reachBottomText = _viewModel$props.reachBottomText,
      refreshingText = _viewModel$props.refreshingText,
      rtlEnabled = _viewModel$props.rtlEnabled,
      scrollByThumb = _viewModel$props.scrollByThumb,
      showScrollbar = _viewModel$props.showScrollbar,
      useKeyboard = _viewModel$props.useKeyboard,
      visible = _viewModel$props.visible,
      width = _viewModel$props.width,
      restAttributes = viewModel.restAttributes,
      scrollLocationChange = viewModel.scrollLocationChange,
      scrollViewContentRef = viewModel.scrollViewContentRef,
      scrollableOffsetLeft = viewModel.scrollableOffsetLeft,
      scrollableOffsetTop = viewModel.scrollableOffsetTop,
      scrollableRef = viewModel.scrollableRef,
      topPocketClientHeight = viewModel.topPocketClientHeight,
      topPocketRef = viewModel.topPocketRef,
      topPocketState = viewModel.topPocketState,
      updateHandler = viewModel.updateHandler,
      vScrollLocation = viewModel.vScrollLocation,
      vScrollbarRef = viewModel.vScrollbarRef,
      wrapperRef = viewModel.wrapperRef;
  return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _widget.Widget, _extends({
    "rootElementRef": scrollableRef,
    "focusStateEnabled": useKeyboard,
    "hoverStateEnabled": true,
    "aria": aria,
    "addWidgetClass": false,
    "classes": cssClasses,
    "disabled": disabled,
    "rtlEnabled": rtlEnabled,
    "height": height,
    "width": width,
    "visible": visible,
    "onKeyDown": useKeyboard ? handleKeyDown : undefined,
    "onHoverStart": cursorEnterHandler,
    "onHoverEnd": cursorLeaveHandler,
    "onDimensionChanged": updateHandler,
    "onVisibilityChange": onVisibilityChangeHandler
  }, restAttributes, {
    children: [(0, _inferno.createVNode)(1, "div", _consts.SCROLLABLE_WRAPPER_CLASS, (0, _inferno.createVNode)(1, "div", _consts.SCROLLABLE_CONTAINER_CLASS, [(0, _inferno.createVNode)(1, "div", _consts.SCROLLABLE_CONTENT_CLASS, [forceGeneratePockets && (0, _inferno.createComponentVNode)(2, _top_pocket.TopPocket, {
      "topPocketRef": topPocketRef,
      "pullingDownText": pullingDownText,
      "pulledDownText": pulledDownText,
      "refreshingText": refreshingText,
      "refreshStrategy": "simulated",
      "pocketState": topPocketState,
      "visible": !!pullDownEnabled
    }), needScrollViewContentWrapper ? (0, _inferno.createVNode)(1, "div", _consts.SCROLLVIEW_CONTENT_CLASS, children, 0, null, null, scrollViewContentRef) : children, forceGeneratePockets && (0, _inferno.createComponentVNode)(2, _bottom_pocket.BottomPocket, {
      "bottomPocketRef": bottomPocketRef,
      "reachBottomText": reachBottomText,
      "visible": !!reachBottomEnabled
    })], 0, {
      "style": (0, _vdom.normalizeStyles)(contentStyles)
    }, null, contentRef), direction.isHorizontal && (0, _inferno.createComponentVNode)(2, _animated_scrollbar.AnimatedScrollbar, {
      "direction": "horizontal",
      "scrollableOffset": scrollableOffsetLeft,
      "contentSize": contentWidth,
      "containerSize": containerClientWidth,
      "isScrollableHovered": isHovered,
      "scrollLocation": hScrollLocation,
      "scrollLocationChange": scrollLocationChange,
      "contentTranslateOffsetChange": contentTranslateOffsetChange,
      "scrollByThumb": scrollByThumb,
      "bounceEnabled": bounceEnabled,
      "showScrollbar": showScrollbar,
      "inertiaEnabled": inertiaEnabled,
      "onBounce": onBounce,
      "onScroll": onScroll,
      "onEnd": onEnd,
      "forceUpdateScrollbarLocation": forceUpdateHScrollbarLocation,
      "rtlEnabled": rtlEnabled
    }, null, hScrollbarRef), direction.isVertical && (0, _inferno.createComponentVNode)(2, _animated_scrollbar.AnimatedScrollbar, {
      "direction": "vertical",
      "scrollableOffset": scrollableOffsetTop,
      "contentSize": contentHeight,
      "containerSize": containerClientHeight,
      "isScrollableHovered": isHovered,
      "scrollLocation": vScrollLocation,
      "scrollLocationChange": scrollLocationChange,
      "contentTranslateOffsetChange": contentTranslateOffsetChange,
      "scrollByThumb": scrollByThumb,
      "bounceEnabled": bounceEnabled,
      "showScrollbar": showScrollbar,
      "inertiaEnabled": inertiaEnabled,
      "onBounce": onBounce,
      "onScroll": onScroll,
      "onEnd": onEnd,
      "forceUpdateScrollbarLocation": forceUpdateVScrollbarLocation,
      "forceGeneratePockets": forceGeneratePockets,
      "topPocketSize": topPocketClientHeight,
      "bottomPocketSize": bottomPocketClientHeight,
      "onPullDown": onPullDown,
      "onRelease": onRelease,
      "onReachBottom": onReachBottom,
      "pullDownEnabled": pullDownEnabled,
      "reachBottomEnabled": reachBottomEnabled,
      "pocketState": topPocketState,
      "pocketStateChange": pocketStateChange
    }, null, vScrollbarRef)], 0, {
      "style": (0, _vdom.normalizeStyles)(containerStyles)
    }, null, containerRef), 2, null, null, wrapperRef), needScrollViewLoadPanel && (0, _inferno.createComponentVNode)(2, _load_panel.ScrollViewLoadPanel, {
      "targetElement": scrollableRef,
      "refreshingText": refreshingText,
      "visible": isLoadPanelVisible
    })]
  })));
};

exports.viewFunction = viewFunction;

var ScrollableSimulated = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(ScrollableSimulated, _InfernoComponent);

  function ScrollableSimulated(props) {
    var _this;

    _this = _InfernoComponent.call(this, props) || this;
    _this.locked = false;
    _this.loadingIndicatorEnabled = true;
    _this.validDirections = {};
    _this.endActionDirections = {
      horizontal: false,
      vertical: false
    };
    _this.prevContainerClientWidth = 0;
    _this.prevContainerClientHeight = 0;
    _this.prevContentClientWidth = 0;
    _this.prevContentClientHeight = 0;
    _this.tabWasPressed = false;
    _this.savedScrollOffset = {
      top: 0,
      left: 0
    };
    _this.scrollableRef = (0, _inferno.createRef)();
    _this.wrapperRef = (0, _inferno.createRef)();
    _this.contentRef = (0, _inferno.createRef)();
    _this.scrollViewContentRef = (0, _inferno.createRef)();
    _this.containerRef = (0, _inferno.createRef)();
    _this.vScrollbarRef = (0, _inferno.createRef)();
    _this.hScrollbarRef = (0, _inferno.createRef)();
    _this.topPocketRef = (0, _inferno.createRef)();
    _this.bottomPocketRef = (0, _inferno.createRef)();
    _this.state = {
      isHovered: false,
      scrollableOffsetLeft: 0,
      scrollableOffsetTop: 0,
      containerClientWidth: 0,
      containerClientHeight: 0,
      contentScrollWidth: 0,
      contentScrollHeight: 0,
      contentClientWidth: 0,
      contentClientHeight: 0,
      topPocketClientHeight: 0,
      bottomPocketClientHeight: 0,
      topPocketState: _consts.TopPocketState.STATE_RELEASED,
      isLoadPanelVisible: false,
      vScrollLocation: 0,
      hScrollLocation: 0,
      vContentTranslateOffset: 0,
      hContentTranslateOffset: 0,
      forceUpdateHScrollbarLocation: false,
      forceUpdateVScrollbarLocation: false
    };
    _this.content = _this.content.bind(_assertThisInitialized(_this));
    _this.container = _this.container.bind(_assertThisInitialized(_this));
    _this.update = _this.update.bind(_assertThisInitialized(_this));
    _this.refresh = _this.refresh.bind(_assertThisInitialized(_this));
    _this.release = _this.release.bind(_assertThisInitialized(_this));
    _this.scrollBy = _this.scrollBy.bind(_assertThisInitialized(_this));
    _this.scrollTo = _this.scrollTo.bind(_assertThisInitialized(_this));
    _this.scrollToElement = _this.scrollToElement.bind(_assertThisInitialized(_this));
    _this.getElementLocation = _this.getElementLocation.bind(_assertThisInitialized(_this));
    _this.scrollHeight = _this.scrollHeight.bind(_assertThisInitialized(_this));
    _this.scrollWidth = _this.scrollWidth.bind(_assertThisInitialized(_this));
    _this.scrollOffset = _this.scrollOffset.bind(_assertThisInitialized(_this));
    _this.scrollTop = _this.scrollTop.bind(_assertThisInitialized(_this));
    _this.scrollLeft = _this.scrollLeft.bind(_assertThisInitialized(_this));
    _this.clientHeight = _this.clientHeight.bind(_assertThisInitialized(_this));
    _this.clientWidth = _this.clientWidth.bind(_assertThisInitialized(_this));
    _this.disposeWheelTimer = _this.disposeWheelTimer.bind(_assertThisInitialized(_this));
    _this.scrollEffect = _this.scrollEffect.bind(_assertThisInitialized(_this));
    _this.keyboardEffect = _this.keyboardEffect.bind(_assertThisInitialized(_this));
    _this.initEffect = _this.initEffect.bind(_assertThisInitialized(_this));
    _this.startEffect = _this.startEffect.bind(_assertThisInitialized(_this));
    _this.moveEffect = _this.moveEffect.bind(_assertThisInitialized(_this));
    _this.endEffect = _this.endEffect.bind(_assertThisInitialized(_this));
    _this.stopEffect = _this.stopEffect.bind(_assertThisInitialized(_this));
    _this.validate = _this.validate.bind(_assertThisInitialized(_this));
    _this.moveIsAllowed = _this.moveIsAllowed.bind(_assertThisInitialized(_this));
    _this.cancelEffect = _this.cancelEffect.bind(_assertThisInitialized(_this));
    _this.effectDisabledState = _this.effectDisabledState.bind(_assertThisInitialized(_this));
    _this.effectResetInactiveState = _this.effectResetInactiveState.bind(_assertThisInitialized(_this));
    _this.updateScrollbarSize = _this.updateScrollbarSize.bind(_assertThisInitialized(_this));
    _this.handleScroll = _this.handleScroll.bind(_assertThisInitialized(_this));
    _this.startLoading = _this.startLoading.bind(_assertThisInitialized(_this));
    _this.finishLoading = _this.finishLoading.bind(_assertThisInitialized(_this));
    _this.getEventArgs = _this.getEventArgs.bind(_assertThisInitialized(_this));
    _this.getInitEventData = _this.getInitEventData.bind(_assertThisInitialized(_this));
    _this.onStart = _this.onStart.bind(_assertThisInitialized(_this));
    _this.onEnd = _this.onEnd.bind(_assertThisInitialized(_this));
    _this.onUpdated = _this.onUpdated.bind(_assertThisInitialized(_this));
    _this.onBounce = _this.onBounce.bind(_assertThisInitialized(_this));
    _this.onPullDown = _this.onPullDown.bind(_assertThisInitialized(_this));
    _this.onRelease = _this.onRelease.bind(_assertThisInitialized(_this));
    _this.onReachBottom = _this.onReachBottom.bind(_assertThisInitialized(_this));
    _this.pocketStateChange = _this.pocketStateChange.bind(_assertThisInitialized(_this));
    _this.scrollLocationChange = _this.scrollLocationChange.bind(_assertThisInitialized(_this));
    _this.onScroll = _this.onScroll.bind(_assertThisInitialized(_this));
    _this.contentTranslateOffsetChange = _this.contentTranslateOffsetChange.bind(_assertThisInitialized(_this));
    _this.cursorEnterHandler = _this.cursorEnterHandler.bind(_assertThisInitialized(_this));
    _this.cursorLeaveHandler = _this.cursorLeaveHandler.bind(_assertThisInitialized(_this));
    _this.handleInit = _this.handleInit.bind(_assertThisInitialized(_this));
    _this.handleStart = _this.handleStart.bind(_assertThisInitialized(_this));
    _this.handleMove = _this.handleMove.bind(_assertThisInitialized(_this));
    _this.handleEnd = _this.handleEnd.bind(_assertThisInitialized(_this));
    _this.handleStop = _this.handleStop.bind(_assertThisInitialized(_this));
    _this.handleCancel = _this.handleCancel.bind(_assertThisInitialized(_this));
    _this.isCrossThumbScrolling = _this.isCrossThumbScrolling.bind(_assertThisInitialized(_this));
    _this.adjustDistance = _this.adjustDistance.bind(_assertThisInitialized(_this));
    _this.suppressDirections = _this.suppressDirections.bind(_assertThisInitialized(_this));
    _this.validateEvent = _this.validateEvent.bind(_assertThisInitialized(_this));
    _this.prepareDirections = _this.prepareDirections.bind(_assertThisInitialized(_this));
    _this.isContent = _this.isContent.bind(_assertThisInitialized(_this));
    _this.eventHandler = _this.eventHandler.bind(_assertThisInitialized(_this));
    _this.tryGetAllowedDirection = _this.tryGetAllowedDirection.bind(_assertThisInitialized(_this));
    _this.allowedDirection = _this.allowedDirection.bind(_assertThisInitialized(_this));
    _this.isLocked = _this.isLocked.bind(_assertThisInitialized(_this));
    _this.validateWheel = _this.validateWheel.bind(_assertThisInitialized(_this));
    _this.clearWheelValidationTimer = _this.clearWheelValidationTimer.bind(_assertThisInitialized(_this));
    _this.validateMove = _this.validateMove.bind(_assertThisInitialized(_this));
    _this.handleTabKey = _this.handleTabKey.bind(_assertThisInitialized(_this));
    _this.handleKeyDown = _this.handleKeyDown.bind(_assertThisInitialized(_this));
    _this.scrollByLine = _this.scrollByLine.bind(_assertThisInitialized(_this));
    _this.tryGetDevicePixelRatio = _this.tryGetDevicePixelRatio.bind(_assertThisInitialized(_this));
    _this.scrollByPage = _this.scrollByPage.bind(_assertThisInitialized(_this));
    _this.wheelDirection = _this.wheelDirection.bind(_assertThisInitialized(_this));
    _this.scrollToHome = _this.scrollToHome.bind(_assertThisInitialized(_this));
    _this.scrollToEnd = _this.scrollToEnd.bind(_assertThisInitialized(_this));
    _this.lock = _this.lock.bind(_assertThisInitialized(_this));
    _this.unlock = _this.unlock.bind(_assertThisInitialized(_this));
    _this.updateHandler = _this.updateHandler.bind(_assertThisInitialized(_this));
    _this.onVisibilityChangeHandler = _this.onVisibilityChangeHandler.bind(_assertThisInitialized(_this));
    _this.updateSizes = _this.updateSizes.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = ScrollableSimulated.prototype;

  _proto.createEffects = function createEffects() {
    return [new _vdom.InfernoEffect(this.disposeWheelTimer, []), new _vdom.InfernoEffect(this.scrollEffect, [this.state.hScrollLocation, this.state.vScrollLocation, this.props.direction, this.state.topPocketClientHeight]), new _vdom.InfernoEffect(this.keyboardEffect, []), new _vdom.InfernoEffect(this.initEffect, [this.props.direction, this.props.scrollByContent, this.props.scrollByThumb, this.state.contentScrollHeight, this.state.contentClientHeight, this.state.containerClientHeight, this.props.bounceEnabled, this.state.contentScrollWidth, this.state.contentClientWidth, this.state.containerClientWidth, this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.reachBottomEnabled, this.state.vScrollLocation, this.props.onUpdated, this.state.topPocketClientHeight, this.props.disabled]), new _vdom.InfernoEffect(this.startEffect, [this.props.direction, this.props.onStart, this.state.topPocketClientHeight]), new _vdom.InfernoEffect(this.moveEffect, [this.props.direction]), new _vdom.InfernoEffect(this.endEffect, [this.props.direction]), new _vdom.InfernoEffect(this.stopEffect, [this.props.direction]), new _vdom.InfernoEffect(this.cancelEffect, [this.props.direction]), new _vdom.InfernoEffect(this.effectDisabledState, [this.props.disabled]), new _vdom.InfernoEffect(this.effectResetInactiveState, [this.props.direction]), new _vdom.InfernoEffect(this.updateScrollbarSize, [this.state.isHovered, this.state.scrollableOffsetLeft, this.state.scrollableOffsetTop, this.state.containerClientWidth, this.state.containerClientHeight, this.state.contentScrollWidth, this.state.contentScrollHeight, this.state.contentClientWidth, this.state.contentClientHeight, this.state.topPocketClientHeight, this.state.bottomPocketClientHeight, this.state.topPocketState, this.state.isLoadPanelVisible, this.state.vScrollLocation, this.state.hScrollLocation, this.state.vContentTranslateOffset, this.state.hContentTranslateOffset, this.state.forceUpdateHScrollbarLocation, this.state.forceUpdateVScrollbarLocation, this.props.inertiaEnabled, this.props.useKeyboard, this.props.onStart, this.props.onEnd, this.props.onBounce, this.props.contentTranslateOffsetChange, this.props.scrollLocationChange, this.props.pocketStateChange, this.props.children, this.props.useNative, this.props.direction, this.props.showScrollbar, this.props.bounceEnabled, this.props.scrollByContent, this.props.scrollByThumb, this.props.classes, this.props.pullDownEnabled, this.props.reachBottomEnabled, this.props.forceGeneratePockets, this.props.needScrollViewContentWrapper, this.props.needScrollViewLoadPanel, this.props.onScroll, this.props.onUpdated, this.props.onPullDown, this.props.onReachBottom, this.props.useSimulatedScrollbar, this.props.pullingDownText, this.props.pulledDownText, this.props.refreshingText, this.props.reachBottomText, this.props.aria, this.props.onVisibilityChange, this.props.disabled, this.props.height, this.props.onKeyDown, this.props.rtlEnabled, this.props.visible, this.props.width])];
  };

  _proto.updateEffects = function updateEffects() {
    var _this$_effects$, _this$_effects$2, _this$_effects$3, _this$_effects$4, _this$_effects$5, _this$_effects$6, _this$_effects$7, _this$_effects$8, _this$_effects$9, _this$_effects$10, _this$_effects$11;

    (_this$_effects$ = this._effects[1]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.state.hScrollLocation, this.state.vScrollLocation, this.props.direction, this.state.topPocketClientHeight]);
    (_this$_effects$2 = this._effects[2]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([]);
    (_this$_effects$3 = this._effects[3]) === null || _this$_effects$3 === void 0 ? void 0 : _this$_effects$3.update([this.props.direction, this.props.scrollByContent, this.props.scrollByThumb, this.state.contentScrollHeight, this.state.contentClientHeight, this.state.containerClientHeight, this.props.bounceEnabled, this.state.contentScrollWidth, this.state.contentClientWidth, this.state.containerClientWidth, this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.reachBottomEnabled, this.state.vScrollLocation, this.props.onUpdated, this.state.topPocketClientHeight, this.props.disabled]);
    (_this$_effects$4 = this._effects[4]) === null || _this$_effects$4 === void 0 ? void 0 : _this$_effects$4.update([this.props.direction, this.props.onStart, this.state.topPocketClientHeight]);
    (_this$_effects$5 = this._effects[5]) === null || _this$_effects$5 === void 0 ? void 0 : _this$_effects$5.update([this.props.direction]);
    (_this$_effects$6 = this._effects[6]) === null || _this$_effects$6 === void 0 ? void 0 : _this$_effects$6.update([this.props.direction]);
    (_this$_effects$7 = this._effects[7]) === null || _this$_effects$7 === void 0 ? void 0 : _this$_effects$7.update([this.props.direction]);
    (_this$_effects$8 = this._effects[8]) === null || _this$_effects$8 === void 0 ? void 0 : _this$_effects$8.update([this.props.direction]);
    (_this$_effects$9 = this._effects[9]) === null || _this$_effects$9 === void 0 ? void 0 : _this$_effects$9.update([this.props.disabled]);
    (_this$_effects$10 = this._effects[10]) === null || _this$_effects$10 === void 0 ? void 0 : _this$_effects$10.update([this.props.direction]);
    (_this$_effects$11 = this._effects[11]) === null || _this$_effects$11 === void 0 ? void 0 : _this$_effects$11.update([this.state.isHovered, this.state.scrollableOffsetLeft, this.state.scrollableOffsetTop, this.state.containerClientWidth, this.state.containerClientHeight, this.state.contentScrollWidth, this.state.contentScrollHeight, this.state.contentClientWidth, this.state.contentClientHeight, this.state.topPocketClientHeight, this.state.bottomPocketClientHeight, this.state.topPocketState, this.state.isLoadPanelVisible, this.state.vScrollLocation, this.state.hScrollLocation, this.state.vContentTranslateOffset, this.state.hContentTranslateOffset, this.state.forceUpdateHScrollbarLocation, this.state.forceUpdateVScrollbarLocation, this.props.inertiaEnabled, this.props.useKeyboard, this.props.onStart, this.props.onEnd, this.props.onBounce, this.props.contentTranslateOffsetChange, this.props.scrollLocationChange, this.props.pocketStateChange, this.props.children, this.props.useNative, this.props.direction, this.props.showScrollbar, this.props.bounceEnabled, this.props.scrollByContent, this.props.scrollByThumb, this.props.classes, this.props.pullDownEnabled, this.props.reachBottomEnabled, this.props.forceGeneratePockets, this.props.needScrollViewContentWrapper, this.props.needScrollViewLoadPanel, this.props.onScroll, this.props.onUpdated, this.props.onPullDown, this.props.onReachBottom, this.props.useSimulatedScrollbar, this.props.pullingDownText, this.props.pulledDownText, this.props.refreshingText, this.props.reachBottomText, this.props.aria, this.props.onVisibilityChange, this.props.disabled, this.props.height, this.props.onKeyDown, this.props.rtlEnabled, this.props.visible, this.props.width]);
  };

  _proto.disposeWheelTimer = function disposeWheelTimer() {
    var _this2 = this;

    return function () {
      return _this2.clearWheelValidationTimer();
    };
  };

  _proto.scrollEffect = function scrollEffect() {
    var _this3 = this;

    return (0, _subscribe_to_event.subscribeToScrollEvent)(this.containerElement, function () {
      _this3.handleScroll();
    });
  };

  _proto.keyboardEffect = function keyboardEffect() {
    var _this4 = this;

    _short.keyDown.on(this.containerElement, function (event) {
      if ((0, _index.normalizeKeyName)(event) === _consts.KEY_CODES.TAB) {
        _this4.tabWasPressed = true;
      }
    });

    return function () {
      return _short.keyDown.off(_this4.containerElement);
    };
  };

  _proto.initEffect = function initEffect() {
    var _this5 = this;

    var namespace = "dxScrollable";

    _short.dxScrollInit.on(this.wrapperRef.current, function (event) {
      _this5.handleInit(event);
    }, this.getInitEventData(), {
      namespace: namespace
    });

    return function () {
      return _short.dxScrollInit.off(_this5.wrapperRef.current, {
        namespace: namespace
      });
    };
  };

  _proto.startEffect = function startEffect() {
    var _this6 = this;

    var namespace = "dxScrollable";

    _short.dxScrollStart.on(this.wrapperRef.current, function (event) {
      _this6.handleStart(event);
    }, {
      namespace: namespace
    });

    return function () {
      return _short.dxScrollStart.off(_this6.wrapperRef.current, {
        namespace: namespace
      });
    };
  };

  _proto.moveEffect = function moveEffect() {
    var _this7 = this;

    var namespace = "dxScrollable";

    _short.dxScrollMove.on(this.wrapperRef.current, function (event) {
      _this7.handleMove(event);
    }, {
      namespace: namespace
    });

    return function () {
      return _short.dxScrollMove.off(_this7.wrapperRef.current, {
        namespace: namespace
      });
    };
  };

  _proto.endEffect = function endEffect() {
    var _this8 = this;

    var namespace = "dxScrollable";

    _short.dxScrollEnd.on(this.wrapperRef.current, function (event) {
      _this8.handleEnd(event);
    }, {
      namespace: namespace
    });

    return function () {
      return _short.dxScrollEnd.off(_this8.wrapperRef.current, {
        namespace: namespace
      });
    };
  };

  _proto.stopEffect = function stopEffect() {
    var _this9 = this;

    var namespace = "dxScrollable";

    _short.dxScrollStop.on(this.wrapperRef.current, function () {
      _this9.handleStop();
    }, {
      namespace: namespace
    });

    return function () {
      return _short.dxScrollStop.off(_this9.wrapperRef.current, {
        namespace: namespace
      });
    };
  };

  _proto.cancelEffect = function cancelEffect() {
    var _this10 = this;

    var namespace = "dxScrollable";

    _short.dxScrollCancel.on(this.wrapperRef.current, function (event) {
      _this10.handleCancel(event);
    }, {
      namespace: namespace
    });

    return function () {
      return _short.dxScrollCancel.off(_this10.wrapperRef.current, {
        namespace: namespace
      });
    };
  };

  _proto.effectDisabledState = function effectDisabledState() {
    if (this.props.disabled) {
      this.lock();
    } else {
      this.unlock();
    }
  };

  _proto.effectResetInactiveState = function effectResetInactiveState() {
    if (this.props.direction === _consts.DIRECTION_BOTH || !(0, _type.isDefined)(this.containerElement)) {
      return;
    }

    this.containerElement[this.fullScrollInactiveProp] = 0;
  };

  _proto.updateScrollbarSize = function updateScrollbarSize() {
    var _this11 = this;

    this.setState(function (state) {
      return _extends({}, state, {
        scrollableOffsetLeft: _this11.scrollableOffset.left
      });
    });
    this.setState(function (state) {
      return _extends({}, state, {
        scrollableOffsetTop: _this11.scrollableOffset.top
      });
    });
    this.updateSizes();
  };

  _proto.handleScroll = function handleScroll() {
    var _this$props$onScroll, _this$props;

    this.handleTabKey();
    (_this$props$onScroll = (_this$props = this.props).onScroll) === null || _this$props$onScroll === void 0 ? void 0 : _this$props$onScroll.call(_this$props, this.getEventArgs());
  };

  _proto.startLoading = function startLoading() {
    if (this.loadingIndicatorEnabled && (0, _is_element_visible.isVisible)(this.scrollableRef.current)) {
      this.setState(function (state) {
        return _extends({}, state, {
          isLoadPanelVisible: true
        });
      });
    }

    this.lock();
  };

  _proto.finishLoading = function finishLoading() {
    this.setState(function (state) {
      return _extends({}, state, {
        isLoadPanelVisible: false
      });
    });
    this.unlock();
  };

  _proto.getEventArgs = function getEventArgs() {
    var scrollOffset = this.scrollOffset();
    return _extends({
      event: this.eventForUserAction,
      scrollOffset: scrollOffset
    }, (0, _get_boundary_props.getBoundaryProps)(this.props.direction, scrollOffset, this.containerElement, this.state.topPocketClientHeight));
  };

  _proto.getInitEventData = function getInitEventData() {
    return {
      getDirection: this.tryGetAllowedDirection,
      validate: this.validate,
      isNative: false,
      scrollTarget: this.containerElement
    };
  };

  _proto.onStart = function onStart() {
    var _this$props$onStart, _this$props2;

    (_this$props$onStart = (_this$props2 = this.props).onStart) === null || _this$props$onStart === void 0 ? void 0 : _this$props$onStart.call(_this$props2, this.getEventArgs());
  };

  _proto.onEnd = function onEnd(direction) {
    if (this.direction.isBoth) {
      this.endActionDirections[direction] = true;
      var _this$endActionDirect = this.endActionDirections,
          horizontal = _this$endActionDirect.horizontal,
          vertical = _this$endActionDirect.vertical;

      if (horizontal && vertical) {
        var _this$props$onEnd, _this$props3;

        this.endActionDirections.vertical = false;
        this.endActionDirections.horizontal = false;
        (_this$props$onEnd = (_this$props3 = this.props).onEnd) === null || _this$props$onEnd === void 0 ? void 0 : _this$props$onEnd.call(_this$props3, this.getEventArgs());
      }
    } else {
      var _this$props$onEnd2, _this$props4;

      (_this$props$onEnd2 = (_this$props4 = this.props).onEnd) === null || _this$props$onEnd2 === void 0 ? void 0 : _this$props$onEnd2.call(_this$props4, this.getEventArgs());
    }
  };

  _proto.onUpdated = function onUpdated() {
    var _this$props$onUpdated, _this$props5;

    (_this$props$onUpdated = (_this$props5 = this.props).onUpdated) === null || _this$props$onUpdated === void 0 ? void 0 : _this$props$onUpdated.call(_this$props5, this.getEventArgs());
  };

  _proto.onBounce = function onBounce() {
    var _this$props$onBounce, _this$props6;

    (_this$props$onBounce = (_this$props6 = this.props).onBounce) === null || _this$props$onBounce === void 0 ? void 0 : _this$props$onBounce.call(_this$props6, this.getEventArgs());
  };

  _proto.onPullDown = function onPullDown() {
    var _this$props$onPullDow, _this$props7;

    this.loadingIndicatorEnabled = false;
    this.startLoading();
    (_this$props$onPullDow = (_this$props7 = this.props).onPullDown) === null || _this$props$onPullDow === void 0 ? void 0 : _this$props$onPullDow.call(_this$props7, {});
  };

  _proto.onRelease = function onRelease() {
    this.loadingIndicatorEnabled = true;
    this.finishLoading();
    this.onUpdated();
  };

  _proto.onReachBottom = function onReachBottom() {
    var _this$props$onReachBo, _this$props8;

    this.loadingIndicatorEnabled = false;
    this.startLoading();
    (_this$props$onReachBo = (_this$props8 = this.props).onReachBottom) === null || _this$props$onReachBo === void 0 ? void 0 : _this$props$onReachBo.call(_this$props8, {});
  };

  _proto.pocketStateChange = function pocketStateChange(newState) {
    this.setState(function (state) {
      return _extends({}, state, {
        topPocketState: newState
      });
    });
  };

  _proto.scrollLocationChange = function scrollLocationChange(scrollProp, location) {
    var containerEl = this.containerElement;
    containerEl[scrollProp] = -location;

    if (scrollProp === "scrollLeft") {
      this.setState(function (state) {
        return _extends({}, state, {
          hScrollLocation: location
        });
      });
    } else {
      this.setState(function (state) {
        return _extends({}, state, {
          vScrollLocation: location
        });
      });
    }

    this.setState(function (state) {
      return _extends({}, state, {
        forceUpdateHScrollbarLocation: false
      });
    });
    this.setState(function (state) {
      return _extends({}, state, {
        forceUpdateVScrollbarLocation: false
      });
    });
  };

  _proto.onScroll = function onScroll() {
    _events_engine.default.triggerHandler(this.containerElement, {
      type: "scroll"
    });
  };

  _proto.contentTranslateOffsetChange = function contentTranslateOffsetChange(prop, translateOffset) {
    if (prop === "top") {
      this.setState(function (state) {
        return _extends({}, state, {
          vContentTranslateOffset: translateOffset
        });
      });
    } else {
      this.setState(function (state) {
        return _extends({}, state, {
          hContentTranslateOffset: translateOffset
        });
      });
    }
  };

  _proto.cursorEnterHandler = function cursorEnterHandler() {
    if (this.props.showScrollbar === "onHover") {
      this.setState(function (state) {
        return _extends({}, state, {
          isHovered: true
        });
      });
    }
  };

  _proto.cursorLeaveHandler = function cursorLeaveHandler() {
    if (this.props.showScrollbar === "onHover") {
      this.setState(function (state) {
        return _extends({}, state, {
          isHovered: false
        });
      });
    }
  };

  _proto.handleInit = function handleInit(event) {
    this.suppressDirections(event);
    this.eventForUserAction = event;
    var crossThumbScrolling = this.isCrossThumbScrolling(event);
    this.eventHandler(function (scrollbar) {
      return scrollbar.initHandler(event, crossThumbScrolling);
    });
  };

  _proto.handleStart = function handleStart(event) {
    this.eventForUserAction = event;
    this.eventHandler(function (scrollbar) {
      return scrollbar.startHandler();
    });
    this.onStart();
  };

  _proto.handleMove = function handleMove(e) {
    var _e$preventDefault;

    if (this.isLocked()) {
      e.cancel = true;
      return;
    }

    (_e$preventDefault = e.preventDefault) === null || _e$preventDefault === void 0 ? void 0 : _e$preventDefault.call(e);
    this.adjustDistance(e, "delta");
    this.eventForUserAction = e;
    this.eventHandler(function (scrollbar) {
      return scrollbar.moveHandler(e.delta);
    });
  };

  _proto.handleEnd = function handleEnd(event) {
    this.adjustDistance(event, "velocity");
    this.eventForUserAction = event;
    this.eventHandler(function (scrollbar) {
      return scrollbar.endHandler(event.velocity);
    });
  };

  _proto.handleStop = function handleStop() {
    this.eventHandler(function (scrollbar) {
      return scrollbar.stopHandler();
    });
  };

  _proto.handleCancel = function handleCancel(event) {
    this.eventForUserAction = event;
    this.eventHandler(function (scrollbar) {
      return scrollbar.endHandler({
        x: 0,
        y: 0
      });
    });
  };

  _proto.isCrossThumbScrolling = function isCrossThumbScrolling(event) {
    var target = event.originalEvent.target;
    var verticalScrolling = false;
    var horizontalScrolling = false;

    if (this.direction.isVertical) {
      verticalScrolling = this.props.scrollByThumb && this.vScrollbarRef.current.isThumb(target);
    }

    if (this.direction.isHorizontal) {
      horizontalScrolling = this.props.scrollByThumb && this.hScrollbarRef.current.isThumb(target);
    }

    return verticalScrolling || horizontalScrolling;
  };

  _proto.adjustDistance = function adjustDistance(event, property) {
    var distance = event[property];
    distance.x *= this.validDirections[_consts.DIRECTION_HORIZONTAL] ? 1 : 0;
    distance.y *= this.validDirections[_consts.DIRECTION_VERTICAL] ? 1 : 0;
    var devicePixelRatio = this.tryGetDevicePixelRatio();

    if (devicePixelRatio && (0, _index.isDxMouseWheelEvent)(event.originalEvent)) {
      distance.x = Math.round(distance.x / devicePixelRatio * 100) / 100;
      distance.y = Math.round(distance.y / devicePixelRatio * 100) / 100;
    }
  };

  _proto.suppressDirections = function suppressDirections(event) {
    if ((0, _index.isDxMouseWheelEvent)(event.originalEvent)) {
      this.prepareDirections(true);
      return;
    }

    this.prepareDirections(false);

    if (this.direction.isVertical) {
      var isValid = this.validateEvent(event, this.vScrollbarRef.current);
      this.validDirections[_consts.DIRECTION_VERTICAL] = isValid;
    }

    if (this.direction.isHorizontal) {
      var _isValid = this.validateEvent(event, this.hScrollbarRef.current);

      this.validDirections[_consts.DIRECTION_HORIZONTAL] = _isValid;
    }
  };

  _proto.validateEvent = function validateEvent(event, scrollbarRef) {
    var _this$props9 = this.props,
        scrollByContent = _this$props9.scrollByContent,
        scrollByThumb = _this$props9.scrollByThumb;
    return scrollByThumb && scrollbarRef.validateEvent(event) || scrollByContent && this.isContent(event.originalEvent.target);
  };

  _proto.prepareDirections = function prepareDirections(value) {
    this.validDirections[_consts.DIRECTION_HORIZONTAL] = value;
    this.validDirections[_consts.DIRECTION_VERTICAL] = value;
  };

  _proto.isContent = function isContent(element) {
    var closest = element.closest(".".concat(_consts.SCROLLABLE_SIMULATED_CLASS));

    if ((0, _type.isDefined)(closest)) {
      return closest === this.scrollableRef.current;
    }

    return false;
  };

  _proto.eventHandler = function eventHandler(handler) {
    if (this.direction.isHorizontal) {
      handler(this.hScrollbarRef.current);
    }

    if (this.direction.isVertical) {
      handler(this.vScrollbarRef.current);
    }
  };

  _proto.tryGetAllowedDirection = function tryGetAllowedDirection(event) {
    return (0, _index.isDxMouseWheelEvent)(event) ? this.wheelDirection(event) : this.allowedDirection();
  };

  _proto.allowedDirection = function allowedDirection() {
    if (this.direction.isBoth && this.allowedDirections.vertical && this.allowedDirections.horizontal) {
      return _consts.DIRECTION_BOTH;
    }

    if (this.direction.isHorizontal && this.allowedDirections.horizontal) {
      return _consts.DIRECTION_HORIZONTAL;
    }

    if (this.direction.isVertical && this.allowedDirections.vertical) {
      return _consts.DIRECTION_VERTICAL;
    }

    return undefined;
  };

  _proto.isLocked = function isLocked() {
    return this.locked;
  };

  _proto.validateWheel = function validateWheel(event) {
    var scrollbar = this.wheelDirection(event) === "horizontal" ? this.hScrollbarRef.current : this.vScrollbarRef.current;
    var reachedMin = scrollbar.reachedMin();
    var reachedMax = scrollbar.reachedMax();
    var contentGreaterThanContainer = !reachedMin || !reachedMax;
    var locatedNotAtBound = !reachedMin && !reachedMax;
    var scrollFromMin = reachedMin && event.delta > 0;
    var scrollFromMax = reachedMax && event.delta < 0;
    var validated = contentGreaterThanContainer && (locatedNotAtBound || scrollFromMin || scrollFromMax);
    validated = validated || this.validateWheelTimer !== undefined;

    if (validated) {
      this.clearWheelValidationTimer();
      this.validateWheelTimer = setTimeout(this.clearWheelValidationTimer, _consts.VALIDATE_WHEEL_TIMEOUT);
    }

    return validated;
  };

  _proto.clearWheelValidationTimer = function clearWheelValidationTimer() {
    clearTimeout(this.validateWheelTimer);
    this.validateWheelTimer = undefined;
  };

  _proto.validateMove = function validateMove(event) {
    if (!this.props.scrollByContent && !(0, _type.isDefined)(event.target.closest(".".concat(_consts.SCROLLABLE_SCROLLBAR_CLASS)))) {
      return false;
    }

    return (0, _type.isDefined)(this.allowedDirection());
  };

  _proto.handleTabKey = function handleTabKey() {
    if (this.tabWasPressed) {
      var _this$scrollOffset = this.scrollOffset(),
          left = _this$scrollOffset.left,
          top = _this$scrollOffset.top;

      if ((0, _math.inRange)(this.state.hScrollLocation, -(0, _get_scroll_left_max.getScrollLeftMax)(this.containerElement), 0) && (0, _math.inRange)(this.state.vScrollLocation, -(0, _get_scroll_top_max.getScrollTopMax)(this.containerElement), 0)) {
        if (this.state.hScrollLocation !== -left) {
          this.setState(function (state) {
            return _extends({}, state, {
              hScrollLocation: -left
            });
          });
        }

        if (this.state.vScrollLocation !== -top) {
          this.setState(function (state) {
            return _extends({}, state, {
              vScrollLocation: -top
            });
          });
        }
      }

      this.tabWasPressed = false;
    }
  };

  _proto.handleKeyDown = function handleKeyDown(event) {
    var handled = true;

    switch ((0, _index.normalizeKeyName)(event)) {
      case _consts.KEY_CODES.TAB:
        this.tabWasPressed = true;
        handled = false;
        break;

      case _consts.KEY_CODES.DOWN:
        this.scrollByLine({
          y: 1
        });
        break;

      case _consts.KEY_CODES.UP:
        this.scrollByLine({
          y: -1
        });
        break;

      case _consts.KEY_CODES.RIGHT:
        this.scrollByLine({
          x: 1
        });
        break;

      case _consts.KEY_CODES.LEFT:
        this.scrollByLine({
          x: -1
        });
        break;

      case _consts.KEY_CODES.PAGE_DOWN:
        this.scrollByPage(1);
        break;

      case _consts.KEY_CODES.PAGE_UP:
        this.scrollByPage(-1);
        break;

      case _consts.KEY_CODES.HOME:
        this.scrollToHome();
        break;

      case _consts.KEY_CODES.END:
        this.scrollToEnd();
        break;

      default:
        handled = false;
        break;
    }

    if (handled) {
      event.originalEvent.stopPropagation();
      event.originalEvent.preventDefault();
    }
  };

  _proto.scrollByLine = function scrollByLine(lines) {
    var _lines$y, _lines$x;

    var devicePixelRatio = this.tryGetDevicePixelRatio();
    var scrollOffset = _consts.SCROLL_LINE_HEIGHT;

    if (devicePixelRatio) {
      scrollOffset = Math.abs(scrollOffset / devicePixelRatio * 100) / 100;
    }

    this.scrollBy({
      top: ((_lines$y = lines.y) !== null && _lines$y !== void 0 ? _lines$y : 0) * scrollOffset,
      left: ((_lines$x = lines.x) !== null && _lines$x !== void 0 ? _lines$x : 0) * scrollOffset
    });
  };

  _proto.tryGetDevicePixelRatio = function tryGetDevicePixelRatio() {
    if ((0, _window.hasWindow)()) {
      return (0, _window.getWindow)().devicePixelRatio;
    }

    return undefined;
  };

  _proto.scrollByPage = function scrollByPage(page) {
    var _ScrollDirection = new _scroll_direction.ScrollDirection(this.wheelDirection()),
        isVertical = _ScrollDirection.isVertical;

    var distance = {};
    var _this$containerElemen = this.containerElement,
        clientHeight = _this$containerElemen.clientHeight,
        clientWidth = _this$containerElemen.clientWidth;

    if (isVertical) {
      distance.top = page * clientHeight;
    } else {
      distance.left = page * clientWidth;
    }

    this.scrollBy(distance);
  };

  _proto.wheelDirection = function wheelDirection(event) {
    switch (this.props.direction) {
      case _consts.DIRECTION_HORIZONTAL:
        return _consts.DIRECTION_HORIZONTAL;

      case _consts.DIRECTION_VERTICAL:
        return _consts.DIRECTION_VERTICAL;

      default:
        return event !== null && event !== void 0 && event.shiftKey ? _consts.DIRECTION_HORIZONTAL : _consts.DIRECTION_VERTICAL;
    }
  };

  _proto.scrollToHome = function scrollToHome() {
    var distance = _defineProperty({}, this.direction.isVertical ? "top" : "left", 0);

    this.scrollTo(distance);
  };

  _proto.scrollToEnd = function scrollToEnd() {
    var _ScrollDirection2 = new _scroll_direction.ScrollDirection(this.wheelDirection()),
        isVertical = _ScrollDirection2.isVertical;

    var distance = {};

    if (isVertical) {
      distance.top = (0, _get_scroll_top_max.getScrollTopMax)(this.containerElement);
    } else {
      distance.left = (0, _get_scroll_left_max.getScrollLeftMax)(this.containerElement);
    }

    this.scrollTo(distance);
  };

  _proto.lock = function lock() {
    this.locked = true;
  };

  _proto.unlock = function unlock() {
    if (!this.props.disabled) {
      this.locked = false;
    }
  };

  _proto.updateHandler = function updateHandler() {
    this.update();
  };

  _proto.onVisibilityChangeHandler = function onVisibilityChangeHandler(visible) {
    var _this$props$onVisibil, _this$props10;

    if (visible) {
      this.updateHandler();

      if (this.savedScrollOffset) {
        this.containerElement.scrollTop = this.savedScrollOffset.top;
        this.containerElement.scrollLeft = this.savedScrollOffset.left;
      }

      this.savedScrollOffset = undefined;
    } else {
      this.savedScrollOffset = this.scrollOffset();
    }

    (_this$props$onVisibil = (_this$props10 = this.props).onVisibilityChange) === null || _this$props$onVisibil === void 0 ? void 0 : _this$props$onVisibil.call(_this$props10, visible);
  };

  _proto.updateSizes = function updateSizes() {
    var containerEl = this.containerElement;
    var contentEl = this.contentRef.current;

    if ((0, _type.isDefined)(containerEl)) {
      this.setState(function (state) {
        return _extends({}, state, {
          containerClientWidth: containerEl.clientWidth
        });
      });
      this.setState(function (state) {
        return _extends({}, state, {
          containerClientHeight: containerEl.clientHeight
        });
      });
    }

    if ((0, _type.isDefined)(contentEl)) {
      this.setState(function (state) {
        return _extends({}, state, {
          contentClientWidth: contentEl.clientWidth
        });
      });
      this.setState(function (state) {
        return _extends({}, state, {
          contentClientHeight: contentEl.clientHeight
        });
      });
      this.setState(function (state) {
        return _extends({}, state, {
          contentScrollWidth: contentEl.scrollWidth
        });
      });
      this.setState(function (state) {
        return _extends({}, state, {
          contentScrollHeight: contentEl.scrollHeight
        });
      });
    }

    if (this.props.forceGeneratePockets) {
      if (this.props.pullDownEnabled) {
        var topPocketEl = this.topPocketRef.current;

        if ((0, _type.isDefined)(topPocketEl)) {
          this.setState(function (state) {
            return _extends({}, state, {
              topPocketClientHeight: topPocketEl.clientHeight
            });
          });
        }
      }

      if (this.props.reachBottomEnabled) {
        var bottomPocketEl = this.bottomPocketRef.current;

        if ((0, _type.isDefined)(bottomPocketEl)) {
          this.setState(function (state) {
            return _extends({}, state, {
              bottomPocketClientHeight: bottomPocketEl.clientHeight
            });
          });
        }
      }
    }

    if (this.prevContentClientWidth !== this.state.contentClientWidth || this.prevContainerClientWidth !== this.state.containerClientWidth) {
      this.setState(function (state) {
        return _extends({}, state, {
          forceUpdateHScrollbarLocation: true
        });
      });
      this.prevContentClientWidth = this.state.contentClientWidth;
      this.prevContainerClientWidth = this.state.containerClientWidth;
      this.setState(function (state) {
        return _extends({}, state, {
          hScrollLocation: -containerEl.scrollLeft
        });
      });
    }

    if (this.prevContentClientHeight !== this.state.contentClientHeight || this.prevContainerClientHeight !== this.state.containerClientHeight) {
      this.setState(function (state) {
        return _extends({}, state, {
          forceUpdateVScrollbarLocation: true
        });
      });
      this.prevContentClientHeight = this.state.contentClientHeight;
      this.prevContainerClientHeight = this.state.containerClientHeight;

      if (this.state.vScrollLocation <= 0) {
        this.setState(function (state) {
          return _extends({}, state, {
            vScrollLocation: -containerEl.scrollTop
          });
        });
      }
    }
  };

  _proto.content = function content() {
    if (this.props.needScrollViewContentWrapper) {
      return this.scrollViewContentRef.current;
    }

    return this.contentRef.current;
  };

  _proto.container = function container() {
    return this.containerRef.current;
  };

  _proto.update = function update() {
    this.updateSizes();
    this.onUpdated();
  };

  _proto.refresh = function refresh() {
    var _this$props$onPullDow2, _this$props11;

    this.pocketStateChange(_consts.TopPocketState.STATE_READY);
    this.startLoading();
    (_this$props$onPullDow2 = (_this$props11 = this.props).onPullDown) === null || _this$props$onPullDow2 === void 0 ? void 0 : _this$props$onPullDow2.call(_this$props11, {});
  };

  _proto.release = function release() {
    this.eventHandler(function (scrollbar) {
      return scrollbar.releaseHandler();
    });
  };

  _proto.scrollBy = function scrollBy(distance) {
    var location = (0, _restore_location.restoreLocation)(distance, this.props.direction);

    if (!location.top && !location.left) {
      return;
    }

    this.update();

    if (this.direction.isVertical) {
      var scrollbar = this.vScrollbarRef.current;
      location.top = scrollbar.getLocationWithinRange(location.top + this.state.vScrollLocation) - this.state.vScrollLocation;
    }

    if (this.direction.isHorizontal) {
      var _scrollbar = this.hScrollbarRef.current;
      location.left = _scrollbar.getLocationWithinRange(location.left + this.state.hScrollLocation) - this.state.hScrollLocation;
    }

    this.prepareDirections(true);
    this.onStart();
    this.eventHandler(function (scrollbar) {
      var _location$left, _location$top;

      return scrollbar.scrollByHandler({
        x: (_location$left = location.left) !== null && _location$left !== void 0 ? _location$left : 0,
        y: (_location$top = location.top) !== null && _location$top !== void 0 ? _location$top : 0
      });
    });
  };

  _proto.scrollTo = function scrollTo(targetLocation) {
    var direction = this.props.direction;
    var distance = (0, _get_offset_distance.getOffsetDistance)(targetLocation, direction, this.scrollOffset());
    this.scrollBy(distance);
  };

  _proto.scrollToElement = function scrollToElement(element, scrollToOptions) {
    if (!(0, _type.isDefined)(element)) {
      return;
    }

    var _this$scrollOffset2 = this.scrollOffset(),
        left = _this$scrollOffset2.left,
        top = _this$scrollOffset2.top;

    element.scrollIntoView(scrollToOptions || {
      block: "nearest",
      inline: "nearest"
    });
    var containerEl = this.containerElement;
    var direction = this.props.direction;
    var distance = (0, _get_offset_distance.getOffsetDistance)({
      top: top,
      left: left
    }, direction, this.scrollOffset());

    if (!this.direction.isHorizontal) {
      containerEl.scrollLeft += distance.left;
    }

    if (!this.direction.isVertical) {
      containerEl.scrollTop += distance.top;
    }

    this.setState(function (state) {
      return _extends({}, state, {
        vScrollLocation: -containerEl.scrollTop
      });
    });
    this.setState(function (state) {
      return _extends({}, state, {
        hScrollLocation: -containerEl.scrollLeft
      });
    });
  };

  _proto.getElementLocation = function getElementLocation(element, direction, offset) {
    return (0, _get_element_location_internal.getElementLocationInternal)(element, _extends({
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }, offset), direction, this.containerElement);
  };

  _proto.scrollHeight = function scrollHeight() {
    return this.content().offsetHeight;
  };

  _proto.scrollWidth = function scrollWidth() {
    return this.content().offsetWidth;
  };

  _proto.scrollOffset = function scrollOffset() {
    var _this$containerElemen2 = this.containerElement,
        scrollLeft = _this$containerElemen2.scrollLeft,
        scrollTop = _this$containerElemen2.scrollTop;
    return {
      top: scrollTop,
      left: scrollLeft
    };
  };

  _proto.scrollTop = function scrollTop() {
    return this.scrollOffset().top;
  };

  _proto.scrollLeft = function scrollLeft() {
    return this.scrollOffset().left;
  };

  _proto.clientHeight = function clientHeight() {
    return this.containerElement.clientHeight;
  };

  _proto.clientWidth = function clientWidth() {
    return this.containerElement.clientWidth;
  };

  _proto.validate = function validate(event) {
    if (this.isLocked()) {
      return false;
    }

    this.update();
    return this.moveIsAllowed(event);
  };

  _proto.moveIsAllowed = function moveIsAllowed(event) {
    if (this.props.disabled || (0, _index.isDxMouseWheelEvent)(event) && (0, _index.isCommandKeyPressed)({
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey
    })) {
      return false;
    }

    if (this.props.bounceEnabled) {
      return true;
    }

    return (0, _index.isDxMouseWheelEvent)(event) ? this.validateWheel(event) : this.validateMove(event);
  };

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      isHovered: this.state.isHovered,
      scrollableOffsetLeft: this.state.scrollableOffsetLeft,
      scrollableOffsetTop: this.state.scrollableOffsetTop,
      containerClientWidth: this.state.containerClientWidth,
      containerClientHeight: this.state.containerClientHeight,
      contentScrollWidth: this.state.contentScrollWidth,
      contentScrollHeight: this.state.contentScrollHeight,
      contentClientWidth: this.state.contentClientWidth,
      contentClientHeight: this.state.contentClientHeight,
      topPocketClientHeight: this.state.topPocketClientHeight,
      bottomPocketClientHeight: this.state.bottomPocketClientHeight,
      topPocketState: this.state.topPocketState,
      isLoadPanelVisible: this.state.isLoadPanelVisible,
      vScrollLocation: this.state.vScrollLocation,
      hScrollLocation: this.state.hScrollLocation,
      vContentTranslateOffset: this.state.vContentTranslateOffset,
      hContentTranslateOffset: this.state.hContentTranslateOffset,
      forceUpdateHScrollbarLocation: this.state.forceUpdateHScrollbarLocation,
      forceUpdateVScrollbarLocation: this.state.forceUpdateVScrollbarLocation,
      scrollableRef: this.scrollableRef,
      wrapperRef: this.wrapperRef,
      contentRef: this.contentRef,
      scrollViewContentRef: this.scrollViewContentRef,
      containerRef: this.containerRef,
      topPocketRef: this.topPocketRef,
      bottomPocketRef: this.bottomPocketRef,
      vScrollbarRef: this.vScrollbarRef,
      hScrollbarRef: this.hScrollbarRef,
      handleScroll: this.handleScroll,
      startLoading: this.startLoading,
      finishLoading: this.finishLoading,
      getEventArgs: this.getEventArgs,
      getInitEventData: this.getInitEventData,
      onStart: this.onStart,
      onEnd: this.onEnd,
      onUpdated: this.onUpdated,
      onBounce: this.onBounce,
      onPullDown: this.onPullDown,
      onRelease: this.onRelease,
      onReachBottom: this.onReachBottom,
      pocketStateChange: this.pocketStateChange,
      scrollLocationChange: this.scrollLocationChange,
      onScroll: this.onScroll,
      contentTranslateOffsetChange: this.contentTranslateOffsetChange,
      cursorEnterHandler: this.cursorEnterHandler,
      cursorLeaveHandler: this.cursorLeaveHandler,
      handleInit: this.handleInit,
      handleStart: this.handleStart,
      handleMove: this.handleMove,
      handleEnd: this.handleEnd,
      handleStop: this.handleStop,
      handleCancel: this.handleCancel,
      isCrossThumbScrolling: this.isCrossThumbScrolling,
      adjustDistance: this.adjustDistance,
      suppressDirections: this.suppressDirections,
      validateEvent: this.validateEvent,
      prepareDirections: this.prepareDirections,
      isContent: this.isContent,
      eventHandler: this.eventHandler,
      tryGetAllowedDirection: this.tryGetAllowedDirection,
      allowedDirection: this.allowedDirection,
      allowedDirections: this.allowedDirections,
      isLocked: this.isLocked,
      validateWheel: this.validateWheel,
      clearWheelValidationTimer: this.clearWheelValidationTimer,
      validateMove: this.validateMove,
      handleTabKey: this.handleTabKey,
      handleKeyDown: this.handleKeyDown,
      scrollByLine: this.scrollByLine,
      tryGetDevicePixelRatio: this.tryGetDevicePixelRatio,
      scrollByPage: this.scrollByPage,
      wheelDirection: this.wheelDirection,
      scrollToHome: this.scrollToHome,
      scrollToEnd: this.scrollToEnd,
      lock: this.lock,
      unlock: this.unlock,
      fullScrollInactiveProp: this.fullScrollInactiveProp,
      updateHandler: this.updateHandler,
      onVisibilityChangeHandler: this.onVisibilityChangeHandler,
      updateSizes: this.updateSizes,
      containerElement: this.containerElement,
      contentWidth: this.contentWidth,
      contentHeight: this.contentHeight,
      scrollableOffset: this.scrollableOffset,
      contentStyles: this.contentStyles,
      containerStyles: this.containerStyles,
      cssClasses: this.cssClasses,
      direction: this.direction,
      restAttributes: this.restAttributes
    });
  };

  _createClass(ScrollableSimulated, [{
    key: "allowedDirections",
    get: function get() {
      return {
        vertical: this.direction.isVertical && (Math.round(-Math.max(this.contentHeight - this.state.containerClientHeight, 0)) < 0 || this.props.bounceEnabled),
        horizontal: this.direction.isHorizontal && (Math.round(-Math.max(this.contentWidth - this.state.containerClientWidth, 0)) < 0 || this.props.bounceEnabled)
      };
    }
  }, {
    key: "fullScrollInactiveProp",
    get: function get() {
      return this.props.direction === _consts.DIRECTION_HORIZONTAL ? "scrollTop" : "scrollLeft";
    }
  }, {
    key: "containerElement",
    get: function get() {
      return this.containerRef.current;
    }
  }, {
    key: "contentWidth",
    get: function get() {
      var _this$contentRef;

      if (!(0, _type.isDefined)((_this$contentRef = this.contentRef) === null || _this$contentRef === void 0 ? void 0 : _this$contentRef.current)) {
        return 0;
      }

      var isOverflowHidden = (0, _get_computed_style.default)(this.contentRef.current).overflowX === "hidden";

      if (!isOverflowHidden) {
        var containerScrollSize = this.state.contentScrollWidth;
        return Math.max(containerScrollSize, this.state.contentClientWidth);
      }

      return this.state.contentClientWidth;
    }
  }, {
    key: "contentHeight",
    get: function get() {
      var _this$contentRef2;

      if (!(0, _type.isDefined)((_this$contentRef2 = this.contentRef) === null || _this$contentRef2 === void 0 ? void 0 : _this$contentRef2.current)) {
        return 0;
      }

      var isOverflowHidden = (0, _get_computed_style.default)(this.contentRef.current).overflowY === "hidden";

      if (!isOverflowHidden) {
        var containerScrollSize = this.state.contentScrollHeight;
        return Math.max(containerScrollSize, this.state.contentClientHeight);
      }

      return this.state.contentClientHeight;
    }
  }, {
    key: "scrollableOffset",
    get: function get() {
      var _getElementOffset;

      return (_getElementOffset = (0, _get_element_offset.getElementOffset)(this.scrollableRef.current)) !== null && _getElementOffset !== void 0 ? _getElementOffset : DEFAULT_OFFSET;
    }
  }, {
    key: "contentStyles",
    get: function get() {
      return {
        transform: "translate(".concat(this.state.hContentTranslateOffset, "px, ").concat(this.state.vContentTranslateOffset, "px)")
      };
    }
  }, {
    key: "containerStyles",
    get: function get() {
      var touchDirection = this.allowedDirections.vertical ? "pan-x" : "";
      touchDirection = this.allowedDirections.horizontal ? "pan-y" : touchDirection;
      touchDirection = this.allowedDirections.vertical && this.allowedDirections.horizontal ? "none" : touchDirection;
      return {
        touchAction: touchDirection
      };
    }
  }, {
    key: "cssClasses",
    get: function get() {
      var _classesMap;

      var _this$props12 = this.props,
          classes = _this$props12.classes,
          direction = _this$props12.direction,
          disabled = _this$props12.disabled,
          showScrollbar = _this$props12.showScrollbar;
      var classesMap = (_classesMap = {
        "dx-scrollable dx-scrollable-renovated": true
      }, _defineProperty(_classesMap, _consts.SCROLLABLE_SIMULATED_CLASS, true), _defineProperty(_classesMap, "dx-scrollable-".concat(direction), true), _defineProperty(_classesMap, _consts.SCROLLABLE_DISABLED_CLASS, !!disabled), _defineProperty(_classesMap, _consts.SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE, showScrollbar === "always"), _defineProperty(_classesMap, "".concat(classes), !!classes), _classesMap);
      return (0, _combine_classes.combineClasses)(classesMap);
    }
  }, {
    key: "direction",
    get: function get() {
      return new _scroll_direction.ScrollDirection(this.props.direction);
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props13 = this.props,
          aria = _this$props13.aria,
          bounceEnabled = _this$props13.bounceEnabled,
          children = _this$props13.children,
          classes = _this$props13.classes,
          contentTranslateOffsetChange = _this$props13.contentTranslateOffsetChange,
          direction = _this$props13.direction,
          disabled = _this$props13.disabled,
          forceGeneratePockets = _this$props13.forceGeneratePockets,
          height = _this$props13.height,
          inertiaEnabled = _this$props13.inertiaEnabled,
          needScrollViewContentWrapper = _this$props13.needScrollViewContentWrapper,
          needScrollViewLoadPanel = _this$props13.needScrollViewLoadPanel,
          onBounce = _this$props13.onBounce,
          onEnd = _this$props13.onEnd,
          onKeyDown = _this$props13.onKeyDown,
          onPullDown = _this$props13.onPullDown,
          onReachBottom = _this$props13.onReachBottom,
          onScroll = _this$props13.onScroll,
          onStart = _this$props13.onStart,
          onUpdated = _this$props13.onUpdated,
          onVisibilityChange = _this$props13.onVisibilityChange,
          pocketStateChange = _this$props13.pocketStateChange,
          pullDownEnabled = _this$props13.pullDownEnabled,
          pulledDownText = _this$props13.pulledDownText,
          pullingDownText = _this$props13.pullingDownText,
          reachBottomEnabled = _this$props13.reachBottomEnabled,
          reachBottomText = _this$props13.reachBottomText,
          refreshingText = _this$props13.refreshingText,
          rtlEnabled = _this$props13.rtlEnabled,
          scrollByContent = _this$props13.scrollByContent,
          scrollByThumb = _this$props13.scrollByThumb,
          scrollLocationChange = _this$props13.scrollLocationChange,
          showScrollbar = _this$props13.showScrollbar,
          useKeyboard = _this$props13.useKeyboard,
          useNative = _this$props13.useNative,
          useSimulatedScrollbar = _this$props13.useSimulatedScrollbar,
          visible = _this$props13.visible,
          width = _this$props13.width,
          restProps = _objectWithoutProperties(_this$props13, _excluded);

      return restProps;
    }
  }]);

  return ScrollableSimulated;
}(_vdom.InfernoComponent);

exports.ScrollableSimulated = ScrollableSimulated;
ScrollableSimulated.defaultProps = _extends({}, _scrollable_simulated_props.ScrollableSimulatedPropsType);
