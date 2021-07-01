"use strict";

exports.Scrollbar = exports.ScrollbarPropsType = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _widget = require("../common/widget");

var _combine_classes = require("../../utils/combine_classes");

var _dom_adapter = _interopRequireDefault(require("../../../core/dom_adapter"));

var _type = require("../../../core/utils/type");

var _index = require("../../../events/utils/index");

var _scrollbar_props = require("./scrollbar_props");

var _consts = require("./common/consts");

var _short = require("../../../events/short");

var _scrollable_simulated_props = require("./scrollable_simulated_props");

var _scrollable_props = require("./scrollable_props");

var _math = require("../../../core/utils/math");

var _excluded = ["activeStateEnabled", "bottomPocketSize", "bounceEnabled", "containerSize", "contentSize", "contentTranslateOffsetChange", "direction", "forceGeneratePockets", "forceUpdateScrollbarLocation", "forceVisibility", "hoverStateEnabled", "isScrollableHovered", "onAnimatorCancel", "onAnimatorStart", "onEnd", "onPullDown", "onReachBottom", "onRelease", "onScroll", "pocketState", "pocketStateChange", "pullDownEnabled", "reachBottomEnabled", "rtlEnabled", "scrollByThumb", "scrollLocation", "scrollLocationChange", "scrollableOffset", "showScrollbar", "topPocketSize"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var OUT_BOUNDS_ACCELERATION = 0.5;
var THUMB_MIN_SIZE = 15;

var viewFunction = function viewFunction(viewModel) {
  var cssClasses = viewModel.cssClasses,
      hoverStateEnabled = viewModel.hoverStateEnabled,
      isVisible = viewModel.isVisible,
      onHoverEnd = viewModel.onHoverEnd,
      onHoverStart = viewModel.onHoverStart,
      activeStateEnabled = viewModel.props.activeStateEnabled,
      scrollRef = viewModel.scrollRef,
      scrollStyles = viewModel.scrollStyles,
      scrollbarRef = viewModel.scrollbarRef;
  return (0, _inferno.createComponentVNode)(2, _widget.Widget, {
    "rootElementRef": scrollbarRef,
    "classes": cssClasses,
    "activeStateEnabled": activeStateEnabled,
    "hoverStateEnabled": hoverStateEnabled,
    "visible": isVisible,
    "onHoverStart": onHoverStart,
    "onHoverEnd": onHoverEnd,
    children: (0, _inferno.createVNode)(1, "div", viewModel.scrollClasses, (0, _inferno.createVNode)(1, "div", _consts.SCROLLABLE_SCROLL_CONTENT_CLASS), 2, {
      "style": (0, _vdom.normalizeStyles)(scrollStyles)
    }, null, scrollRef)
  });
};

exports.viewFunction = viewFunction;
var ScrollbarPropsType = {
  activeStateEnabled: _scrollbar_props.ScrollbarProps.activeStateEnabled,
  containerSize: _scrollbar_props.ScrollbarProps.containerSize,
  contentSize: _scrollbar_props.ScrollbarProps.contentSize,
  topPocketSize: _scrollbar_props.ScrollbarProps.topPocketSize,
  bottomPocketSize: _scrollbar_props.ScrollbarProps.bottomPocketSize,
  scrollableOffset: _scrollbar_props.ScrollbarProps.scrollableOffset,
  isScrollableHovered: _scrollbar_props.ScrollbarProps.isScrollableHovered,
  forceVisibility: _scrollbar_props.ScrollbarProps.forceVisibility,
  forceUpdateScrollbarLocation: _scrollbar_props.ScrollbarProps.forceUpdateScrollbarLocation,
  scrollLocation: _scrollbar_props.ScrollbarProps.scrollLocation,
  pocketState: _scrollbar_props.ScrollbarProps.pocketState,
  onAnimatorCancel: _scrollbar_props.ScrollbarProps.onAnimatorCancel,
  onPullDown: _scrollbar_props.ScrollbarProps.onPullDown,
  onReachBottom: _scrollbar_props.ScrollbarProps.onReachBottom,
  onRelease: _scrollbar_props.ScrollbarProps.onRelease,
  onScroll: _scrollbar_props.ScrollbarProps.onScroll,
  onEnd: _scrollbar_props.ScrollbarProps.onEnd,
  direction: _scrollable_props.ScrollableProps.direction,
  showScrollbar: _scrollable_props.ScrollableProps.showScrollbar,
  scrollByThumb: _scrollable_props.ScrollableProps.scrollByThumb,
  pullDownEnabled: _scrollable_props.ScrollableProps.pullDownEnabled,
  reachBottomEnabled: _scrollable_props.ScrollableProps.reachBottomEnabled,
  forceGeneratePockets: _scrollable_props.ScrollableProps.forceGeneratePockets,
  bounceEnabled: _scrollable_simulated_props.ScrollableSimulatedProps.bounceEnabled
};
exports.ScrollbarPropsType = ScrollbarPropsType;

var Scrollbar = /*#__PURE__*/function (_InfernoComponent) {
  _inheritsLoose(Scrollbar, _InfernoComponent);

  function Scrollbar(props) {
    var _this;

    _this = _InfernoComponent.call(this, props) || this;
    _this.thumbScrolling = false;
    _this.crossThumbScrolling = false;
    _this.initialTopPocketSize = 0;
    _this.rightScrollLocation = 0;
    _this.prevScrollLocation = 0;
    _this.scrollbarRef = (0, _inferno.createRef)();
    _this.scrollRef = (0, _inferno.createRef)();
    _this.state = {
      pendingPullDown: false,
      showOnScrollByWheel: undefined,
      hovered: false,
      expanded: false,
      visibility: false
    };
    _this.pointerDownEffect = _this.pointerDownEffect.bind(_assertThisInitialized(_this));
    _this.pointerUpEffect = _this.pointerUpEffect.bind(_assertThisInitialized(_this));
    _this.isThumb = _this.isThumb.bind(_assertThisInitialized(_this));
    _this.isScrollbar = _this.isScrollbar.bind(_assertThisInitialized(_this));
    _this.validateEvent = _this.validateEvent.bind(_assertThisInitialized(_this));
    _this.getLocationWithinRange = _this.getLocationWithinRange.bind(_assertThisInitialized(_this));
    _this.getMinOffset = _this.getMinOffset.bind(_assertThisInitialized(_this));
    _this.getMaxOffset = _this.getMaxOffset.bind(_assertThisInitialized(_this));
    _this.initHandler = _this.initHandler.bind(_assertThisInitialized(_this));
    _this.startHandler = _this.startHandler.bind(_assertThisInitialized(_this));
    _this.moveHandler = _this.moveHandler.bind(_assertThisInitialized(_this));
    _this.disposeHideScrollbarTimer = _this.disposeHideScrollbarTimer.bind(_assertThisInitialized(_this));
    _this.endHandler = _this.endHandler.bind(_assertThisInitialized(_this));
    _this.stopHandler = _this.stopHandler.bind(_assertThisInitialized(_this));
    _this.scrollByHandler = _this.scrollByHandler.bind(_assertThisInitialized(_this));
    _this.scrollComplete = _this.scrollComplete.bind(_assertThisInitialized(_this));
    _this.scrollStep = _this.scrollStep.bind(_assertThisInitialized(_this));
    _this.updateContentTranslate = _this.updateContentTranslate.bind(_assertThisInitialized(_this));
    _this.moveTo = _this.moveTo.bind(_assertThisInitialized(_this));
    _this.releaseHandler = _this.releaseHandler.bind(_assertThisInitialized(_this));
    _this.moveToBoundaryOnSizeChange = _this.moveToBoundaryOnSizeChange.bind(_assertThisInitialized(_this));
    _this.hide = _this.hide.bind(_assertThisInitialized(_this));
    _this.inRange = _this.inRange.bind(_assertThisInitialized(_this));
    _this.clearHideScrollbarTimer = _this.clearHideScrollbarTimer.bind(_assertThisInitialized(_this));
    _this.onInertiaAnimatorStart = _this.onInertiaAnimatorStart.bind(_assertThisInitialized(_this));
    _this.onBounceAnimatorStart = _this.onBounceAnimatorStart.bind(_assertThisInitialized(_this));
    _this.pullDownRefreshing = _this.pullDownRefreshing.bind(_assertThisInitialized(_this));
    _this.reachBottomLoading = _this.reachBottomLoading.bind(_assertThisInitialized(_this));
    _this.onPullDown = _this.onPullDown.bind(_assertThisInitialized(_this));
    _this.onReachBottom = _this.onReachBottom.bind(_assertThisInitialized(_this));
    _this.scrollToBounds = _this.scrollToBounds.bind(_assertThisInitialized(_this));
    _this.resetThumbScrolling = _this.resetThumbScrolling.bind(_assertThisInitialized(_this));
    _this.scrollBy = _this.scrollBy.bind(_assertThisInitialized(_this));
    _this.cancelScrolling = _this.cancelScrolling.bind(_assertThisInitialized(_this));
    _this.onAnimatorCancel = _this.onAnimatorCancel.bind(_assertThisInitialized(_this));
    _this.prepareThumbScrolling = _this.prepareThumbScrolling.bind(_assertThisInitialized(_this));
    _this.moveToMouseLocation = _this.moveToMouseLocation.bind(_assertThisInitialized(_this));
    _this.updateContent = _this.updateContent.bind(_assertThisInitialized(_this));
    _this.release = _this.release.bind(_assertThisInitialized(_this));
    _this.stateReleased = _this.stateReleased.bind(_assertThisInitialized(_this));
    _this.onRelease = _this.onRelease.bind(_assertThisInitialized(_this));
    _this.setPocketState = _this.setPocketState.bind(_assertThisInitialized(_this));
    _this.isReachBottom = _this.isReachBottom.bind(_assertThisInitialized(_this));
    _this.expand = _this.expand.bind(_assertThisInitialized(_this));
    _this.collapse = _this.collapse.bind(_assertThisInitialized(_this));
    _this.onHoverStart = _this.onHoverStart.bind(_assertThisInitialized(_this));
    _this.onHoverEnd = _this.onHoverEnd.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = Scrollbar.prototype;

  _proto.createEffects = function createEffects() {
    return [new _vdom.InfernoEffect(this.pointerDownEffect, []), new _vdom.InfernoEffect(this.pointerUpEffect, []), new _vdom.InfernoEffect(this.disposeHideScrollbarTimer, []), new _vdom.InfernoEffect(this.updateContentTranslate, [this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.topPocketSize, this.props.contentSize, this.props.reachBottomEnabled, this.props.bottomPocketSize, this.props.containerSize, this.props.contentTranslateOffsetChange, this.props.direction, this.props.scrollLocation]), new _vdom.InfernoEffect(this.moveToBoundaryOnSizeChange, [this.props.forceUpdateScrollbarLocation, this.props.scrollLocation, this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.bounceEnabled, this.props.topPocketSize, this.state.pendingPullDown, this.props.contentSize, this.props.reachBottomEnabled, this.props.bottomPocketSize, this.props.containerSize, this.props.direction, this.props.rtlEnabled, this.props.scrollLocationChange, this.props.contentTranslateOffsetChange, this.props.onScroll, this.props.pocketState, this.props.pocketStateChange, this.props.onRelease])];
  };

  _proto.updateEffects = function updateEffects() {
    var _this$_effects$, _this$_effects$2, _this$_effects$3, _this$_effects$4;

    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([]);
    (_this$_effects$2 = this._effects[1]) === null || _this$_effects$2 === void 0 ? void 0 : _this$_effects$2.update([]);
    (_this$_effects$3 = this._effects[3]) === null || _this$_effects$3 === void 0 ? void 0 : _this$_effects$3.update([this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.topPocketSize, this.props.contentSize, this.props.reachBottomEnabled, this.props.bottomPocketSize, this.props.containerSize, this.props.contentTranslateOffsetChange, this.props.direction, this.props.scrollLocation]);
    (_this$_effects$4 = this._effects[4]) === null || _this$_effects$4 === void 0 ? void 0 : _this$_effects$4.update([this.props.forceUpdateScrollbarLocation, this.props.scrollLocation, this.props.forceGeneratePockets, this.props.pullDownEnabled, this.props.bounceEnabled, this.props.topPocketSize, this.state.pendingPullDown, this.props.contentSize, this.props.reachBottomEnabled, this.props.bottomPocketSize, this.props.containerSize, this.props.direction, this.props.rtlEnabled, this.props.scrollLocationChange, this.props.contentTranslateOffsetChange, this.props.onScroll, this.props.pocketState, this.props.pocketStateChange, this.props.onRelease]);
  };

  _proto.pointerDownEffect = function pointerDownEffect() {
    var _this2 = this;

    var namespace = "dxScrollbar";

    _short.dxPointerDown.on(this.scrollRef.current, function () {
      _this2.expand();
    }, {
      namespace: namespace
    });

    return function () {
      return _short.dxPointerDown.off(_this2.scrollRef.current, {
        namespace: namespace
      });
    };
  };

  _proto.pointerUpEffect = function pointerUpEffect() {
    var _this3 = this;

    var namespace = "dxScrollbar";

    _short.dxPointerUp.on(_dom_adapter.default.getDocument(), function () {
      _this3.collapse();
    }, {
      namespace: namespace
    });

    return function () {
      return _short.dxPointerUp.off(_this3.scrollRef.current, {
        namespace: namespace
      });
    };
  };

  _proto.disposeHideScrollbarTimer = function disposeHideScrollbarTimer() {
    var _this4 = this;

    return function () {
      return _this4.clearHideScrollbarTimer();
    };
  };

  _proto.updateContentTranslate = function updateContentTranslate() {
    if (this.props.forceGeneratePockets && this.props.pullDownEnabled) {
      if (this.initialTopPocketSize !== this.topPocketSize) {
        this.updateContent(this.props.scrollLocation);
        this.initialTopPocketSize = this.topPocketSize;
      }
    }
  };

  _proto.moveToBoundaryOnSizeChange = function moveToBoundaryOnSizeChange() {
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
  };

  _proto.hide = function hide() {
    var _this5 = this;

    this.setState(function (state) {
      return _extends({}, state, {
        visibility: false
      });
    });

    if ((0, _type.isDefined)(this.state.showOnScrollByWheel) && this.props.showScrollbar === "onScroll") {
      this.hideScrollbarTimer = setTimeout(function () {
        _this5.setState(function (state) {
          return _extends({}, state, {
            showOnScrollByWheel: undefined
          });
        });
      }, _consts.HIDE_SCROLLBAR_TIMEOUT);
    }
  };

  _proto.inRange = function inRange() {
    return (0, _math.inRange)(this.props.scrollLocation, this.minOffset, this.maxOffset);
  };

  _proto.clearHideScrollbarTimer = function clearHideScrollbarTimer() {
    clearTimeout(this.hideScrollbarTimer);
    this.hideScrollbarTimer = undefined;
  };

  _proto.onInertiaAnimatorStart = function onInertiaAnimatorStart(velocity) {
    var _this$props$onAnimato, _this$props;

    (_this$props$onAnimato = (_this$props = this.props).onAnimatorStart) === null || _this$props$onAnimato === void 0 ? void 0 : _this$props$onAnimato.call(_this$props, "inertia", velocity, this.thumbScrolling, this.crossThumbScrolling);
  };

  _proto.onBounceAnimatorStart = function onBounceAnimatorStart() {
    var _this$props$onAnimato2, _this$props2;

    (_this$props$onAnimato2 = (_this$props2 = this.props).onAnimatorStart) === null || _this$props$onAnimato2 === void 0 ? void 0 : _this$props$onAnimato2.call(_this$props2, "bounce");
  };

  _proto.pullDownRefreshing = function pullDownRefreshing() {
    this.setPocketState(_consts.TopPocketState.STATE_REFRESHING);
    this.onPullDown();
    this.setState(function (state) {
      return _extends({}, state, {
        pendingPullDown: false
      });
    });
  };

  _proto.reachBottomLoading = function reachBottomLoading() {
    this.onReachBottom();
  };

  _proto.onPullDown = function onPullDown() {
    var _this$props$onPullDow, _this$props3;

    (_this$props$onPullDow = (_this$props3 = this.props).onPullDown) === null || _this$props$onPullDow === void 0 ? void 0 : _this$props$onPullDow.call(_this$props3);
  };

  _proto.onReachBottom = function onReachBottom() {
    var _this$props$onReachBo, _this$props4;

    (_this$props$onReachBo = (_this$props4 = this.props).onReachBottom) === null || _this$props$onReachBo === void 0 ? void 0 : _this$props$onReachBo.call(_this$props4);
  };

  _proto.scrollToBounds = function scrollToBounds() {
    if (this.inRange()) {
      this.hide();
      return;
    }

    if (this.isPullDown) {
      this.setState(function (state) {
        return _extends({}, state, {
          pendingPullDown: true
        });
      });
    }

    this.onBounceAnimatorStart();
  };

  _proto.resetThumbScrolling = function resetThumbScrolling() {
    this.thumbScrolling = false;
    this.crossThumbScrolling = false;
  };

  _proto.scrollBy = function scrollBy(delta) {
    var distance = delta[this.axis];

    if (!this.inRange()) {
      distance *= OUT_BOUNDS_ACCELERATION;
    }

    this.scrollStep(distance);
  };

  _proto.cancelScrolling = function cancelScrolling() {
    this.hide();
    this.onAnimatorCancel();
  };

  _proto.onAnimatorCancel = function onAnimatorCancel() {
    var _this$props$onAnimato3, _this$props5;

    (_this$props$onAnimato3 = (_this$props5 = this.props).onAnimatorCancel) === null || _this$props$onAnimato3 === void 0 ? void 0 : _this$props$onAnimato3.call(_this$props5);
  };

  _proto.prepareThumbScrolling = function prepareThumbScrolling(event, currentCrossThumbScrolling) {
    if ((0, _index.isDxMouseWheelEvent)(event.originalEvent)) {
      if (this.props.showScrollbar === "onScroll") {
        this.setState(function (state) {
          return _extends({}, state, {
            showOnScrollByWheel: true
          });
        });
      }

      return;
    }

    var target = event.originalEvent.target;
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
  };

  _proto.moveToMouseLocation = function moveToMouseLocation(event) {
    var mouseLocation = event["page".concat(this.axis.toUpperCase())] - this.props.scrollableOffset;
    var delta = this.props.scrollLocation + mouseLocation / this.containerToContentRatio - this.props.containerSize / 2;
    this.scrollStep(-Math.round(delta));
  };

  _proto.updateContent = function updateContent(location) {
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
  };

  _proto.release = function release() {
    this.stateReleased();
    this.scrollComplete();
  };

  _proto.stateReleased = function stateReleased() {
    this.setPocketState(_consts.TopPocketState.STATE_RELEASED);
    this.onRelease();
  };

  _proto.onRelease = function onRelease() {
    var _this$props$onRelease, _this$props7;

    (_this$props$onRelease = (_this$props7 = this.props).onRelease) === null || _this$props$onRelease === void 0 ? void 0 : _this$props$onRelease.call(_this$props7);
  };

  _proto.setPocketState = function setPocketState(newState) {
    var _this$props$pocketSta, _this$props8;

    (_this$props$pocketSta = (_this$props8 = this.props).pocketStateChange) === null || _this$props$pocketSta === void 0 ? void 0 : _this$props$pocketSta.call(_this$props8, newState);
  };

  _proto.isReachBottom = function isReachBottom() {
    return this.props.reachBottomEnabled && this.props.scrollLocation - this.minOffset - this.bottomPocketSize <= 0.5;
  };

  _proto.expand = function expand() {
    this.setState(function (state) {
      return _extends({}, state, {
        expanded: true
      });
    });
  };

  _proto.collapse = function collapse() {
    this.setState(function (state) {
      return _extends({}, state, {
        expanded: false
      });
    });
  };

  _proto.onHoverStart = function onHoverStart() {
    if (this.props.showScrollbar === "onHover") {
      this.setState(function (state) {
        return _extends({}, state, {
          hovered: true
        });
      });
    }
  };

  _proto.onHoverEnd = function onHoverEnd() {
    if (this.props.showScrollbar === "onHover") {
      this.setState(function (state) {
        return _extends({}, state, {
          hovered: false
        });
      });
    }
  };

  _proto.isThumb = function isThumb(element) {
    var _this$scrollbarRef$cu, _this$scrollbarRef$cu2;

    return ((_this$scrollbarRef$cu = this.scrollbarRef.current) === null || _this$scrollbarRef$cu === void 0 ? void 0 : _this$scrollbarRef$cu.querySelector(".".concat(_consts.SCROLLABLE_SCROLL_CLASS))) === element || ((_this$scrollbarRef$cu2 = this.scrollbarRef.current) === null || _this$scrollbarRef$cu2 === void 0 ? void 0 : _this$scrollbarRef$cu2.querySelector(".".concat(_consts.SCROLLABLE_SCROLL_CONTENT_CLASS))) === element;
  };

  _proto.isScrollbar = function isScrollbar(element) {
    return element === this.scrollbarRef.current;
  };

  _proto.validateEvent = function validateEvent(event) {
    var target = event.originalEvent.target;
    return this.isThumb(target) || this.isScrollbar(target);
  };

  _proto.getLocationWithinRange = function getLocationWithinRange(value) {
    return Math.max(Math.min(value, this.maxOffset), this.minOffset);
  };

  _proto.getMinOffset = function getMinOffset() {
    return this.minOffset;
  };

  _proto.getMaxOffset = function getMaxOffset() {
    return this.maxOffset;
  };

  _proto.initHandler = function initHandler(event, crossThumbScrolling) {
    this.cancelScrolling();
    this.prepareThumbScrolling(event, crossThumbScrolling);
  };

  _proto.startHandler = function startHandler() {
    this.setState(function (state) {
      return _extends({}, state, {
        visibility: true
      });
    });
  };

  _proto.moveHandler = function moveHandler(delta) {
    if (this.crossThumbScrolling) {
      return;
    }

    var distance = delta;

    if (this.thumbScrolling) {
      distance[this.axis] = -Math.round(distance[this.axis] / this.containerToContentRatio);
    }

    this.scrollBy(distance);
  };

  _proto.endHandler = function endHandler(velocity) {
    this.onInertiaAnimatorStart(velocity[this.axis]);
    this.resetThumbScrolling();
  };

  _proto.stopHandler = function stopHandler() {
    this.hide();

    if (this.thumbScrolling) {
      this.scrollComplete();
    } else {
      this.scrollToBounds();
    }

    this.resetThumbScrolling();
  };

  _proto.scrollByHandler = function scrollByHandler(delta) {
    this.scrollBy(delta);
    this.scrollComplete();
  };

  _proto.scrollComplete = function scrollComplete() {
    if (this.props.forceGeneratePockets) {
      if (this.inRange()) {
        if (this.props.pocketState === _consts.TopPocketState.STATE_READY) {
          this.pullDownRefreshing();
          return;
        }

        if (this.props.pocketState === _consts.TopPocketState.STATE_LOADING) {
          this.reachBottomLoading();
          return;
        }
      }
    }

    if (this.inRange()) {
      var _this$props$onEnd, _this$props9;

      this.hide();
      (_this$props$onEnd = (_this$props9 = this.props).onEnd) === null || _this$props$onEnd === void 0 ? void 0 : _this$props$onEnd.call(_this$props9, this.props.direction);
      return;
    }

    this.scrollToBounds();
  };

  _proto.scrollStep = function scrollStep(delta) {
    if (this.props.bounceEnabled) {
      this.moveTo(this.props.scrollLocation + delta);
    } else {
      this.moveTo(this.getLocationWithinRange(this.props.scrollLocation + delta));
    }
  };

  _proto.moveTo = function moveTo(location) {
    var _this$props$scrollLoc, _this$props10;

    var scrollDelta = Math.abs(this.prevScrollLocation - location);
    (_this$props$scrollLoc = (_this$props10 = this.props).scrollLocationChange) === null || _this$props$scrollLoc === void 0 ? void 0 : _this$props$scrollLoc.call(_this$props10, this.fullScrollProp, location);
    this.updateContent(location);

    if (scrollDelta >= 1) {
      var _this$props$onScroll, _this$props11;

      (_this$props$onScroll = (_this$props11 = this.props).onScroll) === null || _this$props$onScroll === void 0 ? void 0 : _this$props$onScroll.call(_this$props11);
    }

    this.prevScrollLocation = location;
    this.rightScrollLocation = this.minOffset - location;

    if (this.props.forceGeneratePockets) {
      if (this.isPullDown) {
        if (this.props.pocketState !== _consts.TopPocketState.STATE_READY) {
          this.setPocketState(_consts.TopPocketState.STATE_READY);
        }
      } else if (this.isReachBottom()) {
        if (this.props.pocketState !== _consts.TopPocketState.STATE_LOADING) {
          this.setPocketState(_consts.TopPocketState.STATE_LOADING);
        }
      } else if (this.props.pocketState !== _consts.TopPocketState.STATE_RELEASED) {
        this.stateReleased();
      }
    }
  };

  _proto.releaseHandler = function releaseHandler() {
    this.release();
  };

  _proto.render = function render() {
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
  };

  _createClass(Scrollbar, [{
    key: "axis",
    get: function get() {
      return this.isHorizontal ? "x" : "y";
    }
  }, {
    key: "scrollProp",
    get: function get() {
      return this.isHorizontal ? "left" : "top";
    }
  }, {
    key: "fullScrollProp",
    get: function get() {
      return this.isHorizontal ? "scrollLeft" : "scrollTop";
    }
  }, {
    key: "dimension",
    get: function get() {
      return this.isHorizontal ? "width" : "height";
    }
  }, {
    key: "isHorizontal",
    get: function get() {
      return this.props.direction === _consts.DIRECTION_HORIZONTAL;
    }
  }, {
    key: "maxOffset",
    get: function get() {
      if (this.props.forceGeneratePockets) {
        if (this.isPullDown && this.state.pendingPullDown) {
          return this.topPocketSize;
        }
      }

      return 0;
    }
  }, {
    key: "isPullDown",
    get: function get() {
      return this.props.pullDownEnabled && this.props.bounceEnabled && this.props.scrollLocation - this.props.topPocketSize >= 0;
    }
  }, {
    key: "minOffset",
    get: function get() {
      if (this.props.forceGeneratePockets) {
        return -Math.max(this.bottomBoundaryOffset + this.bottomPocketSize, 0);
      }

      return -Math.max(this.bottomBoundaryOffset, 0);
    }
  }, {
    key: "scrollSize",
    get: function get() {
      return Math.max(this.props.containerSize * this.containerToContentRatio, THUMB_MIN_SIZE);
    }
  }, {
    key: "scrollRatio",
    get: function get() {
      if (this.bottomBoundaryOffset) {
        return (this.props.containerSize - this.scrollSize) / this.bottomBoundaryOffset;
      }

      return 1;
    }
  }, {
    key: "contentSize",
    get: function get() {
      if (this.props.contentSize) {
        return this.props.contentSize - this.bottomPocketSize - this.topPocketSize;
      }

      return 0;
    }
  }, {
    key: "containerToContentRatio",
    get: function get() {
      return this.contentSize ? this.props.containerSize / this.contentSize : this.props.containerSize;
    }
  }, {
    key: "topPocketSize",
    get: function get() {
      if (this.props.pullDownEnabled) {
        return this.props.topPocketSize;
      }

      return 0;
    }
  }, {
    key: "bottomPocketSize",
    get: function get() {
      if (this.props.reachBottomEnabled) {
        return this.props.bottomPocketSize;
      }

      return 0;
    }
  }, {
    key: "bottomBoundaryOffset",
    get: function get() {
      return this.contentSize - this.props.containerSize;
    }
  }, {
    key: "cssClasses",
    get: function get() {
      var _classesMap;

      var direction = this.props.direction;
      var classesMap = (_classesMap = {}, _defineProperty(_classesMap, _consts.SCROLLABLE_SCROLLBAR_CLASS, true), _defineProperty(_classesMap, "dx-scrollbar-".concat(direction), true), _defineProperty(_classesMap, _consts.SCROLLABLE_SCROLLBAR_ACTIVE_CLASS, !!this.state.expanded), _defineProperty(_classesMap, _consts.HOVER_ENABLED_STATE, !!this.hoverStateEnabled), _classesMap);
      return (0, _combine_classes.combineClasses)(classesMap);
    }
  }, {
    key: "scrollStyles",
    get: function get() {
      var _ref;

      return _ref = {}, _defineProperty(_ref, this.dimension, this.scrollSize || THUMB_MIN_SIZE), _defineProperty(_ref, "transform", this.scrollTransform), _ref;
    }
  }, {
    key: "scrollTransform",
    get: function get() {
      if (this.props.showScrollbar === "never") {
        return "none";
      }

      var translateValue = -this.props.scrollLocation * this.scrollRatio;

      if (this.isHorizontal) {
        return "translate(".concat(translateValue, "px, 0px)");
      }

      return "translate(0px, ".concat(translateValue, "px)");
    }
  }, {
    key: "scrollClasses",
    get: function get() {
      var _combineClasses;

      return (0, _combine_classes.combineClasses)((_combineClasses = {}, _defineProperty(_combineClasses, _consts.SCROLLABLE_SCROLL_CLASS, true), _defineProperty(_combineClasses, "dx-state-invisible", !this.visible), _combineClasses));
    }
  }, {
    key: "isVisible",
    get: function get() {
      return this.props.showScrollbar !== "never" && this.containerToContentRatio < 1 && this.props.containerSize > 15;
    }
  }, {
    key: "visible",
    get: function get() {
      var _this$props12 = this.props,
          forceVisibility = _this$props12.forceVisibility,
          showScrollbar = _this$props12.showScrollbar;

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
  }, {
    key: "hoverStateEnabled",
    get: function get() {
      var _this$props13 = this.props,
          scrollByThumb = _this$props13.scrollByThumb,
          showScrollbar = _this$props13.showScrollbar;
      return (showScrollbar === "onHover" || showScrollbar === "always") && scrollByThumb;
    }
  }, {
    key: "restAttributes",
    get: function get() {
      var _this$props14 = this.props,
          activeStateEnabled = _this$props14.activeStateEnabled,
          bottomPocketSize = _this$props14.bottomPocketSize,
          bounceEnabled = _this$props14.bounceEnabled,
          containerSize = _this$props14.containerSize,
          contentSize = _this$props14.contentSize,
          contentTranslateOffsetChange = _this$props14.contentTranslateOffsetChange,
          direction = _this$props14.direction,
          forceGeneratePockets = _this$props14.forceGeneratePockets,
          forceUpdateScrollbarLocation = _this$props14.forceUpdateScrollbarLocation,
          forceVisibility = _this$props14.forceVisibility,
          hoverStateEnabled = _this$props14.hoverStateEnabled,
          isScrollableHovered = _this$props14.isScrollableHovered,
          onAnimatorCancel = _this$props14.onAnimatorCancel,
          onAnimatorStart = _this$props14.onAnimatorStart,
          onEnd = _this$props14.onEnd,
          onPullDown = _this$props14.onPullDown,
          onReachBottom = _this$props14.onReachBottom,
          onRelease = _this$props14.onRelease,
          onScroll = _this$props14.onScroll,
          pocketState = _this$props14.pocketState,
          pocketStateChange = _this$props14.pocketStateChange,
          pullDownEnabled = _this$props14.pullDownEnabled,
          reachBottomEnabled = _this$props14.reachBottomEnabled,
          rtlEnabled = _this$props14.rtlEnabled,
          scrollByThumb = _this$props14.scrollByThumb,
          scrollLocation = _this$props14.scrollLocation,
          scrollLocationChange = _this$props14.scrollLocationChange,
          scrollableOffset = _this$props14.scrollableOffset,
          showScrollbar = _this$props14.showScrollbar,
          topPocketSize = _this$props14.topPocketSize,
          restProps = _objectWithoutProperties(_this$props14, _excluded);

      return restProps;
    }
  }]);

  return Scrollbar;
}(_vdom.InfernoComponent);

exports.Scrollbar = Scrollbar;
Scrollbar.defaultProps = _extends({}, ScrollbarPropsType);