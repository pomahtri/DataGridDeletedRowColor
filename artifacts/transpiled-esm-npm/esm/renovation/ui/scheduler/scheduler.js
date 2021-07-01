import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["adaptivityEnabled", "allDayExpr", "appointmentCollectorTemplate", "appointmentDragging", "appointmentTemplate", "appointmentTooltipTemplate", "cellDuration", "crossScrollingEnabled", "currentDate", "currentDateChange", "currentView", "currentViewChange", "customizeDateNavigatorText", "dataCellTemplate", "dataSource", "dateCellTemplate", "dateSerializationFormat", "defaultCurrentDate", "defaultCurrentView", "descriptionExpr", "editing", "endDateExpr", "endDateTimeZoneExpr", "endDayHour", "firstDayOfWeek", "focusStateEnabled", "groupByDate", "groups", "indicatorUpdateInterval", "max", "maxAppointmentsPerCell", "min", "noDataText", "onAppointmentAdded", "onAppointmentAdding", "onAppointmentClick", "onAppointmentContextMenu", "onAppointmentDblClick", "onAppointmentDeleted", "onAppointmentDeleting", "onAppointmentFormOpening", "onAppointmentRendered", "onAppointmentUpdated", "onAppointmentUpdating", "onCellClick", "onCellContextMenu", "recurrenceEditMode", "recurrenceExceptionExpr", "recurrenceRuleExpr", "remoteFiltering", "resourceCellTemplate", "resources", "scrolling", "selectedCellData", "shadeUntilCurrentTime", "showAllDayPanel", "showCurrentTimeIndicator", "startDateExpr", "startDateTimeZoneExpr", "startDayHour", "textExpr", "timeCellTemplate", "timeZone", "useDropDownViewSwitcher", "views"];
import { createComponentVNode, normalizeProps } from "inferno";
import { InfernoEffect, InfernoComponent } from "@devextreme/vdom";
import { SchedulerProps } from "./props";
import { Widget } from "../common/widget";
export var viewFunction = viewModel => {
  var {
    restAttributes
  } = viewModel;
  return normalizeProps(createComponentVNode(2, Widget, _extends({}, restAttributes)));
};

var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);

export class Scheduler extends InfernoComponent {
  constructor(props) {
    super(props);
    this.state = {
      instance: undefined,
      currentDate: this.props.currentDate !== undefined ? this.props.currentDate : this.props.defaultCurrentDate,
      currentView: this.props.currentView !== undefined ? this.props.currentView : this.props.defaultCurrentView
    };
    this.getComponentInstance = this.getComponentInstance.bind(this);
    this.addAppointment = this.addAppointment.bind(this);
    this.deleteAppointment = this.deleteAppointment.bind(this);
    this.updateAppointment = this.updateAppointment.bind(this);
    this.getDataSource = this.getDataSource.bind(this);
    this.getEndViewDate = this.getEndViewDate.bind(this);
    this.getStartViewDate = this.getStartViewDate.bind(this);
    this.hideAppointmentPopup = this.hideAppointmentPopup.bind(this);
    this.hideAppointmentTooltip = this.hideAppointmentTooltip.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
    this.scrollToTime = this.scrollToTime.bind(this);
    this.showAppointmentPopup = this.showAppointmentPopup.bind(this);
    this.showAppointmentTooltip = this.showAppointmentTooltip.bind(this);
    this.dispose = this.dispose.bind(this);
  }

  createEffects() {
    return [new InfernoEffect(this.dispose, [])];
  }

  dispose() {
    return () => {
      this.state.instance.dispose();
    };
  }

  get restAttributes() {
    var _this$props$currentDa = _extends({}, this.props, {
      currentDate: this.props.currentDate !== undefined ? this.props.currentDate : this.state.currentDate,
      currentView: this.props.currentView !== undefined ? this.props.currentView : this.state.currentView
    }),
        restProps = _objectWithoutPropertiesLoose(_this$props$currentDa, _excluded);

    return restProps;
  }

  getComponentInstance() {
    return this.state.instance;
  }

  addAppointment(appointment) {
    this.state.instance.addAppointment(appointment);
  }

  deleteAppointment(appointment) {
    this.state.instance.deleteAppointment(appointment);
  }

  updateAppointment(target, appointment) {
    this.state.instance.updateAppointment(target, appointment);
  }

  getDataSource() {
    return this.state.instance.getDataSource();
  }

  getEndViewDate() {
    return this.state.instance.getEndViewDate();
  }

  getStartViewDate() {
    return this.state.instance.getStartViewDate();
  }

  hideAppointmentPopup(saveChanges) {
    this.state.instance.hideAppointmentPopup(saveChanges);
  }

  hideAppointmentTooltip() {
    this.state.instance.hideAppointmentTooltip();
  }

  scrollTo(date, group, allDay) {
    this.state.instance.scrollTo(date, group, allDay);
  }

  scrollToTime(hours, minutes, date) {
    this.state.instance.scrollToTime(hours, minutes, date);
  }

  showAppointmentPopup(appointmentData, createNewAppointment, currentAppointmentData) {
    this.state.instance.showAppointmentPopup(appointmentData, createNewAppointment, currentAppointmentData);
  }

  showAppointmentTooltip(appointmentData, target, currentAppointmentData) {
    this.state.instance.showAppointmentTooltip(appointmentData, target, currentAppointmentData);
  }

  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        currentDate: this.props.currentDate !== undefined ? this.props.currentDate : this.state.currentDate,
        currentView: this.props.currentView !== undefined ? this.props.currentView : this.state.currentView,
        dataCellTemplate: getTemplate(props.dataCellTemplate),
        dateCellTemplate: getTemplate(props.dateCellTemplate),
        timeCellTemplate: getTemplate(props.timeCellTemplate),
        resourceCellTemplate: getTemplate(props.resourceCellTemplate),
        appointmentCollectorTemplate: getTemplate(props.appointmentCollectorTemplate),
        appointmentTemplate: getTemplate(props.appointmentTemplate),
        appointmentTooltipTemplate: getTemplate(props.appointmentTooltipTemplate)
      }),
      instance: this.state.instance,
      restAttributes: this.restAttributes
    });
  }

}
Scheduler.defaultProps = _extends({}, SchedulerProps);