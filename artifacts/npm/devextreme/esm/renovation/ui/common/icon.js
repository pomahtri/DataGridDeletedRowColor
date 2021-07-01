/**
* DevExtreme (esm/renovation/ui/common/icon.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["position", "source"];
import { createVNode, createFragment } from "inferno";
import { Fragment } from "inferno";
import { BaseInfernoComponent } from "@devextreme/vdom";
import { getImageSourceType } from "../../../core/utils/icon";
import { combineClasses } from "../../utils/combine_classes";
export var viewFunction = _ref => {
  var {
    cssClass,
    props: {
      source
    },
    sourceType
  } = _ref;
  var generalClasses = {
    "dx-icon": true,
    [cssClass]: !!cssClass
  };
  return createFragment([sourceType === "dxIcon" && createVNode(1, "i", combineClasses(_extends({}, generalClasses, {
    ["dx-icon-".concat(source)]: true
  }))), sourceType === "fontIcon" && createVNode(1, "i", combineClasses(_extends({}, generalClasses, {
    [String(source)]: !!source
  }))), sourceType === "image" && createVNode(1, "img", combineClasses(generalClasses), null, 1, {
    "alt": "",
    "src": source
  }), sourceType === "svg" && createVNode(1, "i", combineClasses(_extends({}, generalClasses, {
    "dx-svg-icon": true
  })), source, 0)], 0);
};
export var IconProps = {
  position: "left",
  source: ""
};
export class Icon extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  get sourceType() {
    return getImageSourceType(this.props.source);
  }

  get cssClass() {
    return this.props.position !== "left" ? "dx-icon-right" : "";
  }

  get restAttributes() {
    var _this$props = this.props,
        restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);

    return restProps;
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props),
      sourceType: this.sourceType,
      cssClass: this.cssClass,
      restAttributes: this.restAttributes
    });
  }

}
Icon.defaultProps = _extends({}, IconProps);
