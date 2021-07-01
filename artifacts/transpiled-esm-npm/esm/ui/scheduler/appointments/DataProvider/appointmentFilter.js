import config from '../../../../core/config';
import dateUtils from '../../../../core/utils/date';
import { equalByValue } from '../../../../core/utils/common';
import dateSerialization from '../../../../core/utils/date_serialization';
import { getRecurrenceProcessor } from '../../recurrence';
import { inArray, wrapToArray } from '../../../../core/utils/array';
import { extend } from '../../../../core/utils/extend';
import { map, each } from '../../../../core/utils/iterator';
import { isFunction, isDefined, isString } from '../../../../core/utils/type';
import query from '../../../../data/query';
import timeZoneUtils from '../../utils.timeZone';
var toMs = dateUtils.dateToMilliseconds;
var DATE_FILTER_POSITION = 0;
var USER_FILTER_POSITION = 1;
var FULL_DATE_FORMAT = 'yyyyMMddTHHmmss';
var FilterStrategies = {
  virtual: 'virtual',
  standard: 'standard'
};

class AppointmentFilterHelper {
  compareDateWithStartDayHour(startDate, endDate, startDayHour, allDay, severalDays) {
    var startTime = dateUtils.dateTimeFromDecimal(startDayHour);
    var result = startDate.getHours() >= startTime.hours && startDate.getMinutes() >= startTime.minutes || endDate.getHours() === startTime.hours && endDate.getMinutes() > startTime.minutes || endDate.getHours() > startTime.hours || severalDays || allDay;
    return result;
  }

  compareDateWithEndDayHour(options) {
    var {
      startDate,
      endDate,
      startDayHour,
      endDayHour,
      viewStartDayHour,
      viewEndDayHour,
      allDay,
      severalDays,
      min,
      max,
      checkIntersectViewport
    } = options;
    var hiddenInterval = (24 - viewEndDayHour + viewStartDayHour) * toMs('hour');
    var apptDuration = endDate.getTime() - startDate.getTime();
    var delta = (hiddenInterval - apptDuration) / toMs('hour');
    var apptStartHour = startDate.getHours();
    var apptStartMinutes = startDate.getMinutes();
    var result;
    var endTime = dateUtils.dateTimeFromDecimal(endDayHour);
    var startTime = dateUtils.dateTimeFromDecimal(startDayHour);
    var apptIntersectViewport = startDate < max && endDate > min;
    result = checkIntersectViewport && apptIntersectViewport || apptStartHour < endTime.hours || apptStartHour === endTime.hours && apptStartMinutes < endTime.minutes || allDay && startDate <= max || severalDays && apptIntersectViewport && (apptStartHour < endTime.hours || endDate.getHours() * 60 + endDate.getMinutes() > startTime.hours * 60);

    if (apptDuration < hiddenInterval) {
      if (apptStartHour > endTime.hours && apptStartMinutes > endTime.minutes && delta <= apptStartHour - endDayHour) {
        result = false;
      }
    }

    return result;
  }

}

class FilterMaker {
  constructor(dataAccessors) {
    this._filterRegistry = null;
    this.dataAccessors = dataAccessors;
  }

  isRegistered() {
    return !!this._filterRegistry;
  }

  clearRegistry() {
    delete this._filterRegistry;
  }

  make(type, args) {
    if (!this._filterRegistry) {
      this._filterRegistry = {};
    }

    this._make(type).apply(this, args);
  }

  _make(type) {
    switch (type) {
      case 'date':
        return (min, max, useAccessors) => {
          var startDate = useAccessors ? this.dataAccessors.getter.startDate : this.dataAccessors.expr.startDateExpr;
          var endDate = useAccessors ? this.dataAccessors.getter.endDate : this.dataAccessors.expr.endDateExpr;
          var recurrenceRule = this.dataAccessors.expr.recurrenceRuleExpr;
          this._filterRegistry.date = [[[endDate, '>', min], [startDate, '<', max]], 'or', [recurrenceRule, 'startswith', 'freq'], 'or', [[endDate, min], [startDate, min]]];

          if (!recurrenceRule) {
            this._filterRegistry.date.splice(1, 2);
          }
        };

      case 'user':
        return userFilter => {
          this._filterRegistry.user = userFilter;
        };
    }
  }

