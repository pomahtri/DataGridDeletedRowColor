/**
* DevExtreme (cjs/renovation/ui/scroll_view/scrollable_native.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.ScrollableNative = exports.ScrollableNativePropsType = exports.ScrollableNativeProps = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _subscribe_to_event = require("../../utils/subscribe_to_event");

var _widget = require("../common/widget");

var _load_panel = require("./load_panel");

var _combine_classes = require("../../utils/combine_classes");

var _get_scroll_left_max = require("./utils/get_scroll_left_max");

var _get_augmented_location = require("./utils/get_augmented_location");

var _get_boundary_props = require("./utils/get_boundary_props");

var _normalize_offset_left = require("./utils/normalize_offset_left");

var _get_element_location_internal = require("./utils/get_element_location_internal");

var _devices = _interopRequireDefault(require("../../../core/devices"));

var _browser = _interopRequireDefault(require("../../../core/utils/browser"));

var _type = require("../../../core/utils/type");

var _base_props = require("../common/base_props");

var _scrollable_props = require("./scrollable_props");

var _top_pocket = require("./top_pocket");

var _bottom_pocket = require("./bottom_pocket");

var _support = require("../../../core/utils/support");

require("../../../events/gesture/emitter.gesture.scroll");

var _index = require("../../../events/utils/index");

var _scroll_direction = require("./utils/scroll_direction");

var _consts = require("./common/consts");

var _scrollbar = require("./scrollbar");

var _short = require("../../../events/short");

var _get_offset_distance = require("./utils/get_offset_distance");

var _is_element_visible = require("./utils/is_element_visible");

var _excluded = ["aria", "bounceEnabled", "children", "classes", "direction", "disabled", "forceGeneratePockets", "height", "needScrollViewContentWrapper", "needScrollViewLoadPanel", "onKeyDown", "onPullDown", "onReachBottom", "onScroll", "onUpdated", "pullDownEnabled", "pulledDownText", "pullingDownText", "reachBottomEnabled", "reachBottomText", "refreshingText", "rtlEnabled", "scrollByContent", "scrollByThumb", "showScrollbar", "useNative", "useSimulatedScrollbar", "visible", "width"];

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

var HIDE_SCROLLBAR_TIMEOUT = 500;

var viewFunction = function viewFunction(viewModel) {
  var bottomPocketRef = viewModel.bottomPocketRef,
      containerClientHeight = viewModel.containerClientHeight,
      containerClientWidth = viewModel.containerClientWidth,
      containerRef = viewModel.containerRef,
      contentClientHeight = viewModel.contentClientHeight,
      contentClientWidth = viewModel.contentClientWidth,
      contentRef = viewModel.contentRef,
      contentStyles = viewModel.contentStyles,
      contentTranslateTop = viewModel.contentTranslateTop,
      cssClasses = viewModel.cssClasses,
      direction = viewModel.direction,
      hScrollLocation = viewModel.hScrollLocation,
      hScrollbarRef = viewModel.hScrollbarRef,
      isLoadPanelVisible = viewModel.isLoadPanelVisible,
      needForceScrollbarsVisibility = viewModel.needForceScrollbarsVisibility,
      _viewModel$props = viewModel.props,
      aria = _viewModel$props.aria,
      children = _viewModel$props.children,
      disabled = _viewModel$props.disabled,
      forceGeneratePockets = _viewModel$props.forceGeneratePockets,
      height = _viewModel$props.height,
      needScrollViewContentWrapper = _viewModel$props.needScrollViewContentWrapper,
      needScrollViewLoadPanel = _viewModel$props.needScrollViewLoadPanel,
      pullDownEnabled = _viewModel$props.pullDownEnabled,
      pulledDownText = _viewModel$props.pulledDownText,
      pullingDownText = _viewModel$props.pullingDownText,
      reachBottomEnabled = _viewModel$props.reachBottomEnabled,
      reachBottomText = _viewModel$props.reachBottomText,
      refreshingText = _viewModel$props.refreshingText,
      rtlEnabled = _viewModel$props.rtlEnabled,
      showScrollbar = _viewModel$props.showScrollbar,
      visible = _viewModel$props.visible,
      width = _viewModel$props.width,
      pullDownIconAngle = viewModel.pullDownIconAngle,
      pullDownOpacity = viewModel.pullDownOpacity,
      pullDownTranslateTop = viewModel.pullDownTranslateTop,
      refreshStrategy = viewModel.refreshStrategy,
      restAttributes = viewModel.restAttributes,
      scrollViewContentRef = viewModel.scrollViewContentRef,
      scrollableRef = viewModel.scrollableRef,
      topPocketHeight = viewModel.topPocketHeight,
      topPocketRef = viewModel.topPocketRef,
      topPocketState = viewModel.topPocketState,
      updateHandler = viewModel.updateHandler,
      useSimulatedScrollbar = viewModel.useSimulatedScrollbar,
      vScrollLocation = viewModel.vScrollLocation,
      vScrollbarRef = viewModel.vScrollbarRef,
      wrapperRef = viewModel.wrapperRef;
  return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _widget.Widget, _extends({
    "rootElementRef": scrollableRef,
    "aria": aria,
    "addWidgetClass": false,
    "classes": cssClasses,
    "disabled": disabled,
    "rtlEnabled": rtlEnabled,
    "height": height,
    "width": width,
    "visible": visible,
    "onDimensionChanged": updateHandler
  }, restAttributes, {
    children: [(0, _inferno.createVNode)(1, "div", _consts.SCROLLABLE_WRAPPER_CLASS, (0, _inferno.createVNode)(1, "div", _consts.SCROLLABLE_CONTAINER_CLASS, (0, _inferno.createVNode)(1, "div", _consts.SCROLLABLE_CONTENT_CLASS, [forceGeneratePockets && (0, _inferno.createComponentVNode)(2, _top_pocket.TopPocket, {
      "topPocketRef": topPocketRef,
      "pullingDownText": pullingDownText,
      "pulledDownText": pulledDownText,
      "refreshingText": refreshingText,
      "pocketState": topPocketState,
      "refreshStrategy": refreshStrategy,
      "pullDownTranslateTop": pullDownTranslateTop,
      "pullDownIconAngle": pullDownIconAngle,
      "topPocketTranslateTop": contentTranslateTop,
      "pullDownOpacity": pullDownOpacity,
      "pocketTop": topPocketHeight,
      "visible": !!pullDownEnabled
    }), needScrollViewContentWrapper ? (0, _inferno.createVNode)(1, "div", _consts.SCROLLVIEW_CONTENT_CLASS, children, 0, {
      "style": (0, _vdom.normalizeStyles)(contentStyles)
    }, null, scrollViewContentRef) : children, forceGeneratePockets && (0, _inferno.createComponentVNode)(2, _bottom_pocket.BottomPocket, {
      "bottomPocketRef": bottomPocketRef,
      "reachBottomText": reachBottomText,
      "visible": !!reachBottomEnabled
    })], 0, null, null, contentRef), 2, null, null, containerRef), 2, null, null, wrapperRef), needScrollViewLoadPanel && (0, _inferno.createComponentVNode)(2, _load_panel.ScrollViewLoadPanel, {
      "targetElement": scrollableRef,
      "refreshingText": refreshingText,
      "visible": isLoadPanelVisible
    }), showScrollbar !== "never" && useSimulatedScrollbar && direction.isHorizontal && (0, _inferno.createComponentVNode)(2, _scrollbar.Scrollbar, {
      "direction": "horizontal",
      "contentSize": contentClientWidth,
      "containerSize": containerClientWidth,
      "scrollLocation": hScrollLocation,
      "forceVisibility": needForceScrollbarsVisibility
    }, null, hScrollbarRef), showScrollbar !== "never" && useSimulatedScrollbar && direction.isVertical && (0, _inferno.createComponentVNode)(2, _scrollbar.Scrollbar, {
      "direction": "vertical",
      "contentSize": contentClientHeight,
      "containerSize": containerClientHeight,
      "scrollLocation": vScrollLocation,
      "forceVisibility": needForceScrollbarsVisibility
    }, null, vScrollbarRef)]
  })));
};

exports.viewFunction = viewFunction;

var ScrollableNativeProps = _extends({}, _scrollable_props.ScrollableProps);

exports.ScrollableNativeProps = ScrollableNativeProps;
var ScrollableNativePropsType = {
  useNative: ScrollableNativeProps.useNative,
  direction: ScrollableNativeProps.direction,
  showScrollbar: ScrollableNativeProps.showScrollbar,
  bounceEnabled: ScrollableNativeProps.bounceEnabled,
  scrollByContent: ScrollableNativeProps.scrollByContent,
  scrollByThumb: ScrollableNativeProps.scrollByThumb,
  pullDownEnabled: ScrollableNativeProps.pullDownEnabled,
  reachBottomEnabled: ScrollableNativeProps.reachBottomEnabled,
  forceGeneratePockets: ScrollableNativeProps.forceGeneratePockets,
  needScrollViewContentWrapper: ScrollableNativeProps.needScrollViewContentWrapper,
  needScrollViewLoadPanel: ScrollableNativeProps.needScrollViewLoadPanel,
  aria: _widget.WidgetProps.aria,
  disabled: _base_props.BaseWidgetProps.disabled,
  visible: _base_props.BaseWidgetProps.visible
};
exports.ScrollableNativePropsType = ScrollableNativePropsType;

var ScrollableNative = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(ScrollableNative, _InfernoComponent);

  function ScrollableNative(props) {
    var _this;

    _this = _InfernoComponent.call(this, props) || this;
    _this.scrollableRef = (0, _inferno.createRef)();
    _this.wrapperRef = (0, _inferno.createRef)();
    _this.contentRef = (0, _inferno.createRef)();
    _this.scrollViewContentRef = (0, _inferno.createRef)();
    _this.containerRef = (0, _inferno.createRef)();
    _this.vScrollbarRef = (0, _inferno.createRef)();
    _this.hScrollbarRef = (0, _inferno.createRef)();
    _this.topPocketRef = (0, _inferno.createRef)();
    _this.bottomPocketRef = (0, _inferno.createRef)();
    _this.locked = false;
    _this.loadingIndicatorEnabled = true;
    _this.initPageY = 0;
    _this.deltaY = 0;
    _this.locationTop = 0;
    _this.state = {
      containerClientWidth: 0,
      containerClientHeight: 0,
      contentClientWidth: 0,
      contentClientHeight: 0,
      needForceScrollbarsVisibility: false,
      topPocketState: _consts.TopPocketState.STATE_RELEASED,
      isLoadPanelVisible: false,
      pullDownTranslateTop: 0,
      pullDownIconAngle: 0,
      pullDownOpacity: 0,
      contentTranslateTop: 0,
      vScrollLocation: 0,
      hScrollLocation: 0
    };
    _this.content = _this.content.bind(_assertThisInitialized(_this));
    _this.container = _this.container.bind(_assertThisInitialized(_this));
    _this.update = _this.update.bind(_assertThisInitialized(_this));
    _this.refresh = _this.refresh.bind(_assertThisInitialized(_this));
    _this.release = _this.release.bind(_assertThisInitialized(_this));
    _this.disposeReleaseTimer = _this.disposeReleaseTimer.bind(_assertThisInitialized(_this));
    _this.scrollTo = _this.scrollTo.bind(_assertThisInitialized(_this));
    _this.scrollBy = _this.scrollBy.bind(_assertThisInitialized(_this));
    _this.scrollToElement = _this.scrollToElement.bind(_assertThisInitialized(_this));
    _this.getElementLocation = _this.getElementLocation.bind(_assertThisInitialized(_this));
    _this.scrollHeight = _this.scrollHeight.bind(_assertThisInitialized(_this));
    _this.scrollWidth = _this.scrollWidth.bind(_assertThisInitialized(_this));
    _this.scrollOffset = _this.scrollOffset.bind(_assertThisInitialized(_this));
    _this.scrollTop = _this.scrollTop.bind(_assertThisInitialized(_this));
    _this.scrollLeft = _this.scrollLeft.bind(_assertThisInitialized(_this));
    _this.clientHeight = _this.clientHeight.bind(_assertThisInitialized(_this));
    _this.clientWidth = _this.clientWidth.bind(_assertThisInitialized(_this));
    _this.scrollEffect = _this.scrollEffect.bind(_assertThisInitialized(_this));
    _this.effectDisabledState = _this.effectDisabledState.bind(_assertThisInitialized(_this));
    _this.effectResetInactiveState = _this.effectResetInactiveState.bind(_assertThisInitialized(_this));
    _this.updateScrollbarSize = _this.updateScrollbarSize.bind(_assertThisInitialized(_this));
    _this.disposeHideScrollbarTimer = _this.disposeHideScrollbarTimer.bind(_assertThisInitialized(_this));
    _this.initEffect = _this.initEffect.bind(_assertThisInitialized(_this));
    _this.moveEffect = _this.moveEffect.bind(_assertThisInitialized(_this));
    _this.endEffect = _this.endEffect.bind(_assertThisInitialized(_this));
    _this.stopEffect = _this.stopEffect.bind(_assertThisInitialized(_this));
    _this.disposeRefreshTimer = _this.disposeRefreshTimer.bind(_assertThisInitialized(_this));
    _this.validate = _this.validate.bind(_assertThisInitialized(_this));
    _this.moveIsAllowed = _this.moveIsAllowed.bind(_assertThisInitialized(_this));
    _this.clearReleaseTimer = _this.clearReleaseTimer.bind(_assertThisInitialized(_this));
    _this.onRelease = _this.onRelease.bind(_assertThisInitialized(_this));
    _this.onUpdated = _this.onUpdated.bind(_assertThisInitialized(_this));
    _this.startLoading = _this.startLoading.bind(_assertThisInitialized(_this));
    _this.finishLoading = _this.finishLoading.bind(_assertThisInitialized(_this));
    _this.setPocketState = _this.setPocketState.bind(_assertThisInitialized(_this));
    _this.handleScroll = _this.handleScroll.bind(_assertThisInitialized(_this));
    _this.handlePocketState = _this.handlePocketState.bind(_assertThisInitialized(_this));
    _this.pullDownReady = _this.pullDownReady.bind(_assertThisInitialized(_this));
    _this.onReachBottom = _this.onReachBottom.bind(_assertThisInitialized(_this));
    _this.onPullDown = _this.onPullDown.bind(_assertThisInitialized(_this));
    _this.stateReleased = _this.stateReleased.bind(_assertThisInitialized(_this));
    _this.getEventArgs = _this.getEventArgs.bind(_assertThisInitialized(_this));
    _this.lock = _this.lock.bind(_assertThisInitialized(_this));
    _this.unlock = _this.unlock.bind(_assertThisInitialized(_this));
    _this.updateHandler = _this.updateHandler.bind(_assertThisInitialized(_this));
    _this.updateSizes = _this.updateSizes.bind(_assertThisInitialized(_this));
    _this.moveScrollbars = _this.moveScrollbars.bind(_assertThisInitialized(_this));
    _this.clearHideScrollbarTimer = _this.clearHideScrollbarTimer.bind(_assertThisInitialized(_this));
    _this.scrollLocation = _this.scrollLocation.bind(_assertThisInitialized(_this));
    _this.getInitEventData = _this.getInitEventData.bind(_assertThisInitialized(_this));
    _this.handleInit = _this.handleInit.bind(_assertThisInitialized(_this));
    _this.handleMove = _this.handleMove.bind(_assertThisInitialized(_this));
    _this.handleEnd = _this.handleEnd.bind(_assertThisInitialized(_this));
    _this.handleStop = _this.handleStop.bind(_assertThisInitialized(_this));
    _this.pullDownComplete = _this.pullDownComplete.bind(_assertThisInitialized(_this));
    _this.clearRefreshTimer = _this.clearRefreshTimer.bind(_assertThisInitialized(_this));
    _this.pullDownRefreshing = _this.pullDownRefreshing.bind(_assertThisInitialized(_this));
    _this.movePullDown = _this.movePullDown.bind(_assertThisInitialized(_this));
    _this.getPullDownHeight = _this.getPullDownHeight.bind(_assertThisInitialized(_this));
    _this.getPullDownStartPosition = _this.getPullDownStartPosition.bind(_assertThisInitialized(_this));
    _this.complete = _this.complete.bind(_assertThisInitialized(_this));
    _this.releaseState = _this.releaseState.bind(_assertThisInitialized(_this));
    _this.isSwipeDown = _this.isSwipeDown.bind(_assertThisInitialized(_this));
    _this.isPullDown = _this.isPullDown.bind(_assertThisInitialized(_this));
    _this.isReachBottom = _this.isReachBottom.bind(_assertThisInitialized(_this));
    _this.tryGetAllowedDirection = _this.tryGetAllowedDirection.bind(_assertThisInitialized(_this));
    _this.isLocked = _this.isLocked.bind(_assertThisInitialized(_this));
    _this.isScrollingOutOfBound = _this.isScrollingOutOfBound.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = ScrollableNative.prototype;

  _proto.createEffects = function createEffects() {
    return [new _vdom.InfernoEffect(this.disposeReleaseTimer, []), new _vdom.InfernoEffect(this.scrollEffect, [this.props.useSimulatedScrollbar, this.props.onScroll, this.props.rtlEnabled, this.props.direction, this.props.forceGeneratePockets, this.state.topPocketState, this.props.reachBottomEnabled, this.props.onReachBottom, this.props.pullDownEnabled]), new _vdom.InfernoEffect(this.effectDisabledState, [this.props.disabled]), new _vdom.InfernoEffect(this.effectResetInactiveState, [this.props.direction]), new _vdom.InfernoEffect(this.updateScrollbarSize, [this.state.containerClientWidth, this.state.containerClientHeight, this.state.contentClientWidth, this.state.contentClientHeight, this.state.needForceScrollbarsVisibility, this.state.topPocketState, this.state.isLoadPanelVisible, this.state.pullDownTranslateTop, this.state.pullDownIconAngle, this.state.pullDownOpacity, this.state.contentTranslateTop, this.state.vScrollLocation, this.state.hScrollLocation, this.props.children, this.props.useNative, this.props.direction, this.props.showScrollbar, this.props.bounceEnabled, this.props.scrollByContent, this.props.scrollByThumb, this.props.classes, this.props.pullDownEnabled, this.props.reachBottomEnabled, this.props.forceGeneratePockets, this.props.needScrollViewContentWrapper, this.props.needScrollViewLoadPanel, this.props.onScroll, this.props.onUpdated, this.props.onPullDown, this.props.onReachBottom, this.props.useSimulatedScrollbar, this.props.pullingDownText, this.props.pulledDownText, this.props.refreshingText, this.props.reachBottomText, this.props.aria, this.props.disabled, this.props.height, this.props.onKeyDown, this.props.rtlEnabled, this.props.visible, this.props.width]), new _vdom.InfernoEffect(this.disposeHideScrollbarTimer, []), new _vdom.InfernoEffect(this.initEffect, [this.props.forceGeneratePockets, this.state.topPocketState, this.props.direction, this.props.pullDownEnabled, this.props.disabled, this.props.needScrollViewContentWrapper, this.props.rtlEnabled]), new _vdom.InfernoEffect(this.moveEffect, [this.props.direction, this.props.pullDownEnabled, this.props.forceGeneratePockets, this.state.topPocketState]), new _vdom.InfernoEffect(this.endEffect, [this.props.forceGeneratePockets, this.props.pullDownEnabled, this.state.topPocketState, this.props.onPullDown]), new _vdom.InfernoEffect(this.stopEffect, [this.props.forceGeneratePockets, this.state.topPocketState, this.props.onPullDown]), new _vdom.InfernoEffect(this.disposeRefreshTimer, [])];
  };

  _proto.updateEffects = function updateEffects() {
    var _this$_effects$, _this$_effects$2, _this$_effects$3, _this$_effects$4, _this$_effects$5, _this$_effects$6, _this$_effects$7, _this$_effects$8;

    (_this$_effects$ = this._effects[1]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.props.useSimulatedScrollbar, this.props.onScroll, this.props.rtlEnabled, this.props.direction, this.props.forceGeneratePockets, this.state.topPocketState, this.props.reachBottomEnabled, this.props.onReachBottom, this.props.pullDownEnabled]);
    (_this$_effects$2 = this._effects[2]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([this.props.disabled]);
    (_this$_effects$3 = this._effects[3]) === null || _this$_effects$3 === void 0 ? void 0 : _this$_effects$3.update([this.props.direction]);
    (_this$_effects$4 = this._effects[4]) === null || _this$_effects$4 === void 0 ? void 0 : _this$_effects$4.update([this.state.containerClientWidth, this.state.containerClientHeight, this.state.contentClientWidth, this.state.contentClientHeight, this.state.needForceScrollbarsVisibility, this.state.topPocketState, this.state.isLoadPanelVisible, this.state.pullDownTranslateTop, this.state.pullDownIconAngle, this.state.pullDownOpacity, this.state.contentTranslateTop, this.state.vScrollLocation, this.state.hScrollLocation, this.props.children, this.props.useNative, this.props.direction, this.props.showScrollbar, this.props.bounceEnabled, this.props.scrollByContent, this.props.scrollByThumb, this.props.classes, this.props.pullDownEnabled, this.props.reachBottomEnabled, this.props.forceGeneratePockets, this.props.needScrollViewContentWrapper, this.props.needScrollViewLoadPanel, this.props.onScroll, this.props.onUpdated, this.props.onPullDown, this.props.onReachBottom, this.props.useSimulatedScrollbar, this.props.pullingDownText, this.props.pulledDownText, this.props.refreshingText, this.props.reachBottomText, this.props.aria, this.props.disabled, this.props.height, this.props.onKeyDown, this.props.rtlEnabled, this.props.visible, this.props.width]);
    (_this$_effects$5 = this._effects[6]) === null || _this$_effects$5 === void 0 ? void 0 : _this$_effects$5.update([this.props.forceGeneratePockets, this.state.topPocketState, this.props.direction, this.props.pullDownEnabled, this.props.disabled, this.props.needScrollViewContentWrapper, this.props.rtlEnabled]);
    (_this$_effects$6 = this._effects[7]) === null || _this$_effects$6 === void 0 ? void 0 : _this$_effects$6.update([this.props.direction, this.props.pullDownEnabled, this.props.forceGeneratePockets, this.state.topPocketState]);
    (_this$_effects$7 = this._effects[8]) === null || _this$_effects$7 === void 0 ? void 0 : _this$_effects$7.update([this.props.forceGeneratePockets, this.props.pullDownEnabled, this.state.topPocketState, this.props.onPullDown]);
    (_this$_effects$8 = this._effects[9]) === null || _this$_effects$8 === void 0 ? void 0 : _this$_effects$8.update([this.props.forceGeneratePockets, this.state.topPocketState, this.props.onPullDown]);
  };

  _proto.disposeReleaseTimer = function disposeReleaseTimer() {
    var _this2 = this;

    return function () {
      return _this2.clearReleaseTimer();
    };
  };

  _proto.scrollEffect = function scrollEffect() {
    var _this3 = this;

    return (0, _subscribe_to_event.subscribeToScrollEvent)(this.containerElement, function (event) {
      _this3.handleScroll(event);
    });
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
    this.updateSizes();
  };

  _proto.disposeHideScrollbarTimer = function disposeHideScrollbarTimer() {
    var _this4 = this;

    return function () {
      return _this4.clearHideScrollbarTimer();
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

  _proto.moveEffect = function moveEffect() {
    var _this6 = this;

    var namespace = "dxScrollable";

    _short.dxScrollMove.on(this.wrapperRef.current, function (event) {
      _this6.handleMove(event);
    }, {
      namespace: namespace
    });

    return function () {
      return _short.dxScrollMove.off(_this6.wrapperRef.current, {
        namespace: namespace
      });
    };
  };

  _proto.endEffect = function endEffect() {
    var _this7 = this;

    var namespace = "dxScrollable";

    _short.dxScrollEnd.on(this.wrapperRef.current, function () {
      _this7.handleEnd();
    }, {
      namespace: namespace
    });

    return function () {
      return _short.dxScrollEnd.off(_this7.wrapperRef.current, {
        namespace: namespace
      });
    };
  };

  _proto.stopEffect = function stopEffect() {
    var _this8 = this;

    var namespace = "dxScrollable";

    _short.dxScrollStop.on(this.wrapperRef.current, function () {
      _this8.handleStop();
    }, {
      namespace: namespace
    });

    return function () {
      return _short.dxScrollStop.off(_this8.wrapperRef.current, {
        namespace: namespace
      });
    };
  };

  _proto.disposeRefreshTimer = function disposeRefreshTimer() {
    var _this9 = this;

    return function () {
      return _this9.clearRefreshTimer();
    };
  };

  _proto.clearReleaseTimer = function clearReleaseTimer() {
    clearTimeout(this.releaseTimer);
    this.releaseTimer = undefined;
  };

  _proto.onRelease = function onRelease() {
    this.loadingIndicatorEnabled = true;
    this.finishLoading();
    this.onUpdated();
  };

  _proto.onUpdated = function onUpdated() {
    var _this$props$onUpdated, _this$props;

    (_this$props$onUpdated = (_this$props = this.props).onUpdated) === null || _this$props$onUpdated === void 0 ? void 0 : _this$props$onUpdated.call(_this$props, this.getEventArgs());
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

  _proto.setPocketState = function setPocketState(newState) {
    this.setState(function (state) {
      return _extends({}, state, {
        topPocketState: newState
      });
    });
  };

  _proto.handleScroll = function handleScroll(event) {
    var _this$props$onScroll, _this$props2;

    this.eventForUserAction = event;

    if (this.useSimulatedScrollbar) {
      this.moveScrollbars();
    }

    (_this$props$onScroll = (_this$props2 = this.props).onScroll) === null || _this$props$onScroll === void 0 ? void 0 : _this$props$onScroll.call(_this$props2, this.getEventArgs());
    this.handlePocketState();
  };

  _proto.handlePocketState = function handlePocketState() {
    if (this.props.forceGeneratePockets) {
      if (this.state.topPocketState === _consts.TopPocketState.STATE_REFRESHING) {
        return;
      }

      var currentLocation = -this.scrollLocation().top;
      var scrollDelta = this.locationTop - currentLocation;
      this.locationTop = currentLocation;

      if (this.isSwipeDownStrategy && scrollDelta > 0 && this.isReachBottom()) {
        this.onReachBottom();
        return;
      }

      if (this.isPullDownStrategy) {
        if (this.isPullDown()) {
          this.pullDownReady();
          return;
        }

        if (scrollDelta > 0 && this.isReachBottom()) {
          if (this.state.topPocketState !== _consts.TopPocketState.STATE_LOADING) {
            this.setPocketState(_consts.TopPocketState.STATE_LOADING);
            this.onReachBottom();
          }

          return;
        }
      }

      this.stateReleased();
    }
  };

  _proto.pullDownReady = function pullDownReady() {
    if (this.state.topPocketState === _consts.TopPocketState.STATE_READY) {
      return;
    }

    this.setPocketState(_consts.TopPocketState.STATE_READY);
  };

  _proto.onReachBottom = function onReachBottom() {
    var _this$props$onReachBo, _this$props3;

    (_this$props$onReachBo = (_this$props3 = this.props).onReachBottom) === null || _this$props$onReachBo === void 0 ? void 0 : _this$props$onReachBo.call(_this$props3, {});
  };

  _proto.onPullDown = function onPullDown() {
    var _this$props$onPullDow, _this$props4;

    (_this$props$onPullDow = (_this$props4 = this.props).onPullDown) === null || _this$props$onPullDow === void 0 ? void 0 : _this$props$onPullDow.call(_this$props4, {});
  };

  _proto.stateReleased = function stateReleased() {
    if (this.state.topPocketState === _consts.TopPocketState.STATE_RELEASED) {
      return;
    }

    this.releaseState();
  };

  _proto.getEventArgs = function getEventArgs() {
    var scrollOffset = this.scrollOffset();
    return _extends({
      event: this.eventForUserAction,
      scrollOffset: scrollOffset
    }, (0, _get_boundary_props.getBoundaryProps)(this.props.direction, scrollOffset, this.containerElement, 0));
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
    }
  };

  _proto.moveScrollbars = function moveScrollbars() {
    var _this10 = this;

    var _this$scrollOffset = this.scrollOffset(),
        left = _this$scrollOffset.left,
        top = _this$scrollOffset.top;

    this.setState(function (state) {
      return _extends({}, state, {
        hScrollLocation: -left
      });
    });
    this.setState(function (state) {
      return _extends({}, state, {
        vScrollLocation: -top
      });
    });
    this.setState(function (state) {
      return _extends({}, state, {
        needForceScrollbarsVisibility: true
      });
    });
    this.clearHideScrollbarTimer();
    this.hideScrollbarTimer = setTimeout(function () {
      _this10.setState(function (state) {
        return _extends({}, state, {
          needForceScrollbarsVisibility: false
        });
      });
    }, HIDE_SCROLLBAR_TIMEOUT);
  };

  _proto.clearHideScrollbarTimer = function clearHideScrollbarTimer() {
    clearTimeout(this.hideScrollbarTimer);
    this.hideScrollbarTimer = undefined;
  };

  _proto.scrollLocation = function scrollLocation() {
    return {
      top: this.containerElement.scrollTop,
      left: this.containerElement.scrollLeft
    };
  };

  _proto.getInitEventData = function getInitEventData() {
    return {
      getDirection: this.tryGetAllowedDirection,
      validate: this.validate,
      isNative: true,
      scrollTarget: this.containerElement
    };
  };

  _proto.handleInit = function handleInit(event) {
    if (this.props.forceGeneratePockets && this.isSwipeDownStrategy) {
      if (this.state.topPocketState === _consts.TopPocketState.STATE_RELEASED && this.scrollLocation().top === 0) {
        this.initPageY = event.originalEvent.pageY;
        this.setPocketState(_consts.TopPocketState.STATE_TOUCHED);
      }
    }
  };

  _proto.handleMove = function handleMove(e) {
    if (this.locked) {
      e.cancel = true;
      return;
    }

    if ((0, _type.isDefined)(this.tryGetAllowedDirection())) {
      e.originalEvent.isScrollingEvent = true;
    }

    if (this.props.forceGeneratePockets && this.isSwipeDownStrategy) {
      this.deltaY = e.originalEvent.pageY - this.initPageY;

      if (this.state.topPocketState === _consts.TopPocketState.STATE_TOUCHED) {
        if (this.pullDownEnabled && this.deltaY > 0) {
          this.setPocketState(_consts.TopPocketState.STATE_PULLED);
        } else {
          this.complete();
        }
      }

      if (this.state.topPocketState === _consts.TopPocketState.STATE_PULLED) {
        e.preventDefault();
        this.movePullDown();
      }
    }
  };

  _proto.handleEnd = function handleEnd() {
    if (this.props.forceGeneratePockets) {
      if (this.isSwipeDownStrategy) {
        if (this.isSwipeDown()) {
          this.pullDownRefreshing();
        }

        this.complete();
      }

      if (this.isPullDownStrategy) {
        this.pullDownComplete();
      }
    }
  };

  _proto.handleStop = function handleStop() {
    if (this.props.forceGeneratePockets) {
      if (this.isSwipeDownStrategy) {
        this.complete();
      }

      if (this.isPullDownStrategy) {
        this.pullDownComplete();
      }
    }
  };

  _proto.pullDownComplete = function pullDownComplete() {
    var _this11 = this;

    if (this.state.topPocketState === _consts.TopPocketState.STATE_READY) {
      this.setState(function (state) {
        return _extends({}, state, {
          contentTranslateTop: _this11.topPocketHeight
        });
      });
      this.clearRefreshTimer();
      this.refreshTimer = setTimeout(function () {
        _this11.pullDownRefreshing();
      }, 400);
    }
  };

  _proto.clearRefreshTimer = function clearRefreshTimer() {
    clearTimeout(this.refreshTimer);
    this.refreshTimer = undefined;
  };

  _proto.pullDownRefreshing = function pullDownRefreshing() {
    var _this12 = this;

    if (this.state.topPocketState === _consts.TopPocketState.STATE_REFRESHING) {
      return;
    }

    this.setPocketState(_consts.TopPocketState.STATE_REFRESHING);

    if (this.isSwipeDownStrategy) {
      this.setState(function (state) {
        return _extends({}, state, {
          pullDownTranslateTop: _this12.getPullDownHeight()
        });
      });
    }

    this.onPullDown();
  };

  _proto.movePullDown = function movePullDown() {
    var pullDownHeight = this.getPullDownHeight();
    var top = Math.min(pullDownHeight * 3, this.deltaY + this.getPullDownStartPosition());
    var angle = 180 * top / pullDownHeight / 3;
    this.setState(function (state) {
      return _extends({}, state, {
        pullDownOpacity: 1
      });
    });
    this.setState(function (state) {
      return _extends({}, state, {
        pullDownTranslateTop: top
      });
    });
    this.setState(function (state) {
      return _extends({}, state, {
        pullDownIconAngle: angle
      });
    });
  };

  _proto.getPullDownHeight = function getPullDownHeight() {
    return Math.round(this.scrollableRef.current.offsetHeight * 0.05);
  };

  _proto.getPullDownStartPosition = function getPullDownStartPosition() {
    return -Math.round(this.topPocketRef.current.clientHeight * 1.5);
  };

  _proto.complete = function complete() {
    if (this.state.topPocketState === _consts.TopPocketState.STATE_TOUCHED || this.state.topPocketState === _consts.TopPocketState.STATE_PULLED) {
      this.releaseState();
    }
  };

  _proto.releaseState = function releaseState() {
    this.setPocketState(_consts.TopPocketState.STATE_RELEASED);
    this.setState(function (state) {
      return _extends({}, state, {
        pullDownOpacity: 0
      });
    });
  };

  _proto.isSwipeDown = function isSwipeDown() {
    return this.pullDownEnabled && this.state.topPocketState === _consts.TopPocketState.STATE_PULLED && this.deltaY >= this.getPullDownHeight() - this.getPullDownStartPosition();
  };

  _proto.isPullDown = function isPullDown() {
    return this.pullDownEnabled && this.scrollLocation().top <= -this.topPocketHeight;
  };

  _proto.isReachBottom = function isReachBottom() {
    var _this$scrollLocation = this.scrollLocation(),
        top = _this$scrollLocation.top;

    return this.props.reachBottomEnabled && (0, _get_boundary_props.isReachedBottom)(this.containerElement, top, this.bottomPocketHeight);
  };

  _proto.tryGetAllowedDirection = function tryGetAllowedDirection() {
    var _ScrollDirection = new _scroll_direction.ScrollDirection(this.props.direction),
        isBoth = _ScrollDirection.isBoth,
        isHorizontal = _ScrollDirection.isHorizontal,
        isVertical = _ScrollDirection.isVertical;

    var contentEl = this.contentRef.current;
    var containerEl = this.containerElement;
    var isOverflowVertical = isVertical && contentEl.clientHeight > containerEl.clientHeight || this.pullDownEnabled;
    var isOverflowHorizontal = isHorizontal && contentEl.clientWidth > containerEl.clientWidth || this.pullDownEnabled;

    if (isBoth && isOverflowVertical && isOverflowHorizontal) {
      return _consts.DIRECTION_BOTH;
    }

    if (isHorizontal && isOverflowHorizontal) {
      return _consts.DIRECTION_HORIZONTAL;
    }

    if (isVertical && isOverflowVertical) {
      return _consts.DIRECTION_VERTICAL;
    }

    return undefined;
  };

  _proto.isLocked = function isLocked() {
    return this.locked;
  };

  _proto.isScrollingOutOfBound = function isScrollingOutOfBound(event) {
    var delta = event.delta,
        shiftKey = event.shiftKey;
    var _this$containerElemen = this.containerElement,
        clientHeight = _this$containerElemen.clientHeight,
        clientWidth = _this$containerElemen.clientWidth,
        scrollHeight = _this$containerElemen.scrollHeight,
        scrollLeft = _this$containerElemen.scrollLeft,
        scrollTop = _this$containerElemen.scrollTop,
        scrollWidth = _this$containerElemen.scrollWidth;

    if (delta > 0) {
      return shiftKey ? !scrollLeft : !scrollTop;
    }

    return shiftKey ? clientWidth >= scrollWidth - scrollLeft : clientHeight >= scrollHeight - scrollTop;
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
    this.setPocketState(_consts.TopPocketState.STATE_READY);
    this.startLoading();
    this.onPullDown();
  };

  _proto.release = function release() {
    var _this13 = this;

    this.clearReleaseTimer();

    if (this.isPullDownStrategy) {
      if (this.state.topPocketState === _consts.TopPocketState.STATE_LOADING) {
        this.setPocketState(_consts.TopPocketState.STATE_RELEASED);
      }
    }

    this.releaseTimer = setTimeout(function () {
      if (_this13.isPullDownStrategy) {
        _this13.setState(function (state) {
          return _extends({}, state, {
            contentTranslateTop: 0
          });
        });
      }

      _this13.stateReleased();

      _this13.onRelease();
    }, this.isSwipeDownStrategy ? 800 : 400);
  };

  _proto.scrollTo = function scrollTo(targetLocation) {
    var direction = this.props.direction;
    var distance = (0, _get_offset_distance.getOffsetDistance)(targetLocation, direction, this.scrollOffset());
    this.scrollBy(distance);
  };

  _proto.scrollBy = function scrollBy(distance) {
    var location = (0, _get_augmented_location.getAugmentedLocation)(distance);

    if (!location.top && !location.left) {
      return;
    }

    var containerEl = this.containerElement;

    if (this.direction.isVertical) {
      containerEl.scrollTop += location.top;
    }

    if (this.direction.isHorizontal) {
      containerEl.scrollLeft += (0, _normalize_offset_left.getScrollSign)(!!this.props.rtlEnabled) * location.left;
    }
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
    var distance = (0, _get_offset_distance.getOffsetDistance)({
      top: top,
      left: left
    }, this.props.direction, this.scrollOffset());
    var containerEl = this.containerElement;

    if (!this.direction.isHorizontal) {
      containerEl.scrollLeft += (0, _normalize_offset_left.getScrollSign)(!!this.props.rtlEnabled) * distance.left;
    }

    if (!this.direction.isVertical) {
      containerEl.scrollTop += distance.top;
    }
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
    var _this$scrollLocation2 = this.scrollLocation(),
        left = _this$scrollLocation2.left,
        top = _this$scrollLocation2.top;

    var scrollLeftMax = (0, _get_scroll_left_max.getScrollLeftMax)(this.containerElement);
    return {
      top: top,
      left: (0, _normalize_offset_left.normalizeOffsetLeft)(left, scrollLeftMax, !!this.props.rtlEnabled)
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

    return this.moveIsAllowed(event);
  };

  _proto.moveIsAllowed = function moveIsAllowed(event) {
    if (this.props.disabled || (0, _index.isDxMouseWheelEvent)(event) && this.isScrollingOutOfBound(event)) {
      return false;
    }

    return (0, _type.isDefined)(this.tryGetAllowedDirection());
  };

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      containerClientWidth: this.state.containerClientWidth,
      containerClientHeight: this.state.containerClientHeight,
      contentClientWidth: this.state.contentClientWidth,
      contentClientHeight: this.state.contentClientHeight,
      needForceScrollbarsVisibility: this.state.needForceScrollbarsVisibility,
      topPocketState: this.state.topPocketState,
      isLoadPanelVisible: this.state.isLoadPanelVisible,
      pullDownTranslateTop: this.state.pullDownTranslateTop,
      pullDownIconAngle: this.state.pullDownIconAngle,
      pullDownOpacity: this.state.pullDownOpacity,
      contentTranslateTop: this.state.contentTranslateTop,
      vScrollLocation: this.state.vScrollLocation,
      hScrollLocation: this.state.hScrollLocation,
      scrollableRef: this.scrollableRef,
      wrapperRef: this.wrapperRef,
      contentRef: this.contentRef,
      scrollViewContentRef: this.scrollViewContentRef,
      containerRef: this.containerRef,
      topPocketRef: this.topPocketRef,
      bottomPocketRef: this.bottomPocketRef,
      vScrollbarRef: this.vScrollbarRef,
      hScrollbarRef: this.hScrollbarRef,
      clearReleaseTimer: this.clearReleaseTimer,
      onRelease: this.onRelease,
      onUpdated: this.onUpdated,
      startLoading: this.startLoading,
      finishLoading: this.finishLoading,
      setPocketState: this.setPocketState,
      handleScroll: this.handleScroll,
      handlePocketState: this.handlePocketState,
      pullDownReady: this.pullDownReady,
      onReachBottom: this.onReachBottom,
      onPullDown: this.onPullDown,
      stateReleased: this.stateReleased,
      getEventArgs: this.getEventArgs,
      lock: this.lock,
      unlock: this.unlock,
      fullScrollInactiveProp: this.fullScrollInactiveProp,
      updateHandler: this.updateHandler,
      updateSizes: this.updateSizes,
      moveScrollbars: this.moveScrollbars,
      clearHideScrollbarTimer: this.clearHideScrollbarTimer,
      scrollLocation: this.scrollLocation,
      getInitEventData: this.getInitEventData,
      handleInit: this.handleInit,
      handleMove: this.handleMove,
      handleEnd: this.handleEnd,
      handleStop: this.handleStop,
      pullDownComplete: this.pullDownComplete,
      clearRefreshTimer: this.clearRefreshTimer,
      topPocketHeight: this.topPocketHeight,
      pullDownRefreshing: this.pullDownRefreshing,
      movePullDown: this.movePullDown,
      getPullDownHeight: this.getPullDownHeight,
      getPullDownStartPosition: this.getPullDownStartPosition,
      complete: this.complete,
      releaseState: this.releaseState,
      refreshStrategy: this.refreshStrategy,
      isSwipeDownStrategy: this.isSwipeDownStrategy,
      isPullDownStrategy: this.isPullDownStrategy,
      isSwipeDown: this.isSwipeDown,
      isPullDown: this.isPullDown,
      isReachBottom: this.isReachBottom,
      bottomPocketHeight: this.bottomPocketHeight,
      tryGetAllowedDirection: this.tryGetAllowedDirection,
      isLocked: this.isLocked,
      isScrollingOutOfBound: this.isScrollingOutOfBound,
      cssClasses: this.cssClasses,
      platform: this.platform,
      direction: this.direction,
      useSimulatedScrollbar: this.useSimulatedScrollbar,
      pullDownEnabled: this.pullDownEnabled,
      contentStyles: this.contentStyles,
      containerElement: this.containerElement,
      restAttributes: this.restAttributes
    });
  };

  _createClass(ScrollableNative, [{
    key: "fullScrollInactiveProp",
    get: function get() {
      return this.props.direction === _consts.DIRECTION_HORIZONTAL ? "scrollTop" : "scrollLeft";
    }
  }, {
    key: "topPocketHeight",
    get: function get() {
      var _this$topPocketRef$cu, _this$topPocketRef, _this$topPocketRef$cu2;

      return (_this$topPocketRef$cu = (_this$topPocketRef = this.topPocketRef) === null || _this$topPocketRef === void 0 ? void 0 : (_this$topPocketRef$cu2 = _this$topPocketRef.current) === null || _this$topPocketRef$cu2 === void 0 ? void 0 : _this$topPocketRef$cu2.clientHeight) !== null && _this$topPocketRef$cu !== void 0 ? _this$topPocketRef$cu : 0;
    }
  }, {
    key: "refreshStrategy",
    get: function get() {
      return this.platform === "android" ? "swipeDown" : "pullDown";
    }
  }, {
    key: "isSwipeDownStrategy",
    get: function get() {
      return this.refreshStrategy === "swipeDown";
    }
  }, {
    key: "isPullDownStrategy",
    get: function get() {
      return this.refreshStrategy === "pullDown";
    }
  }, {
    key: "bottomPocketHeight",
    get: function get() {
      if (this.props.reachBottomEnabled && this.bottomPocketRef.current) {
        return this.bottomPocketRef.current.clientHeight;
      }

      return 0;
    }
  }, {
    key: "cssClasses",
    get: function get() {
      var _classesMap;

      var _this$props5 = this.props,
          classes = _this$props5.classes,
          direction = _this$props5.direction,
          disabled = _this$props5.disabled,
          showScrollbar = _this$props5.showScrollbar;
      var classesMap = (_classesMap = {}, _defineProperty(_classesMap, "dx-scrollable dx-scrollable-native dx-scrollable-native-".concat(this.platform, " dx-scrollable-renovated"), true), _defineProperty(_classesMap, "dx-scrollable-".concat(direction), true), _defineProperty(_classesMap, _consts.SCROLLABLE_DISABLED_CLASS, !!disabled), _defineProperty(_classesMap, _consts.SCROLLABLE_SCROLLBAR_SIMULATED, showScrollbar !== "never" && this.useSimulatedScrollbar), _defineProperty(_classesMap, _consts.SCROLLABLE_SCROLLBARS_HIDDEN, showScrollbar === "never"), _defineProperty(_classesMap, "".concat(classes), !!classes), _classesMap);
      return (0, _combine_classes.combineClasses)(classesMap);
    }
  }, {
    key: "platform",
    get: function get() {
      return _devices.default.real().platform;
    }
  }, {
    key: "direction",
    get: function get() {
      return new _scroll_direction.ScrollDirection(this.props.direction);
    }
  }, {
    key: "useSimulatedScrollbar",
    get: function get() {
      if (!(0, _type.isDefined)(this.props.useSimulatedScrollbar)) {
        return _support.nativeScrolling && this.platform === "android" && !_browser.default.mozilla;
      }

      return this.props.useSimulatedScrollbar;
    }
  }, {
    key: "pullDownEnabled",
    get: function get() {
      return this.props.pullDownEnabled && this.platform !== "generic";
    }
  }, {
    key: "contentStyles",
    get: function get() {
      if (this.props.forceGeneratePockets && this.isPullDownStrategy) {
        return {
          transform: "translate(0px, ".concat(this.state.contentTranslateTop, "px)")
        };
      }

      return undefined;
    }
  }, {
    key: "containerElement",
    get: function get() {
      return this.containerRef.current;
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props6 = this.props,
          aria = _this$props6.aria,
          bounceEnabled = _this$props6.bounceEnabled,
          children = _this$props6.children,
          classes = _this$props6.classes,
          direction = _this$props6.direction,
          disabled = _this$props6.disabled,
          forceGeneratePockets = _this$props6.forceGeneratePockets,
          height = _this$props6.height,
          needScrollViewContentWrapper = _this$props6.needScrollViewContentWrapper,
          needScrollViewLoadPanel = _this$props6.needScrollViewLoadPanel,
          onKeyDown = _this$props6.onKeyDown,
          onPullDown = _this$props6.onPullDown,
          onReachBottom = _this$props6.onReachBottom,
          onScroll = _this$props6.onScroll,
          onUpdated = _this$props6.onUpdated,
          pullDownEnabled = _this$props6.pullDownEnabled,
          pulledDownText = _this$props6.pulledDownText,
          pullingDownText = _this$props6.pullingDownText,
          reachBottomEnabled = _this$props6.reachBottomEnabled,
          reachBottomText = _this$props6.reachBottomText,
          refreshingText = _this$props6.refreshingText,
          rtlEnabled = _this$props6.rtlEnabled,
          scrollByContent = _this$props6.scrollByContent,
          scrollByThumb = _this$props6.scrollByThumb,
          showScrollbar = _this$props6.showScrollbar,
          useNative = _this$props6.useNative,
          useSimulatedScrollbar = _this$props6.useSimulatedScrollbar,
          visible = _this$props6.visible,
          width = _this$props6.width,
          restProps = _objectWithoutProperties(_this$props6, _excluded);

      return restProps;
    }
  }]);

  return ScrollableNative;
}(_vdom.InfernoComponent);

exports.ScrollableNative = ScrollableNative;
ScrollableNative.defaultProps = _extends({}, ScrollableNativePropsType);
