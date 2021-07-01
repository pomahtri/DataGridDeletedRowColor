import registerComponent from "../../../../../../core/component_registrator";
import BaseComponent from "../../../../../component_wrapper/common/component";
import { MonthDateTableLayout as MonthDateTableLayoutComponent, defaultOptions } from "./layout";
export default class MonthDateTableLayout extends BaseComponent {
  get _propsInfo() {
    return {
      twoWay: [],
      allowNull: [],
      elements: [],
      templates: ["dataCellTemplate"],
      props: ["viewData", "groupOrientation", "leftVirtualCellWidth", "rightVirtualCellWidth", "topVirtualRowHeight", "bottomVirtualRowHeight", "addDateTableClass", "dataCellTemplate"]
    };
  }

  get _viewComponent() {
    return MonthDateTableLayoutComponent;
  }

}
registerComponent("dxMonthDateTableLayout", MonthDateTableLayout);
MonthDateTableLayout.defaultOptions = defaultOptions;