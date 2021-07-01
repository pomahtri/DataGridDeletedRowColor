import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["aria", "bounceEnabled", "children", "classes", "contentTranslateOffsetChange", "direction", "disabled", "forceGeneratePockets", "height", "inertiaEnabled", "needScrollViewContentWrapper", "needScrollViewLoadPanel", "onBounce", "onEnd", "onKeyDown", "onPullDown", "onReachBottom", "onScroll", "onStart", "onUpdated", "onVisibilityChange", "pocketStateChange", "pullDownEnabled", "pulledDownText", "pullingDownText", "reachBottomEnabled", "reachBottomText", "refreshingText", "rtlEnabled", "scrollByContent", "scrollByThumb", "scrollLocationChange", "showScrollbar", "useKeyboard", "useNative", "useSimulatedScrollbar", "visible", "width"];
import { createVNode, createComponentVNode, normalizeProps } from "inferno";
import { InfernoEffect, InfernoComponent, normalizeStyles } from "@devextreme/vdom";
import { subscribeToScrollEvent } from "../../utils/subscribe_to_event";
import { ScrollViewLoadPanel } from "./load_panel";
import { AnimatedScrollbar } from "./animated_scrollbar";
import { Widget } from "../common/widget";
import { combineClasses } from "../../utils/combine_classes";
import { getBoundaryProps } from "./utils/get_boundary_props";
import { getElementLocationInternal } from "./utils/get_element_location_internal";
import { isDxMouseWheelEvent, normalizeKeyName, isCommandKeyPressed } from "../../../events/utils/index";
import { getWindow, hasWindow } from "../../../core/utils/window";
import { isDefined } from "../../../core/utils/type";
import { ScrollableSimulatedPropsType } from "./scrollable_simulated_props";
import "../../../events/gesture/emitter.gesture.scroll";
import eventsEngine from "../../../events/core/events_engine";
import { ScrollDirection } from "./utils/scroll_direction";
import { DIRECTION_VERTICAL, DIRECTION_HORIZONTAL, SCROLLABLE_SIMULATED_CLASS, SCROLLABLE_CONTAINER_CLASS, SCROLLABLE_CONTENT_CLASS, SCROLLABLE_WRAPPER_CLASS, SCROLLVIEW_CONTENT_CLASS, SCROLLABLE_DISABLED_CLASS, SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE, SCROLL_LINE_HEIGHT, SCROLLABLE_SCROLLBAR_CLASS, DIRECTION_BOTH, KEY_CODES, VALIDATE_WHEEL_TIMEOUT, TopPocketState } from "./common/consts";
import { getElementOffset } from "../../utils/get_element_offset";
import getElementComputedStyle from "../../utils/get_computed_style";
import { TopPocket } from "./top_pocket";
import { BottomPocket } from "./bottom_pocket";
import { dxScrollInit, dxScrollStart, dxScrollMove, dxScrollEnd, dxScrollStop, dxScrollCancel, keyDown } from "../../../events/short";
import { getOffsetDistance } from "./utils/get_offset_distance";
import { restoreLocation } from "./utils/restore_location";
import { getScrollTopMax } from "./utils/get_scroll_top_max";
import { getScrollLeftMax } from "./utils/get_scroll_left_max";
import { inRange } from "../../../core/utils/math";
import { isVisible } from "./utils/is_element_visible";
var DEFAULT_OFFSET = {
  top: 0,
  left: 0
};
export var viewFunction = viewModel => {
  var {
    bottomPocketClientHeight,
    bottomPocketRef,
    containerClientHeight,
    containerClientWidth,
    containerRef,
    containerStyles,
    contentHeight,
    contentRef,
    contentStyles,
    contentTranslateOffsetChange,
    contentWidth,
    cssClasses,
    cursorEnterHandler,
    cursorLeaveHandler,
    direction,
    forceUpdateHScrollbarLocation,
    forceUpdateVScrollbarLocation,
    hScrollLocation,
    hScrollbarRef,
    handleKeyDown,
    isHovered,
    isLoadPanelVisible,
    onBounce,
    onEnd,
    onPullDown,
    onReachBottom,
    onRelease,
    onScroll,
    onVisibilityChangeHandler,
    pocketStateChange,
    props: {
      aria,
      bounceEnabled,
      children,
      disabled,
      forceGeneratePockets,
      height,
      inertiaEnabled,
      needScrollViewContentWrapper,
      needScrollViewLoadPanel,
      pullDownEnabled,
      pulledDownText,
      pullingDownText,
      reachBottomEnabled,
      reachBottomText,
      refreshingText,
      rtlEnabled,
      scrollByThumb,
      showScrollbar,
      useKeyboard,
      visible,
      width
    },
    restAttributes,
    scrollLocationChange,
    scrollViewContentRef,
    scrollableOffsetLeft,
    scrollableOffsetTop,
    scrollableRef,
    topPocketClientHeight,
    topPocketRef,
    topPocketState,
    updateHandler,
    vScrollLocation,
    vScrollbarRef,
    wrapperRef
  } = viewModel;
  return normalizeProps(createComponentVNode(2, Widget, _extends({
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
    children: [createVNode(1, "div", SCROLLABLE_WRAPPER_CLASS, createVNode(1, "div", SCROLLABLE_CONTAINER_CLASS, [createVNode(1, "div", SCROLLABLE_CONTENT_CLASS, [forceGeneratePockets && createComponentVNode(2, TopPocket, {
      "topPocketRef": topPocketRef,
      "pullingDownText": pullingDownText,
      "pulledDownText": pulledDownText,
      "refreshingText": refreshingText,
      "refreshStrategy": "simulated",
      "pocketState": topPocketState,
      "visible": !!pullDownEnabled
    }), needScrollViewContentWrapper ? createVNode(1, "div", SCROLLVIEW_CONTENT_CLASS, children, 0, null, null, scrollViewContentRef) : children, forceGeneratePockets && createComponentVNode(2, BottomPocket, {
      "bottomPocketRef": bottomPocketRef,
      "reachBottomText": reachBottomText,
      "visible": !!reachBottomEnabled
    })], 0, {
      "style": normalizeStyles(contentStyles)
    }, null, contentRef), direction.isHorizontal && createComponentVNode(2, AnimatedScrollbar, {
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
    }, null, hScrollbarRef), direction.isVertical && createComponentVNode(2, AnimatedScrollbar, {
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
      "style": normalizeStyles(containerStyles)
    }, null, containerRef), 2, null, null, wrapperRef), needScrollViewLoadPanel && createComponentVNode(2, ScrollViewLoadPanel, {
      "targetElement": scrollableRef,
      "refreshingText": refreshingText,
      "visible": isLoadPanelVisible
    })]
  })));
};
import { createRef as infernoCreateRef } from "inferno";
export class ScrollableSimulated extends InfernoComponent {
  constructor(props) {
    super(props);
    this.locked = false;
    this.loadingIndicatorEnabled = true;
    this.validDirections = {};
    this.endActionDirections = {
      horizontal: false,
      vertical: false
    };
    this.prevContainerClientWidth = 0;
    this.prevContainerClientHeight = 0;
    this.prevContentClientWidth = 0;
    this.prevContentClientHeight = 0;
    this.tabWasPressed = false;
    this.savedScrollOffset = {
      top: 0,
      left: 0
    };
    this.scrollableRef = infernoCreateRef();
    this.wrapperRef = infernoCreateRef();
    this.contentRef = infernoCreateRef();
    this.scrollViewContentRef = infernoCreateRef();
    this.containerRef = infernoCreateRef();
    this.vScrollbarRef = infernoCreateRef();
    this.hScrollbarRef = infernoCreateRef();
    this.topPocketRef = infernoCreateRef();
    this.bottomPocketRef = infernoCreateRef();
    this.state = {
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
      topPocketState: TopPocketState.STATE_RELEASED,
      isLoadPanelVisible: false,
      vScrollLocation: 0,
      hScrollLocation: 0,
      vContentTranslateOffset: 0,
      hContentTranslateOffset: 0,
      forceUpdateHScrollbarLocation: false,
      forceUpdateVScrollbarLocation: false
    };
    this.content = this.content.bind(this);
    this.container = this.container.bind(this);
    this.update = this.update.bind(this);
    this.refresh = this.refresh.bind(this);
    this.release = this.release.bind(this);
    this.scrollBy = this.scrollBy.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.scrollToElement = this.scrollToElement.bind(this);
    this.getElementLocation = this.getElementLocation.bind(this);
    this.scrollHeight = this.scrollHeight.bind(this);
    this.scrollWidth = this.scrollWidth.bind(this);
    this.scrollOffset = this.scrollOffset.bind(this);
    this.scrollTop = this.scrollTop.bind(this);
    this.scrollLeft = this.scrollLeft.bind(this);
    this.clientHeight = this.clientHeight.bind(this);
    this.clientWidth = this.clientWidth.bind(this);
    this.disposeWheelTimer = this.disposeWheelTimer.bind(this);
    this.scrollEffect = this.scrollEffect.bind(this);
    this.keyboardEffect = this.keyboardEffect.bind(this);
    this.initEffect = this.initEffect.bind(this);
    this.startEffect = this.startEffect.bind(this);
    this.moveEffect = this.moveEffect.bind(this);
    this.endEffect = this.endEffect.bind(this);
    this.stopEffect = this.stopEffect.bind(this);
    this.validate = this.validate.bind(this);
    this.moveIsAllowed = this.moveIsAllowed.bind(this);
    this.cancelEffect = this.cancelEffect.bind(this);
    this.effectDisabledState = this.effectDisabledState.bind(this);
    this.effectResetInactiveState = this.effectResetInactiveState.bind(this);
    this.updateScrollbarSize = this.updateScrollbarSize.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.startLoading = this.startLoading.bind(this);
    this.finishLoading = this.finishLoading.bind(this);
    this.getEventArgs = this.getEventArgs.bind(this);
    this.getInitEventData = this.getInitEventData.bind(this);
    this.onStart = this.onStart.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onUpdated = this.onUpdated.bind(this);
    this.onBounce = this.onBounce.bind(this);
    this.onPullDown = this.onPullDown.bind(this);
    this.onRelease = this.onRelease.bind(this);
    this.onReachBottom = this.onReachBottom.bind(this);
    this.pocketStateChange = this.pocketStateChange.bind(this);
    this.scrollLocationChange = this.scrollLocationChange.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.contentTranslateOffsetChange = this.contentTranslateOffsetChange.bind(this);
    this.cursorEnterHandler = this.cursorEnterHandler.bind(this);
    this.cursorLeaveHandler = this.cursorLeaveHandler.bind(this);
    this.handleInit = this.handleInit.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.handleEnd = this.handleEnd.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.isCrossThumbScrolling = this.isCrossThumbScrolling.bind(this);
    this.adjustDistance = this.adjustDistance.bind(this);
    this.suppressDirections = this.suppressDirections.bind(this);
    this.validateEvent = this.validateEvent.bind(this);
    this.prepareDirections = this.prepareDirections.bind(this);
    this.isContent = this.isContent.bind(this);
    this.eventHandler = this.eventHandler.bind(this);
    this.tryGetAllowedDirection = this.tryGetAllowedDirection.bind(this);
    this.allowedDirection = this.allowedDirection.bind(this);
    this.isLocked = this.isLocked.bind(this);
    this.validateWheel = this.validateWheel.bind(this);
    this.clearWheelValidationTimer = this.clearWheelValidationTimer.bind(this);
    this.validateMove = this.validateMove.bind(this);
    this.handleTabKey = this.handleTabKey.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.scrollByLine = this.scrollByLine.bind(this);
    this.tryGetDevicePixelRatio = this.tryGetDevicePixelRatio.bind(this);
    this.scrollByPage = this.scrollByPage.bind(this);
    this.wheelDirection = this.wheelDirection.bind(this);
    this.scrollToHome = this.scrollToHome.bind(this);
    this.scrollToEnd = this.scrollToEnd.bind(this);
    this.lock = this.lock.bind(this);
    this.unlock = this.unlock.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
    this.onVisibilityChangeHandler = this.onVisibilityChangeHandler.bind(this);
    this.updateSizes = this.updateSizes.bind(this);
  }

  createEffects() {
    return [new InfernoEffect(this.disposeWheelTimer, []), new InfernoEffect(this.scrollEffect, [this.state.hScrollLocation, this.state.vScrollLocation, this.props.direction, this.state.topPocketClientHeight]), new InfernoEffect(this.keyboardEffect, []), new InfernoEffect(this.initEffect, [this.props.direction, this.props.scrollByContent, this.props.scrollByThumb, this.state.contentScrollHeight, this.state.contentClientHeight, this.state.containerClientHeight, this.props.bounceEnabled, this.state.contentScrollWidth, this.state.contentClientWidth, this.state.containerClientWidth, this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.reachBottomEnabled, this.state.vScrollLocation, this.props.onUpdated, this.state.topPocketClientHeight, this.props.disabled]), new InfernoEffect(this.startEffect, [this.props.direction, this.props.onStart, this.state.topPocketClientHeight]), new InfernoEffect(this.moveEffect, [this.props.direction]), new InfernoEffect(this.endEffect, [this.props.direction]), new InfernoEffect(this.stopEffect, [this.props.direction]), new InfernoEffect(this.cancelEffect, [this.props.direction]), new InfernoEffect(this.effectDisabledState, [this.props.disabled]), new InfernoEffect(this.effectResetInactiveState, [this.props.direction]), new InfernoEffect(this.updateScrollbarSize, [this.state.isHovered, this.state.scrollableOffsetLeft, this.state.scrollableOffsetTop, this.state.containerClientWidth, this.state.containerClientHeight, this.state.contentScrollWidth, this.state.contentScrollHeight, this.state.contentClientWidth, this.state.contentClientHeight, this.state.topPocketClientHeight, this.state.bottomPocketClientHeight, this.state.topPocketState, this.state.isLoadPanelVisible, this.state.vScrollLocation, this.state.hScrollLocation, this.state.vContentTranslateOffset, this.state.hContentTranslateOffset, this.state.forceUpdateHScrollbarLocation, this.state.forceUpdateVScrollbarLocation, this.props.inertiaEnabled, this.props.useKeyboard, this.props.onStart, this.props.onEnd, this.props.onBounce, this.props.contentTranslateOffsetChange, this.props.scrollLocationChange, this.props.pocketStateChange, this.props.children, this.props.useNative, this.props.direction, this.props.showScrollbar, this.props.bounceEnabled, this.props.scrollByContent, this.props.scrollByThumb, this.props.classes, this.props.pullDownEnabled, this.props.reachBottomEnabled, this.props.forceGeneratePockets, this.props.needScrollViewContentWrapper, this.props.needScrollViewLoadPanel, this.props.onScroll, this.props.onUpdated, this.props.onPullDown, this.props.onReachBottom, this.props.useSimulatedScrollbar, this.props.pullingDownText, this.props.pulledDownText, this.props.refreshingText, this.props.reachBottomText, this.props.aria, this.props.onVisibilityChange, this.props.disabled, this.props.height, this.props.onKeyDown, this.props.rtlEnabled, this.props.visible, this.props.width])];
  }

  updateEffects() {
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
  }

  disposeWheelTimer() {
    return () => this.clearWheelValidationTimer();
  }

  scrollEffect() {
    return subscribeToScrollEvent(this.containerElement, () => {
      this.handleScroll();
    });
  }

  keyboardEffect() {
    keyDown.on(this.containerElement, event => {
      if (normalizeKeyName(event) === KEY_CODES.TAB) {
        this.tabWasPressed = true;
      }
    });
    return () => keyDown.off(this.containerElement);
  }

  initEffect() {
    var namespace = "dxScrollable";
    dxScrollInit.on(this.wrapperRef.current, event => {
      this.handleInit(event);
    }, this.getInitEventData(), {
      namespace
    });
    return () => dxScrollInit.off(this.wrapperRef.current, {
      namespace
    });
  }

  startEffect() {
    var namespace = "dxScrollable";
    dxScrollStart.on(this.wrapperRef.current, event => {
      this.handleStart(event);
    }, {
      namespace
    });
    return () => dxScrollStart.off(this.wrapperRef.current, {
      namespace
    });
  }

  moveEffect() {
    var namespace = "dxScrollable";
    dxScrollMove.on(this.wrapperRef.current, event => {
      this.handleMove(event);
    }, {
      namespace
    });
    return () => dxScrollMove.off(this.wrapperRef.current, {
      namespace
    });
  }

  endEffect() {
    var namespace = "dxScrollable";
    dxScrollEnd.on(this.wrapperRef.current, event => {
      this.handleEnd(event);
    }, {
      namespace
    });
    return () => dxScrollEnd.off(this.wrapperRef.current, {
      namespace
    });
  }

  stopEffect() {
    var namespace = "dxScrollable";
    dxScrollStop.on(this.wrapperRef.current, () => {
      this.handleStop();
    }, {
      namespace
    });
    return () => dxScrollStop.off(this.wrapperRef.current, {
      namespace
    });
  }

  cancelEffect() {
    var namespace = "dxScrollable";
    dxScrollCancel.on(this.wrapperRef.current, event => {
      this.handleCancel(event);
    }, {
      namespace
    });
    return () => dxScrollCancel.off(this.wrapperRef.current, {
      namespace
    });
  }

  effectDisabledState() {
    if (this.props.disabled) {
      this.lock();
    } else {
      this.unlock();
    }
  }

  effectResetInactiveState() {
    if (this.props.direction === DIRECTION_BOTH || !isDefined(this.containerElement)) {
      return;
    }

    this.containerElement[this.fullScrollInactiveProp] = 0;
  }

  updateScrollbarSize() {
    this.setState(state => _extends({}, state, {
      scrollableOffsetLeft: this.scrollableOffset.left
    }));
    this.setState(state => _extends({}, state, {
      scrollableOffsetTop: this.scrollableOffset.top
    }));
    this.updateSizes();
  }

  handleScroll() {
    var _this$props$onScroll, _this$props;

    this.handleTabKey();
    (_this$props$onScroll = (_this$props = this.props).onScroll) === null || _this$props$onScroll === void 0 ? void 0 : _this$props$onScroll.call(_this$props, this.getEventArgs());
  }

  startLoading() {
    if (this.loadingIndicatorEnabled && isVisible(this.scrollableRef.current)) {
      this.setState(state => _extends({}, state, {
        isLoadPanelVisible: true
      }));
    }

    this.lock();
  }

  finishLoading() {
    this.setState(state => _extends({}, state, {
      isLoadPanelVisible: false
    }));
    this.unlock();
  }

  getEventArgs() {
    var scrollOffset = this.scrollOffset();
    return _extends({
      event: this.eventForUserAction,
      scrollOffset
    }, getBoundaryProps(this.props.direction, scrollOffset, this.containerElement, this.state.topPocketClientHeight));
  }

  getInitEventData() {
    return {
      getDirection: this.tryGetAllowedDirection,
      validate: this.validate,
      isNative: false,
      scrollTarget: this.containerElement
    };
  }

  onStart() {
    var _this$props$onStart, _this$props2;

    (_this$props$onStart = (_this$props2 = this.props).onStart) === null || _this$props$onStart === void 0 ? void 0 : _this$props$onStart.call(_this$props2, this.getEventArgs());
  }

  onEnd(direction) {
    if (this.direction.isBoth) {
      this.endActionDirections[direction] = true;
      var {
        horizontal,
        vertical
      } = this.endActionDirections;

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
  }

  onUpdated() {
    var _this$props$onUpdated, _this$props5;

    (_this$props$onUpdated = (_this$props5 = this.props).onUpdated) === null || _this$props$onUpdated === void 0 ? void 0 : _this$props$onUpdated.call(_this$props5, this.getEventArgs());
  }

  onBounce() {
    var _this$props$onBounce, _this$props6;

    (_this$props$onBounce = (_this$props6 = this.props).onBounce) === null || _this$props$onBounce === void 0 ? void 0 : _this$props$onBounce.call(_this$props6, this.getEventArgs());
  }

  onPullDown() {
    var _this$props$onPullDow, _this$props7;

    this.loadingIndicatorEnabled = false;
    this.startLoading();
    (_this$props$onPullDow = (_this$props7 = this.props).onPullDown) === null || _this$props$onPullDow === void 0 ? void 0 : _this$props$onPullDow.call(_this$props7, {});
  }

  onRelease() {
    this.loadingIndicatorEnabled = true;
    this.finishLoading();
    this.onUpdated();
  }

  onReachBottom() {
    var _this$props$onReachBo, _this$props8;

    this.loadingIndicatorEnabled = false;
    this.startLoading();
    (_this$props$onReachBo = (_this$props8 = this.props).onReachBottom) === null || _this$props$onReachBo === void 0 ? void 0 : _this$props$onReachBo.call(_this$props8, {});
  }

  pocketStateChange(newState) {
    this.setState(state => _extends({}, state, {
      topPocketState: newState
    }));
  }

  scrollLocationChange(scrollProp, location) {
    var containerEl = this.containerElement;
    containerEl[scrollProp] = -location;

    if (scrollProp === "scrollLeft") {
      this.setState(state => _extends({}, state, {
        hScrollLocation: location
      }));
    } else {
      this.setState(state => _extends({}, state, {
        vScrollLocation: location
      }));
    }

    this.setState(state => _extends({}, state, {
      forceUpdateHScrollbarLocation: false
    }));
    this.setState(state => _extends({}, state, {
      forceUpdateVScrollbarLocation: false
    }));
  }

  onScroll() {
    eventsEngine.triggerHandler(this.containerElement, {
      type: "scroll"
    });
  }

  contentTranslateOffsetChange(prop, translateOffset) {
    if (prop === "top") {
      this.setState(state => _extends({}, state, {
        vContentTranslateOffset: translateOffset
      }));
    } else {
      this.setState(state => _extends({}, state, {
        hContentTranslateOffset: translateOffset
      }));
    }
  }

  cursorEnterHandler() {
    if (this.props.showScrollbar === "onHover") {
      this.setState(state => _extends({}, state, {
        isHovered: true
      }));
    }
  }

  cursorLeaveHandler() {
    if (this.props.showScrollbar === "onHover") {
      this.setState(state => _extends({}, state, {
        isHovered: false
      }));
    }
  }

  handleInit(event) {
    this.suppressDirections(event);
    this.eventForUserAction = event;
    var crossThumbScrolling = this.isCrossThumbScrolling(event);
    this.eventHandler(scrollbar => scrollbar.initHandler(event, crossThumbScrolling));
  }

  handleStart(event) {
    this.eventForUserAction = event;
    this.eventHandler(scrollbar => scrollbar.startHandler());
    this.onStart();
  }

  handleMove(e) {
    var _e$preventDefault;

    if (this.isLocked()) {
      e.cancel = true;
      return;
    }

    (_e$preventDefault = e.preventDefault) === null || _e$preventDefault === void 0 ? void 0 : _e$preventDefault.call(e);
    this.adjustDistance(e, "delta");
    this.eventForUserAction = e;
    this.eventHandler(scrollbar => scrollbar.moveHandler(e.delta));
  }

  handleEnd(event) {
    this.adjustDistance(event, "velocity");
    this.eventForUserAction = event;
    this.eventHandler(scrollbar => scrollbar.endHandler(event.velocity));
  }

  handleStop() {
    this.eventHandler(scrollbar => scrollbar.stopHandler());
  }

  handleCancel(event) {
    this.eventForUserAction = event;
    this.eventHandler(scrollbar => scrollbar.endHandler({
      x: 0,
      y: 0
    }));
  }

  isCrossThumbScrolling(event) {
    var {
      target
    } = event.originalEvent;
    var verticalScrolling = false;
    var horizontalScrolling = false;

    if (this.direction.isVertical) {
      verticalScrolling = this.props.scrollByThumb && this.vScrollbarRef.current.isThumb(target);
    }

    if (this.direction.isHorizontal) {
      horizontalScrolling = this.props.scrollByThumb && this.hScrollbarRef.current.isThumb(target);
    }

    return verticalScrolling || horizontalScrolling;
  }

  adjustDistance(event, property) {
    var distance = event[property];
    distance.x *= this.validDirections[DIRECTION_HORIZONTAL] ? 1 : 0;
    distance.y *= this.validDirections[DIRECTION_VERTICAL] ? 1 : 0;
    var devicePixelRatio = this.tryGetDevicePixelRatio();

    if (devicePixelRatio && isDxMouseWheelEvent(event.originalEvent)) {
      distance.x = Math.round(distance.x / devicePixelRatio * 100) / 100;
      distance.y = Math.round(distance.y / devicePixelRatio * 100) / 100;
    }
  }

  suppressDirections(event) {
    if (isDxMouseWheelEvent(event.originalEvent)) {
      this.prepareDirections(true);
      return;
    }

    this.prepareDirections(false);

    if (this.direction.isVertical) {
      var isValid = this.validateEvent(event, this.vScrollbarRef.current);
      this.validDirections[DIRECTION_VERTICAL] = isValid;
    }

    if (this.direction.isHorizontal) {
      var _isValid = this.validateEvent(event, this.hScrollbarRef.current);

      this.validDirections[DIRECTION_HORIZONTAL] = _isValid;
    }
  }

  validateEvent(event, scrollbarRef) {
    var {
      scrollByContent,
      scrollByThumb
    } = this.props;
    return scrollByThumb && scrollbarRef.validateEvent(event) || scrollByContent && this.isContent(event.originalEvent.target);
  }

  prepareDirections(value) {
    this.validDirections[DIRECTION_HORIZONTAL] = value;
    this.validDirections[DIRECTION_VERTICAL] = value;
  }

  isContent(element) {
    var closest = element.closest(".".concat(SCROLLABLE_SIMULATED_CLASS));

    if (isDefined(closest)) {
      return closest === this.scrollableRef.current;
    }

    return false;
  }

  eventHandler(handler) {
    if (this.direction.isHorizontal) {
      handler(this.hScrollbarRef.current);
    }

    if (this.direction.isVertical) {
      handler(this.vScrollbarRef.current);
    }
  }

  tryGetAllowedDirection(event) {
    return isDxMouseWheelEvent(event) ? this.wheelDirection(event) : this.allowedDirection();
  }

  allowedDirection() {
    if (this.direction.isBoth && this.allowedDirections.vertical && this.allowedDirections.horizontal) {
      return DIRECTION_BOTH;
    }

    if (this.direction.isHorizontal && this.allowedDirections.horizontal) {
      return DIRECTION_HORIZONTAL;
    }

    if (this.direction.isVertical && this.allowedDirections.vertical) {
      return DIRECTION_VERTICAL;
    }

    return undefined;
  }

  get allowedDirections() {
    return {
      vertical: this.direction.isVertical && (Math.round(-Math.max(this.contentHeight - this.state.containerClientHeight, 0)) < 0 || this.props.bounceEnabled),
      horizontal: this.direction.isHorizontal && (Math.round(-Math.max(this.contentWidth - this.state.containerClientWidth, 0)) < 0 || this.props.bounceEnabled)
    };
  }

  isLocked() {
    return this.locked;
  }

  validateWheel(event) {
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
      this.validateWheelTimer = setTimeout(this.clearWheelValidationTimer, VALIDATE_WHEEL_TIMEOUT);
    }

    return validated;
  }

  clearWheelValidationTimer() {
    clearTimeout(this.validateWheelTimer);
    this.validateWheelTimer = undefined;
  }

  validateMove(event) {
    if (!this.props.scrollByContent && !isDefined(event.target.closest(".".concat(SCROLLABLE_SCROLLBAR_CLASS)))) {
      return false;
    }

    return isDefined(this.allowedDirection());
  }

  handleTabKey() {
    if (this.tabWasPressed) {
      var {
        left,
        top
      } = this.scrollOffset();

      if (inRange(this.state.hScrollLocation, -getScrollLeftMax(this.containerElement), 0) && inRange(this.state.vScrollLocation, -getScrollTopMax(this.containerElement), 0)) {
        if (this.state.hScrollLocation !== -left) {
          this.setState(state => _extends({}, state, {
            hScrollLocation: -left
          }));
        }

        if (this.state.vScrollLocation !== -top) {
          this.setState(state => _extends({}, state, {
            vScrollLocation: -top
          }));
        }
      }

      this.tabWasPressed = false;
    }
  }

  handleKeyDown(event) {
    var handled = true;

    switch (normalizeKeyName(event)) {
      case KEY_CODES.TAB:
        this.tabWasPressed = true;
        handled = false;
        break;

      case KEY_CODES.DOWN:
        this.scrollByLine({
          y: 1
        });
        break;

      case KEY_CODES.UP:
        this.scrollByLine({
          y: -1
        });
        break;

      case KEY_CODES.RIGHT:
        this.scrollByLine({
          x: 1
        });
        break;

      case KEY_CODES.LEFT:
        this.scrollByLine({
          x: -1
        });
        break;

      case KEY_CODES.PAGE_DOWN:
        this.scrollByPage(1);
        break;

      case KEY_CODES.PAGE_UP:
        this.scrollByPage(-1);
        break;

      case KEY_CODES.HOME:
        this.scrollToHome();
        break;

      case KEY_CODES.END:
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
  }

  scrollByLine(lines) {
    var _lines$y, _lines$x;

    var devicePixelRatio = this.tryGetDevicePixelRatio();
    var scrollOffset = SCROLL_LINE_HEIGHT;

    if (devicePixelRatio) {
      scrollOffset = Math.abs(scrollOffset / devicePixelRatio * 100) / 100;
    }

    this.scrollBy({
      top: ((_lines$y = lines.y) !== null && _lines$y !== void 0 ? _lines$y : 0) * scrollOffset,
      left: ((_lines$x = lines.x) !== null && _lines$x !== void 0 ? _lines$x : 0) * scrollOffset
    });
  }

  tryGetDevicePixelRatio() {
    if (hasWindow()) {
      return getWindow().devicePixelRatio;
    }

    return undefined;
  }

  scrollByPage(page) {
    var {
      isVertical
    } = new ScrollDirection(this.wheelDirection());
    var distance = {};
    var {
      clientHeight,
      clientWidth
    } = this.containerElement;

    if (isVertical) {
      distance.top = page * clientHeight;
    } else {
      distance.left = page * clientWidth;
    }

    this.scrollBy(distance);
  }

  wheelDirection(event) {
    switch (this.props.direction) {
      case DIRECTION_HORIZONTAL:
        return DIRECTION_HORIZONTAL;

      case DIRECTION_VERTICAL:
        return DIRECTION_VERTICAL;

      default:
        return event !== null && event !== void 0 && event.shiftKey ? DIRECTION_HORIZONTAL : DIRECTION_VERTICAL;
    }
  }

  scrollToHome() {
    var distance = {
      [this.direction.isVertical ? "top" : "left"]: 0
    };
    this.scrollTo(distance);
  }

  scrollToEnd() {
    var {
      isVertical
    } = new ScrollDirection(this.wheelDirection());
    var distance = {};

    if (isVertical) {
      distance.top = getScrollTopMax(this.containerElement);
    } else {
      distance.left = getScrollLeftMax(this.containerElement);
    }

    this.scrollTo(distance);
  }

  lock() {
    this.locked = true;
  }

  unlock() {
    if (!this.props.disabled) {
      this.locked = false;
    }
  }

  get fullScrollInactiveProp() {
    return this.props.direction === DIRECTION_HORIZONTAL ? "scrollTop" : "scrollLeft";
  }

  updateHandler() {
    this.update();
  }

  onVisibilityChangeHandler(visible) {
    var _this$props$onVisibil, _this$props9;

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

    (_this$props$onVisibil = (_this$props9 = this.props).onVisibilityChange) === null || _this$props$onVisibil === void 0 ? void 0 : _this$props$onVisibil.call(_this$props9, visible);
  }

  updateSizes() {
    var containerEl = this.containerElement;
    var contentEl = this.contentRef.current;

    if (isDefined(containerEl)) {
      this.setState(state => _extends({}, state, {
        containerClientWidth: containerEl.clientWidth
      }));
      this.setState(state => _extends({}, state, {
        containerClientHeight: containerEl.clientHeight
      }));
    }

    if (isDefined(contentEl)) {
      this.setState(state => _extends({}, state, {
        contentClientWidth: contentEl.clientWidth
      }));
      this.setState(state => _extends({}, state, {
        contentClientHeight: contentEl.clientHeight
      }));
      this.setState(state => _extends({}, state, {
        contentScrollWidth: contentEl.scrollWidth
      }));
      this.setState(state => _extends({}, state, {
        contentScrollHeight: contentEl.scrollHeight
      }));
    }

    if (this.props.forceGeneratePockets) {
      if (this.props.pullDownEnabled) {
        var topPocketEl = this.topPocketRef.current;

        if (isDefined(topPocketEl)) {
          this.setState(state => _extends({}, state, {
            topPocketClientHeight: topPocketEl.clientHeight
          }));
        }
      }

      if (this.props.reachBottomEnabled) {
        var bottomPocketEl = this.bottomPocketRef.current;

        if (isDefined(bottomPocketEl)) {
          this.setState(state => _extends({}, state, {
            bottomPocketClientHeight: bottomPocketEl.clientHeight
          }));
        }
      }
    }

    if (this.prevContentClientWidth !== this.state.contentClientWidth || this.prevContainerClientWidth !== this.state.containerClientWidth) {
      this.setState(state => _extends({}, state, {
        forceUpdateHScrollbarLocation: true
      }));
      this.prevContentClientWidth = this.state.contentClientWidth;
      this.prevContainerClientWidth = this.state.containerClientWidth;
      this.setState(state => _extends({}, state, {
        hScrollLocation: -containerEl.scrollLeft
      }));
    }

    if (this.prevContentClientHeight !== this.state.contentClientHeight || this.prevContainerClientHeight !== this.state.containerClientHeight) {
      this.setState(state => _extends({}, state, {
        forceUpdateVScrollbarLocation: true
      }));
      this.prevContentClientHeight = this.state.contentClientHeight;
      this.prevContainerClientHeight = this.state.containerClientHeight;

      if (this.state.vScrollLocation <= 0) {
        this.setState(state => _extends({}, state, {
          vScrollLocation: -containerEl.scrollTop
        }));
      }
    }
  }

  get containerElement() {
    return this.containerRef.current;
  }

  get contentWidth() {
    var _this$contentRef;

    if (!isDefined((_this$contentRef = this.contentRef) === null || _this$contentRef === void 0 ? void 0 : _this$contentRef.current)) {
      return 0;
    }

    var isOverflowHidden = getElementComputedStyle(this.contentRef.current).overflowX === "hidden";

    if (!isOverflowHidden) {
      var containerScrollSize = this.state.contentScrollWidth;
      return Math.max(containerScrollSize, this.state.contentClientWidth);
    }

    return this.state.contentClientWidth;
  }

  get contentHeight() {
    var _this$contentRef2;

    if (!isDefined((_this$contentRef2 = this.contentRef) === null || _this$contentRef2 === void 0 ? void 0 : _this$contentRef2.current)) {
      return 0;
    }

    var isOverflowHidden = getElementComputedStyle(this.contentRef.current).overflowY === "hidden";

    if (!isOverflowHidden) {
      var containerScrollSize = this.state.contentScrollHeight;
      return Math.max(containerScrollSize, this.state.contentClientHeight);
    }

    return this.state.contentClientHeight;
  }

  get scrollableOffset() {
    var _getElementOffset;

    return (_getElementOffset = getElementOffset(this.scrollableRef.current)) !== null && _getElementOffset !== void 0 ? _getElementOffset : DEFAULT_OFFSET;
  }

  get contentStyles() {
    return {
      transform: "translate(".concat(this.state.hContentTranslateOffset, "px, ").concat(this.state.vContentTranslateOffset, "px)")
    };
  }

  get containerStyles() {
    var touchDirection = this.allowedDirections.vertical ? "pan-x" : "";
    touchDirection = this.allowedDirections.horizontal ? "pan-y" : touchDirection;
    touchDirection = this.allowedDirections.vertical && this.allowedDirections.horizontal ? "none" : touchDirection;
    return {
      touchAction: touchDirection
    };
  }

  get cssClasses() {
    var {
      classes,
      direction,
      disabled,
      showScrollbar
    } = this.props;
    var classesMap = {
      "dx-scrollable dx-scrollable-renovated": true,
      [SCROLLABLE_SIMULATED_CLASS]: true,
      ["dx-scrollable-".concat(direction)]: true,
      [SCROLLABLE_DISABLED_CLASS]: !!disabled,
      [SCROLLABLE_SCROLLBARS_ALWAYSVISIBLE]: showScrollbar === "always",
      ["".concat(classes)]: !!classes
    };
    return combineClasses(classesMap);
  }

  get direction() {
    return new ScrollDirection(this.props.direction);
  }

  get restAttributes() {
    var _this$props10 = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props10, _excluded);

    return restProps;
  }

  content() {
    if (this.props.needScrollViewContentWrapper) {
      return this.scrollViewContentRef.current;
    }

    return this.contentRef.current;
  }

  container() {
    return this.containerRef.current;
  }

  update() {
    this.updateSizes();
    this.onUpdated();
  }

  refresh() {
    var _this$props$onPullDow2, _this$props11;

    this.pocketStateChange(TopPocketState.STATE_READY);
    this.startLoading();
    (_this$props$onPullDow2 = (_this$props11 = this.props).onPullDown) === null || _this$props$onPullDow2 === void 0 ? void 0 : _this$props$onPullDow2.call(_this$props11, {});
  }

  release() {
    this.eventHandler(scrollbar => scrollbar.releaseHandler());
  }

  scrollBy(distance) {
    var location = restoreLocation(distance, this.props.direction);

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
    this.eventHandler(scrollbar => {
      var _location$left, _location$top;

      return scrollbar.scrollByHandler({
        x: (_location$left = location.left) !== null && _location$left !== void 0 ? _location$left : 0,
        y: (_location$top = location.top) !== null && _location$top !== void 0 ? _location$top : 0
      });
    });
  }

  scrollTo(targetLocation) {
    var {
      direction
    } = this.props;
    var distance = getOffsetDistance(targetLocation, direction, this.scrollOffset());
    this.scrollBy(distance);
  }

  scrollToElement(element, scrollToOptions) {
    if (!isDefined(element)) {
      return;
    }

    var {
      left,
      top
    } = this.scrollOffset();
    element.scrollIntoView(scrollToOptions || {
      block: "nearest",
      inline: "nearest"
    });
    var containerEl = this.containerElement;
    var {
      direction
    } = this.props;
    var distance = getOffsetDistance({
      top,
      left
    }, direction, this.scrollOffset());

    if (!this.direction.isHorizontal) {
      containerEl.scrollLeft += distance.left;
    }

    if (!this.direction.isVertical) {
      containerEl.scrollTop += distance.top;
    }

    this.setState(state => _extends({}, state, {
      vScrollLocation: -containerEl.scrollTop
    }));
    this.setState(state => _extends({}, state, {
      hScrollLocation: -containerEl.scrollLeft
    }));
  }

  getElementLocation(element, direction, offset) {
    return getElementLocationInternal(element, _extends({
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    }, offset), direction, this.containerElement);
  }

  scrollHeight() {
    return this.content().offsetHeight;
  }

  scrollWidth() {
    return this.content().offsetWidth;
  }

  scrollOffset() {
    var {
      scrollLeft,
      scrollTop
    } = this.containerElement;
    return {
      top: scrollTop,
      left: scrollLeft
    };
  }

  scrollTop() {
    return this.scrollOffset().top;
  }

  scrollLeft() {
    return this.scrollOffset().left;
  }

  clientHeight() {
    return this.containerElement.clientHeight;
  }

  clientWidth() {
    return this.containerElement.clientWidth;
  }

  validate(event) {
    if (this.isLocked()) {
      return false;
    }

    this.update();
    return this.moveIsAllowed(event);
  }

  moveIsAllowed(event) {
    if (this.props.disabled || isDxMouseWheelEvent(event) && isCommandKeyPressed({
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey
    })) {
      return false;
    }

    if (this.props.bounceEnabled) {
      return true;
    }

    return isDxMouseWheelEvent(event) ? this.validateWheel(event) : this.validateMove(event);
  }

  render() {
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
  }

}
ScrollableSimulated.defaultProps = _extends({}, ScrollableSimulatedPropsType);