  combine() {
    var filter = [];
    this._filterRegistry.date && filter.push(this._filterRegistry.date);
    this._filterRegistry.user && filter.push(this._filterRegistry.user);
    return filter;
  }

  dateFilter() {
    return this._filterRegistry.date;
  }

}

export class AppointmentFilterBaseStrategy {
  constructor(options) {
    this.options = options;
    this.dataSource = this.options.dataSource;
    this.dataAccessors = this.options.dataAccessors;
    this.filterHelper = new AppointmentFilterHelper();

    this._init();
  }

  get strategyName() {
    return FilterStrategies.standard;
  } // TODO - Use DI to get appropriate services


  get scheduler() {
    return this.options.scheduler;
  } // TODO get rid


  get workspace() {
    return this.scheduler.getWorkSpace();
  } // TODO get rid


  get viewDataProvider() {
    return this.workspace.viewDataProvider;
  }

  get resourceManager() {
    return this.options.resourceManager;
  }

  get timeZoneCalculator() {
    return this.options.timeZoneCalculator;
  }

  get viewStartDayHour() {
    return this.options.startDayHour;
  }

  get viewEndDayHour() {
    return this.options.endDayHour;
  }

  get appointmentDuration() {
    return this.options.appointmentDuration;
  }

  get timezone() {
    return this.options.timezone;
  }

  get firstDayOfWeek() {
    return this.options.firstDayOfWeek;
  }

  get showAllDayPanel() {
    return this.options.showAllDayPanel;
  }

  _init() {
    this.setDataAccessors(this.dataAccessors);
    this.setDataSource(this.dataSource);
  }

  filter() {
    var dateRange = this.workspace.getDateRange();
    var resources = this.resourceManager.getResourcesData();
    var allDay;

    if (!this.showAllDayPanel && this.workspace.supportAllDayRow()) {
      allDay = false;
    }

    return this.filterLoadedAppointments({
      startDayHour: this.viewStartDayHour,
      endDayHour: this.viewEndDayHour,
      viewStartDayHour: this.viewStartDayHour,
      viewEndDayHour: this.viewEndDayHour,
      min: dateRange[0],
      max: dateRange[1],
      resources: resources,
      allDay: allDay,
      firstDayOfWeek: this.firstDayOfWeek,
      recurrenceException: this.getRecurrenceException.bind(this)
    });
  } // TODO: Get rid of it after rework filtering


  getRecurrenceException(rawAppointment) {
    var appointment = this.scheduler.createAppointmentAdapter(rawAppointment);
    var recurrenceException = appointment.recurrenceException;

    if (recurrenceException) {
      var exceptions = recurrenceException.split(',');

      for (var i = 0; i < exceptions.length; i++) {
        exceptions[i] = this._convertRecurrenceException(exceptions[i], appointment.startDate);
      }

      return exceptions.join();
    }

    return recurrenceException;
  }

  _convertRecurrenceException(exceptionString, startDate) {
    exceptionString = exceptionString.replace(/\s/g, '');

    var getConvertedToTimeZone = date => {
      return this.timeZoneCalculator.createDate(date, {
        path: 'toGrid'
      });
    };

    var exceptionDate = dateSerialization.deserializeDate(exceptionString);
    var convertedStartDate = getConvertedToTimeZone(startDate);
    var convertedExceptionDate = getConvertedToTimeZone(exceptionDate);
    convertedExceptionDate = timeZoneUtils.correctRecurrenceExceptionByTimezone(convertedExceptionDate, convertedStartDate, this.timeZone);
    exceptionString = dateSerialization.serializeDate(convertedExceptionDate, FULL_DATE_FORMAT);
    return exceptionString;
  }

