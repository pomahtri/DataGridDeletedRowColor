/**
* DevExtreme (esm/renovation/ui/scroll_view/scroll_view.j.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import registerComponent from "../../../core/component_registrator";
import { ScrollViewWrapper } from "../../component_wrapper/navigation/scroll_view";
import { ScrollView as ScrollViewComponent, defaultOptions } from "./scroll_view";
export default class ScrollView extends ScrollViewWrapper {
  update() {
    var _this$viewRef;

    return (_this$viewRef = this.viewRef) === null || _this$viewRef === void 0 ? void 0 : _this$viewRef.update(...arguments);
  }

  release(preventScrollBottom) {
    var _this$viewRef2;

    return (_this$viewRef2 = this.viewRef) === null || _this$viewRef2 === void 0 ? void 0 : _this$viewRef2.release(...arguments);
  }

  refresh() {
    var _this$viewRef3;

    return (_this$viewRef3 = this.viewRef) === null || _this$viewRef3 === void 0 ? void 0 : _this$viewRef3.refresh(...arguments);
  }

  content() {
    var _this$viewRef4;

    return this._toPublicElement((_this$viewRef4 = this.viewRef) === null || _this$viewRef4 === void 0 ? void 0 : _this$viewRef4.content(...arguments));
  }

  scrollBy(distance) {
    var _this$viewRef5;

    return (_this$viewRef5 = this.viewRef) === null || _this$viewRef5 === void 0 ? void 0 : _this$viewRef5.scrollBy(...arguments);
  }

  scrollTo(targetLocation) {
    var _this$viewRef6;

    return (_this$viewRef6 = this.viewRef) === null || _this$viewRef6 === void 0 ? void 0 : _this$viewRef6.scrollTo(...arguments);
  }

  scrollToElement(element) {
    var _this$viewRef7;

    var params = [this._patchElementParam(element)];
    return (_this$viewRef7 = this.viewRef) === null || _this$viewRef7 === void 0 ? void 0 : _this$viewRef7.scrollToElement(...params.slice(0, arguments.length));
  }

  scrollToElementTopLeft(element) {
    var _this$viewRef8;

    var params = [this._patchElementParam(element)];
    return (_this$viewRef8 = this.viewRef) === null || _this$viewRef8 === void 0 ? void 0 : _this$viewRef8.scrollToElementTopLeft(...params.slice(0, arguments.length));
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

  toggleLoading(showOrHide) {
    var _this$viewRef16;

    return (_this$viewRef16 = this.viewRef) === null || _this$viewRef16 === void 0 ? void 0 : _this$viewRef16.toggleLoading(...arguments);
  }

  isFull() {
    var _this$viewRef17;

    return (_this$viewRef17 = this.viewRef) === null || _this$viewRef17 === void 0 ? void 0 : _this$viewRef17.isFull(...arguments);
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
      props: ["useNative", "direction", "showScrollbar", "bounceEnabled", "scrollByContent", "scrollByThumb", "classes", "pullDownEnabled", "reachBottomEnabled", "onScroll", "onUpdated", "onPullDown", "onReachBottom", "useSimulatedScrollbar", "pullingDownText", "pulledDownText", "refreshingText", "reachBottomText", "aria", "disabled", "height", "rtlEnabled", "visible", "width", "inertiaEnabled", "useKeyboard", "onStart", "onEnd", "onBounce"]
    };
  }

  get _viewComponent() {
    return ScrollViewComponent;
  }

}
registerComponent("dxScrollView", ScrollView);
ScrollView.defaultOptions = defaultOptions;
