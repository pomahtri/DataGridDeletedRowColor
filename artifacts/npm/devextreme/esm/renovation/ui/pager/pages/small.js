/**
* DevExtreme (esm/renovation/ui/pager/pages/small.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["defaultPageIndex", "pageCount", "pageIndex", "pageIndexChange", "pagesCountText"];
import { createVNode, createComponentVNode } from "inferno";
import { InfernoEffect, InfernoComponent } from "@devextreme/vdom";
import { Page } from "./page";
import { PAGER_INFO_CLASS } from "../info";
import { NumberBox } from "../../editors/number_box";
import messageLocalization from "../../../../localization/message";
import { calculateValuesFittedWidth } from "../utils/calculate_values_fitted_width";
import { getElementMinWidth } from "../utils/get_element_width";
import { PagerProps } from "../common/pager_props";
var PAGER_INFO_TEXT_CLASS = "".concat(PAGER_INFO_CLASS, "  dx-info-text");
var PAGER_PAGE_INDEX_CLASS = "dx-page-index";
var LIGHT_PAGES_CLASS = "dx-light-pages";
var PAGER_PAGES_COUNT_CLASS = "dx-pages-count";
export var viewFunction = _ref => {
  var {
    pageIndexRef,
    pagesCountText,
    props: {
      pageCount
    },
    selectLastPageIndex,
    value,
    valueChange,
    width
  } = _ref;
  return createVNode(1, "div", LIGHT_PAGES_CLASS, [createComponentVNode(2, NumberBox, {
    "className": PAGER_PAGE_INDEX_CLASS,
    "min": 1,
    "max": pageCount,
    "width": width,
    "value": value,
    "valueChange": valueChange
  }), createVNode(1, "span", PAGER_INFO_TEXT_CLASS, pagesCountText, 0), createComponentVNode(2, Page, {
    "className": PAGER_PAGES_COUNT_CLASS,
    "selected": false,
    "index": pageCount - 1,
    "onClick": selectLastPageIndex
  })], 4, null, null, pageIndexRef);
};
var PagerSmallProps = {
  pageCount: PagerProps.pageCount,
  defaultPageIndex: PagerProps.pageIndex
};
import { createRef as infernoCreateRef } from "inferno";
export class PagesSmall extends InfernoComponent {
  constructor(props) {
    super(props);
    this.pageIndexRef = infernoCreateRef();
    this.state = {
      minWidth: 10,
      pageIndex: this.props.pageIndex !== undefined ? this.props.pageIndex : this.props.defaultPageIndex
    };
    this.updateWidth = this.updateWidth.bind(this);
    this.selectLastPageIndex = this.selectLastPageIndex.bind(this);
    this.valueChange = this.valueChange.bind(this);
  }

  createEffects() {
    return [new InfernoEffect(this.updateWidth, [this.state.minWidth])];
  }

  updateEffects() {
    var _this$_effects$;

    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.state.minWidth]);
  }

  updateWidth() {
    var _this$pageIndexRef$cu;

    var el = (_this$pageIndexRef$cu = this.pageIndexRef.current) === null || _this$pageIndexRef$cu === void 0 ? void 0 : _this$pageIndexRef$cu.querySelector(".".concat(PAGER_PAGE_INDEX_CLASS));
    this.setState(state => _extends({}, state, {
      minWidth: el && getElementMinWidth(el) || state.minWidth
    }));
  }

  get value() {
    return (this.props.pageIndex !== undefined ? this.props.pageIndex : this.state.pageIndex) + 1;
  }

  get width() {
    var {
      pageCount
    } = this.props;
    return calculateValuesFittedWidth(this.state.minWidth, [pageCount]);
  }

  get pagesCountText() {
    var _this$props$pagesCoun;

    return ((_this$props$pagesCoun = this.props.pagesCountText) !== null && _this$props$pagesCoun !== void 0 ? _this$props$pagesCoun : "") || messageLocalization.getFormatter("dxPager-pagesCountText")();
  }

  selectLastPageIndex() {
    var _this$props$pageIndex, _this$props;

    var {
      pageCount
    } = this.props;
    (_this$props$pageIndex = (_this$props = this.props).pageIndexChange) === null || _this$props$pageIndex === void 0 ? void 0 : _this$props$pageIndex.call(_this$props, pageCount - 1);
  }

  valueChange(value) {
    {
      var __newValue;

      this.setState(state => {
        __newValue = value - 1;
        return {
          pageIndex: __newValue
        };
      });
      this.props.pageIndexChange(__newValue);
    }
  }

  get restAttributes() {
    var _this$props$pageIndex2 = _extends({}, this.props, {
      pageIndex: this.props.pageIndex !== undefined ? this.props.pageIndex : this.state.pageIndex
    }),
        restProps = _objectWithoutPropertiesLoose(_this$props$pageIndex2, _excluded);

    return restProps;
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        pageIndex: this.props.pageIndex !== undefined ? this.props.pageIndex : this.state.pageIndex
      }),
      pageIndexRef: this.pageIndexRef,
      value: this.value,
      width: this.width,
      pagesCountText: this.pagesCountText,
      selectLastPageIndex: this.selectLastPageIndex,
      valueChange: this.valueChange,
      restAttributes: this.restAttributes
    });
  }

}
PagesSmall.defaultProps = _extends({}, PagerSmallProps);
