import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["className", "defaultPageIndex", "defaultPageSize", "displayMode", "gridCompatibility", "hasKnownLastPage", "infoText", "lightModeEnabled", "maxPagesCount", "onKeyDown", "pageCount", "pageIndex", "pageIndexChange", "pageSize", "pageSizeChange", "pageSizes", "pagesCountText", "pagesNavigatorVisible", "rtlEnabled", "showInfo", "showNavigationButtons", "showPageSizes", "totalCount", "visible"];
import { createComponentVNode, normalizeProps } from "inferno";
import { InfernoWrapperComponent } from "@devextreme/vdom";
import { ResizableContainer } from "./resizable_container";
import { PagerProps } from "./common/pager_props";
import { PagerContent } from "./content";
import { combineClasses } from "../../utils/combine_classes";
export var viewFunction = _ref => {
  var {
    pagerProps,
    restAttributes
  } = _ref;
  return normalizeProps(createComponentVNode(2, ResizableContainer, _extends({
    "contentTemplate": PagerContent,
    "pagerProps": pagerProps
  }, restAttributes)));
};
import { createReRenderEffect } from "@devextreme/vdom";
export class Pager extends InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this.state = {
      pageIndex: this.props.pageIndex !== undefined ? this.props.pageIndex : this.props.defaultPageIndex,
      pageSize: this.props.pageSize !== undefined ? this.props.pageSize : this.props.defaultPageSize
    };
    this.pageIndexChange = this.pageIndexChange.bind(this);
    this.pageSizeChange = this.pageSizeChange.bind(this);
  }

  createEffects() {
    return [createReRenderEffect()];
  }

  pageIndexChange(newPageIndex) {
    if (this.props.gridCompatibility) {
      {
        var __newValue;

        this.setState(state => {
          __newValue = newPageIndex + 1;
          return {
            pageIndex: __newValue
          };
        });
        this.props.pageIndexChange(__newValue);
      }
    } else {
      {
        var _newValue;

        this.setState(state => {
          _newValue = newPageIndex;
          return {
            pageIndex: _newValue
          };
        });
        this.props.pageIndexChange(_newValue);
      }
    }
  }

  get pageIndex() {
    if (this.props.gridCompatibility) {
      return (this.props.pageIndex !== undefined ? this.props.pageIndex : this.state.pageIndex) - 1;
    }

    return this.props.pageIndex !== undefined ? this.props.pageIndex : this.state.pageIndex;
  }

  pageSizeChange(newPageSize) {
    {
      var __newValue;

      this.setState(state => {
        __newValue = newPageSize;
        return {
          pageSize: __newValue
        };
      });
      this.props.pageSizeChange(__newValue);
    }
  }

  get className() {
    if (this.props.gridCompatibility) {
      return combineClasses({
        "dx-datagrid-pager": true,
        ["".concat(this.props.className)]: !!this.props.className
      });
    }

    return this.props.className;
  }

  get pagerProps() {
    return _extends({}, _extends({}, this.props, {
      pageIndex: this.props.pageIndex !== undefined ? this.props.pageIndex : this.state.pageIndex,
      pageSize: this.props.pageSize !== undefined ? this.props.pageSize : this.state.pageSize
    }), {
      className: this.className,
      pageIndex: this.pageIndex,
      pageIndexChange: pageIndex => this.pageIndexChange(pageIndex),
      pageSizeChange: pageSize => this.pageSizeChange(pageSize)
    });
  }

  get restAttributes() {
    var _this$props$pageIndex = _extends({}, this.props, {
      pageIndex: this.props.pageIndex !== undefined ? this.props.pageIndex : this.state.pageIndex,
      pageSize: this.props.pageSize !== undefined ? this.props.pageSize : this.state.pageSize
    }),
        restProps = _objectWithoutPropertiesLoose(_this$props$pageIndex, _excluded);

    return restProps;
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        pageIndex: this.props.pageIndex !== undefined ? this.props.pageIndex : this.state.pageIndex,
        pageSize: this.props.pageSize !== undefined ? this.props.pageSize : this.state.pageSize
      }),
      pageIndexChange: this.pageIndexChange,
      pageIndex: this.pageIndex,
      pageSizeChange: this.pageSizeChange,
      className: this.className,
      pagerProps: this.pagerProps,
      restAttributes: this.restAttributes
    });
  }

}
Pager.defaultProps = _extends({}, PagerProps);