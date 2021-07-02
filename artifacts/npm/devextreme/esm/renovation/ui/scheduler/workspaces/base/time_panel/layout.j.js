/**
* DevExtreme (esm/renovation/ui/scheduler/workspaces/base/time_panel/layout.j.js)
* Version: 21.2.0
* Build date: Fri Jul 02 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import registerComponent from "../../../../../../core/component_registrator";
import BaseComponent from "../../../../../component_wrapper/common/component";
import { TimePanelTableLayout as TimePanelTableLayoutComponent, defaultOptions } from "./layout";
export default class TimePanelTableLayout extends BaseComponent {
  get _propsInfo() {
    return {
      twoWay: [],
      allowNull: [],
      elements: [],
      templates: ["timeCellTemplate"],
      props: ["groupOrientation", "timePanelData", "timeCellTemplate"]
    };
  }

  get _viewComponent() {
    return TimePanelTableLayoutComponent;
  }

}
registerComponent("dxTimePanelTableLayout", TimePanelTableLayout);
TimePanelTableLayout.defaultOptions = defaultOptions;
