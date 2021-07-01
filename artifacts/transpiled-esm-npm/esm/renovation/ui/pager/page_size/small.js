import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["defaultPageSize", "pageSize", "pageSizeChange", "pageSizes", "parentRef"];
import { createComponentVNode } from "inferno";
import { InfernoEffect, InfernoComponent } from "@devextreme/vdom";
import { SelectBox } from "../../editors/drop_down_editors/select_box";
import { calculateValuesFittedWidth } from "../utils/calculate_values_fitted_width";
import { getElementMinWidth } from "../utils/get_element_width";
import { PagerProps } from "../common/pager_props";
export var viewFunction = _ref => {
  var {
    props: {
      pageSize,
      pageSizeChange,
      pageSizes
    },
    width
  } = _ref;
  return createComponentVNode(2, SelectBox, {
    "displayExpr": "text",
    "valueExpr": "value",
    "dataSource": pageSizes,
    "value": pageSize,
    "valueChange": pageSizeChange,
    "width": width
  });
};
export var PageSizeSmallProps = {};
var PageSizeSmallPropsType = {
  defaultPageSize: PagerProps.pageSize
};
export class PageSizeSmall extends InfernoComponent {
  constructor(props) {
    super(props);
    this.state = {
      minWidth: 10,
      pageSize: this.props.pageSize !== undefined ? this.props.pageSize : this.props.defaultPageSize
    };
    this.updateWidth = this.updateWidth.bind(this);
  }

  createEffects() {
    return [new InfernoEffect(this.updateWidth, [this.state.minWidth, this.state.pageSize, this.props.pageSize, this.props.pageSizeChange, this.props.pageSizes, this.props.defaultPageSize])];
  }

  updateEffects() {
    var _this$_effects$;

    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.state.minWidth, this.state.pageSize, this.props.pageSize, this.props.pageSizeChange, this.props.pageSizes, this.props.defaultPageSize]);
  }

  updateWidth() {
    this.setState(state => _extends({}, state, {
      minWidth: getElementMinWidth(this.props.parentRef.current) || state.minWidth
    }));
  }

  get width() {
    return calculateValuesFittedWidth(this.state.minWidth, this.props.pageSizes.map(p => p.value));
  }

  get restAttributes() {
    var _this$props$pageSize = _extends({}, this.props, {
      pageSize: this.props.pageSize !== undefined ? this.props.pageSize : this.state.pageSize
    }),
        restProps = _objectWithoutPropertiesLoose(_this$props$pageSize, _excluded);

    return restProps;
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        pageSize: this.props.pageSize !== undefined ? this.props.pageSize : this.state.pageSize
      }),
      width: this.width,
      restAttributes: this.restAttributes
    });
  }

}
PageSizeSmall.defaultProps = _extends({}, PageSizeSmallPropsType);