  filterByDate(min, max, remoteFiltering, dateSerializationFormat) {
    if (!this.dataSource) {
      return;
    }

    var trimmedDates = this._trimDates(min, max);

    if (!this.filterMaker.isRegistered()) {
      this._createFilter(trimmedDates.min, trimmedDates.max, remoteFiltering, dateSerializationFormat);
    } else {
      var _this$dataSource$filt;

      this.filterMaker.make('date', [trimmedDates.min, trimmedDates.max]);

      if (((_this$dataSource$filt = this.dataSource.filter()) === null || _this$dataSource$filt === void 0 ? void 0 : _this$dataSource$filt.length) > 1) {
        // TODO: serialize user filter value only necessary for case T838165(details in note)
        var userFilter = this._serializeRemoteFilter([this.dataSource.filter()[1]], dateSerializationFormat);

        this.filterMaker.make('user', userFilter);
      }

      if (remoteFiltering) {
        this.dataSource.filter(this._combineRemoteFilter(dateSerializationFormat));
      }
    }
  }

  hasAllDayAppointments(appointments) {
    var result = false;

    if (appointments) {
      each(appointments, (_, item) => {
        if (this.appointmentTakesAllDay(item, this.viewStartDayHour, this.viewEndDayHour)) {
          result = true;
          return false;
        }
      });
    }

    return result;
  } //


  setDataAccessors(dataAccessors) {
    this.dataAccessors = dataAccessors;
    this.filterMaker = new FilterMaker(this.dataAccessors);
  }

  setDataSource(dataSource) {
    var _this$filterMaker;

    this.dataSource = dataSource;
    (_this$filterMaker = this.filterMaker) === null || _this$filterMaker === void 0 ? void 0 : _this$filterMaker.clearRegistry();
  }

  _getAppointmentDurationInHours(startDate, endDate) {
    return (endDate.getTime() - startDate.getTime()) / toMs('hour');
  }

  appointmentTakesSeveralDays(appointment) {
    var dataAccessors = this.dataAccessors;
    var startDate = new Date(dataAccessors.getter.startDate(appointment));
    var endDate = new Date(dataAccessors.getter.endDate(appointment));
    return !dateUtils.sameDate(startDate, endDate);
  }

  _appointmentHasShortDayDuration(startDate, endDate, startDayHour, endDayHour) {
    var appointmentDurationInHours = this._getAppointmentDurationInHours(startDate, endDate);

    var shortDayDurationInHours = endDayHour - startDayHour;
    return appointmentDurationInHours >= shortDayDurationInHours && startDate.getHours() === startDayHour && endDate.getHours() === endDayHour;
  }

  _appointmentHasAllDayDuration(startDate, endDate, startDayHour, endDayHour) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    var dayDuration = 24;

    var appointmentDurationInHours = this._getAppointmentDurationInHours(startDate, endDate);

