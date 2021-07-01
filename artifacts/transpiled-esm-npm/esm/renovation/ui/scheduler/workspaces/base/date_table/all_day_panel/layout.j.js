import registerComponent from "../../../../../../../core/component_registrator";
import BaseComponent from "../../../../../../component_wrapper/common/component";
import { AllDayPanelLayout as AllDayPanelLayoutComponent, defaultOptions } from "./layout";
export default class AllDayPanelLayout extends BaseComponent {
  get _propsInfo() {
    return {
      twoWay: [],
      allowNull: [],
      elements: [],
      templates: ["dataCellTemplate"],
      props: ["className", "visible", "viewData", "groupOrientation", "leftVirtualCellWidth", "rightVirtualCellWidth", "topVirtualRowHeight", "bottomVirtualRowHeight", "addDateTableClass", "dataCellTemplate"]
    };
  }

  get _viewComponent() {
    return AllDayPanelLayoutComponent;
  }

}
registerComponent("dxAllDayPanelLayout", AllDayPanelLayout);
AllDayPanelLayout.defaultOptions = defaultOptions;