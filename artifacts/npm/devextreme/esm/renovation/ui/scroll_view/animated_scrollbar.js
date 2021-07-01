/**
* DevExtreme (esm/renovation/ui/scroll_view/animated_scrollbar.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["activeStateEnabled", "bottomPocketSize", "bounceEnabled", "containerSize", "contentSize", "contentTranslateOffsetChange", "direction", "forceGeneratePockets", "forceUpdateScrollbarLocation", "forceVisibility", "hoverStateEnabled", "inertiaEnabled", "isScrollableHovered", "onAnimatorCancel", "onAnimatorStart", "onBounce", "onEnd", "onPullDown", "onReachBottom", "onRelease", "onScroll", "pocketState", "pocketStateChange", "pullDownEnabled", "reachBottomEnabled", "rtlEnabled", "scrollByThumb", "scrollLocation", "scrollLocationChange", "scrollableOffset", "showScrollbar", "topPocketSize"];
import { createComponentVNode } from "inferno";
import { InfernoEffect, InfernoComponent } from "@devextreme/vdom";
import { isDefined } from "../../../core/utils/type";
import { Scrollbar } from "./scrollbar";
import { requestAnimationFrame, cancelAnimationFrame } from "../../../animation/frame";
import { ScrollbarProps } from "./scrollbar_props";
import { ScrollableSimulatedProps } from "./scrollable_simulated_props";
import { ScrollableProps } from "./scrollable_props";
import { inRange } from "../../../core/utils/math";
export var OUT_BOUNDS_ACCELERATION = 0.5;
export var ACCELERATION = 0.92;
export var MIN_VELOCITY_LIMIT = 1;
export var BOUNCE_MIN_VELOCITY_LIMIT = MIN_VELOCITY_LIMIT / 5;
var FRAME_DURATION = 17;
var BOUNCE_DURATION = 400;
var BOUNCE_FRAMES = BOUNCE_DURATION / FRAME_DURATION;
export var BOUNCE_ACCELERATION_SUM = (1 - ACCELERATION ** BOUNCE_FRAMES) / (1 - ACCELERATION);
export var viewFunction = viewModel => {
  var {
    cancel,
    props: {
      bottomPocketSize,
      bounceEnabled,
      containerSize,
      contentSize,
      contentTranslateOffsetChange,
      direction,
      forceGeneratePockets,
      forceUpdateScrollbarLocation,
      isScrollableHovered,
      onEnd,
      onPullDown,
      onReachBottom,
      onRelease,
      onScroll,
      pocketState,
      pocketStateChange,
      pullDownEnabled,
      reachBottomEnabled,
      rtlEnabled,
      scrollByThumb,
      scrollLocation,
      scrollLocationChange,
      scrollableOffset,
      showScrollbar,
      topPocketSize
    },
    scrollbarRef,
    start
  } = viewModel;
  return createComponentVNode(2, Scrollbar, {
    "direction": direction,
    "onAnimatorStart": start,
    "onAnimatorCancel": cancel,
    "scrollableOffset": scrollableOffset,
    "contentSize": contentSize,
    "containerSize": containerSize,
    "isScrollableHovered": isScrollableHovered,
    "scrollLocation": scrollLocation,
    "scrollLocationChange": scrollLocationChange,
    "contentTranslateOffsetChange": contentTranslateOffsetChange,
    "scrollByThumb": scrollByThumb,
    "bounceEnabled": bounceEnabled,
    "showScrollbar": showScrollbar,
    "forceUpdateScrollbarLocation": forceUpdateScrollbarLocation,
    "onScroll": onScroll,
    "onEnd": onEnd,
    "rtlEnabled": rtlEnabled,
    "forceGeneratePockets": forceGeneratePockets,
    "topPocketSize": topPocketSize,
    "bottomPocketSize": bottomPocketSize,
    "onPullDown": onPullDown,
    "onRelease": onRelease,
    "onReachBottom": onReachBottom,
    "pullDownEnabled": pullDownEnabled,
    "reachBottomEnabled": reachBottomEnabled,
    "pocketState": pocketState,
    "pocketStateChange": pocketStateChange
  }, null, scrollbarRef);
};
export var AnimatedScrollbarProps = _extends({}, ScrollbarProps);
var AnimatedScrollbarPropsType = {
  activeStateEnabled: AnimatedScrollbarProps.activeStateEnabled,
  containerSize: AnimatedScrollbarProps.containerSize,
  contentSize: AnimatedScrollbarProps.contentSize,
  topPocketSize: AnimatedScrollbarProps.topPocketSize,
  bottomPocketSize: AnimatedScrollbarProps.bottomPocketSize,
  scrollableOffset: AnimatedScrollbarProps.scrollableOffset,
  isScrollableHovered: AnimatedScrollbarProps.isScrollableHovered,
  forceVisibility: AnimatedScrollbarProps.forceVisibility,
  forceUpdateScrollbarLocation: AnimatedScrollbarProps.forceUpdateScrollbarLocation,
  scrollLocation: AnimatedScrollbarProps.scrollLocation,
  pocketState: AnimatedScrollbarProps.pocketState,
  onAnimatorCancel: AnimatedScrollbarProps.onAnimatorCancel,
  onPullDown: AnimatedScrollbarProps.onPullDown,
  onReachBottom: AnimatedScrollbarProps.onReachBottom,
  onRelease: AnimatedScrollbarProps.onRelease,
  onScroll: AnimatedScrollbarProps.onScroll,
  onEnd: AnimatedScrollbarProps.onEnd,
  direction: ScrollableProps.direction,
  showScrollbar: ScrollableProps.showScrollbar,
  scrollByThumb: ScrollableProps.scrollByThumb,
  pullDownEnabled: ScrollableProps.pullDownEnabled,
  reachBottomEnabled: ScrollableProps.reachBottomEnabled,
  forceGeneratePockets: ScrollableProps.forceGeneratePockets,
  inertiaEnabled: ScrollableSimulatedProps.inertiaEnabled,
  bounceEnabled: ScrollableSimulatedProps.bounceEnabled
};
import { createRef as infernoCreateRef } from "inferno";
export class AnimatedScrollbar extends InfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.scrollbarRef = infernoCreateRef();
    this.stepAnimationFrame = 0;
    this.finished = true;
    this.stopped = false;
    this.velocity = 0;
    this.animator = "inertia";
    this.getLocationWithinRange = this.getLocationWithinRange.bind(this);
    this.getMinOffset = this.getMinOffset.bind(this);
    this.validateEvent = this.validateEvent.bind(this);
    this.isThumb = this.isThumb.bind(this);
    this.reachedMin = this.reachedMin.bind(this);
    this.reachedMax = this.reachedMax.bind(this);
    this.initHandler = this.initHandler.bind(this);
    this.startHandler = this.startHandler.bind(this);
    this.moveHandler = this.moveHandler.bind(this);
    this.endHandler = this.endHandler.bind(this);
    this.stopHandler = this.stopHandler.bind(this);
    this.scrollByHandler = this.scrollByHandler.bind(this);
    this.releaseHandler = this.releaseHandler.bind(this);
    this.disposeAnimationFrame = this.disposeAnimationFrame.bind(this);
    this.start = this.start.bind(this);
    this.cancel = this.cancel.bind(this);
    this.stepCore = this.stepCore.bind(this);
    this.getStepAnimationFrame = this.getStepAnimationFrame.bind(this);
    this.step = this.step.bind(this);
    this.setupBounce = this.setupBounce.bind(this);
    this.complete = this.complete.bind(this);
    this.suppressInertia = this.suppressInertia.bind(this);
    this.crossBoundOnNextStep = this.crossBoundOnNextStep.bind(this);
    this.getMaxOffset = this.getMaxOffset.bind(this);
    this.scrollStep = this.scrollStep.bind(this);
    this.moveTo = this.moveTo.bind(this);
    this.scrollComplete = this.scrollComplete.bind(this);
  }

  createEffects() {
    return [new InfernoEffect(this.disposeAnimationFrame, [])];
  }

  disposeAnimationFrame() {
    return () => {
      this.cancel();
    };
  }

  start(animatorName, receivedVelocity, thumbScrolling, crossThumbScrolling) {
    this.animator = animatorName;

    if (this.isBounceAnimator) {
      var _this$props$onBounce, _this$props;

      (_this$props$onBounce = (_this$props = this.props).onBounce) === null || _this$props$onBounce === void 0 ? void 0 : _this$props$onBounce.call(_this$props);
      this.setupBounce();
    } else {
      if (!thumbScrolling && crossThumbScrolling) {
        this.velocity = 0;
      } else {
        this.velocity = receivedVelocity !== null && receivedVelocity !== void 0 ? receivedVelocity : 0;
      }

      this.suppressInertia(thumbScrolling);
    }

    this.stopped = false;
    this.finished = false;
    this.stepCore();
  }

  cancel() {
    this.stopped = true;
    cancelAnimationFrame(this.stepAnimationFrame);
  }

  stepCore() {
    if (this.stopped) {
      return;
    }

    if (this.isFinished) {
      this.finished = true;
      this.complete();
      return;
    }

    this.step();
    this.stepAnimationFrame = this.getStepAnimationFrame();
  }

  getStepAnimationFrame() {
    return requestAnimationFrame(this.stepCore);
  }

  step() {
    if (!this.props.bounceEnabled && (this.reachedMin() || this.reachedMax())) {
      this.velocity = 0;
    }

    this.scrollStep(this.velocity);
    this.velocity *= this.acceleration;
  }

  setupBounce() {
    var {
      scrollLocation
    } = this.props;
    var bounceDistance = this.getLocationWithinRange(scrollLocation) - scrollLocation;
    this.velocity = bounceDistance / BOUNCE_ACCELERATION_SUM;
  }

  complete() {
    if (this.isBounceAnimator) {
      this.moveTo(this.getLocationWithinRange(this.props.scrollLocation));
    }

    this.scrollComplete();
  }

  get isBounceAnimator() {
    return this.animator === "bounce";
  }

  get isFinished() {
    if (this.isBounceAnimator) {
      return this.crossBoundOnNextStep() || Math.abs(this.velocity) <= BOUNCE_MIN_VELOCITY_LIMIT;
    }

    return Math.abs(this.velocity) <= MIN_VELOCITY_LIMIT;
  }

  get inProgress() {
    return !(this.stopped || this.finished);
  }

  get acceleration() {
    var _this$scrollbarRef;

    if (!isDefined((_this$scrollbarRef = this.scrollbarRef) === null || _this$scrollbarRef === void 0 ? void 0 : _this$scrollbarRef.current)) {
      return 0;
    }

    return this.isBounceAnimator || inRange(this.props.scrollLocation, this.getMinOffset(), this.getMaxOffset()) ? ACCELERATION : OUT_BOUNDS_ACCELERATION;
  }

  suppressInertia(thumbScrolling) {
    if (!this.props.inertiaEnabled || thumbScrolling) {
      this.velocity = 0;
    }
  }

  crossBoundOnNextStep() {
    var location = this.props.scrollLocation;
    var nextLocation = location + this.velocity;
    var minOffset = this.getMinOffset();
    var maxOffset = this.getMaxOffset();
    return location < minOffset && nextLocation >= minOffset || location > maxOffset && nextLocation <= maxOffset;
  }

  getMaxOffset() {
    return this.scrollbar.getMaxOffset();
  }

  scrollStep(delta) {
    this.scrollbar.scrollStep(delta);
  }

  moveTo(location) {
    this.scrollbar.moveTo(location);
  }

  scrollComplete() {
    this.scrollbar.scrollComplete();
  }

  get scrollbar() {
    return this.scrollbarRef.current;
  }

  get restAttributes() {
    var _this$props2 = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props2, _excluded);

    return restProps;
  }

  getLocationWithinRange(value) {
    return this.scrollbar.getLocationWithinRange(value);
  }

  getMinOffset() {
    return this.scrollbar.getMinOffset();
  }

  validateEvent(event) {
    return this.scrollbar.validateEvent(event);
  }

  isThumb(element) {
    return this.scrollbar.isThumb(element);
  }

  reachedMin() {
    return this.props.scrollLocation <= this.getMinOffset();
  }

  reachedMax() {
    return this.props.scrollLocation >= this.getMaxOffset();
  }

  initHandler(event, crossThumbScrolling) {
    this.scrollbar.initHandler(event, crossThumbScrolling);
  }

  startHandler() {
    this.scrollbar.startHandler();
  }

  moveHandler(delta) {
    this.scrollbar.moveHandler(delta);
  }

  endHandler(velocity) {
    this.scrollbar.endHandler(velocity);
  }

  stopHandler() {
    this.scrollbar.stopHandler();
  }

  scrollByHandler(delta) {
    this.scrollbar.scrollByHandler(delta);
  }

  releaseHandler() {
    this.scrollbar.releaseHandler();
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      scrollbarRef: this.scrollbarRef,
      start: this.start,
      cancel: this.cancel,
      stepCore: this.stepCore,
      getStepAnimationFrame: this.getStepAnimationFrame,
      step: this.step,
      setupBounce: this.setupBounce,
      complete: this.complete,
      isBounceAnimator: this.isBounceAnimator,
      isFinished: this.isFinished,
      inProgress: this.inProgress,
      acceleration: this.acceleration,
      suppressInertia: this.suppressInertia,
      crossBoundOnNextStep: this.crossBoundOnNextStep,
      getMaxOffset: this.getMaxOffset,
      scrollStep: this.scrollStep,
      moveTo: this.moveTo,
      scrollComplete: this.scrollComplete,
      scrollbar: this.scrollbar,
      restAttributes: this.restAttributes
    });
  }

}
AnimatedScrollbar.defaultProps = _extends({}, AnimatedScrollbarPropsType);