    return appointmentDurationInHours >= dayDuration || this._appointmentHasShortDayDuration(startDate, endDate, startDayHour, endDayHour);
  }

  _isEndDateWrong(startDate, endDate) {
    return !endDate || isNaN(endDate.getTime()) || startDate.getTime() > endDate.getTime();
  }

  calculateAppointmentEndDate(isAllDay, startDate) {
    if (isAllDay) {
      return dateUtils.setToDayEnd(new Date(startDate));
    }

    return new Date(startDate.getTime() + this.appointmentDuration * toMs('minute'));
  }

  replaceWrongEndDate(appointment, startDate, endDate) {
    if (this._isEndDateWrong(startDate, endDate)) {
      var isAllDay = this.dataAccessors.getter.allDay(appointment);
      var calculatedEndDate = this.calculateAppointmentEndDate(isAllDay, startDate);
      this.dataAccessors.setter.endDate(appointment, calculatedEndDate);
    }
  }

  appointmentTakesAllDay(appointment, startDayHour, endDayHour) {
    var dataAccessors = this.dataAccessors;
    var startDate = dataAccessors.getter.startDate(appointment);
    var endDate = dataAccessors.getter.endDate(appointment);
    var allDay = dataAccessors.getter.allDay(appointment);
    return allDay || this._appointmentHasAllDayDuration(startDate, endDate, startDayHour, endDayHour);
  }

  _createAllDayAppointmentFilter(filterOptions) {
    var {
      viewStartDayHour,
      viewEndDayHour
    } = filterOptions;
    var that = this;
    return [[appointment => that.appointmentTakesAllDay(appointment, viewStartDayHour, viewEndDayHour)]];
  }

  _createCombinedFilter(filterOptions) {
    var dataAccessors = this.dataAccessors;
    var min = new Date(filterOptions.min);
    var max = new Date(filterOptions.max);
    var getRecurrenceException = filterOptions.recurrenceException;
    var {
      startDayHour,
      endDayHour,
      viewStartDayHour,
      viewEndDayHour,
      resources,
      firstDayOfWeek,
      checkIntersectViewport
    } = filterOptions;
    var that = this;
    return [[appointment => {
      var _appointment$visible;

      var appointmentVisible = (_appointment$visible = appointment.visible) !== null && _appointment$visible !== void 0 ? _appointment$visible : true;
      var result = appointmentVisible;
      var startDate = new Date(dataAccessors.getter.startDate(appointment));
      var endDate = new Date(dataAccessors.getter.endDate(appointment));
      var appointmentTakesAllDay = that.appointmentTakesAllDay(appointment, viewStartDayHour, viewEndDayHour);
      var appointmentTakesSeveralDays = that.appointmentTakesSeveralDays(appointment);
      var isAllDay = dataAccessors.getter.allDay(appointment);
      var appointmentIsLong = appointmentTakesSeveralDays || appointmentTakesAllDay;
      var useRecurrence = isDefined(dataAccessors.getter.recurrenceRule);
      var recurrenceRule;

      if (useRecurrence) {
        recurrenceRule = dataAccessors.getter.recurrenceRule(appointment);
      }

      if (resources && resources.length) {
        result = that._filterAppointmentByResources(appointment, resources);
      }

      if (appointmentTakesAllDay && filterOptions.allDay === false) {
        result = false;
      }

      var startDateTimeZone = dataAccessors.getter.startDateTimeZone(appointment);
      var endDateTimeZone = dataAccessors.getter.endDateTimeZone(appointment);
      var comparableStartDate = this.timeZoneCalculator.createDate(startDate, {
        appointmentTimeZone: startDateTimeZone,
        path: 'toGrid'
      });
      var comparableEndDate = this.timeZoneCalculator.createDate(endDate, {
        appointmentTimeZone: endDateTimeZone,
        path: 'toGrid'
      });

      if (result && useRecurrence) {
        var recurrenceException = getRecurrenceException ? getRecurrenceException(appointment) : dataAccessors.getter.recurrenceException(appointment);
        result = that._filterAppointmentByRRule({
          startDate: comparableStartDate,
          endDate: comparableEndDate,
          recurrenceRule: recurrenceRule,
          recurrenceException: recurrenceException,
          allDay: appointmentTakesAllDay
        }, min, max, startDayHour, endDayHour, firstDayOfWeek);
      } // NOTE: Long appointment part without allDay field and recurrence rule should be filtered by min


      if (result && comparableEndDate < min && appointmentIsLong && !isAllDay && (!useRecurrence || useRecurrence && !recurrenceRule)) {
        result = false;
      }

      if (result && isDefined(startDayHour) && (!useRecurrence || !filterOptions.isVirtualScrolling)) {
        result = this.filterHelper.compareDateWithStartDayHour(comparableStartDate, comparableEndDate, startDayHour, appointmentTakesAllDay, appointmentTakesSeveralDays);
      }

      if (result && isDefined(endDayHour)) {
        result = this.filterHelper.compareDateWithEndDayHour({
          startDate: comparableStartDate,
          endDate: comparableEndDate,
          startDayHour,
          endDayHour,
          viewStartDayHour,
          viewEndDayHour,
          allDay: appointmentTakesAllDay,
          severalDays: appointmentTakesSeveralDays,
          min,
          max,
          checkIntersectViewport
        });
      }

      if (result && useRecurrence && !recurrenceRule) {
        if (comparableEndDate < min && !isAllDay) {
          result = false;
        }
      }

      return result;
    }]];
  }

  customizeDateFilter(dateFilter) {
    var currentFilter = extend(true, [], dateFilter);
    return (appointment => {
      var startDate = new Date(this.dataAccessors.getter.startDate(appointment));
      var endDate = new Date(this.dataAccessors.getter.endDate(appointment));
      appointment = extend(true, {}, appointment);
      var startDateTimeZone = this.dataAccessors.getter.startDateTimeZone(appointment);
      var endDateTimeZone = this.dataAccessors.getter.endDateTimeZone(appointment);
      var comparableStartDate = this.timeZoneCalculator.createDate(startDate, {
        appointmentTimeZone: startDateTimeZone,
        path: 'toGrid'
      });
      var comparableEndDate = this.timeZoneCalculator.createDate(endDate, {
        appointmentTimeZone: endDateTimeZone,
        path: 'toGrid'
      });
      this.dataAccessors.setter.startDate(appointment, comparableStartDate);
      this.dataAccessors.setter.endDate(appointment, comparableEndDate);
      return query([appointment]).filter(currentFilter).toArray().length > 0;
    }).bind(this);
  }

  _createAppointmentFilter(filterOptions) {
    var combinedFilter = this._createCombinedFilter(filterOptions);

    if (this.filterMaker.isRegistered()) {
      this.filterMaker.make('user', undefined);

      var trimmedDates = this._trimDates(filterOptions.min, filterOptions.max);

      this.filterMaker.make('date', [trimmedDates.min, trimmedDates.max, true]);
      var dateFilter = this.customizeDateFilter(this.filterMaker.combine());
      combinedFilter.push([dateFilter]);
    }

    return combinedFilter;
  }

  _excessFiltering() {
    var dateFilter = this.filterMaker.dateFilter();
    var dataSourceFilter = this.dataSource.filter();
    return dataSourceFilter && (equalByValue(dataSourceFilter, dateFilter) || dataSourceFilter.length && equalByValue(dataSourceFilter[DATE_FILTER_POSITION], dateFilter));
  }

  _combineRemoteFilter(dateSerializationFormat) {
    var combinedFilter = this.filterMaker.combine();
    return this._serializeRemoteFilter(combinedFilter, dateSerializationFormat);
  }

  _serializeRemoteFilter(filter, dateSerializationFormat) {
    if (!Array.isArray(filter)) {
      return filter;
    }

    filter = extend([], filter);
    var startDate = this.dataAccessors.expr.startDateExpr;
    var endDate = this.dataAccessors.expr.endDateExpr;

    if (isString(filter[0])) {
      if (config().forceIsoDateParsing && filter.length > 1) {
        if (filter[0] === startDate || filter[0] === endDate) {
          // TODO: wrap filter value to new Date only necessary for case T838165(details in note)
          filter[filter.length - 1] = dateSerialization.serializeDate(new Date(filter[filter.length - 1]), dateSerializationFormat);
        }
      }
    }

    for (var i = 0; i < filter.length; i++) {
      filter[i] = this._serializeRemoteFilter(filter[i], dateSerializationFormat);
    }

    return filter;
  }

  _createFilter(min, max, remoteFiltering, dateSerializationFormat) {
    this.filterMaker.make('date', [min, max]);
    var userFilterPosition = this._excessFiltering() ? this.dataSource.filter()[USER_FILTER_POSITION] : this.dataSource.filter();
    this.filterMaker.make('user', [userFilterPosition]);

    if (remoteFiltering) {
      this.dataSource.filter(this._combineRemoteFilter(dateSerializationFormat));
    }
  }

  _trimDates(min, max) {
    var minCopy = dateUtils.trimTime(new Date(min));
    var maxCopy = dateUtils.trimTime(new Date(max));
    maxCopy.setDate(maxCopy.getDate() + 1);
    return {
      min: minCopy,
      max: maxCopy
    };
  }

  _filterAppointmentByResources(appointment, resources) {
    var checkAppointmentResourceValues = (resourceName, resourceIndex) => {
      var resourceGetter = this.dataAccessors.getter.resources[resourceName];
      var resource;

      if (isFunction(resourceGetter)) {
        resource = resourceGetter(appointment);
      }

      var appointmentResourceValues = wrapToArray(resource);
      var resourceData = map(resources[resourceIndex].items, item => {
        return item.id;
      });

      for (var j = 0; j < appointmentResourceValues.length; j++) {
        if (inArray(appointmentResourceValues[j], resourceData) > -1) {
          return true;
        }
      }

      return false;
    };

    var result = false;

    for (var i = 0; i < resources.length; i++) {
      var resourceName = resources[i].name;
      result = checkAppointmentResourceValues(resourceName, i);

      if (!result) {
        return false;
      }
    }

    return result;
  }

  _appointmentPartInInterval(startDate, endDate, startDayHour, endDayHour) {
    var apptStartDayHour = startDate.getHours();
    var apptEndDayHour = endDate.getHours();
    return apptStartDayHour <= startDayHour && apptEndDayHour <= endDayHour && apptEndDayHour >= startDayHour || apptEndDayHour >= endDayHour && apptStartDayHour <= endDayHour && apptStartDayHour >= startDayHour;
  }

  _filterAppointmentByRRule(appointment, min, max, startDayHour, endDayHour, firstDayOfWeek) {
    var recurrenceRule = appointment.recurrenceRule;
    var recurrenceException = appointment.recurrenceException;
    var allDay = appointment.allDay;
    var result = true;
    var appointmentStartDate = appointment.startDate;
    var appointmentEndDate = appointment.endDate;
    var recurrenceProcessor = getRecurrenceProcessor();

    if (allDay || this._appointmentPartInInterval(appointmentStartDate, appointmentEndDate, startDayHour, endDayHour)) {
      var trimmedDates = this._trimDates(min, max);

      min = trimmedDates.min;
      max = new Date(trimmedDates.max.getTime() - toMs('minute'));
    }

    if (recurrenceRule && !recurrenceProcessor.isValidRecurrenceRule(recurrenceRule)) {
      result = appointmentEndDate > min && appointmentStartDate <= max;
    }

    if (result && recurrenceProcessor.isValidRecurrenceRule(recurrenceRule)) {
      result = recurrenceProcessor.hasRecurrence({
        rule: recurrenceRule,
        exception: recurrenceException,
        start: appointmentStartDate,
        end: appointmentEndDate,
        min: min,
        max: max,
        firstDayOfWeek: firstDayOfWeek
      });
    }

    return result;
  }

  getPreparedDataItems() {
    var _this$dataSource;

    var dataItems = (_this$dataSource = this.dataSource) === null || _this$dataSource === void 0 ? void 0 : _this$dataSource.items();

    if (!dataItems) {
      return [];
    }

    return map(dataItems, item => {
      var startDate = new Date(this.dataAccessors.getter.startDate(item));
      var endDate = new Date(this.dataAccessors.getter.endDate(item));
      this.replaceWrongEndDate(item, startDate, endDate);
      return item;
    });
  }

  filterLoadedAppointments(filterOption) {
    var combinedFilter = this._createAppointmentFilter(filterOption);

    return query(this.getPreparedDataItems()).filter(combinedFilter).toArray();
  }

  filterAllDayAppointments(filterOption) {
    var combinedFilter = this._createAllDayAppointmentFilter(filterOption);

    return query(this.getPreparedDataItems()).filter(combinedFilter).toArray();
  }

}
export class AppointmentFilterVirtualStrategy extends AppointmentFilterBaseStrategy {
  get strategyName() {
    return FilterStrategies.virtual;
  }

