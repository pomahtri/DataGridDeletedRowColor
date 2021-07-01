/**
* DevExtreme (esm/renovation/ui/scroll_view/scrollbar.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["activeStateEnabled", "bottomPocketSize", "bounceEnabled", "containerSize", "contentSize", "contentTranslateOffsetChange", "direction", "forceGeneratePockets", "forceUpdateScrollbarLocation", "forceVisibility", "hoverStateEnabled", "isScrollableHovered", "onAnimatorCancel", "onAnimatorStart", "onEnd", "onPullDown", "onReachBottom", "onRelease", "onScroll", "pocketState", "pocketStateChange", "pullDownEnabled", "reachBottomEnabled", "rtlEnabled", "scrollByThumb", "scrollLocation", "scrollLocationChange", "scrollableOffset", "showScrollbar", "topPocketSize"];
import { createVNode, createComponentVNode } from "inferno";
import { InfernoEffect, InfernoComponent, normalizeStyles } from "@devextreme/vdom";
import { Widget } from "../common/widget";
import { combineClasses } from "../../utils/combine_classes";
import domAdapter from "../../../core/dom_adapter";
import { isDefined } from "../../../core/utils/type";
import { isDxMouseWheelEvent } from "../../../events/utils/index";
import { ScrollbarProps } from "./scrollbar_props";
import { DIRECTION_HORIZONTAL, SCROLLABLE_SCROLLBAR_CLASS, TopPocketState, SCROLLABLE_SCROLL_CLASS, SCROLLABLE_SCROLL_CONTENT_CLASS, HIDE_SCROLLBAR_TIMEOUT, SCROLLABLE_SCROLLBAR_ACTIVE_CLASS, HOVER_ENABLED_STATE } from "./common/consts";
import { dxPointerDown, dxPointerUp } from "../../../events/short";
import { ScrollableSimulatedProps } from "./scrollable_simulated_props";
import { ScrollableProps } from "./scrollable_props";
import { inRange } from "../../../core/utils/math";
var OUT_BOUNDS_ACCELERATION = 0.5;
var THUMB_MIN_SIZE = 15;
export var viewFunction = viewModel => {
  var {
    cssClasses,
    hoverStateEnabled,
    isVisible,
    onHoverEnd,
    onHoverStart,
    props: {
      activeStateEnabled
    },
    scrollRef,
    scrollStyles,
    scrollbarRef
  } = viewModel;
  return createComponentVNode(2, Widget, {
    "rootElementRef": scrollbarRef,
    "classes": cssClasses,
    "activeStateEnabled": activeStateEnabled,
    "hoverStateEnabled": hoverStateEnabled,
    "visible": isVisible,
    "onHoverStart": onHoverStart,
    "onHoverEnd": onHoverEnd,
    children: createVNode(1, "div", viewModel.scrollClasses, createVNode(1, "div", SCROLLABLE_SCROLL_CONTENT_CLASS), 2, {
      "style": normalizeStyles(scrollStyles)
    }, null, scrollRef)
  });
};
export var ScrollbarPropsType = {
  activeStateEnabled: ScrollbarProps.activeStateEnabled,
  containerSize: ScrollbarProps.containerSize,
  contentSize: ScrollbarProps.contentSize,
  topPocketSize: ScrollbarProps.topPocketSize,
  bottomPocketSize: ScrollbarProps.bottomPocketSize,
  scrollableOffset: ScrollbarProps.scrollableOffset,
  isScrollableHovered: ScrollbarProps.isScrollableHovered,
  forceVisibility: ScrollbarProps.forceVisibility,
  forceUpdateScrollbarLocation: ScrollbarProps.forceUpdateScrollbarLocation,
  scrollLocation: ScrollbarProps.scrollLocation,
  pocketState: ScrollbarProps.pocketState,
  onAnimatorCancel: ScrollbarProps.onAnimatorCancel,
  onPullDown: ScrollbarProps.onPullDown,
  onReachBottom: ScrollbarProps.onReachBottom,
  onRelease: ScrollbarProps.onRelease,
  onScroll: ScrollbarProps.onScroll,
  onEnd: ScrollbarProps.onEnd,
  direction: ScrollableProps.direction,
  showScrollbar: ScrollableProps.showScrollbar,
  scrollByThumb: ScrollableProps.scrollByThumb,
  pullDownEnabled: ScrollableProps.pullDownEnabled,
  reachBottomEnabled: ScrollableProps.reachBottomEnabled,
  forceGeneratePockets: ScrollableProps.forceGeneratePockets,
  bounceEnabled: ScrollableSimulatedProps.bounceEnabled
};
import { createRef as infernoCreateRef } from "inferno";
export class Scrollbar extends InfernoComponent {
  constructor(props) {
    super(props);
    this.thumbScrolling = false;
    this.crossThumbScrolling = false;
    this.initialTopPocketSize = 0;
    this.rightScrollLocation = 0;
    this.prevScrollLocation = 0;
    this.scrollbarRef = infernoCreateRef();
    this.scrollRef = infernoCreateRef();
    this.state = {
      pendingPullDown: false,
      showOnScrollByWheel: undefined,
      hovered: false,
      expanded: false,
      visibility: false
    };
    this.pointerDownEffect = this.pointerDownEffect.bind(this);
    this.pointerUpEffect = this.pointerUpEffect.bind(this);
    this.isThumb = this.isThumb.bind(this);
    this.isScrollbar = this.isScrollbar.bind(this);
    this.validateEvent = this.validateEvent.bind(this);
    this.getLocationWithinRange = this.getLocationWithinRange.bind(this);
    this.getMinOffset = this.getMinOffset.bind(this);
    this.getMaxOffset = this.getMaxOffset.bind(this);
    this.initHandler = this.initHandler.bind(this);
    this.startHandler = this.startHandler.bind(this);
    this.moveHandler = this.moveHandler.bind(this);
    this.disposeHideScrollbarTimer = this.disposeHideScrollbarTimer.bind(this);
    this.endHandler = this.endHandler.bind(this);
    this.stopHandler = this.stopHandler.bind(this);
    this.scrollByHandler = this.scrollByHandler.bind(this);
    this.scrollComplete = this.scrollComplete.bind(this);
    this.scrollStep = this.scrollStep.bind(this);
    this.updateContentTranslate = this.updateContentTranslate.bind(this);
    this.moveTo = this.moveTo.bind(this);
    this.releaseHandler = this.releaseHandler.bind(this);
    this.moveToBoundaryOnSizeChange = this.moveToBoundaryOnSizeChange.bind(this);
    this.hide = this.hide.bind(this);
    this.inRange = this.inRange.bind(this);
    this.clearHideScrollbarTimer = this.clearHideScrollbarTimer.bind(this);
    this.onInertiaAnimatorStart = this.onInertiaAnimatorStart.bind(this);
    this.onBounceAnimatorStart = this.onBounceAnimatorStart.bind(this);
    this.pullDownRefreshing = this.pullDownRefreshing.bind(this);
    this.reachBottomLoading = this.reachBottomLoading.bind(this);
    this.onPullDown = this.onPullDown.bind(this);
    this.onReachBottom = this.onReachBottom.bind(this);
    this.scrollToBounds = this.scrollToBounds.bind(this);
    this.resetThumbScrolling = this.resetThumbScrolling.bind(this);
    this.scrollBy = this.scrollBy.bind(this);
    this.cancelScrolling = this.cancelScrolling.bind(this);
    this.onAnimatorCancel = this.onAnimatorCancel.bind(this);
    this.prepareThumbScrolling = this.prepareThumbScrolling.bind(this);
    this.moveToMouseLocation = this.moveToMouseLocation.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.release = this.release.bind(this);
    this.stateReleased = this.stateReleased.bind(this);
    this.onRelease = this.onRelease.bind(this);
    this.setPocketState = this.setPocketState.bind(this);
    this.isReachBottom = this.isReachBottom.bind(this);
    this.expand = this.expand.bind(this);
    this.collapse = this.collapse.bind(this);
    this.onHoverStart = this.onHoverStart.bind(this);
    this.onHoverEnd = this.onHoverEnd.bind(this);
  }

  createEffects() {
    return [new InfernoEffect(this.pointerDownEffect, []), new InfernoEffect(this.pointerUpEffect, []), new InfernoEffect(this.disposeHideScrollbarTimer, []), new InfernoEffect(this.updateContentTranslate, [this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.topPocketSize, this.props.contentSize, this.props.reachBottomEnabled, this.props.bottomPocketSize, this.props.containerSize, this.props.contentTranslateOffsetChange, this.props.direction, this.props.scrollLocation]), new InfernoEffect(this.moveToBoundaryOnSizeChange, [this.props.forceUpdateScrollbarLocation, this.props.scrollLocation, this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.bounceEnabled, this.props.topPocketSize, this.state.pendingPullDown, this.props.contentSize, this.props.reachBottomEnabled, this.props.bottomPocketSize, this.props.containerSize, this.props.direction, this.props.rtlEnabled, this.props.scrollLocationChange, this.props.contentTranslateOffsetChange, this.props.onScroll, this.props.pocketState, this.props.pocketStateChange, this.props.onRelease])];
  }

  updateEffects() {
    var _this$_effects$, _this$_effects$2, _this$_effects$3, _this$_effects$4;

    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([]);
    (_this$_effects$2 = this._effects[1]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([]);
    (_this$_effects$3 = this._effects[3]) === null || _this$_effects$3 === void 0 ? void 0 : _this$_effects$3.update([this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.topPocketSize, this.props.contentSize, this.props.reachBottomEnabled, this.props.bottomPocketSize, this.props.containerSize, this.props.contentTranslateOffsetChange, this.props.direction, this.props.scrollLocation]);
    (_this$_effects$4 = this._effects[4]) === null || _this$_effects$4 === void 0 ? void 0 : _this$_effects$4.update([this.props.forceUpdateScrollbarLocation, this.props.scrollLocation, this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.bounceEnabled, this.props.topPocketSize, this.state.pendingPullDown, this.props.contentSize, this.props.reachBottomEnabled, this.props.bottomPocketSize, this.props.containerSize, this.props.direction, this.props.rtlEnabled, this.props.scrollLocationChange, this.props.contentTranslateOffsetChange, this.props.onScroll, this.props.pocketState, this.props.pocketStateChange, this.props.onRelease]);
  }

  pointerDownEffect() {
    var namespace = "dxScrollbar";
    dxPointerDown.on(this.scrollRef.current, () => {
      this.expand();
    }, {
      namespace
    });
    return () => dxPointerDown.off(this.scrollRef.current, {
      namespace
    });
  }

  pointerUpEffect() {
    var namespace = "dxScrollbar";
    dxPointerUp.on(domAdapter.getDocument(), () => {
      this.collapse();
    }, {
      namespace
    });
    return () => dxPointerUp.off(this.scrollRef.current, {
      namespace
    });
  }

  disposeHideScrollbarTimer() {
    return () => this.clearHideScrollbarTimer();
  }

  updateContentTranslate() {
    if (this.props.forceGeneratePockets && this.props.pullDownEnabled) {
      if (this.initialTopPocketSize !== this.topPocketSize) {
        this.updateContent(this.props.scrollLocation);
        this.initialTopPocketSize = this.topPocketSize;
      }
    }
  }

  moveToBoundaryOnSizeChange() {
    if (this.props.forceUpdateScrollbarLocation) {
      if (this.props.scrollLocation <= this.maxOffset) {
        var newScrollLocation = this.getLocationWithinRange(this.props.scrollLocation);

        if (this.isHorizontal && this.props.rtlEnabled) {
          newScrollLocation = this.minOffset - this.rightScrollLocation;

          if (newScrollLocation >= 0) {
            newScrollLocation = 0;
          }
        }

        this.moveTo(newScrollLocation);
      }
    }
  }

  hide() {
    this.setState(state => _extends({}, state, {
      visibility: false
    }));

    if (isDefined(this.state.showOnScrollByWheel) && this.props.showScrollbar === "onScroll") {
      this.hideScrollbarTimer = setTimeout(() => {
        this.setState(state => _extends({}, state, {
          showOnScrollByWheel: undefined
        }));
      }, HIDE_SCROLLBAR_TIMEOUT);
    }
  }

  inRange() {
    return inRange(this.props.scrollLocation, this.minOffset, this.maxOffset);
  }

  get axis() {
    return this.isHorizontal ? "x" : "y";
  }

  get scrollProp() {
    return this.isHorizontal ? "left" : "top";
  }

  get fullScrollProp() {
    return this.isHorizontal ? "scrollLeft" : "scrollTop";
  }

  get dimension() {
    return this.isHorizontal ? "width" : "height";
  }

  get isHorizontal() {
    return this.props.direction === DIRECTION_HORIZONTAL;
  }

  clearHideScrollbarTimer() {
    clearTimeout(this.hideScrollbarTimer);
    this.hideScrollbarTimer = undefined;
  }

  onInertiaAnimatorStart(velocity) {
    var _this$props$onAnimato, _this$props;

    (_this$props$onAnimato = (_this$props = this.props).onAnimatorStart) === null || _this$props$onAnimato === void 0 ? void 0 : _this$props$onAnimato.call(_this$props, "inertia", velocity, this.thumbScrolling, this.crossThumbScrolling);
  }

  onBounceAnimatorStart() {
    var _this$props$onAnimato2, _this$props2;

    (_this$props$onAnimato2 = (_this$props2 = this.props).onAnimatorStart) === null || _this$props$onAnimato2 === void 0 ? void 0 : _this$props$onAnimato2.call(_this$props2, "bounce");
  }

  pullDownRefreshing() {
    this.setPocketState(TopPocketState.STATE_REFRESHING);
    this.onPullDown();
    this.setState(state => _extends({}, state, {
      pendingPullDown: false
    }));
  }

  reachBottomLoading() {
    this.onReachBottom();
  }

  onPullDown() {
    var _this$props$onPullDow, _this$props3;

    (_this$props$onPullDow = (_this$props3 = this.props).onPullDown) === null || _this$props$onPullDow === void 0 ? void 0 : _this$props$onPullDow.call(_this$props3);
  }

  onReachBottom() {
    var _this$props$onReachBo, _this$props4;

    (_this$props$onReachBo = (_this$props4 = this.props).onReachBottom) === null || _this$props$onReachBo === void 0 ? void 0 : _this$props$onReachBo.call(_this$props4);
  }

  scrollToBounds() {
    if (this.inRange()) {
      this.hide();
      return;
    }

    if (this.isPullDown) {
      this.setState(state => _extends({}, state, {
        pendingPullDown: true
      }));
    }

    this.onBounceAnimatorStart();
  }

  resetThumbScrolling() {
    this.thumbScrolling = false;
    this.crossThumbScrolling = false;
  }

  scrollBy(delta) {
    var distance = delta[this.axis];

    if (!this.inRange()) {
      distance *= OUT_BOUNDS_ACCELERATION;
    }

    this.scrollStep(distance);
  }

  cancelScrolling() {
    this.hide();
    this.onAnimatorCancel();
  }

  onAnimatorCancel() {
    var _this$props$onAnimato3, _this$props5;

    (_this$props$onAnimato3 = (_this$props5 = this.props).onAnimatorCancel) === null || _this$props$onAnimato3 === void 0 ? void 0 : _this$props$onAnimato3.call(_this$props5);
  }

  prepareThumbScrolling(event, currentCrossThumbScrolling) {
    if (isDxMouseWheelEvent(event.originalEvent)) {
      if (this.props.showScrollbar === "onScroll") {
        this.setState(state => _extends({}, state, {
          showOnScrollByWheel: true
        }));
      }

      return;
    }

    var {
      target
    } = event.originalEvent;
    var scrollbarClicked = this.props.scrollByThumb && this.isScrollbar(target);

    if (scrollbarClicked) {
      this.moveToMouseLocation(event);
    }

    var currentThumbScrolling = scrollbarClicked || this.props.scrollByThumb && this.isThumb(target);
    this.thumbScrolling = currentThumbScrolling;
    this.crossThumbScrolling = !currentThumbScrolling && currentCrossThumbScrolling;

    if (currentThumbScrolling) {
      this.expand();
    }
  }

  moveToMouseLocation(event) {
    var mouseLocation = event["page".concat(this.axis.toUpperCase())] - this.props.scrollableOffset;
    var delta = this.props.scrollLocation + mouseLocation / this.containerToContentRatio - this.props.containerSize / 2;
    this.scrollStep(-Math.round(delta));
  }

  updateContent(location) {
    var _this$props$contentTr, _this$props6;

    var contentTranslateOffset = Number.NaN;

    if (location > 0) {
      contentTranslateOffset = location;
    } else if (location <= this.minOffset) {
      contentTranslateOffset = location - this.minOffset;
    } else {
      contentTranslateOffset = location % 1;
    }

    if (this.props.forceGeneratePockets && this.props.pullDownEnabled) {
      contentTranslateOffset -= this.topPocketSize;
    }

    (_this$props$contentTr = (_this$props6 = this.props).contentTranslateOffsetChange) === null || _this$props$contentTr === void 0 ? void 0 : _this$props$contentTr.call(_this$props6, this.scrollProp, contentTranslateOffset);
  }

  get maxOffset() {
    if (this.props.forceGeneratePockets) {
      if (this.isPullDown && this.state.pendingPullDown) {
        return this.topPocketSize;
      }
    }

    return 0;
  }

  release() {
    this.stateReleased();
    this.scrollComplete();
  }

  stateReleased() {
    this.setPocketState(TopPocketState.STATE_RELEASED);
    this.onRelease();
  }

  onRelease() {
    var _this$props$onRelease, _this$props7;

    (_this$props$onRelease = (_this$props7 = this.props).onRelease) === null || _this$props$onRelease === void 0 ? void 0 : _this$props$onRelease.call(_this$props7);
  }

  setPocketState(newState) {
    var _this$props$pocketSta, _this$props8;

    (_this$props$pocketSta = (_this$props8 = this.props).pocketStateChange) === null || _this$props$pocketSta === void 0 ? void 0 : _this$props$pocketSta.call(_this$props8, newState);
  }

  get isPullDown() {
    return this.props.pullDownEnabled && this.props.bounceEnabled && this.props.scrollLocation - this.props.topPocketSize >= 0;
  }

  isReachBottom() {
    return this.props.reachBottomEnabled && this.props.scrollLocation - this.minOffset - this.bottomPocketSize <= 0.5;
  }

  get minOffset() {
    if (this.props.forceGeneratePockets) {
      return -Math.max(this.bottomBoundaryOffset + this.bottomPocketSize, 0);
    }

    return -Math.max(this.bottomBoundaryOffset, 0);
  }

  get scrollSize() {
    return Math.max(this.props.containerSize * this.containerToContentRatio, THUMB_MIN_SIZE);
  }

  get scrollRatio() {
    if (this.bottomBoundaryOffset) {
      return (this.props.containerSize - this.scrollSize) / this.bottomBoundaryOffset;
    }

    return 1;
  }

  get contentSize() {
    if (this.props.contentSize) {
      return this.props.contentSize - this.bottomPocketSize - this.topPocketSize;
    }

    return 0;
  }

  get containerToContentRatio() {
    return this.contentSize ? this.props.containerSize / this.contentSize : this.props.containerSize;
  }

  expand() {
    this.setState(state => _extends({}, state, {
      expanded: true
    }));
  }

  collapse() {
    this.setState(state => _extends({}, state, {
      expanded: false
    }));
  }

  onHoverStart() {
    if (this.props.showScrollbar === "onHover") {
      this.setState(state => _extends({}, state, {
        hovered: true
      }));
    }
  }

  onHoverEnd() {
    if (this.props.showScrollbar === "onHover") {
      this.setState(state => _extends({}, state, {
        hovered: false
      }));
    }
  }

  get topPocketSize() {
    if (this.props.pullDownEnabled) {
      return this.props.topPocketSize;
    }

    return 0;
  }

  get bottomPocketSize() {
    if (this.props.reachBottomEnabled) {
      return this.props.bottomPocketSize;
    }

    return 0;
  }

  get bottomBoundaryOffset() {
    return this.contentSize - this.props.containerSize;
  }

  get cssClasses() {
    var {
      direction
    } = this.props;
    var classesMap = {
      [SCROLLABLE_SCROLLBAR_CLASS]: true,
      ["dx-scrollbar-".concat(direction)]: true,
      [SCROLLABLE_SCROLLBAR_ACTIVE_CLASS]: !!this.state.expanded,
      [HOVER_ENABLED_STATE]: !!this.hoverStateEnabled
    };
    return combineClasses(classesMap);
  }

  get scrollStyles() {
    return {
      [this.dimension]: this.scrollSize || THUMB_MIN_SIZE,
      transform: this.scrollTransform
    };
  }

  get scrollTransform() {
    if (this.props.showScrollbar === "never") {
      return "none";
    }

    var translateValue = -this.props.scrollLocation * this.scrollRatio;

    if (this.isHorizontal) {
      return "translate(".concat(translateValue, "px, 0px)");
    }

    return "translate(0px, ".concat(translateValue, "px)");
  }

  get scrollClasses() {
    return combineClasses({
      [SCROLLABLE_SCROLL_CLASS]: true,
      "dx-state-invisible": !this.visible
    });
  }

  get isVisible() {
    return this.props.showScrollbar !== "never" && this.containerToContentRatio < 1 && this.props.containerSize > 15;
  }

  get visible() {
    var {
      forceVisibility,
      showScrollbar
    } = this.props;

    if (!this.isVisible) {
      return false;
    }

    if (showScrollbar === "onHover") {
      return this.state.visibility || this.props.isScrollableHovered || this.state.hovered;
    }

    if (showScrollbar === "always") {
      return true;
    }

    return forceVisibility || this.state.visibility || !!this.state.showOnScrollByWheel;
  }

  get hoverStateEnabled() {
    var {
      scrollByThumb,
      showScrollbar
    } = this.props;
    return (showScrollbar === "onHover" || showScrollbar === "always") && scrollByThumb;
  }

  get restAttributes() {
    var _this$props9 = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props9, _excluded);

    return restProps;
  }

  isThumb(element) {
    var _this$scrollbarRef$cu, _this$scrollbarRef$cu2;

    return ((_this$scrollbarRef$cu = this.scrollbarRef.current) === null || _this$scrollbarRef$cu === void 0 ? void 0 : _this$scrollbarRef$cu.querySelector(".".concat(SCROLLABLE_SCROLL_CLASS))) === element || ((_this$scrollbarRef$cu2 = this.scrollbarRef.current) === null || _this$scrollbarRef$cu2 === void 0 ? void 0 : _this$scrollbarRef$cu2.querySelector(".".concat(SCROLLABLE_SCROLL_CONTENT_CLASS))) === element;
  }

  isScrollbar(element) {
    return element === this.scrollbarRef.current;
  }

  validateEvent(event) {
    var {
      target
    } = event.originalEvent;
    return this.isThumb(target) || this.isScrollbar(target);
  }

  getLocationWithinRange(value) {
    return Math.max(Math.min(value, this.maxOffset), this.minOffset);
  }

  getMinOffset() {
    return this.minOffset;
  }

  getMaxOffset() {
    return this.maxOffset;
  }

  initHandler(event, crossThumbScrolling) {
    this.cancelScrolling();
    this.prepareThumbScrolling(event, crossThumbScrolling);
  }

  startHandler() {
    this.setState(state => _extends({}, state, {
      visibility: true
    }));
  }

  moveHandler(delta) {
    if (this.crossThumbScrolling) {
      return;
    }

    var distance = delta;

    if (this.thumbScrolling) {
      distance[this.axis] = -Math.round(distance[this.axis] / this.containerToContentRatio);
    }

    this.scrollBy(distance);
  }

  endHandler(velocity) {
    this.onInertiaAnimatorStart(velocity[this.axis]);
    this.resetThumbScrolling();
  }

  stopHandler() {
    this.hide();

    if (this.thumbScrolling) {
      this.scrollComplete();
    } else {
      this.scrollToBounds();
    }

    this.resetThumbScrolling();
  }

  scrollByHandler(delta) {
    this.scrollBy(delta);
    this.scrollComplete();
  }

  scrollComplete() {
    if (this.props.forceGeneratePockets) {
      if (this.inRange()) {
        if (this.props.pocketState === TopPocketState.STATE_READY) {
          this.pullDownRefreshing();
          return;
        }

        if (this.props.pocketState === TopPocketState.STATE_LOADING) {
          this.reachBottomLoading();
          return;
        }
      }
    }

    if (this.inRange()) {
      var _this$props$onEnd, _this$props10;

      this.hide();
      (_this$props$onEnd = (_this$props10 = this.props).onEnd) === null || _this$props$onEnd === void 0 ? void 0 : _this$props$onEnd.call(_this$props10, this.props.direction);
      return;
    }

    this.scrollToBounds();
  }

  scrollStep(delta) {
    if (this.props.bounceEnabled) {
      this.moveTo(this.props.scrollLocation + delta);
    } else {
      this.moveTo(this.getLocationWithinRange(this.props.scrollLocation + delta));
    }
  }

  moveTo(location) {
    var _this$props$scrollLoc, _this$props11;

    var scrollDelta = Math.abs(this.prevScrollLocation - location);
    (_this$props$scrollLoc = (_this$props11 = this.props).scrollLocationChange) === null || _this$props$scrollLoc === void 0 ? void 0 : _this$props$scrollLoc.call(_this$props11, this.fullScrollProp, location);
    this.updateContent(location);

    if (scrollDelta >= 1) {
      var _this$props$onScroll, _this$props12;

      (_this$props$onScroll = (_this$props12 = this.props).onScroll) === null || _this$props$onScroll === void 0 ? void 0 : _this$props$onScroll.call(_this$props12);
    }

    this.prevScrollLocation = location;
    this.rightScrollLocation = this.minOffset - location;

    if (this.props.forceGeneratePockets) {
      if (this.isPullDown) {
        if (this.props.pocketState !== TopPocketState.STATE_READY) {
          this.setPocketState(TopPocketState.STATE_READY);
        }
      } else if (this.isReachBottom()) {
        if (this.props.pocketState !== TopPocketState.STATE_LOADING) {
          this.setPocketState(TopPocketState.STATE_LOADING);
        }
      } else if (this.props.pocketState !== TopPocketState.STATE_RELEASED) {
        this.stateReleased();
      }
    }
  }

  releaseHandler() {
    this.release();
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      pendingPullDown: this.state.pendingPullDown,
      showOnScrollByWheel: this.state.showOnScrollByWheel,
      hovered: this.state.hovered,
      expanded: this.state.expanded,
      visibility: this.state.visibility,
      scrollbarRef: this.scrollbarRef,
      scrollRef: this.scrollRef,
      hide: this.hide,
      inRange: this.inRange,
      axis: this.axis,
      scrollProp: this.scrollProp,
      fullScrollProp: this.fullScrollProp,
      dimension: this.dimension,
      isHorizontal: this.isHorizontal,
      clearHideScrollbarTimer: this.clearHideScrollbarTimer,
      onInertiaAnimatorStart: this.onInertiaAnimatorStart,
      onBounceAnimatorStart: this.onBounceAnimatorStart,
      pullDownRefreshing: this.pullDownRefreshing,
      reachBottomLoading: this.reachBottomLoading,
      onPullDown: this.onPullDown,
      onReachBottom: this.onReachBottom,
      scrollToBounds: this.scrollToBounds,
      resetThumbScrolling: this.resetThumbScrolling,
      scrollBy: this.scrollBy,
      cancelScrolling: this.cancelScrolling,
      onAnimatorCancel: this.onAnimatorCancel,
      prepareThumbScrolling: this.prepareThumbScrolling,
      moveToMouseLocation: this.moveToMouseLocation,
      updateContent: this.updateContent,
      maxOffset: this.maxOffset,
      release: this.release,
      stateReleased: this.stateReleased,
      onRelease: this.onRelease,
      setPocketState: this.setPocketState,
      isPullDown: this.isPullDown,
      isReachBottom: this.isReachBottom,
      minOffset: this.minOffset,
      scrollSize: this.scrollSize,
      scrollRatio: this.scrollRatio,
      contentSize: this.contentSize,
      containerToContentRatio: this.containerToContentRatio,
      expand: this.expand,
      collapse: this.collapse,
      onHoverStart: this.onHoverStart,
      onHoverEnd: this.onHoverEnd,
      topPocketSize: this.topPocketSize,
      bottomPocketSize: this.bottomPocketSize,
      bottomBoundaryOffset: this.bottomBoundaryOffset,
      cssClasses: this.cssClasses,
      scrollStyles: this.scrollStyles,
      scrollTransform: this.scrollTransform,
      scrollClasses: this.scrollClasses,
      isVisible: this.isVisible,
      visible: this.visible,
      hoverStateEnabled: this.hoverStateEnabled,
      restAttributes: this.restAttributes
    });
  }

}
Scrollbar.defaultProps = _extends({}, ScrollbarPropsType);
