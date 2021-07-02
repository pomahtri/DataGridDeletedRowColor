/**
* DevExtreme (esm/renovation/ui/responsive_box/responsive_box.j.js)
* Version: 21.2.0
* Build date: Fri Jul 02 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import registerComponent from "../../../core/component_registrator";
import BaseComponent from "../../component_wrapper/common/component";
import { ResponsiveBox as ResponsiveBoxComponent, defaultOptions } from "./responsive_box";
export default class ResponsiveBox extends BaseComponent {
  get _propsInfo() {
    return {
      twoWay: [],
      allowNull: [],
      elements: [],
      templates: [],
      props: ["screenByWidth"]
    };
  }

  get _viewComponent() {
    return ResponsiveBoxComponent;
  }

}
registerComponent("dxResponsiveBox", ResponsiveBox);
ResponsiveBox.defaultOptions = defaultOptions;