  filter() {
    var hourMs = toMs('hour');
    var isCalculateStartAndEndDayHour = this.workspace.isDateAndTimeView;
    var checkIntersectViewport = this.workspace.isDateAndTimeView && this.workspace.viewDirection === 'horizontal';
    var isAllDayWorkspace = !this.workspace.supportAllDayRow();
    var showAllDayAppointments = this.showAllDayPanel || isAllDayWorkspace;
    var endViewDate = this.workspace.getEndViewDateByEndDayHour();
    var filterOptions = [];
    var groupsInfo = this.viewDataProvider.getCompletedGroupsInfo();
    groupsInfo.forEach(item => {
      var groupIndex = item.groupIndex;
      var groupStartDate = item.startDate;
      var groupEndDate = new Date(Math.min(item.endDate, endViewDate));
      var startDayHour = isCalculateStartAndEndDayHour ? groupStartDate.getHours() : this.viewStartDayHour;
      var endDayHour = isCalculateStartAndEndDayHour ? startDayHour + groupStartDate.getMinutes() / 60 + (groupEndDate - groupStartDate) / hourMs : this.viewEndDayHour;

      var resources = this._getPrerenderFilterResources(groupIndex);

      var allDayPanel = this.viewDataProvider.getAllDayPanel(groupIndex); // TODO split by workspace strategies

      var supportAllDayAppointment = isAllDayWorkspace || !!showAllDayAppointments && (allDayPanel === null || allDayPanel === void 0 ? void 0 : allDayPanel.length) > 0;
      filterOptions.push({
        isVirtualScrolling: true,
        startDayHour,
        endDayHour,
        viewStartDayHour: this.viewStartDayHour,
        viewEndDayHour: this.viewEndDayHour,
        min: groupStartDate,
        max: groupEndDate,
        allDay: supportAllDayAppointment,
        resources,
        firstDayOfWeek: this.firstDayOfWeek,
        recurrenceException: this.getRecurrenceException.bind(this),
        checkIntersectViewport
      });
    });
    return this.filterLoadedAppointments(filterOptions, this.workspace._getGroupCount());
  }

  filterLoadedAppointments(filterOptions, groupCount) {
    var combinedFilters = [];
    var itemsToFilter = this.getPreparedDataItems();
    var needPreFilter = groupCount > 0;

    if (needPreFilter) {
      itemsToFilter = itemsToFilter.filter(item => {
        for (var i = 0; i < filterOptions.length; ++i) {
          var {
            resources
          } = filterOptions[i];

          if (this._filterAppointmentByResources(item, resources)) {
            return true;
          }
        }
      });
    }

    filterOptions.forEach(filterOption => {
      combinedFilters.length && combinedFilters.push('or');

      var filter = this._createAppointmentFilter(filterOption);

      combinedFilters.push(filter);
    });
    return query(itemsToFilter).filter(combinedFilters).toArray();
  }

  hasAllDayAppointments() {
    return this.filterAllDayAppointments({
      viewStartDayHour: this.viewStartDayHour,
      viewEndDayHour: this.viewEndDayHour
    }).length > 0;
  }

  _getPrerenderFilterResources(groupIndex) {
    var cellGroup = this.viewDataProvider.getCellsGroup(groupIndex);
    return this.resourceManager.getResourcesDataByGroups([cellGroup]);
  }

}