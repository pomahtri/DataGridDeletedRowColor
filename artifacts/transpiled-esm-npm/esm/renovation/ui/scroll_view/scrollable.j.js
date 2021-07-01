import registerComponent from "../../../core/component_registrator";
import { ScrollableWrapper } from "../../component_wrapper/navigation/scrollable";
import { Scrollable as ScrollableComponent, defaultOptions } from "./scrollable";
export default class Scrollable extends ScrollableWrapper {
  content() {
    var _this$viewRef;

    return this._toPublicElement((_this$viewRef = this.viewRef) === null || _this$viewRef === void 0 ? void 0 : _this$viewRef.content(...arguments));
  }

  container() {
    var _this$viewRef2;

    return this._toPublicElement((_this$viewRef2 = this.viewRef) === null || _this$viewRef2 === void 0 ? void 0 : _this$viewRef2.container(...arguments));
  }

  scrollBy(distance) {
    var _this$viewRef3;

    return (_this$viewRef3 = this.viewRef) === null || _this$viewRef3 === void 0 ? void 0 : _this$viewRef3.scrollBy(...arguments);
  }

  update() {
    var _this$viewRef4;

    return (_this$viewRef4 = this.viewRef) === null || _this$viewRef4 === void 0 ? void 0 : _this$viewRef4.update(...arguments);
  }

  release() {
    var _this$viewRef5;

    return (_this$viewRef5 = this.viewRef) === null || _this$viewRef5 === void 0 ? void 0 : _this$viewRef5.release(...arguments);
  }

  refresh() {
    var _this$viewRef6;

    return (_this$viewRef6 = this.viewRef) === null || _this$viewRef6 === void 0 ? void 0 : _this$viewRef6.refresh(...arguments);
  }

  scrollTo(targetLocation) {
    var _this$viewRef7;

    return (_this$viewRef7 = this.viewRef) === null || _this$viewRef7 === void 0 ? void 0 : _this$viewRef7.scrollTo(...arguments);
  }

  scrollToElement(element) {
    var _this$viewRef8;

    var params = [this._patchElementParam(element)];
    return (_this$viewRef8 = this.viewRef) === null || _this$viewRef8 === void 0 ? void 0 : _this$viewRef8.scrollToElement(...params.slice(0, arguments.length));
  }

  scrollHeight() {
    var _this$viewRef9;

    return (_this$viewRef9 = this.viewRef) === null || _this$viewRef9 === void 0 ? void 0 : _this$viewRef9.scrollHeight(...arguments);
  }

  scrollWidth() {
    var _this$viewRef10;

    return (_this$viewRef10 = this.viewRef) === null || _this$viewRef10 === void 0 ? void 0 : _this$viewRef10.scrollWidth(...arguments);
  }

  scrollOffset() {
    var _this$viewRef11;

    return (_this$viewRef11 = this.viewRef) === null || _this$viewRef11 === void 0 ? void 0 : _this$viewRef11.scrollOffset(...arguments);
  }

  scrollTop() {
    var _this$viewRef12;

    return (_this$viewRef12 = this.viewRef) === null || _this$viewRef12 === void 0 ? void 0 : _this$viewRef12.scrollTop(...arguments);
  }

  scrollLeft() {
    var _this$viewRef13;

    return (_this$viewRef13 = this.viewRef) === null || _this$viewRef13 === void 0 ? void 0 : _this$viewRef13.scrollLeft(...arguments);
  }

  clientHeight() {
    var _this$viewRef14;

    return (_this$viewRef14 = this.viewRef) === null || _this$viewRef14 === void 0 ? void 0 : _this$viewRef14.clientHeight(...arguments);
  }

  clientWidth() {
    var _this$viewRef15;

    return (_this$viewRef15 = this.viewRef) === null || _this$viewRef15 === void 0 ? void 0 : _this$viewRef15.clientWidth(...arguments);
  }

  getScrollElementPosition(element, direction) {
    var _this$viewRef16;

    var params = [this._patchElementParam(element), direction];
    return (_this$viewRef16 = this.viewRef) === null || _this$viewRef16 === void 0 ? void 0 : _this$viewRef16.getScrollElementPosition(...params.slice(0, arguments.length));
  }

  scrollToElementTopLeft(element) {
    var _this$viewRef17;

    var params = [this._patchElementParam(element)];
    return (_this$viewRef17 = this.viewRef) === null || _this$viewRef17 === void 0 ? void 0 : _this$viewRef17.scrollToElementTopLeft(...params.slice(0, arguments.length));
  }

  startLoading() {
    var _this$viewRef18;

    return (_this$viewRef18 = this.viewRef) === null || _this$viewRef18 === void 0 ? void 0 : _this$viewRef18.startLoading(...arguments);
  }

  finishLoading() {
    var _this$viewRef19;

    return (_this$viewRef19 = this.viewRef) === null || _this$viewRef19 === void 0 ? void 0 : _this$viewRef19.finishLoading(...arguments);
  }

  _getActionConfigs() {
    return {
      onScroll: {},
      onUpdated: {},
      onPullDown: {},
      onReachBottom: {},
      onVisibilityChange: {},
      onStart: {},
      onEnd: {},
      onBounce: {}
    };
  }

  get _propsInfo() {
    return {
      twoWay: [],
      allowNull: [],
      elements: [],
      templates: [],
      props: ["useNative", "direction", "showScrollbar", "bounceEnabled", "scrollByContent", "scrollByThumb", "classes", "pullDownEnabled", "reachBottomEnabled", "forceGeneratePockets", "needScrollViewContentWrapper", "needScrollViewLoadPanel", "onScroll", "onUpdated", "onPullDown", "onReachBottom", "useSimulatedScrollbar", "pullingDownText", "pulledDownText", "refreshingText", "reachBottomText", "aria", "onVisibilityChange", "disabled", "height", "rtlEnabled", "visible", "width", "inertiaEnabled", "useKeyboard", "onStart", "onEnd", "onBounce"]
    };
  }

  get _viewComponent() {
    return ScrollableComponent;
  }

}
registerComponent("dxScrollable", Scrollable);
Scrollable.defaultOptions = defaultOptions;