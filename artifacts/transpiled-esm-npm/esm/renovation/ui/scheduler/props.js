import _extends from "@babel/runtime/helpers/esm/extends";
export var ResourceProps = {};
var BaseSchedulerProps = {};
export var ViewProps = _extends({}, BaseSchedulerProps);
export var AppointmentEditingProps = {};
export var AppointmentDraggingProps = {};
export var ScrollingProps = {};
export var SchedulerProps = _extends({}, BaseSchedulerProps, {
  defaultCurrentDate: new Date(),
  currentDateChange: () => {},
  defaultCurrentView: "day",
  currentViewChange: () => {}
});