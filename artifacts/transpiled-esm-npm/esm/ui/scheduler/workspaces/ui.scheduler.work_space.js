import _extends from "@babel/runtime/helpers/esm/extends";
import $ from '../../../core/renderer';
import domAdapter from '../../../core/dom_adapter';
import eventsEngine from '../../../events/core/events_engine';
import dateUtils from '../../../core/utils/date';
import { getWindow, hasWindow } from '../../../core/utils/window';
import { getPublicElement } from '../../../core/element';
import { extend } from '../../../core/utils/extend';
import { getBoundingRect, getElementsFromPoint } from '../../../core/utils/position';
import messageLocalization from '../../../localization/message';
import dateLocalization from '../../../localization/date';
import { noop } from '../../../core/utils/common';
import { isDefined } from '../../../core/utils/type';
import { addNamespace, isMouseEvent } from '../../../events/utils/index';
import pointerEvents from '../../../events/pointer';
import errors from '../../widget/ui.errors';
import { name as clickEventName } from '../../../events/click';
import { name as contextMenuEventName } from '../../../events/contextmenu';
import { enter as dragEventEnter, leave as dragEventLeave, drop as dragEventDrop } from '../../../events/drag';
import Scrollable from '../../scroll_view/ui.scrollable';
import HorizontalGroupedStrategy from './ui.scheduler.work_space.grouped.strategy.horizontal';
import VerticalGroupedStrategy from './ui.scheduler.work_space.grouped.strategy.vertical';
import tableCreatorModule from '../table_creator';
var {
  tableCreator
} = tableCreatorModule;
import VerticalShader from '../shaders/ui.scheduler.current_time_shader.vertical';
import AppointmentDragBehavior from '../appointmentDragBehavior';
import { APPOINTMENT_SETTINGS_KEY } from '../constants';
import { FIXED_CONTAINER_CLASS, VIRTUAL_CELL_CLASS, TIME_PANEL_CLASS, DATE_TABLE_CLASS, DATE_TABLE_ROW_CLASS, GROUP_ROW_CLASS, GROUP_HEADER_CONTENT_CLASS } from '../classes';
import timeZoneUtils from '../utils.timeZone';
import WidgetObserver from '../base/widgetObserver';
import { resetPosition, locate } from '../../../animation/translator';
import VirtualScrollingDispatcher from './ui.scheduler.virtual_scrolling';
import ViewDataProvider from './view_model/view_data_provider';
import dxrDateTableLayout from '../../../renovation/ui/scheduler/workspaces/base/date_table/layout.j';
import dxrAllDayPanelLayout from '../../../renovation/ui/scheduler/workspaces/base/date_table/all_day_panel/layout.j';
import dxrAllDayPanelTitle from '../../../renovation/ui/scheduler/workspaces/base/date_table/all_day_panel/title.j';
import dxrTimePanelTableLayout from '../../../renovation/ui/scheduler/workspaces/base/time_panel/layout.j';
import dxrGroupPanel from '../../../renovation/ui/scheduler/workspaces/base/group_panel/group_panel.j';
import dxrDateHeader from '../../../renovation/ui/scheduler/workspaces/base/header_panel/layout.j';
import CellsSelectionState from './cells_selection_state';
import { cache } from './cache';
import { CellsSelectionController } from './cells_selection_controller';
import { getTimeZoneCalculator } from '../instanceFactory';
import { getFirstDayOfWeek, calculateViewStartDate, getViewStartByOptions } from './utils/base';
import { calculateStartViewDate } from './utils/week';
var abstract = WidgetObserver.abstract;
var toMs = dateUtils.dateToMilliseconds;
var COMPONENT_CLASS = 'dx-scheduler-work-space';
var GROUPED_WORKSPACE_CLASS = 'dx-scheduler-work-space-grouped';
var VERTICAL_GROUPED_WORKSPACE_CLASS = 'dx-scheduler-work-space-vertical-grouped';
var WORKSPACE_VERTICAL_GROUP_TABLE_CLASS = 'dx-scheduler-work-space-vertical-group-table';
var WORKSPACE_WITH_BOTH_SCROLLS_CLASS = 'dx-scheduler-work-space-both-scrollbar';
var WORKSPACE_WITH_COUNT_CLASS = 'dx-scheduler-work-space-count';
var WORKSPACE_WITH_GROUP_BY_DATE_CLASS = 'dx-scheduler-work-space-group-by-date';
var WORKSPACE_WITH_ODD_CELLS_CLASS = 'dx-scheduler-work-space-odd-cells';
var TIME_PANEL_CELL_CLASS = 'dx-scheduler-time-panel-cell';
var TIME_PANEL_ROW_CLASS = 'dx-scheduler-time-panel-row';
var ALL_DAY_PANEL_CLASS = 'dx-scheduler-all-day-panel';
var ALL_DAY_TABLE_CLASS = 'dx-scheduler-all-day-table';
var ALL_DAY_CONTAINER_CLASS = 'dx-scheduler-all-day-appointments';
var ALL_DAY_TITLE_CLASS = 'dx-scheduler-all-day-title';
var ALL_DAY_TITLE_HIDDEN_CLASS = 'dx-scheduler-all-day-title-hidden';
var ALL_DAY_TABLE_CELL_CLASS = 'dx-scheduler-all-day-table-cell';
var ALL_DAY_TABLE_ROW_CLASS = 'dx-scheduler-all-day-table-row';
var WORKSPACE_WITH_ALL_DAY_CLASS = 'dx-scheduler-work-space-all-day';
var WORKSPACE_WITH_COLLAPSED_ALL_DAY_CLASS = 'dx-scheduler-work-space-all-day-collapsed';
var WORKSPACE_WITH_MOUSE_SELECTION_CLASS = 'dx-scheduler-work-space-mouse-selection';
var HORIZONTAL_SIZES_CLASS = 'dx-scheduler-cell-sizes-horizontal';
var VERTICAL_SIZES_CLASS = 'dx-scheduler-cell-sizes-vertical';
var HEADER_PANEL_CLASS = 'dx-scheduler-header-panel';
var HEADER_PANEL_CELL_CLASS = 'dx-scheduler-header-panel-cell';
var HEADER_ROW_CLASS = 'dx-scheduler-header-row';
var GROUP_HEADER_CLASS = 'dx-scheduler-group-header';
var DATE_TABLE_CELL_CLASS = 'dx-scheduler-date-table-cell';
var DATE_TABLE_FOCUSED_CELL_CLASS = 'dx-scheduler-focused-cell';
var VIRTUAL_ROW_CLASS = 'dx-scheduler-virtual-row';
var DATE_TABLE_DROPPABLE_CELL_CLASS = 'dx-scheduler-date-table-droppable-cell';
var SCHEDULER_HEADER_SCROLLABLE_CLASS = 'dx-scheduler-header-scrollable';
var SCHEDULER_SIDEBAR_SCROLLABLE_CLASS = 'dx-scheduler-sidebar-scrollable';
var SCHEDULER_DATE_TABLE_SCROLLABLE_CLASS = 'dx-scheduler-date-table-scrollable';
var SCHEDULER_WORKSPACE_DXPOINTERDOWN_EVENT_NAME = addNamespace(pointerEvents.down, 'dxSchedulerWorkSpace');
var DragEventNames = {
  ENTER: addNamespace(dragEventEnter, 'dxSchedulerDateTable'),
  DROP: addNamespace(dragEventDrop, 'dxSchedulerDateTable'),
  LEAVE: addNamespace(dragEventLeave, 'dxSchedulerDateTable')
};
var SCHEDULER_CELL_DXCLICK_EVENT_NAME = addNamespace(clickEventName, 'dxSchedulerDateTable');
var SCHEDULER_CELL_DXPOINTERDOWN_EVENT_NAME = addNamespace(pointerEvents.down, 'dxSchedulerDateTable');
var SCHEDULER_CELL_DXPOINTERUP_EVENT_NAME = addNamespace(pointerEvents.up, 'dxSchedulerDateTable');
var SCHEDULER_CELL_DXPOINTERMOVE_EVENT_NAME = addNamespace(pointerEvents.move, 'dxSchedulerDateTable');
var CELL_DATA = 'dxCellData';
var DATE_TABLE_MIN_CELL_WIDTH = 75;
var DAY_MS = toMs('day');
var HOUR_MS = toMs('hour');
var DRAG_AND_DROP_SELECTOR = ".".concat(DATE_TABLE_CLASS, " td, .").concat(ALL_DAY_TABLE_CLASS, " td");
var CELL_SELECTOR = ".".concat(DATE_TABLE_CELL_CLASS, ", .").concat(ALL_DAY_TABLE_CELL_CLASS);

class ScrollSemaphore {
  constructor() {
    this.counter = 0;
  }

  isFree() {
    return this.counter === 0;
  }

  take() {
    this.counter++;
  }

  release() {
    this.counter--;

    if (this.counter < 0) {
      this.counter = 0;
    }
  }

}

var formatWeekday = function formatWeekday(date) {
  return dateLocalization.getDayNames('abbreviated')[date.getDay()];
};

class SchedulerWorkSpace extends WidgetObserver {
  get viewDataProvider() {
    if (!this._viewDataProvider) {
      this._viewDataProvider = new ViewDataProvider();
    }

    return this._viewDataProvider;
  }

  get cache() {
    return cache;
  }

  get cellsSelectionState() {
    if (!this._cellsSelectionState) {
      this._cellsSelectionState = new CellsSelectionState(this.viewDataProvider);
      var selectedCellsOption = this.option('selectedCellData');

      if ((selectedCellsOption === null || selectedCellsOption === void 0 ? void 0 : selectedCellsOption.length) > 0) {
        var validSelectedCells = selectedCellsOption.map(selectedCell => {
          var groups = selectedCell.groups;

          if (!groups || this._getGroupCount() === 0) {
            return _extends({}, selectedCell, {
              groupIndex: 0
            });
          }

          var groupIndex = this._getGroupIndexByResourceId(groups);

          return _extends({}, selectedCell, {
            groupIndex
          });
        });

        this._cellsSelectionState.setSelectedCellsByData(validSelectedCells);
      }
    }

    return this._cellsSelectionState;
  }

  get cellsSelectionController() {
    if (!this._cellsSelectionController) {
      this._cellsSelectionController = new CellsSelectionController();
    }

    return this._cellsSelectionController;
  }

  get isAllDayPanelVisible() {
    return this._isShowAllDayPanel() && this.supportAllDayRow();
  }

  get isDateAndTimeView() {
    return true;
  }

  get verticalGroupTableClass() {
    return WORKSPACE_VERTICAL_GROUP_TABLE_CLASS;
  }

  get viewDirection() {
    return 'vertical';
  }

  get renovatedHeaderPanelComponent() {
    return dxrDateHeader;
  }

  _supportedKeys() {
    var clickHandler = function clickHandler(e) {
      e.preventDefault();
      e.stopPropagation();
      var selectedCells = this.cellsSelectionState.getSelectedCells();

      if (selectedCells !== null && selectedCells !== void 0 && selectedCells.length) {
        var selectedCellsElement = selectedCells.map(cellData => {
          return this._getCellByData(cellData);
        }).filter(cell => !!cell);
        e.target = selectedCellsElement;
        this._showPopup = true;

        this._cellClickAction({
          event: e,
          cellElement: $(selectedCellsElement),
          cellData: selectedCells[0]
        });
      }
    };

    var onArrowPressed = (e, key) => {
      var _this$cellsSelectionS;

      e.preventDefault();
      e.stopPropagation();
      var focusedCellData = (_this$cellsSelectionS = this.cellsSelectionState.focusedCell) === null || _this$cellsSelectionS === void 0 ? void 0 : _this$cellsSelectionS.cellData;

      if (focusedCellData) {
        var isAllDayPanelCell = focusedCellData.allDay && !this._isVerticalGroupedWorkSpace();
        var isMultiSelection = e.shiftKey;
        var isMultiSelectionAllowed = this.option('allowMultipleCellSelection');

        var isRTL = this._isRTL();

        var groupCount = this._getGroupCount();

        var isGroupedByDate = this.isGroupedByDate();

        var isHorizontalGrouping = this._isHorizontalGroupedWorkSpace();

        var focusedCellPosition = this.viewDataProvider.findCellPositionInMap(_extends({}, focusedCellData, {
          isAllDay: focusedCellData.allDay
        }));
        var edgeIndices = isHorizontalGrouping && isMultiSelection && !isGroupedByDate ? this.viewDataProvider.getGroupEdgeIndices(focusedCellData.groupIndex, isAllDayPanelCell) : this.viewDataProvider.getViewEdgeIndices(isAllDayPanelCell);
        var nextCellData = this.cellsSelectionController.handleArrowClick({
          focusedCellPosition,
          edgeIndices,
          isRTL,
          isGroupedByDate,
          groupCount,
          isMultiSelection,
          isMultiSelectionAllowed,
          isDateAndTimeView: this.isDateAndTimeView,
          key,
          getCellDataByPosition: this.viewDataProvider.getCellData.bind(this.viewDataProvider),
          isAllDayPanelCell,
          focusedCellData
        });

        this._processNextSelectedCell(nextCellData, focusedCellData, isMultiSelection && isMultiSelectionAllowed);
      }
    };

    return extend(super._supportedKeys(), {
      enter: clickHandler,
      space: clickHandler,
      downArrow: e => {
        onArrowPressed(e, 'down');
      },
      upArrow: e => {
        onArrowPressed(e, 'up');
      },
      rightArrow: e => {
        onArrowPressed(e, 'right');
      },
      leftArrow: e => {
        onArrowPressed(e, 'left');
      }
    });
  }

  _dispose() {
    super._dispose();

    this.virtualScrollingDispatcher.dispose();
  }

  _isRTL() {
    return this.option('rtlEnabled');
  }

  _moveToCell($cell, isMultiSelection) {
    if (!isDefined($cell) || !$cell.length) {
      return undefined;
    }

    var isMultiSelectionAllowed = this.option('allowMultipleCellSelection');

    var currentCellData = this._getFullCellData($cell);

    var focusedCellData = this.cellsSelectionState.focusedCell.cellData;
    var nextFocusedCellData = this.cellsSelectionController.moveToCell({
      isMultiSelection,
      isMultiSelectionAllowed,
      currentCellData,
      focusedCellData,
      isVirtualCell: $cell.hasClass(VIRTUAL_CELL_CLASS)
    });

    this._processNextSelectedCell(nextFocusedCellData, focusedCellData, isMultiSelectionAllowed && isMultiSelection);
  }

  _processNextSelectedCell(nextCellData, focusedCellData, isMultiSelection) {
    var nextCellPosition = this.viewDataProvider.findCellPositionInMap({
      startDate: nextCellData.startDate,
      groupIndex: nextCellData.groupIndex,
      isAllDay: nextCellData.allDay,
      index: nextCellData.index
    });

    if (!this.viewDataProvider.isSameCell(focusedCellData, nextCellData)) {
      var $cell = nextCellData.allDay && !this._isVerticalGroupedWorkSpace() ? this._dom_getAllDayPanelCell(nextCellPosition.columnIndex) : this._dom_getDateCell(nextCellPosition);
      var isNextCellAllDay = nextCellData.allDay;

      this._setSelectedCellsStateAndUpdateSelection(isNextCellAllDay, nextCellPosition, isMultiSelection, $cell);

      this._dateTableScrollable.scrollToElement($cell);
    }
  }

  _setSelectedCellsStateAndUpdateSelection(isAllDay, cellPosition, isMultiSelection, $nextFocusedCell) {
    var nextCellCoordinates = {
      rowIndex: cellPosition.rowIndex,
      columnIndex: cellPosition.columnIndex,
      allDay: isAllDay
    };
    this.cellsSelectionState.setFocusedCell(nextCellCoordinates.rowIndex, nextCellCoordinates.columnIndex, isAllDay);

    if (isMultiSelection) {
      this.cellsSelectionState.setSelectedCells(nextCellCoordinates);
    } else {
      this.cellsSelectionState.setSelectedCells(nextCellCoordinates, nextCellCoordinates);
    }

    this.updateCellsSelection();

    this._updateSelectedCellDataOption(this.cellsSelectionState.getSelectedCells(), $nextFocusedCell);
  }

  _hasAllDayClass($cell) {
    return $cell.hasClass(ALL_DAY_TABLE_CELL_CLASS);
  }

  _focusInHandler(e) {
    if ($(e.target).is(this._focusTarget()) && this._isCellClick !== false) {
      delete this._isCellClick;
      delete this._contextMenuHandled;

      super._focusInHandler.apply(this, arguments);

      this.cellsSelectionState.restoreSelectedAndFocusedCells();

      if (!this.cellsSelectionState.focusedCell) {
        var cellCoordinates = {
          columnIndex: 0,
          rowIndex: 0,
          allDay: this._isVerticalGroupedWorkSpace() && this.isAllDayPanelVisible
        };
        this.cellsSelectionState.setFocusedCell(cellCoordinates.rowIndex, cellCoordinates.columnIndex, cellCoordinates.allDay);
        this.cellsSelectionState.setSelectedCells(cellCoordinates, cellCoordinates);
      }

      this.updateCellsSelection();

      this._updateSelectedCellDataOption(this.cellsSelectionState.getSelectedCells());
    }
  }

  _focusOutHandler() {
    super._focusOutHandler.apply(this, arguments);

    if (!this._contextMenuHandled) {
      this.cellsSelectionState.releaseSelectedAndFocusedCells();
      this.viewDataProvider.updateViewData(this.generateRenderOptions());
      this.updateCellsSelection();
    }
  }

  _focusTarget() {
    return this.$element();
  }

  _getDefaultOptions() {
    return extend(super._getDefaultOptions(), {
      currentDate: new Date(),
      intervalCount: 1,
      startDate: null,
      firstDayOfWeek: undefined,
      startDayHour: 0,
      endDayHour: 24,
      hoursInterval: 0.5,
      activeStateEnabled: true,
      hoverStateEnabled: true,
      groups: [],
      showAllDayPanel: true,
      allDayExpanded: false,
      onCellClick: null,
      crossScrollingEnabled: false,
      dataCellTemplate: null,
      timeCellTemplate: null,
      resourceCellTemplate: null,
      dateCellTemplate: null,
      allowMultipleCellSelection: true,
      indicatorTime: new Date(),
      indicatorUpdateInterval: 5 * toMs('minute'),
      shadeUntilCurrentTime: true,
      groupOrientation: 'horizontal',
      selectedCellData: [],
      groupByDate: false,
      scrolling: {
        mode: 'standard'
      },
      renovateRender: true,
      height: undefined,
      draggingMode: 'outlook'
    });
  }

  _optionChanged(args) {
    switch (args.name) {
      case 'startDayHour':
      case 'endDayHour':
        this.invoke('validateDayHours');

        this._cleanWorkSpace();

        break;

      case 'dateCellTemplate':
      case 'resourceCellTemplate':
      case 'dataCellTemplate':
      case 'timeCellTemplate':
      case 'hoursInterval':
      case 'firstDayOfWeek':
      case 'currentDate':
      case 'startDate':
        this._cleanWorkSpace();

        break;

      case 'groups':
        this._cleanView();

        this._removeAllDayElements();

        this._initGrouping();

        this.repaint();
        break;

      case 'groupOrientation':
        this._initGroupedStrategy();

        this._createAllDayPanelElements();

        this._removeAllDayElements();

        this._cleanWorkSpace();

        this._toggleGroupByDateClass();

        break;

      case 'showAllDayPanel':
        if (this._isVerticalGroupedWorkSpace()) {
          this._cleanView();

          this._removeAllDayElements();

          this._initGrouping();

          this.repaint();
        } else {
          if (!this.isRenovatedRender()) {
            this._toggleAllDayVisibility(true);
          } else {
            this.renderWorkSpace();
          }
        }

        break;

      case 'allDayExpanded':
        this._changeAllDayVisibility();

        this._attachTablesEvents();

        this.headerPanelOffsetRecalculate();

        this._updateScrollable();

        break;

      case 'onSelectionChanged':
        this._createSelectionChangedAction();

        break;

      case 'onCellClick':
        this._createCellClickAction();

        break;

      case 'onCellContextMenu':
        this._attachContextMenuEvent();

        break;

      case 'intervalCount':
        this._cleanWorkSpace();

        this._toggleWorkSpaceCountClass();

        this._toggleFixedScrollableClass();

        break;

      case 'groupByDate':
        this._cleanWorkSpace();

        this._toggleGroupByDateClass();

        break;

      case 'crossScrollingEnabled':
        this._toggleHorizontalScrollClass();

        this._dateTableScrollable.option(this._dateTableScrollableConfig());

        break;

      case 'width':
        super._optionChanged(args);

        this._dimensionChanged();

        break;

      case 'allowMultipleCellSelection':
        break;

      case 'selectedCellData':
        break;

      case 'scrolling':
        if (this._isVirtualModeOn()) {
          if (!this.option('renovateRender')) {
            this.option('renovateRender', true);
          } else {
            this.repaint();
          }
        } else {
          this.option('renovateRender', false);
        }

        break;

      case 'renovateRender':
        this.repaint();
        break;

      default:
        super._optionChanged(args);

    }
  }

  _cleanWorkSpace() {
    this._cleanView();

    this._toggleGroupedClass();

    this._toggleWorkSpaceWithOddCells();

    this.virtualScrollingDispatcher.updateDimensions(true);

    this._renderView();

    this.option('crossScrollingEnabled') && this._setTableSizes();
    this.cache.clear();
  }

  _init() {
    this._headerSemaphore = new ScrollSemaphore();
    this._sideBarSemaphore = new ScrollSemaphore();
    this._dataTableSemaphore = new ScrollSemaphore();
    this._viewDataProvider = null;
    this._cellsSelectionState = null;
    this._activeStateUnit = CELL_SELECTOR;
    this._maxAllowedVerticalPosition = [];
    this._maxAllowedPosition = [];

    super._init();

    this._initGrouping();

    this._toggleHorizontalScrollClass();

    this._toggleWorkSpaceCountClass();

    this._toggleGroupByDateClass();

    this._toggleWorkSpaceWithOddCells();

    this.$element().addClass(COMPONENT_CLASS).addClass(this._getElementClass());
  }

  _initGrouping() {
    this._initGroupedStrategy();

    this._toggleGroupingDirectionClass();

    this._toggleGroupByDateClass();
  }

  _initGroupedStrategy() {
    var strategyName = this.option('groups').length ? this.option('groupOrientation') : this._getDefaultGroupStrategy();
    var Strategy = strategyName === 'vertical' ? VerticalGroupedStrategy : HorizontalGroupedStrategy;
    this._groupedStrategy = new Strategy(this);
  }

  _getDefaultGroupStrategy() {
    return 'horizontal';
  }

  _isVerticalGroupedWorkSpace() {
    return !!this.option('groups').length && this.option('groupOrientation') === 'vertical';
  }

  _isHorizontalGroupedWorkSpace() {
    return !!this.option('groups').length && this.option('groupOrientation') === 'horizontal';
  }

  _toggleHorizontalScrollClass() {
    this.$element().toggleClass(WORKSPACE_WITH_BOTH_SCROLLS_CLASS, this.option('crossScrollingEnabled'));
  }

  _toggleGroupByDateClass() {
    this.$element().toggleClass(WORKSPACE_WITH_GROUP_BY_DATE_CLASS, this.isGroupedByDate());
  }

  _toggleWorkSpaceCountClass() {
    this.$element().toggleClass(WORKSPACE_WITH_COUNT_CLASS, this._isWorkSpaceWithCount());
  }

  _isWorkSpaceWithCount() {
    return this.option('intervalCount') > 1;
  }

  _toggleWorkSpaceWithOddCells() {
    this.$element().toggleClass(WORKSPACE_WITH_ODD_CELLS_CLASS, this._isWorkspaceWithOddCells());
  }

  _isWorkspaceWithOddCells() {
    return this.option('hoursInterval') === 0.5 && !this.isVirtualScrolling();
  }

  _toggleGroupingDirectionClass() {
    this.$element().toggleClass(VERTICAL_GROUPED_WORKSPACE_CLASS, this._isVerticalGroupedWorkSpace());
  }

  _getRealGroupOrientation() {
    return this._isVerticalGroupedWorkSpace() ? 'vertical' : 'horizontal';
  }

  _getDateTableCellClass(rowIndex, columnIndex) {
    var cellClass = DATE_TABLE_CELL_CLASS + ' ' + HORIZONTAL_SIZES_CLASS + ' ' + VERTICAL_SIZES_CLASS;
    return this._groupedStrategy.addAdditionalGroupCellClasses(cellClass, columnIndex + 1, rowIndex, columnIndex);
  }

  _getGroupHeaderClass(i) {
    var cellClass = GROUP_HEADER_CLASS;
    return this._groupedStrategy.addAdditionalGroupCellClasses(cellClass, i + 1);
  }

  _initWorkSpaceUnits() {
    this._$headerPanel = $('<table>');
    this._$thead = $('<thead>').appendTo(this._$headerPanel);
    this._$fixedContainer = $('<div>').addClass(FIXED_CONTAINER_CLASS);
    this._$allDayContainer = $('<div>').addClass(ALL_DAY_CONTAINER_CLASS);

    this._initAllDayPanelElements();

    if (this.isRenovatedRender()) {
      this.createRAllDayPanelElements();
    } else {
      this._createAllDayPanelElements();
    }

    this._$timePanel = $('<table>').addClass(TIME_PANEL_CLASS);
    this._$dateTable = $('<table>');
    this._$groupTable = $('<div>').addClass(WORKSPACE_VERTICAL_GROUP_TABLE_CLASS);
  }

  _initAllDayPanelElements() {
    this._allDayTitles = [];
    this._allDayTables = [];
    this._allDayPanels = [];
  }

  createRAllDayPanelElements() {
    this._$allDayPanel = $('<div>');
    this._$allDayTitle = $('<div>').appendTo(this.$element());
  }

  _createAllDayPanelElements() {
    var groupCount = this._getGroupCount();

    if (this._isVerticalGroupedWorkSpace() && groupCount !== 0) {
      for (var i = 0; i < groupCount; i++) {
        var $allDayTitle = $('<div>').addClass(ALL_DAY_TITLE_CLASS).text(messageLocalization.format('dxScheduler-allDay'));

        this._allDayTitles.push($allDayTitle);

        this._$allDayTable = $('<table>');

        this._allDayTables.push(this._$allDayTable);

        this._$allDayPanel = $('<div>').addClass(ALL_DAY_PANEL_CLASS).append(this._$allDayTable);

        this._allDayPanels.push(this._$allDayPanel);
      }
    } else {
      this._$allDayTitle = $('<div>').addClass(ALL_DAY_TITLE_CLASS).text(messageLocalization.format('dxScheduler-allDay')).appendTo(this.$element());
      this._$allDayTable = $('<table>');
      this._$allDayPanel = $('<div>').addClass(ALL_DAY_PANEL_CLASS).append(this._$allDayTable);
    }
  }

  _initDateTableScrollable() {
    var $dateTableScrollable = $('<div>').addClass(SCHEDULER_DATE_TABLE_SCROLLABLE_CLASS);
    this._dateTableScrollable = this._createComponent($dateTableScrollable, Scrollable, this._dateTableScrollableConfig());
  }

  _dateTableScrollableConfig() {
    var config = {
      useKeyboard: false,
      bounceEnabled: false,
      updateManually: true
    };

    if (this._needCreateCrossScrolling()) {
      config = extend(config, this._createCrossScrollingConfig());
    }

    return config;
  }

  _createCrossScrollingConfig() {
    var config = {};
    config.direction = 'both';

    config.onScroll = e => {
      this._dataTableSemaphore.take();

      this._sideBarSemaphore.isFree() && this._sidebarScrollable && this._sidebarScrollable.scrollTo({
        top: e.scrollOffset.top
      });
      this._headerSemaphore.isFree() && this._headerScrollable && this._headerScrollable.scrollTo({
        left: e.scrollOffset.left
      });

      this._dataTableSemaphore.release();
    };

    config.onEnd = () => {
      this.notifyObserver('updateResizableArea', {});
    };

    return config;
  }

  _createWorkSpaceElements() {
    if (this.option('crossScrollingEnabled')) {
      this._createWorkSpaceScrollableElements();
    } else {
      this._createWorkSpaceStaticElements();
    }
  }

  _createWorkSpaceStaticElements() {
    if (this._isVerticalGroupedWorkSpace()) {
      this._dateTableScrollable.$content().append(this._$allDayContainer, this._$groupTable, this._$timePanel, this._$dateTable);

      this.$element().append(this._$fixedContainer, this._$headerPanel, this._dateTableScrollable.$element());
    } else {
      this._dateTableScrollable.$content().append(this._$timePanel, this._$dateTable);

      this.$element().append(this._$fixedContainer, this._$headerPanel, this._$allDayContainer, this._$allDayPanel, this._dateTableScrollable.$element());
    }
  }

  _createWorkSpaceScrollableElements() {
    this.$element().append(this._$fixedContainer);

    this._createHeaderScrollable();

    this._createSidebarScrollable();

    this.$element().append(this._dateTableScrollable.$element());

    this._headerScrollable.$content().append(this._$headerPanel);

    this._dateTableScrollable.$content().append(this._$dateTable);

    if (this._isVerticalGroupedWorkSpace()) {
      this._dateTableScrollable.$content().prepend(this._$allDayContainer);

      this._sidebarScrollable.$content().append(this._$groupTable, this._$timePanel);
    } else {
      this._headerScrollable.$content().append(this._$allDayContainer, this._$allDayPanel);
    }

    this._sidebarScrollable.$content().append(this._$timePanel);
  }

  _createHeaderScrollable() {
    var $headerScrollable = $('<div>').addClass(SCHEDULER_HEADER_SCROLLABLE_CLASS).appendTo(this.$element());
    this._headerScrollable = this._createComponent($headerScrollable, Scrollable, this._headerScrollableConfig());
  }

  _headerScrollableConfig() {
    var config = {
      useKeyboard: false,
      showScrollbar: false,
      direction: 'horizontal',
      useNative: false,
      updateManually: true,
      bounceEnabled: false,
      onScroll: e => {
        this._headerSemaphore.take();

        this._dataTableSemaphore.isFree() && this._dateTableScrollable.scrollTo({
          left: e.scrollOffset.left
        });

        this._headerSemaphore.release();
      }
    };
    return config;
  }

  _createSidebarScrollable() {
    var $timePanelScrollable = $('<div>').addClass(SCHEDULER_SIDEBAR_SCROLLABLE_CLASS).appendTo(this.$element());
    this._sidebarScrollable = this._createComponent($timePanelScrollable, Scrollable, {
      useKeyboard: false,
      showScrollbar: false,
      direction: 'vertical',
      useNative: false,
      updateManually: true,
      bounceEnabled: false,
      onScroll: e => {
        this._sideBarSemaphore.take();

        this._dataTableSemaphore.isFree() && this._dateTableScrollable.scrollTo({
          top: e.scrollOffset.top
        });

        this._sideBarSemaphore.release();
      }
    });
  }

  _visibilityChanged(visible) {
    this.cache.clear();

    if (visible) {
      this._updateGroupTableHeight();
    }

    if (visible && this._needCreateCrossScrolling()) {
      this._setTableSizes();
    }
  }

  _attachTableClasses() {
    this._addTableClass(this._$dateTable, DATE_TABLE_CLASS);

    if (this._isVerticalGroupedWorkSpace()) {
      var groupCount = this._getGroupCount();

      for (var i = 0; i < groupCount; i++) {
        this._addTableClass(this._allDayTables[i], ALL_DAY_TABLE_CLASS);
      }
    } else {
      this._addTableClass(this._$allDayTable, ALL_DAY_TABLE_CLASS);
    }
  }

  _attachHeaderTableClasses() {
    this._addTableClass(this._$headerPanel, HEADER_PANEL_CLASS);
  }

  _addTableClass($el, className) {
    $el && !$el.hasClass(className) && $el.addClass(className);
  }

  _setTableSizes() {
    this.cache.clear();

    this._attachTableClasses();

    var cellWidth = this.getCellWidth();

    if (cellWidth < this.getCellMinWidth()) {
      cellWidth = this.getCellMinWidth();
    }

    var minWidth = this.getWorkSpaceMinWidth();

    var groupCount = this._getGroupCount();

    var totalCellCount = this._getTotalCellCount(groupCount);

    var width = cellWidth * totalCellCount;

    if (width < minWidth) {
      width = minWidth;
    }

    this._$headerPanel.width(width);

    this._$dateTable.width(width);

    this._$allDayTable && this._$allDayTable.width(width);

    this._attachHeaderTableClasses();

    this._updateGroupTableHeight();
  }

  getWorkSpaceMinWidth() {
    return this._groupedStrategy.getWorkSpaceMinWidth();
  }

  _dimensionChanged() {
    if (this.option('crossScrollingEnabled')) {
      this._setTableSizes();
    }

    this.headerPanelOffsetRecalculate();
    this.cache.clear();

    this._cleanAllowedPositions();
  }

  _needCreateCrossScrolling() {
    return this.option('crossScrollingEnabled');
  }

  _getElementClass() {
    return noop();
  }

  _getRowCount() {
    return noop();
  }

  _getRowCountWithAllDayRows() {
    var allDayRowCount = this._isShowAllDayPanel() ? 1 : 0;
    return this._getRowCount() + allDayRowCount;
  }

  _getCellCount() {
    return noop();
  }

  _initMarkup() {
    this.cache.clear();

    this._initWorkSpaceUnits();

    this._initDateTableScrollable();

    this._createWorkSpaceElements();

    this._initVirtualScrolling();

    super._initMarkup();

    if (!this.option('crossScrollingEnabled')) {
      this._attachTableClasses();

      this._attachHeaderTableClasses();
    }

    this._toggleGroupedClass();

    this._toggleFixedScrollableClass();

    this._renderView();

    this._attachEvents();
  }

  isRenovatedRender() {
    return this.renovatedRenderSupported() && this.option('renovateRender');
  }

  _isVirtualModeOn() {
    return this.option('scrolling.mode') === 'virtual';
  }

  isVirtualScrolling() {
    return this.isRenovatedRender() && this._isVirtualModeOn();
  }

  _initVirtualScrolling() {
    if (this.virtualScrollingDispatcher) {
      this.virtualScrollingDispatcher.dispose();
      this.virtualScrollingDispatcher = null;
    }

    this.virtualScrollingDispatcher = new VirtualScrollingDispatcher(this);
  }

  _render() {
    super._render();

    this._renderDateTimeIndication();

    this._setIndicationUpdateInterval();
  }

  _toggleGroupedClass() {
    this.$element().toggleClass(GROUPED_WORKSPACE_CLASS, this._getGroupCount() > 0);
  }

  _toggleFixedScrollableClass() {
    return noop();
  }

  _setVisibilityDates() {}

  _renderView() {
    this._startViewDate = this._calculateStartViewDate();

    this._setVisibilityDates();

    if (this.isRenovatedRender()) {
      if (this._isVerticalGroupedWorkSpace()) {
        this.renderRGroupPanel();
      }
    } else {
      this._applyCellTemplates(this._renderGroupHeader());
    }

    this.renderWorkSpace();

    this._updateGroupTableHeight();

    this._shader = new VerticalShader(this);
  }

  onDataSourceChanged() {}

  preRenderAppointments(options) {
    this.option('allDayExpanded', options.allDayExpanded);
  }

  isGroupedAllDayPanel() {
    return this._isShowAllDayPanel() && this._isVerticalGroupedWorkSpace();
  }

  generateRenderOptions(isProvideVirtualCellsWidth) {
    var _this$_getToday;

    var isVerticalGrouping = this._isVerticalGroupedWorkSpace();

    var groupCount = this._getGroupCount();

    var horizontalGroupCount = isVerticalGrouping ? 1 : groupCount;

    var rowCountInGroup = this._getRowCount();

    var cellCount = this._getTotalCellCount(groupCount);

    var rowCount = this._getTotalRowCount(groupCount, isVerticalGrouping);

    var groupOrientation = groupCount > 0 ? this.option('groupOrientation') : this._getDefaultGroupStrategy();

    var options = _extends({
      horizontalGroupCount,
      rowCountInGroup,
      cellCount,
      cellCountInGroupRow: this._getCellCount(),
      cellDataGetters: [this._getCellData.bind(this)],
      startRowIndex: 0,
      startCellIndex: 0,
      groupOrientation,
      rowCount,
      totalRowCount: rowCount,
      totalCellCount: cellCount,
      groupCount,
      getDateHeaderText: this._getHeaderText.bind(this),
      getDateHeaderDate: this._getDateByIndex.bind(this),
      getTimeCellDate: this._getTimeCellDate.bind(this),
      today: (_this$_getToday = this._getToday) === null || _this$_getToday === void 0 ? void 0 : _this$_getToday.call(this),
      groupByDate: this.isGroupedByDate(),
      groupsList: this._getAllGroups(),
      isHorizontalGrouping: this._isHorizontalGroupedWorkSpace(),
      isVerticalGrouping,
      isProvideVirtualCellsWidth,
      isStandaloneAllDayPanel: !isVerticalGrouping && this.isAllDayPanelVisible,
      isGroupedAllDayPanel: this.isGroupedAllDayPanel(),
      isAllDayPanelVisible: this.isAllDayPanelVisible,
      getAllDayCellData: this._getAllDayCellData.bind(this),
      isDateAndTimeView: this.isDateAndTimeView,
      selectedCells: this.cellsSelectionState.getSelectedCells(),
      focusedCell: this.cellsSelectionState.focusedCell,
      rowCountWithAllDayRow: this._getRowCountWithAllDayRows()
    }, this.virtualScrollingDispatcher.getRenderState());

    return options;
  }

  renovatedRenderSupported() {
    return true;
  }

  renderWorkSpace() {
    var isGenerateNewViewData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    this._cleanAllowedPositions();

    this.cache.clear();
    this.viewDataProvider.update(this.generateRenderOptions(), isGenerateNewViewData);

    if (this.isRenovatedRender()) {
      this.renderRWorkSpace();
      this.virtualScrollingDispatcher.updateDimensions();
    } else {
      this._renderDateHeader();

      this._renderTimePanel();

      this._renderGroupAllDayPanel();

      this._renderDateTable();

      this._renderAllDayPanel();
    }
  }

  renderRWorkSpace() {
    this.renderRHeaderPanel();
    this.renderRTimeTable();
    this.renderRDateTable();
    this.renderRAllDayPanel();
  }

  renderRDateTable() {
    this.renderRComponent(this._$dateTable, dxrDateTableLayout, 'renovatedDateTable', this._getRDateTableProps());
  }

  renderRGroupPanel() {
    var options = {
      groups: this.option('groups'),
      groupOrientation: this.option('groupOrientation'),
      groupByDate: this.isGroupedByDate(),
      resourceCellTemplate: this.option('resourceCellTemplate'),
      className: this.verticalGroupTableClass,
      baseColSpan: this.isGroupedByDate() ? 1 : this._getCellCount(),
      columnCountPerGroup: this._getCellCount()
    };

    if (this.option('groups').length) {
      this._attachGroupCountAttr();

      this.renderRComponent(this._getGroupHeaderContainer(), dxrGroupPanel, 'renovatedGroupPanel', options);
    } else {
      this._detachGroupCountAttr();
    }
  }

  renderRAllDayPanel() {
    var visible = this._isShowAllDayPanel() && !this.isGroupedAllDayPanel();

    if (this.supportAllDayRow() && !this._isVerticalGroupedWorkSpace()) {
      var _this$virtualScrollin;

      this._toggleAllDayVisibility(false);

      var options = _extends({
        viewData: this.viewDataProvider.viewData,
        visible,
        dataCellTemplate: this.option('dataCellTemplate'),
        startCellIndex: 0
      }, ((_this$virtualScrollin = this.virtualScrollingDispatcher.horizontalVirtualScrolling) === null || _this$virtualScrollin === void 0 ? void 0 : _this$virtualScrollin.getRenderState()) || {});

      this.renderRComponent(this._$allDayPanel, dxrAllDayPanelLayout, 'renovatedAllDayPanel', options);
      this.renderRComponent(this._$allDayTitle, dxrAllDayPanelTitle, 'renovatedAllDayPanelTitle', {
        visible
      });
      this._$allDayTable = this.renovatedAllDayPanel.$element().find(".".concat(ALL_DAY_TABLE_CLASS));
    }

    this._toggleAllDayVisibility(true);
  }

  renderRTimeTable() {
    this.renderRComponent(this._$timePanel, dxrTimePanelTableLayout, 'renovatedTimePanel', {
      timePanelData: this.viewDataProvider.timePanelData,
      timeCellTemplate: this.option('timeCellTemplate'),
      groupOrientation: this.option('groupOrientation')
    });
  }

  renderRHeaderPanel() {
    var isRenderDateHeader = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    if (this.option('groups').length) {
      this._attachGroupCountAttr();
    } else {
      this._detachGroupCountAttr();
    }

    this.renderRComponent(this._$thead, this.renovatedHeaderPanelComponent, 'renovatedHeaderPanel', {
      dateHeaderData: this.viewDataProvider.dateHeaderData,
      dateCellTemplate: this.option('dateCellTemplate'),
      timeCellTemplate: this.option('timeCellTemplate'),
      groups: this.option('groups'),
      groupByDate: this.isGroupedByDate(),
      groupOrientation: this.option('groupOrientation'),
      resourceCellTemplate: this.option('resourceCellTemplate'),
      groupPanelCellBaseColSpan: this.isGroupedByDate() ? 1 : this._getCellCount(),
      columnCountPerGroup: this._getCellCount(),
      isRenderDateHeader
    });
  }

  renderRComponent(parentElement, componentClass, componentName, viewModel) {
    var component = this[componentName];

    if (!component) {
      var container = getPublicElement(parentElement);
      component = this._createComponent(container, componentClass, viewModel);
      this[componentName] = component;
    } else {
      // TODO: this is a workaround for setTablesSizes. Remove after CSS refactoring
      var $element = component.$element();
      var elementStyle = $element.get(0).style;
      var height = elementStyle.height;
      var width = elementStyle.width;
      component.option(viewModel);
      height && $element.height(height);
      width && $element.width(width);
    }
  }

  updateCellsSelection() {
    var renderOptions = this.generateRenderOptions();
    this.viewDataProvider.updateViewData(renderOptions);
    this.renderRWorkSpace();
  }

  _updateGroupTableHeight() {
    if (this._isVerticalGroupedWorkSpace() && hasWindow()) {
      this._setHorizontalGroupHeaderCellsHeight();
    }
  }

  _renderDateTimeIndication() {
    return noop();
  }

  _setIndicationUpdateInterval() {
    return noop();
  }

  _refreshDateTimeIndication() {
    return noop();
  }

  _isGroupsSpecified(resources) {
    return this.option('groups').length && resources;
  }

  _getGroupIndexByResourceId(id) {
    var groups = this.option('groups');
    var resourceManager = this.invoke('getResourceManager');
    var resourceTree = resourceManager.createResourcesTree(groups);
    if (!resourceTree.length) return 0;
    return this._getGroupIndexRecursively(resourceTree, id);
  }

  _getGroupIndexRecursively(resourceTree, id) {
    var currentKey = resourceTree[0].name;
    var currentValue = id[currentKey];
    return resourceTree.reduce((prevIndex, _ref) => {
      var {
        leafIndex,
        value,
        children
      } = _ref;
      var areValuesEqual = currentValue === value;

      if (areValuesEqual && leafIndex !== undefined) {
        return leafIndex;
      }

      if (areValuesEqual) {
        return this._getGroupIndexRecursively(children, id);
      }

      return prevIndex;
    }, 0);
  }

  _calculateStartViewDate() {
    return calculateStartViewDate(this.option('currentDate'), this.option('startDayHour'), this.option('startDate'), this._getIntervalDuration(), this.option('firstDayOfWeek'));
  }

  _getViewStartByOptions() {
    return getViewStartByOptions(this.option('startDate'), this.option('currentDate'), this._getIntervalDuration(), this.option('startDate') ? this._calculateViewStartDate() : undefined);
  }

  _getHeaderDate() {
    return this.getStartViewDate();
  }

  _calculateViewStartDate() {
    return calculateViewStartDate(this.option('startDate'));
  }

  _getIntervalDuration() {
    return toMs('day') * this.option('intervalCount');
  }

  _firstDayOfWeek() {
    return getFirstDayOfWeek(this.option('firstDayOfWeek'));
  }

  _attachEvents() {
    this._createSelectionChangedAction();

    this._attachClickEvent();

    this._attachContextMenuEvent();
  }

  _attachClickEvent() {
    var that = this;

    var pointerDownAction = this._createAction(function (e) {
      that._pointerDownHandler(e.event);
    });

    this._createCellClickAction();

    var cellSelector = '.' + DATE_TABLE_CELL_CLASS + ',.' + ALL_DAY_TABLE_CELL_CLASS;
    var $element = this.$element();
    eventsEngine.off($element, SCHEDULER_WORKSPACE_DXPOINTERDOWN_EVENT_NAME);
    eventsEngine.off($element, SCHEDULER_CELL_DXCLICK_EVENT_NAME);
    eventsEngine.on($element, SCHEDULER_WORKSPACE_DXPOINTERDOWN_EVENT_NAME, function (e) {
      if (isMouseEvent(e) && e.which > 1) {
        e.preventDefault();
        return;
      }

      pointerDownAction({
        event: e
      });
    });
    eventsEngine.on($element, SCHEDULER_CELL_DXCLICK_EVENT_NAME, cellSelector, function (e) {
      var $cell = $(e.target);

      that._cellClickAction({
        event: e,
        cellElement: getPublicElement($cell),
        cellData: that.getCellData($cell)
      });
    });
  }

  _createCellClickAction() {
    this._cellClickAction = this._createActionByOption('onCellClick', {
      afterExecute: e => this._cellClickHandler(e.args[0].event)
    });
  }

  _createSelectionChangedAction() {
    this._selectionChangedAction = this._createActionByOption('onSelectionChanged');
  }

  _cellClickHandler() {
    if (this._showPopup) {
      delete this._showPopup;

      this._showAddAppointmentPopup();
    }
  }

  _pointerDownHandler(e) {
    var $target = $(e.target);

    if (!$target.hasClass(DATE_TABLE_CELL_CLASS) && !$target.hasClass(ALL_DAY_TABLE_CELL_CLASS)) {
      this._isCellClick = false;
      return;
    }

    this._isCellClick = true;

    if ($target.hasClass(DATE_TABLE_FOCUSED_CELL_CLASS)) {
      this._showPopup = true;
    } else {
      var cellCoordinates = this._getCoordinatesByCell($target);

      var isAllDayCell = this._hasAllDayClass($target);

      this._setSelectedCellsStateAndUpdateSelection(isAllDayCell, cellCoordinates, false, $target);
    }
  }

  _showAddAppointmentPopup() {
    var selectedCells = this.cellsSelectionState.getSelectedCells();
    var firstCellData = selectedCells[0];
    var lastCellData = selectedCells[selectedCells.length - 1];
    var result = {
      startDate: firstCellData.startDate,
      endDate: lastCellData.endDate
    };

    if (lastCellData.allDay !== undefined) {
      result.allDay = lastCellData.allDay;
    }

    this.invoke('showAddAppointmentPopup', result, lastCellData.groups);
  }

  _attachContextMenuEvent() {
    this._createContextMenuAction();

    var cellSelector = '.' + DATE_TABLE_CELL_CLASS + ',.' + ALL_DAY_TABLE_CELL_CLASS;
    var $element = this.$element();
    var eventName = addNamespace(contextMenuEventName, this.NAME);
    eventsEngine.off($element, eventName, cellSelector);
    eventsEngine.on($element, eventName, cellSelector, this._contextMenuHandler.bind(this));
  }

  _contextMenuHandler(e) {
    var $cell = $(e.target);

    this._contextMenuAction({
      event: e,
      cellElement: getPublicElement($cell),
      cellData: this.getCellData($cell)
    });

    this._contextMenuHandled = true;
  }

  _createContextMenuAction() {
    this._contextMenuAction = this._createActionByOption('onCellContextMenu');
  }

  _getGroupHeaderContainer() {
    if (this._isVerticalGroupedWorkSpace()) {
      return this._$groupTable;
    }

    return this._$thead;
  }

  _getDateHeaderContainer() {
    return this._$thead;
  }

  _renderGroupHeader() {
    var $container = this._getGroupHeaderContainer();

    var groupCount = this._getGroupCount();

    var cellTemplates = [];

    if (groupCount) {
      var groupRows = this._makeGroupRows(this.option('groups'), this.option('groupByDate'));

      this._attachGroupCountAttr();

      $container.append(groupRows.elements);
      cellTemplates = groupRows.cellTemplates;
    } else {
      this._detachGroupCountAttr();
    }

    return cellTemplates;
  }

  _applyCellTemplates(templates) {
    templates === null || templates === void 0 ? void 0 : templates.forEach(function (template) {
      template();
    });
  }

  _detachGroupCountAttr() {
    var groupedAttr = this._groupedStrategy.getGroupCountAttr();

    this.$element().removeAttr(groupedAttr.attr);
  }

  _attachGroupCountAttr() {
    var groupedAttr = this._groupedStrategy.getGroupCountAttr(this.option('groups'));

    this.$element().attr(groupedAttr.attr, groupedAttr.count);
  }

  headerPanelOffsetRecalculate() {
    if (!this.option('resourceCellTemplate') && !this.option('dateCellTemplate')) {
      return;
    }

    var headerPanelHeight = this.getHeaderPanelHeight();
    var headerHeight = this.invoke('getHeaderHeight');
    var allDayPanelHeight = this.isAllDayPanelVisible ? this._groupedStrategy.getAllDayTableHeight() : 0;
    headerPanelHeight && this._headerScrollable && this._headerScrollable.$element().height(headerPanelHeight + allDayPanelHeight);
    headerPanelHeight && this._dateTableScrollable.$element().css({
      'paddingBottom': allDayPanelHeight + headerPanelHeight + 'px',
      'marginBottom': -1 * (parseInt(headerPanelHeight, 10) + allDayPanelHeight) + 'px'
    });
    headerPanelHeight && this._sidebarScrollable && this._sidebarScrollable.$element().css({
      'paddingBottom': allDayPanelHeight + headerPanelHeight + 'px',
      'marginBottom': -1 * (parseInt(headerPanelHeight, 10) + allDayPanelHeight) + 'px'
    });
    this._$allDayTitle && this._$allDayTitle.css('top', headerHeight + headerPanelHeight + 'px');
  }

  _makeGroupRows(groups, groupByDate) {
    var tableCreatorStrategy = this._isVerticalGroupedWorkSpace() ? tableCreator.VERTICAL : tableCreator.HORIZONTAL;
    return tableCreator.makeGroupedTable(tableCreatorStrategy, groups, {
      groupHeaderRowClass: GROUP_ROW_CLASS,
      groupRowClass: GROUP_ROW_CLASS,
      groupHeaderClass: this._getGroupHeaderClass.bind(this),
      groupHeaderContentClass: GROUP_HEADER_CONTENT_CLASS
    }, this._getCellCount() || 1, this.option('resourceCellTemplate'), this._getGroupCount(), groupByDate);
  }

  _getDateHeaderTemplate() {
    return this.option('dateCellTemplate');
  }

  _renderDateHeader() {
    var container = this._getDateHeaderContainer();

    var $headerRow = $('<tr>').addClass(HEADER_ROW_CLASS);

    var count = this._getCellCount();

    var cellTemplate = this._getDateHeaderTemplate();

    var repeatCount = this._getCalculateHeaderCellRepeatCount();

    var templateCallbacks = [];
    var groupByDate = this.isGroupedByDate();

    if (!groupByDate) {
      for (var rowIndex = 0; rowIndex < repeatCount; rowIndex++) {
        for (var columnIndex = 0; columnIndex < count; columnIndex++) {
          var templateIndex = rowIndex * count + columnIndex;

          this._renderDateHeaderTemplate($headerRow, columnIndex, templateIndex, cellTemplate, templateCallbacks);
        }
      }

      container.append($headerRow);
    } else {
      var colSpan = groupByDate ? this._getGroupCount() : 1;

      for (var _columnIndex = 0; _columnIndex < count; _columnIndex++) {
        var _templateIndex = _columnIndex * repeatCount;

        var cellElement = this._renderDateHeaderTemplate($headerRow, _columnIndex, _templateIndex, cellTemplate, templateCallbacks);

        cellElement.attr('colSpan', colSpan);
      }

      container.prepend($headerRow);
    }

    this._applyCellTemplates(templateCallbacks);

    return $headerRow;
  }

  _renderDateHeaderTemplate(container, panelCellIndex, templateIndex, cellTemplate, templateCallbacks) {
    var text = this._getHeaderText(panelCellIndex);

    var $cell = $('<th>').addClass(this._getHeaderPanelCellClass(panelCellIndex)).attr('title', text);

    if (cellTemplate !== null && cellTemplate !== void 0 && cellTemplate.render) {
      templateCallbacks.push(cellTemplate.render.bind(cellTemplate, {
        model: _extends({
          text: text,
          date: this._getDateByIndex(panelCellIndex)
        }, this._getGroupsForDateHeaderTemplate(templateIndex)),
        index: templateIndex,
        container: getPublicElement($cell)
      }));
    } else {
      $cell.text(text);
    }

    container.append($cell);
    return $cell;
  }

  _getGroupsForDateHeaderTemplate(templateIndex) {
    var indexMultiplier = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var groupIndex;
    var groups;

    if (this._isHorizontalGroupedWorkSpace() && !this.isGroupedByDate()) {
      groupIndex = this._getGroupIndex(0, templateIndex * indexMultiplier);
      var resourceManager = this.invoke('getResourceManager');
      var groupsArray = resourceManager.getCellGroups(groupIndex, this.option('groups'));
      groups = this._getGroupsObjectFromGroupsArray(groupsArray);
    }

    return {
      groups,
      groupIndex
    };
  }

  _getHeaderPanelCellClass(i) {
    var cellClass = HEADER_PANEL_CELL_CLASS + ' ' + HORIZONTAL_SIZES_CLASS;
    return this._groupedStrategy.addAdditionalGroupCellClasses(cellClass, i + 1, undefined, undefined, this.isGroupedByDate());
  }

  _getCalculateHeaderCellRepeatCount() {
    return this._groupedStrategy.calculateHeaderCellRepeatCount();
  }

  _renderAllDayPanel(index) {
    var cellCount = this._getCellCount();

    if (!this._isVerticalGroupedWorkSpace()) {
      cellCount *= this._getGroupCount() || 1;
    }

    var cellTemplates = this._renderTableBody({
      container: this._allDayPanels.length ? getPublicElement(this._allDayTables[index]) : getPublicElement(this._$allDayTable),
      rowCount: 1,
      cellCount: cellCount,
      cellClass: this._getAllDayPanelCellClass.bind(this),
      rowClass: ALL_DAY_TABLE_ROW_CLASS,
      cellTemplate: this.option('dataCellTemplate'),
      getCellData: this._getAllDayCellData.bind(this),
      groupIndex: index
    }, true);

    this._toggleAllDayVisibility(true);

    this._applyCellTemplates(cellTemplates);
  }

  _renderGroupAllDayPanel() {
    if (this._isVerticalGroupedWorkSpace()) {
      var groupCount = this._getGroupCount();

      for (var i = 0; i < groupCount; i++) {
        this._renderAllDayPanel(i);
      }
    }
  }

  _getAllDayPanelCellClass(i, j) {
    var cellClass = ALL_DAY_TABLE_CELL_CLASS + ' ' + HORIZONTAL_SIZES_CLASS;
    return this._groupedStrategy.addAdditionalGroupCellClasses(cellClass, j + 1);
  }

  _getAllDayCellData(cell, rowIndex, columnIndex, groupIndex) {
    var startDate = this._getDateByCellIndexes(rowIndex, columnIndex);

    var cellGroupIndex = groupIndex || this._getGroupIndex(rowIndex, columnIndex);

    startDate = dateUtils.trimTime(startDate);
    var data = {
      startDate: startDate,
      endDate: startDate,
      allDay: true,
      groupIndex: cellGroupIndex
    };
    var resourceManager = this.invoke('getResourceManager');
    var groupsArray = resourceManager.getCellGroups(cellGroupIndex, this.option('groups'));

    if (groupsArray.length) {
      data.groups = this._getGroupsObjectFromGroupsArray(groupsArray);
    }

    return {
      key: CELL_DATA,
      value: data
    };
  }

  _toggleAllDayVisibility(isUpdateScrollable) {
    var showAllDayPanel = this._isShowAllDayPanel();

    this._$allDayPanel.toggle(showAllDayPanel);

    this._$allDayTitle && this._$allDayTitle.toggleClass(ALL_DAY_TITLE_HIDDEN_CLASS, !showAllDayPanel);
    this.$element().toggleClass(WORKSPACE_WITH_ALL_DAY_CLASS, showAllDayPanel);

    this._changeAllDayVisibility();

    isUpdateScrollable && this._updateScrollable();
  }

  _changeAllDayVisibility() {
    this.$element().toggleClass(WORKSPACE_WITH_COLLAPSED_ALL_DAY_CLASS, !this.option('allDayExpanded') && this._isShowAllDayPanel());
  }

  _updateScrollable() {
    this._dateTableScrollable.update();

    this._headerScrollable && this._headerScrollable.update();
    this._sidebarScrollable && this._sidebarScrollable.update();
  }

  _renderTimePanel() {
    var repeatCount = this._groupedStrategy.calculateTimeCellRepeatCount();

    var startViewDate = timeZoneUtils.getDateWithoutTimezoneChange(this.getStartViewDate());

    var _getTimeText = i => {
      // T410490: incorrectly displaying time slots on Linux
      var index = i % this._getRowCount();

      if (index % 2 === 0) {
        return dateLocalization.format(this._getTimeCellDateCore(startViewDate, i), 'shorttime');
      }

      return '';
    };

    var getTimeCellGroups = rowIndex => {
      if (!this._isVerticalGroupedWorkSpace()) {
        return {};
      }

      var groupIndex = this._getGroupIndex(rowIndex, 0);

      var resourceManager = this.invoke('getResourceManager');
      var groupsArray = resourceManager.getCellGroups(groupIndex, this.option('groups'));

      var groups = this._getGroupsObjectFromGroupsArray(groupsArray);

      return {
        groupIndex,
        groups
      };
    };

    this._renderTableBody({
      container: getPublicElement(this._$timePanel),
      rowCount: this._getTimePanelRowCount() * repeatCount,
      cellCount: 1,
      cellClass: this._getTimeCellClass.bind(this),
      rowClass: TIME_PANEL_ROW_CLASS,
      cellTemplate: this.option('timeCellTemplate'),
      getCellText: _getTimeText.bind(this),
      getCellDate: this._getTimeCellDate.bind(this),
      groupCount: this._getGroupCount(),
      allDayElements: this._insertAllDayRowsIntoDateTable() ? this._allDayTitles : undefined,
      getTemplateData: getTimeCellGroups.bind(this)
    });
  }

  _getTimePanelRowCount() {
    return this._getCellCountInDay();
  }

  _getCellCountInDay(skipRound) {
    var result = this._calculateDayDuration() / this.option('hoursInterval');
    return skipRound ? result : Math.ceil(result);
  }

  _calculateDayDuration() {
    return this.option('endDayHour') - this.option('startDayHour');
  }

  _getTimeCellClass(i) {
    var cellClass = TIME_PANEL_CELL_CLASS + ' ' + VERTICAL_SIZES_CLASS;
    return this._isVerticalGroupedWorkSpace() ? this._groupedStrategy.addAdditionalGroupCellClasses(cellClass, i, i) : cellClass;
  }

  _getTimeCellDate(i) {
    return this._getTimeCellDateCore(this.getStartViewDate(), i);
  }

  _getTimeCellDateCore(startViewDate, i) {
    var result = new Date(startViewDate);
    var timeCellDuration = Math.round(this.getCellDuration());

    var cellCountInDay = this._getCellCountInDay(true);

    result.setMilliseconds(result.getMilliseconds() + timeCellDuration * (i % cellCountInDay) - this._getTimeOffsetForStartViewDate());
    return result;
  }

  _renderDateTable() {
    var groupCount = this._getGroupCount();

    this._renderTableBody({
      container: getPublicElement(this._$dateTable),
      rowCount: this._getTotalRowCount(groupCount),
      cellCount: this._getTotalCellCount(groupCount),
      cellClass: this._getDateTableCellClass.bind(this),
      rowClass: DATE_TABLE_ROW_CLASS,
      cellTemplate: this.option('dataCellTemplate'),
      getCellData: this._getCellData.bind(this),
      allDayElements: this._insertAllDayRowsIntoDateTable() ? this._allDayPanels : undefined,
      groupCount: groupCount,
      groupByDate: this.option('groupByDate')
    });
  }

  _insertAllDayRowsIntoDateTable() {
    return this._groupedStrategy.insertAllDayRowsIntoDateTable();
  }

  _getTotalCellCount(groupCount) {
    return this._groupedStrategy.getTotalCellCount(groupCount);
  }

  _getTotalRowCount(groupCount, includeAllDayPanelRows) {
    var result = this._groupedStrategy.getTotalRowCount(groupCount);

    if (includeAllDayPanelRows && groupCount > 1 && this.isAllDayPanelVisible) {
      result += groupCount;
    }

    return result;
  }

  _getCellData(cell, rowIndex, columnIndex) {
    var data = this._prepareCellData(rowIndex, columnIndex, cell);

    return {
      key: CELL_DATA,
      value: data
    };
  }

  _prepareCellData(rowIndex, columnIndex) {
    var startDate = this._getDateByCellIndexes(rowIndex, columnIndex);

    var endDate = this.calculateEndDate(startDate);

    var groupIndex = this._getGroupIndex(rowIndex, columnIndex);

    var data = {
      startDate: startDate,
      endDate: endDate,
      allDay: this._getTableAllDay(),
      groupIndex
    };
    var resourceManager = this.invoke('getResourceManager');
    var groupsArray = resourceManager.getCellGroups(groupIndex, this.option('groups'));

    if (groupsArray.length) {
      data.groups = this._getGroupsObjectFromGroupsArray(groupsArray);
    }

    return data;
  }

  _getGroupIndex(rowIndex, columnIndex) {
    return this._groupedStrategy.getGroupIndex(rowIndex, columnIndex);
  }

  _getTableAllDay() {
    return false;
  }

  calculateEndDate(startDate) {
    var result = new Date(startDate);
    result.setMilliseconds(result.getMilliseconds() + Math.round(this._getInterval()));
    return result;
  }

  _getGroupCount() {
    var groups = this.option('groups');
    var result = 0;

    for (var i = 0, len = groups.length; i < len; i++) {
      if (!i) {
        result = groups[i].items.length;
      } else {
        result *= groups[i].items.length;
      }
    }

    return result;
  }

  _getAllGroups() {
    var groupCount = this._getGroupCount();

    var resourceManager = this.invoke('getResourceManager');
    return [...new Array(groupCount)].map((_, groupIndex) => {
      var groupsArray = resourceManager.getCellGroups(groupIndex, this.option('groups'));
      return this._getGroupsObjectFromGroupsArray(groupsArray);
    });
  }

  _getGroupsObjectFromGroupsArray(groupsArray) {
    return groupsArray.reduce((currentGroups, _ref2) => {
      var {
        name,
        id
      } = _ref2;
      return _extends({}, currentGroups, {
        [name]: id
      });
    }, {});
  }

  _attachTablesEvents() {
    var element = this.$element();

    this._attachDragEvents(element);

    this._attachPointerEvents(element);
  }

  _detachDragEvents(element) {
    eventsEngine.off(element, DragEventNames.ENTER);
    eventsEngine.off(element, DragEventNames.LEAVE);
    eventsEngine.off(element, DragEventNames.DROP);
  }

  _attachDragEvents(element) {
    this._detachDragEvents(element);

    var onDragEnter = e => {
      this.removeDroppableCellClass();
      $(e.target).addClass(DATE_TABLE_DROPPABLE_CELL_CLASS);
    };

    var onCheckDropTarget = (target, event) => {
      return !this._isOutsideScrollable(target, event);
    };

    eventsEngine.on(element, DragEventNames.ENTER, DRAG_AND_DROP_SELECTOR, {
      checkDropTarget: onCheckDropTarget
    }, onDragEnter);
    eventsEngine.on(element, DragEventNames.LEAVE, () => this.removeDroppableCellClass());
    eventsEngine.on(element, DragEventNames.DROP, DRAG_AND_DROP_SELECTOR, () => this.removeDroppableCellClass());
  }

  _attachPointerEvents(element) {
    var isPointerDown = false;
    eventsEngine.off(element, SCHEDULER_CELL_DXPOINTERMOVE_EVENT_NAME);
    eventsEngine.off(element, SCHEDULER_CELL_DXPOINTERDOWN_EVENT_NAME);
    eventsEngine.on(element, SCHEDULER_CELL_DXPOINTERDOWN_EVENT_NAME, DRAG_AND_DROP_SELECTOR, e => {
      if (isMouseEvent(e) && e.which === 1) {
        isPointerDown = true;
        this.$element().addClass(WORKSPACE_WITH_MOUSE_SELECTION_CLASS);
        eventsEngine.off(domAdapter.getDocument(), SCHEDULER_CELL_DXPOINTERUP_EVENT_NAME);
        eventsEngine.on(domAdapter.getDocument(), SCHEDULER_CELL_DXPOINTERUP_EVENT_NAME, () => {
          isPointerDown = false;
          this.$element().removeClass(WORKSPACE_WITH_MOUSE_SELECTION_CLASS);
        });
      }
    });
    eventsEngine.on(element, SCHEDULER_CELL_DXPOINTERMOVE_EVENT_NAME, DRAG_AND_DROP_SELECTOR, e => {
      if (isPointerDown && this._dateTableScrollable && !this._dateTableScrollable.option('scrollByContent')) {
        e.preventDefault();
        e.stopPropagation();

        this._moveToCell($(e.target), true);
      }
    });
  }

  _getDateTables() {
    return this._$dateTable.add(this._$allDayTable);
  }

  _getDateTable() {
    return this._$dateTable;
  }

  _getInterval() {
    if (this._interval === undefined) {
      this._interval = this.option('hoursInterval') * HOUR_MS;
    }

    return this._interval;
  }

  _getHeaderText(headerIndex) {
    return dateLocalization.format(this._getDateForHeaderText(headerIndex), this._getFormat());
  }

  _getDateForHeaderText(index) {
    return this._getDateByIndex(index);
  }

  _getDateByIndex() {
    return abstract();
  }

  _getFormat() {
    return abstract();
  }

  _calculateCellIndex(rowIndex, columnIndex) {
    return this._groupedStrategy.calculateCellIndex(rowIndex, columnIndex);
  }

  _renderTableBody(options, delayCellTemplateRendering) {
    var result = [];

    if (!delayCellTemplateRendering) {
      this._applyCellTemplates(tableCreator.makeTable(options));
    } else {
      result = tableCreator.makeTable(options);
    }

    return result;
  }

  _removeAllDayElements() {
    this._$allDayTable && this._$allDayTable.remove();
    this._$allDayTitle && this._$allDayTitle.remove();
  }

  _cleanView() {
    var _this$_shader;

    this.cache.clear();

    this._cleanTableWidths();

    this._cleanAllowedPositions();

    this.cellsSelectionState.clearSelectedAndFocusedCells();

    if (!this.isRenovatedRender()) {
      var _this$_$allDayTable, _this$_$sidebarTable;

      this._$thead.empty();

      this._$dateTable.empty();

      this._$timePanel.empty();

      this._$groupTable.empty();

      (_this$_$allDayTable = this._$allDayTable) === null || _this$_$allDayTable === void 0 ? void 0 : _this$_$allDayTable.empty();
      (_this$_$sidebarTable = this._$sidebarTable) === null || _this$_$sidebarTable === void 0 ? void 0 : _this$_$sidebarTable.empty();
    }

    (_this$_shader = this._shader) === null || _this$_shader === void 0 ? void 0 : _this$_shader.clean();
    delete this._hiddenInterval;
    delete this._interval;
  }

  _clean() {
    eventsEngine.off(domAdapter.getDocument(), SCHEDULER_CELL_DXPOINTERUP_EVENT_NAME);

    this._disposeRenovatedComponents();

    super._clean();
  }

  _cleanTableWidths() {
    this._$headerPanel.css('width', '');

    this._$dateTable.css('width', '');

    this._$allDayTable && this._$allDayTable.css('width', '');
  }

  _disposeRenovatedComponents() {
    var _this$renovatedAllDay, _this$renovatedDateTa, _this$renovatedTimePa, _this$renovatedGroupP, _this$renovatedHeader;

    (_this$renovatedAllDay = this.renovatedAllDayPanel) === null || _this$renovatedAllDay === void 0 ? void 0 : _this$renovatedAllDay.dispose();
    this.renovatedAllDayPanel = undefined;
    (_this$renovatedDateTa = this.renovatedDateTable) === null || _this$renovatedDateTa === void 0 ? void 0 : _this$renovatedDateTa.dispose();
    this.renovatedDateTable = undefined;
    (_this$renovatedTimePa = this.renovatedTimePanel) === null || _this$renovatedTimePa === void 0 ? void 0 : _this$renovatedTimePa.dispose();
    this.renovatedTimePanel = undefined;
    (_this$renovatedGroupP = this.renovatedGroupPanel) === null || _this$renovatedGroupP === void 0 ? void 0 : _this$renovatedGroupP.dispose();
    this.renovatedGroupPanel = undefined;
    (_this$renovatedHeader = this.renovatedHeaderPanel) === null || _this$renovatedHeader === void 0 ? void 0 : _this$renovatedHeader.dispose();
    this.renovatedHeaderPanel = undefined;
  }

  getWorkArea() {
    return this._dateTableScrollable.$content();
  }

  getScrollable() {
    return this._dateTableScrollable;
  }

  getScrollableScrollTop() {
    return this._dateTableScrollable.scrollTop();
  }

  getGroupedScrollableScrollTop(allDay) {
    return this._groupedStrategy.getScrollableScrollTop(allDay);
  }

  getScrollableScrollLeft() {
    return this._dateTableScrollable.scrollLeft();
  }

  getScrollableOuterWidth() {
    return this._dateTableScrollable.scrollWidth();
  }

  getScrollableContainer() {
    return this._dateTableScrollable._container();
  }

  getHeaderPanelHeight() {
    return this._$headerPanel && this._$headerPanel.outerHeight(true);
  }

  getTimePanelWidth() {
    return this._$timePanel && getBoundingRect(this._$timePanel.get(0)).width;
  }

  getGroupTableWidth() {
    return this._$groupTable ? this._$groupTable.outerWidth() : 0;
  }

  getWorkSpaceLeftOffset() {
    return this._groupedStrategy.getLeftOffset();
  }

  getGroupedStrategy() {
    return this._groupedStrategy;
  }

  _getCellCoordinatesByIndex(index) {
    var columnIndex = Math.floor(index / this._getRowCount());
    var rowIndex = index - this._getRowCount() * columnIndex;
    return {
      columnIndex,
      rowIndex
    };
  }

  _getDateByCellIndexes(rowIndex, columnIndex, patchedIndexes) {
    columnIndex = !patchedIndexes ? this._patchColumnIndex(columnIndex) : columnIndex;
    var firstViewDate = this.getStartViewDate();
    var isFirstViewDateDuringDST = firstViewDate.getHours() !== Math.floor(this.option('startDayHour'));

    if (isFirstViewDateDuringDST) {
      var dateWithCorrectHours = this._getFirstViewDateWithoutDST();

      firstViewDate = new Date(dateWithCorrectHours - toMs('day'));
    }

    var firstViewDateTime = firstViewDate.getTime();

    var millisecondsOffset = this._getMillisecondsOffset(rowIndex, columnIndex);

    var offsetByCount = this._getOffsetByCount(columnIndex);

    var currentDate = new Date(firstViewDateTime + millisecondsOffset + offsetByCount);
    var timeZoneDifference = dateUtils.getTimezonesDifference(firstViewDate, currentDate);

    if (isFirstViewDateDuringDST) {
      timeZoneDifference = 0;
    }

    currentDate.setTime(currentDate.getTime() + timeZoneDifference);
    return currentDate;
  }

  _patchColumnIndex(columnIndex) {
    if (this.isGroupedByDate()) {
      columnIndex = Math.floor(columnIndex / this._getGroupCount());
    }

    return columnIndex;
  }

  _getOffsetByCount() {
    return 0;
  }

  _getMillisecondsOffset(rowIndex, columnIndex) {
    return this._getInterval() * this._calculateCellIndex(rowIndex, columnIndex) + this._calculateHiddenInterval(rowIndex, columnIndex);
  }

  _calculateHiddenInterval(rowIndex, columnIndex) {
    var dayCount = columnIndex % this._getCellCount();

    return dayCount * this._getHiddenInterval();
  }

  _getHiddenInterval() {
    if (this._hiddenInterval === undefined) {
      this._hiddenInterval = DAY_MS - this.getVisibleDayDuration();
    }

    return this._hiddenInterval;
  }

  _getIntervalBetween(currentDate, allDay) {
    var firstViewDate = this.getStartViewDate();
    var startDayTime = this.option('startDayHour') * HOUR_MS;
    var timeZoneOffset = dateUtils.getTimezonesDifference(firstViewDate, currentDate);
    var fullInterval = currentDate.getTime() - firstViewDate.getTime() - timeZoneOffset;

    var days = this._getDaysOfInterval(fullInterval, startDayTime);

    var weekendsCount = this._getWeekendsCount(days);

    var result = (days - weekendsCount) * DAY_MS;

    if (!allDay) {
      result = fullInterval - days * this._getHiddenInterval() - weekendsCount * this.getVisibleDayDuration();
    }

    return result;
  }

  _getWeekendsCount() {
    return 0;
  }

  _getDaysOfInterval(fullInterval, startDayTime) {
    return Math.floor((fullInterval + startDayTime) / DAY_MS);
  }

  _getGroupIndexes(appointmentResources) {
    var result = [];

    if (this._isGroupsSpecified(appointmentResources)) {
      var resourceManager = this.invoke('getResourceManager');
      var tree = resourceManager.createResourcesTree(this.option('groups'));
      result = resourceManager.getResourceTreeLeaves(tree, appointmentResources);
    }

    return result;
  }

  _updateIndex(index) {
    return index * this._getRowCount();
  }

  _getDroppableCell() {
    return this._getDateTables().find('.' + DATE_TABLE_DROPPABLE_CELL_CLASS);
  }

  _getWorkSpaceWidth() {
    return this.cache.get('workspaceWidth', () => {
      if (this._needCreateCrossScrolling()) {
        return getBoundingRect(this._$dateTable.get(0)).width;
      }

      return getBoundingRect(this.$element().get(0)).width - this.getTimePanelWidth();
    });
  }

  _getCellPositionByIndex(index, groupIndex, inAllDayRow) {
    var cellCoordinates = this._getCellCoordinatesByIndex(index);

    var $cell = this._getCellByCoordinates(cellCoordinates, groupIndex, inAllDayRow);

    return this._getCellPositionWithCache($cell, cellCoordinates, groupIndex, inAllDayRow && !this._isVerticalGroupedWorkSpace());
  }

  _getCellPositionWithCache($cell, cellCoordinates, groupIndex, inAllDayPanel) {
    var result = this._getCellPosition(cellCoordinates, inAllDayPanel);

    this.setCellDataCache(cellCoordinates, groupIndex, $cell);

    if (result) {
      result.rowIndex = cellCoordinates.rowIndex;
      result.columnIndex = cellCoordinates.columnIndex;
    }

    return result;
  }

  _getCellPosition(cellCoordinates, isAllDayPanel) {
    var {
      dateTableCellsMeta,
      allDayPanelCellsMeta
    } = this.getDOMElementsMetaData();
    var {
      columnIndex,
      rowIndex
    } = cellCoordinates;
    var position = isAllDayPanel ? allDayPanelCellsMeta[columnIndex] : dateTableCellsMeta[rowIndex][columnIndex];

    var validPosition = _extends({}, position);

    if (this.option('rtlEnabled')) {
      validPosition.left += position.width;
    }

    return validPosition;
  }

  _getCellByCoordinates(cellCoordinates, groupIndex, inAllDayRow) {
    var indexes = this._groupedStrategy.prepareCellIndexes(cellCoordinates, groupIndex, inAllDayRow);

    return this._dom_getDateCell(indexes);
  } // TODO DOM adapter


  _dom_getDateCell(position) {
    return this._$dateTable.find("tr:not(.".concat(VIRTUAL_ROW_CLASS, ")")).eq(position.rowIndex).find("td:not(.".concat(VIRTUAL_CELL_CLASS, ")")).eq(position.columnIndex);
  }

  _dom_getAllDayPanelCell(columnIndex) {
    return this._$allDayPanel.find('tr').eq(0).find('td').eq(columnIndex);
  }

  _getCells(allDay, direction) {
    var cellClass = allDay ? ALL_DAY_TABLE_CELL_CLASS : DATE_TABLE_CELL_CLASS;

    if (direction === 'vertical') {
      var result = [];

      for (var i = 1;; i++) {
        var cells = this.$element().find("tr .".concat(cellClass, ":nth-child(").concat(i, ")"));
        if (!cells.length) break;
        result = result.concat(cells.toArray());
      }

      return $(result);
    } else {
      return this.$element().find('.' + cellClass);
    }
  }

  _getAllCells(allDay) {
    if (this._isVerticalGroupedWorkSpace()) {
      return this._$dateTable.find("td:not(.".concat(VIRTUAL_CELL_CLASS, ")"));
    }

    var cellClass = allDay && this.supportAllDayRow() ? ALL_DAY_TABLE_CELL_CLASS : DATE_TABLE_CELL_CLASS;
    return this.$element().find('.' + cellClass);
  }

  _setHorizontalGroupHeaderCellsHeight() {
    var height = getBoundingRect(this._$dateTable.get(0)).height;

    this._$groupTable.outerHeight(height);
  }

  _getGroupHeaderCells() {
    return this.$element().find('.' + GROUP_HEADER_CLASS);
  }

  _getScrollCoordinates(hours, minutes, date, groupIndex, allDay) {
    var currentDate = date || new Date(this.option('currentDate'));
    var startDayHour = this.option('startDayHour');
    var endDayHour = this.option('endDayHour');

    if (hours < startDayHour) {
      hours = startDayHour;
    }

    if (hours >= endDayHour) {
      hours = endDayHour - 1;
    }

    currentDate.setHours(hours, minutes, 0, 0);

    if (!this.isVirtualScrolling()) {
      return this.getCoordinatesByDate(currentDate, groupIndex, allDay);
    }

    var cell = this.viewDataProvider.findGlobalCellPosition(currentDate, groupIndex, allDay);
    var {
      position,
      cellData
    } = cell;
    return this.virtualScrollingDispatcher.calculateCoordinatesByDataAndPosition(cellData, position, currentDate, this.isDateAndTimeView, this.viewDirection === 'vertical');
  }

  _isOutsideScrollable(target, event) {
    var $dateTableScrollableElement = this._dateTableScrollable.$element();

    var scrollableSize = getBoundingRect($dateTableScrollableElement.get(0));
    var window = getWindow();
    var isTargetInAllDayPanel = !$(target).closest($dateTableScrollableElement).length;
    var isOutsideHorizontalScrollable = event.pageX < scrollableSize.left || event.pageX > scrollableSize.left + scrollableSize.width + (window.scrollX || 0);
    var isOutsideVerticalScrollable = event.pageY < scrollableSize.top || event.pageY > scrollableSize.top + scrollableSize.height + (window.scrollY || 0);

    if (isTargetInAllDayPanel && !isOutsideHorizontalScrollable) {
      return false;
    }

    return isOutsideVerticalScrollable || isOutsideHorizontalScrollable;
  }

  setCellDataCache(cellCoordinates, groupIndex, $cell) {
    var key = JSON.stringify({
      rowIndex: cellCoordinates.rowIndex,
      columnIndex: cellCoordinates.columnIndex,
      groupIndex: groupIndex
    });
    this.cache.set(key, this.getCellData($cell));
  }

  setCellDataCacheAlias(appointment, geometry) {
    var key = JSON.stringify({
      rowIndex: appointment.rowIndex,
      columnIndex: appointment.columnIndex,
      groupIndex: appointment.groupIndex
    });
    var aliasKey = JSON.stringify({
      top: geometry.top,
      left: geometry.left
    });
    this.cache.set(aliasKey, this.cache.get(key));
  }

  _cleanAllowedPositions() {
    this._maxAllowedVerticalPosition = [];
    this._maxAllowedPosition = [];
  }

  supportAllDayRow() {
    return true;
  }

  keepOriginalHours() {
    return false;
  }

  getSelectedCellData() {
    return this.cellsSelectionState.getSelectedCells();
  }

  getCellData($cell) {
    var cellData = this._getFullCellData($cell) || {};
    return extend(true, {}, {
      startDate: cellData.startDate,
      endDate: cellData.endDate,
      groups: cellData.groups,
      groupIndex: cellData.groupIndex,
      allDay: cellData.allDay
    });
  }

  _getFullCellData($cell) {
    var currentCell = $cell[0];

    if (currentCell) {
      return this._getDataByCell($cell);
    }

    return undefined;
  }

  _getVirtualRowOffset() {
    return this.virtualScrollingDispatcher.virtualRowOffset;
  }

  _getVirtualCellOffset() {
    return this.virtualScrollingDispatcher.virtualCellOffset;
  }

  _getDataByCell($cell) {
    var rowIndex = $cell.parent().index() - this.virtualScrollingDispatcher.topVirtualRowsCount;
    var columnIndex = $cell.index() - this.virtualScrollingDispatcher.leftVirtualCellsCount;
    var {
      viewDataProvider
    } = this;

    var isAllDayCell = this._hasAllDayClass($cell);

    var cellData = viewDataProvider.getCellData(rowIndex, columnIndex, isAllDayCell);
    return cellData ? cellData : undefined;
  }

  _getHorizontalMax(groupIndex) {
    if (this.isVirtualScrolling()) {
      return this.getMaxAllowedPosition(groupIndex);
    }

    var correctedGroupIndex = this.isGroupedByDate() ? this._getGroupCount() - 1 : groupIndex;
    return this.getMaxAllowedPosition(correctedGroupIndex);
  }

  getCoordinatesByDate(date, groupIndex, inAllDayRow) {
    var validGroupIndex = groupIndex || 0;
    var cellInfo = {
      groupIndex: validGroupIndex,
      startDate: date,
      isAllDay: inAllDayRow
    };
    var positionByMap = this.viewDataProvider.findCellPositionInMap(cellInfo);

    if (!positionByMap) {
      return undefined;
    }

    var $cell = this._dom_getDateCell(positionByMap);

    var position = this._getCellPositionWithCache($cell, positionByMap, validGroupIndex, inAllDayRow && !this._isVerticalGroupedWorkSpace());

    var shift = this.getPositionShift(inAllDayRow ? 0 : this.getTimeShift(date), inAllDayRow);

    var horizontalHMax = this._getHorizontalMax(validGroupIndex, date);

    return {
      cellPosition: position.left + shift.cellPosition,
      top: position.top + shift.top,
      left: position.left + shift.left,
      rowIndex: position.rowIndex,
      columnIndex: position.columnIndex,
      hMax: horizontalHMax,
      vMax: this.getVerticalMax(validGroupIndex),
      groupIndex: validGroupIndex
    };
  }

  getVerticalMax(groupIndex) {
    return this._groupedStrategy.getVerticalMax(groupIndex);
  }

  _getOffsetByAllDayPanel(groupIndex) {
    return this._groupedStrategy._getOffsetByAllDayPanel(groupIndex);
  }

  _getGroupTop(groupIndex) {
    return this._groupedStrategy._getGroupTop(groupIndex);
  }

  isGroupedByDate() {
    return this.option('groupByDate') && this._isHorizontalGroupedWorkSpace() && this._getGroupCount() > 0;
  }

  getCellIndexByDate(date, inAllDayRow) {
    var timeInterval = inAllDayRow ? 24 * 60 * 60 * 1000 : this._getInterval();

    var dateTimeStamp = this._getIntervalBetween(date, inAllDayRow) + this._getTimeOffsetForStartViewDate();

    var index = Math.floor(dateTimeStamp / timeInterval);

    if (inAllDayRow) {
      index = this._updateIndex(index);
    }

    if (index < 0) {
      index = 0;
    }

    return index;
  }

  getPositionShift(timeShift, isAllDay) {
    return {
      top: timeShift * this.getCellHeight(),
      left: 0,
      cellPosition: 0
    };
  }

  getTimeShift(date) {
    var currentDayStart = new Date(date);
    var cellDuration = this.getCellDuration();
    var currentDayEndHour = new Date(new Date(date).setHours(this.option('endDayHour'), 0, 0));

    if (date.getTime() <= currentDayEndHour.getTime()) {
      currentDayStart.setHours(this.option('startDayHour'), 0, 0, 0);
    }

    var timeZoneDifference = dateUtils.getTimezonesDifference(date, currentDayStart);
    var currentDateTime = date.getTime();
    var currentDayStartTime = currentDayStart.getTime();

    var minTime = this._startViewDate.getTime();

    return currentDateTime > minTime ? (currentDateTime - currentDayStartTime + timeZoneDifference) % cellDuration / cellDuration : 0;
  }

  _isSkippedData() {
    return false;
  }

  getCoordinatesByDateInGroup(startDate, appointmentResources, inAllDayRow, groupIndex) {
    var result = [];

    if (this._isSkippedData(startDate)) {
      return result;
    }

    var groupIndices = [groupIndex];

    if (!isDefined(groupIndex)) {
      groupIndices = this._getGroupCount() ? this._getGroupIndexes(appointmentResources) : [0];
    }

    groupIndices.forEach(groupIndex => {
      var coordinates = this.getCoordinatesByDate(startDate, groupIndex, inAllDayRow);
      coordinates && result.push(coordinates);
    });
    return result;
  }

  getDroppableCellIndex() {
    var $droppableCell = this._getDroppableCell();

    var $row = $droppableCell.parent();
    var rowIndex = $row.index();
    return rowIndex * $row.find('td').length + $droppableCell.index();
  }

  getDataByDroppableCell() {
    var cellData = this.getCellData($(this._getDroppableCell()));
    var allDay = cellData.allDay;
    var startDate = cellData.startDate;
    var endDate = cellData.endDate;
    return {
      startDate,
      endDate,
      allDay,
      groups: cellData.groups
    };
  }

  getDateRange() {
    return [this.getStartViewDate(), this.getEndViewDateByEndDayHour()];
  }

  getCellWidth() {
    return this.cache.get('cellWidth', () => {
      var cell = this._getCells().first().get(0);

      return cell && getBoundingRect(cell).width;
    });
  }

  getCellMinWidth() {
    return DATE_TABLE_MIN_CELL_WIDTH;
  }

  getRoundedCellWidth(groupIndex, startIndex, cellCount) {
    if (groupIndex < 0) {
      return 0;
    }

    var $row = this.$element().find(".".concat(DATE_TABLE_ROW_CLASS)).eq(0);
    var width = 0;
    var $cells = $row.find('.' + DATE_TABLE_CELL_CLASS);
    var totalCellCount = this._getCellCount() * groupIndex;
    cellCount = cellCount || this._getCellCount();

    if (!isDefined(startIndex)) {
      startIndex = totalCellCount;
    }

    for (var i = startIndex; i < totalCellCount + cellCount; i++) {
      width = width + getBoundingRect($($cells).eq(i).get(0)).width;
    }

    return width / (totalCellCount + cellCount - startIndex);
  }

  getCellHeight() {
    var useCache = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

    var callbackResult = () => {
      var cell = this._getCells().first().get(0);

      return cell && getBoundingRect(cell).height;
    };

    return useCache ? this.cache.get('cellHeight', callbackResult) : callbackResult();
  }

  getAllDayHeight() {
    var cell = this._getCells(true).first().get(0);

    return this._isShowAllDayPanel() ? cell && getBoundingRect(cell).height || 0 : 0;
  }

  getAllDayOffset() {
    return this._groupedStrategy.getAllDayOffset();
  }

  getMaxAllowedPosition(groupIndex) {
    var validGroupIndex = groupIndex || 0;
    return this.getMaxAllowedHorizontalPosition(validGroupIndex);
  }

  getMaxAllowedHorizontalPosition(groupIndex) {
    var getMaxPosition = columnIndex => {
      var cell = this._$dateTable.find("tr:not(.".concat(VIRTUAL_ROW_CLASS, ")")).first().find("td:not(.".concat(VIRTUAL_CELL_CLASS, ")")).get(columnIndex);

      var maxPosition = $(cell).position().left;

      if (!this.option('rtlEnabled')) {
        maxPosition += getBoundingRect(cell).width;
      }

      this._maxAllowedPosition[groupIndex] = Math.round(maxPosition);
    };

    if (!this._maxAllowedPosition[groupIndex]) {
      var {
        columnIndex
      } = this.viewDataProvider.getLastGroupCellPosition(groupIndex);
      getMaxPosition(columnIndex);
    }

    return this._maxAllowedPosition[groupIndex];
  }

  getMaxAllowedVerticalPosition(groupIndex) {
    var getMaxPosition = rowIndex => {
      var row = this._$dateTable.find("tr:not(.".concat(VIRTUAL_ROW_CLASS, ")")).get(rowIndex);

      var maxPosition = $(row).position().top + getBoundingRect(row).height; // TODO remove while refactoring dual calculcations.
      // Should decrease allDayPanel amount due to the dual calculation corrections.

      if (this.isGroupedAllDayPanel()) {
        maxPosition -= (groupIndex + 1) * this.getAllDayHeight();
      }

      this._maxAllowedVerticalPosition[groupIndex] = Math.round(maxPosition);
    };

    if (!this._maxAllowedVerticalPosition[groupIndex]) {
      var {
        rowIndex
      } = this.viewDataProvider.getLastGroupCellPosition(groupIndex);
      getMaxPosition(rowIndex);
    }

    return this._maxAllowedVerticalPosition[groupIndex];
  }

  getFixedContainer() {
    return this._$fixedContainer;
  }

  getAllDayContainer() {
    return this._$allDayContainer;
  } // NOTE: refactor leftIndex calculation


  getCellIndexByCoordinates(coordinates, allDay) {
    var cellCount = this._getTotalCellCount(this._getGroupCount());

    var cellWidth = Math.floor(this._getWorkSpaceWidth() / cellCount);
    var cellHeight = allDay ? this.getAllDayHeight() : this.getCellHeight();
    var leftOffset = this._isRTL() || this.option('crossScrollingEnabled') ? 0 : this.getWorkSpaceLeftOffset();
    var topIndex = Math.floor(Math.floor(coordinates.top) / Math.floor(cellHeight));
    var leftIndex = Math.floor((coordinates.left + 5 - leftOffset) / cellWidth);

    if (this._isRTL()) {
      leftIndex = cellCount - leftIndex - 1;
    }

    return cellCount * topIndex + leftIndex;
  }

  getStartViewDate() {
    return this._startViewDate;
  }

  getEndViewDate() {
    var dateOfLastViewCell = this.getDateOfLastViewCell();
    var endDateOfLastViewCell = this.calculateEndViewDate(dateOfLastViewCell);
    return this._adjustEndViewDateByDaylightDiff(dateOfLastViewCell, endDateOfLastViewCell);
  }

  getEndViewDateByEndDayHour() {
    var dateOfLastViewCell = this.getDateOfLastViewCell();
    var endTime = dateUtils.dateTimeFromDecimal(this.option('endDayHour'));
    var endDateOfLastViewCell = new Date(dateOfLastViewCell.setHours(endTime.hours, endTime.minutes));
    return this._adjustEndViewDateByDaylightDiff(dateOfLastViewCell, endDateOfLastViewCell);
  }

  calculateEndViewDate(dateOfLastViewCell) {
    return new Date(dateOfLastViewCell.getTime() + this.getCellDuration());
  }

  _adjustEndViewDateByDaylightDiff(startDate, endDate) {
    var daylightDiff = timeZoneUtils.getDaylightOffsetInMs(startDate, endDate);
    var endDateOfLastViewCell = new Date(endDate.getTime() - daylightDiff);
    return new Date(endDateOfLastViewCell.getTime() - this._getEndViewDateTimeDiff());
  }

  _getEndViewDateTimeDiff() {
    return toMs('minute');
  }

  getDateOfLastViewCell() {
    var rowIndex = this._getRowCount() - 1;

    var columnIndex = this._getCellCount();

    if (this.isGroupedByDate()) {
      columnIndex = columnIndex * this._getGroupCount() - 1;
    } else {
      columnIndex = columnIndex - 1;
    }

    return this._getDateByCellIndexes(rowIndex, columnIndex, true);
  }

  getCellDuration() {
    return 3600000 * this.option('hoursInterval');
  }

  getIntervalDuration(allDay) {
    return allDay ? toMs('day') : this.getCellDuration();
  }

  getVisibleDayDuration() {
    return this.option('hoursInterval') * this._getCellCountInDay() * HOUR_MS;
  }

  getGroupBounds(coordinates) {
    var cellCount = this._getCellCount();

    var $cells = this._getCells();

    var cellWidth = this.getCellWidth();
    var groupedDataMap = this.viewDataProvider.groupedDataMap;

    var result = this._groupedStrategy.getGroupBoundsOffset(cellCount, $cells, cellWidth, coordinates, groupedDataMap);

    if (this._isRTL()) {
      var startOffset = result.left;
      result.left = result.right - cellWidth * 2;
      result.right = startOffset + cellWidth * 2;
    }

    return result;
  }

  needRecalculateResizableArea() {
    return this._isVerticalGroupedWorkSpace() && this.getScrollable().scrollTop() !== 0;
  }

  getCellDataByCoordinates(coordinates, allDay) {
    var key = JSON.stringify({
      top: coordinates.top,
      left: coordinates.left
    });
    return this.cache.get(key, () => {
      var $cells = this._getCells(allDay);

      var cellIndex = this.getCellIndexByCoordinates(coordinates, allDay);
      var $cell = $cells.eq(cellIndex);
      return this.getCellData($cell);
    });
  }

  getVisibleBounds() {
    var result = {};
    var $scrollable = this.getScrollable().$element();
    var cellHeight = this.getCellHeight();
    var scrolledCellCount = this.getScrollableScrollTop() / cellHeight;
    var totalCellCount = scrolledCellCount + $scrollable.height() / cellHeight;
    result.top = {
      hours: Math.floor(scrolledCellCount * this.option('hoursInterval')) + this.option('startDayHour'),
      minutes: scrolledCellCount % 2 ? 30 : 0
    };
    result.bottom = {
      hours: Math.floor(totalCellCount * this.option('hoursInterval')) + this.option('startDayHour'),
      minutes: Math.floor(totalCellCount) % 2 ? 30 : 0
    };
    return result;
  }

  updateScrollPosition(date, groups) {
    var allDay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var timeZoneCalculator = getTimeZoneCalculator(this.option('key'));
    var newDate = timeZoneCalculator.createDate(date, {
      path: 'toGrid'
    });
    var inAllDayRow = allDay && this.isAllDayPanelVisible;

    if (this.needUpdateScrollPosition(newDate, groups, inAllDayRow)) {
      this.scrollTo(newDate, groups, inAllDayRow, false);
    }
  }

  needUpdateScrollPosition(date, groups, inAllDayRow) {
    var cells = this._getCellsInViewport(inAllDayRow);

    var groupIndex = this._isGroupsSpecified(groups) ? this._getGroupIndexByResourceId(groups) : 0;
    var time = date.getTime();
    var trimmedTime = dateUtils.trimTime(date).getTime();
    return cells.reduce((currentResult, cell) => {
      var {
        startDate: cellStartDate,
        endDate: cellEndDate,
        groupIndex: cellGroupIndex
      } = this.getCellData(cell);
      var cellStartTime = cellStartDate.getTime();
      var cellEndTime = cellEndDate.getTime();

      if ((!inAllDayRow && cellStartTime <= time && time < cellEndTime || inAllDayRow && trimmedTime === cellStartTime) && groupIndex === cellGroupIndex) {
        return false;
      }

      return currentResult;
    }, true);
  }

  _getCellsInViewport(inAllDayRow) {
    var $scrollable = this.getScrollable().$element();
    var cellHeight = this.getCellHeight();
    var cellWidth = this.getCellWidth();

    var totalColumnCount = this._getTotalCellCount(this._getGroupCount());

    var scrollableScrollTop = this.getScrollableScrollTop();
    var scrollableScrollLeft = this.getScrollableScrollLeft();
    var fullScrolledRowCount = scrollableScrollTop / cellHeight - this.virtualScrollingDispatcher.topVirtualRowsCount;
    var scrolledRowCount = Math.floor(fullScrolledRowCount);

    if (scrollableScrollTop % cellHeight !== 0) {
      scrolledRowCount += 1;
    } // TODO horizontal v-scrolling


    var fullScrolledColumnCount = scrollableScrollLeft / cellWidth;
    var scrolledColumnCount = Math.floor(fullScrolledColumnCount);

    if (scrollableScrollLeft % cellWidth !== 0) {
      scrolledColumnCount += 1;
    }

    var rowCount = Math.floor(fullScrolledRowCount + $scrollable.height() / cellHeight);
    var columnCount = Math.floor(fullScrolledColumnCount + $scrollable.width() / cellWidth);

    var $cells = this._getAllCells(inAllDayRow);

    var result = [];
    $cells.each(function (index) {
      var $cell = $(this);
      var columnIndex = index % totalColumnCount;
      var rowIndex = index / totalColumnCount;

      if (scrolledColumnCount <= columnIndex && columnIndex < columnCount && scrolledRowCount <= rowIndex && rowIndex < rowCount) {
        result.push($cell);
      }
    });
    return result;
  }

  getGroupWidth(groupIndex) {
    var result = this._getCellCount() * this.getCellWidth(); // TODO: refactor after deleting old render

    if (this.isVirtualScrolling()) {
      var groupedData = this.viewDataProvider.groupedDataMap.dateTableGroupedMap;
      var groupLength = groupedData[groupIndex][0].length;
      result = groupLength * this.getCellWidth();
    }

    var position = this.getMaxAllowedPosition(groupIndex);
    var currentPosition = position[groupIndex];

    if (currentPosition) {
      if (this._isRTL()) {
        result = currentPosition - position[groupIndex + 1];
      } else {
        if (groupIndex === 0) {
          result = currentPosition;
        } else {
          result = currentPosition - position[groupIndex - 1];
        }
      }
    }

    return result;
  }

  scrollToTime(hours, minutes, date) {
    if (!this._isValidScrollDate(date)) {
      return;
    }

    var coordinates = this._getScrollCoordinates(hours, minutes, date);

    var scrollable = this.getScrollable();
    scrollable.scrollBy({
      top: coordinates.top - scrollable.scrollTop(),
      left: 0
    });
  }

  scrollTo(date, groups) {
    var allDay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var throwWarning = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    if (!this._isValidScrollDate(date, throwWarning)) {
      return;
    }

    var groupIndex = this._getGroupCount() && groups ? this._getGroupIndexByResourceId(groups) : 0;
    var isScrollToAllDay = allDay && this.isAllDayPanelVisible;

    var coordinates = this._getScrollCoordinates(date.getHours(), date.getMinutes(), date, groupIndex, isScrollToAllDay);

    var scrollable = this.getScrollable();
    var $scrollable = scrollable.$element();
    var offset = this.option('rtlEnabled') ? this.getCellWidth() : 0;
    var scrollableHeight = $scrollable.height();
    var scrollableWidth = $scrollable.width();
    var cellWidth = this.getCellWidth();
    var cellHeight = this.getCellHeight();
    var xShift = (scrollableWidth - cellWidth) / 2;
    var yShift = (scrollableHeight - cellHeight) / 2;
    var left = coordinates.left - scrollable.scrollLeft() - xShift - offset;
    var top = coordinates.top - scrollable.scrollTop() - yShift;

    if (isScrollToAllDay && !this._isVerticalGroupedWorkSpace()) {
      top = 0;
    }

    if (this.option('templatesRenderAsynchronously')) {
      setTimeout(() => {
        scrollable.scrollBy({
          left,
          top
        });
      });
    } else {
      scrollable.scrollBy({
        left,
        top
      });
    }
  }

  _isValidScrollDate(date) {
    var throwWarning = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var min = this.getStartViewDate();
    var max = this.getEndViewDate();

    if (date < min || date > max) {
      throwWarning && errors.log('W1008', date);
      return false;
    }

    return true;
  }

  needApplyCollectorOffset() {
    return false;
  }

  initDragBehavior(scheduler) {
    if (!this.dragBehavior && scheduler) {
      this.dragBehavior = new AppointmentDragBehavior(scheduler);

      this._createDragBehavior(this.getWorkArea());

      this._createDragBehavior(this.getAllDayContainer());

      this._createDragBehavior(this._$allDayPanel);
    }
  }

  _createDragBehavior($element) {
    var getItemData = (itemElement, appointments) => appointments._getItemData(itemElement);

    var getItemSettings = $itemElement => $itemElement.data(APPOINTMENT_SETTINGS_KEY);

    var options = {
      getItemData,
      getItemSettings
    };

    this._createDragBehaviorBase($element, options);
  }

  _createDragBehaviorBase($element, options) {
    var container = this.$element().find(".".concat(FIXED_CONTAINER_CLASS));
    var element = this.$element();

    var attachGeneralEvents = () => this._attachDragEvents(element);

    var detachGeneralEvents = () => this._detachDragEvents(element);

    var isDefaultDraggingMode = this.option('draggingMode') === 'default';
    this.dragBehavior.addTo($element, createDragBehaviorConfig(container, isDefaultDraggingMode, this.dragBehavior, attachGeneralEvents, detachGeneralEvents, () => this._getDroppableCell(), () => this.removeDroppableCellClass(), () => this.getCellWidth(), options));
  }

  _isApplyCompactAppointmentOffset() {
    return this._supportCompactDropDownAppointments();
  }

  _supportCompactDropDownAppointments() {
    return true;
  }

  _formatWeekday(date) {
    return formatWeekday(date);
  }

  _formatWeekdayAndDay(date) {
    return formatWeekday(date) + ' ' + dateLocalization.format(date, 'day');
  }

  removeDroppableCellClass($cellElement) {
    ($cellElement || this._getDroppableCell()).removeClass(DATE_TABLE_DROPPABLE_CELL_CLASS);
  }

  _getCoordinatesByCell($cell) {
    var columnIndex = $cell.index() - this.virtualScrollingDispatcher.leftVirtualCellsCount;
    var rowIndex = $cell.parent().index();

    var isAllDayCell = this._hasAllDayClass($cell);

    var isVerticalGrouping = this._isVerticalGroupedWorkSpace();

    if (!(isAllDayCell && !isVerticalGrouping)) {
      rowIndex -= this.virtualScrollingDispatcher.topVirtualRowsCount;
    }

    return {
      rowIndex,
      columnIndex
    };
  }

  _isShowAllDayPanel() {
    return this.option('showAllDayPanel');
  }

  updateAppointments() {
    var _this$dragBehavior;

    this.invoke('renderAppointments');
    (_this$dragBehavior = this.dragBehavior) === null || _this$dragBehavior === void 0 ? void 0 : _this$dragBehavior.updateDragSource();
  }

  _getTimePanelCells() {
    return this.$element().find(".".concat(TIME_PANEL_CELL_CLASS));
  }

  _getRDateTableProps() {
    return {
      viewData: this.viewDataProvider.viewData,
      dataCellTemplate: this.option('dataCellTemplate'),
      addDateTableClass: !this.option('crossScrollingEnabled') || this.isVirtualScrolling(),
      groupOrientation: this.option('groupOrientation')
    };
  }

  _getTimeOffsetForStartViewDate() {
    var startViewDate = this.getStartViewDate();
    var startDayHour = Math.floor(this.option('startDayHour'));
    var isDSTChange = timeZoneUtils.isTimezoneChangeInDate(startViewDate);

    if (isDSTChange && startDayHour !== startViewDate.getHours()) {
      return toMs('hour');
    }

    return 0;
  }

  _getFirstViewDateWithoutDST() {
    var newFirstViewDate = timeZoneUtils.getDateWithoutTimezoneChange(this._startViewDate);
    newFirstViewDate.setHours(this.option('startDayHour'));
    return newFirstViewDate;
  }

  _updateSelectedCellDataOption(selectedCellData) {
    var correctedSelectedCellData = selectedCellData.map(_ref3 => {
      var {
        startDate,
        endDate,
        allDay,
        groupIndex,
        groups
      } = _ref3;
      return {
        startDate,
        endDate,
        allDay,
        groupIndex,
        groups
      };
    });
    this.option('selectedCellData', correctedSelectedCellData);

    this._selectionChangedAction({
      selectedCellData: correctedSelectedCellData
    });
  }

  _getCellByData(cellData) {
    var {
      startDate,
      groupIndex,
      allDay,
      index
    } = cellData;
    var position = this.viewDataProvider.findCellPositionInMap({
      startDate,
      groupIndex,
      isAllDay: allDay,
      index
    });

    if (!position) {
      return undefined;
    }

    return allDay && !this._isVerticalGroupedWorkSpace() ? this._dom_getAllDayPanelCell(position.columnIndex) : this._dom_getDateCell(position);
  } // Must replace all DOM manipulations


  getDOMElementsMetaData() {
    return this.cache.get('cellElementsMeta', () => {
      var dateTableCells = this._getAllCells(false);

      var columnsCount = this.viewDataProvider.getColumnsCount();

      var dateTable = this._getDateTable(); // We should use getBoundingClientRect in renovation


      var dateTableRect = getBoundingRect(dateTable.get(0));
      var dateTableCellsMeta = [];
      var allDayPanelCellsMeta = [];
      dateTableCells.each((index, cell) => {
        var rowIndex = Math.floor(index / columnsCount);

        if (dateTableCellsMeta.length === rowIndex) {
          dateTableCellsMeta.push([]);
        }

        this._addCellMetaData(dateTableCellsMeta[rowIndex], cell, dateTableRect);
      });

      if (this.isAllDayPanelVisible && !this._isVerticalGroupedWorkSpace()) {
        var allDayCells = this._getAllCells(true);

        var allDayAppointmentContainer = this.getAllDayContainer();
        var allDayPanelRect = getBoundingRect(allDayAppointmentContainer.get(0));
        allDayCells.each((_, cell) => {
          this._addCellMetaData(allDayPanelCellsMeta, cell, allDayPanelRect);
        });
      }

      return {
        dateTableCellsMeta,
        allDayPanelCellsMeta
      };
    });
  }

  _addCellMetaData(cellMetaDataArray, cell, parentRect) {
    var cellRect = getBoundingRect(cell);
    cellMetaDataArray.push({
      left: cellRect.left - parentRect.left,
      top: cellRect.top - parentRect.top,
      width: cellRect.width,
      height: cellRect.height
    });
  }

}

var createDragBehaviorConfig = (container, isDefaultDraggingMode, dragBehavior, attachGeneralEvents, detachGeneralEvents, getDroppableCell, removeDroppableCellClass, getCellWidth, options) => {
  var state = {
    dragElement: undefined,
    itemData: undefined
  };

  var createDragAppointment = (itemData, settings, appointments) => {
    var appointmentIndex = appointments.option('items').length;
    settings.isCompact = false;
    settings.virtual = false;

    var items = appointments._renderItem(appointmentIndex, {
      itemData,
      settings: [settings]
    });

    return items[0];
  };

  var onDragStart = e => {
    if (!isDefaultDraggingMode) {
      detachGeneralEvents();
    }

    var canceled = e.cancel;
    var event = e.event;
    var $itemElement = $(e.itemElement);
    var appointments = e.component._appointments;
    state.itemData = options.getItemData(e.itemElement, appointments);
    var settings = options.getItemSettings($itemElement, e);
    var initialPosition = options.initialPosition;

    if (state.itemData && !state.itemData.disabled) {
      event.data = event.data || {};

      if (!canceled) {
        if (!settings.isCompact) {
          dragBehavior.updateDragSource(state.itemData, settings);
        }

        state.dragElement = createDragAppointment(state.itemData, settings, appointments);
        event.data.itemElement = state.dragElement;
        event.data.initialPosition = initialPosition !== null && initialPosition !== void 0 ? initialPosition : locate($(state.dragElement));
        event.data.itemData = state.itemData;
        event.data.itemSettings = settings;
        dragBehavior.onDragStart(event.data);
        resetPosition($(state.dragElement));
      }
    }
  };

  var onDragMove = () => {
    if (isDefaultDraggingMode) {
      return;
    }

    var MOUSE_IDENT = 10;
    var appointmentWidth = $(state.dragElement).width();
    var isWideAppointment = appointmentWidth > getCellWidth();
    var dragElementContainer = $(state.dragElement).parent();
    var boundingRect = getBoundingRect(dragElementContainer.get(0));
    var newX = boundingRect.left + MOUSE_IDENT;
    var newY = boundingRect.top + MOUSE_IDENT;
    var elements = isWideAppointment ? getElementsFromPoint(newX, newY) : getElementsFromPoint(newX + appointmentWidth / 2, newY);
    var droppableCell = elements.filter(el => el.className.indexOf(DATE_TABLE_CELL_CLASS) > -1 || el.className.indexOf(ALL_DAY_TABLE_CELL_CLASS) > -1)[0];

    if (droppableCell) {
      var oldDroppableCell = getDroppableCell();

      if (!oldDroppableCell.is(droppableCell)) {
        removeDroppableCellClass();
      }

      $(droppableCell).addClass(DATE_TABLE_DROPPABLE_CELL_CLASS);
    }
  };

  var onDragEnd = e => {
    var _state$dragElement;

    if (!isDefaultDraggingMode) {
      attachGeneralEvents();
    }

    if (state.itemData && !state.itemData.disabled) {
      dragBehavior.onDragEnd(e);
    }

    (_state$dragElement = state.dragElement) === null || _state$dragElement === void 0 ? void 0 : _state$dragElement.remove();
    removeDroppableCellClass();
  };

  var cursorOffset = options.isSetCursorOffset ? () => {
    var $dragElement = $(state.dragElement);
    return {
      x: $dragElement.width() / 2,
      y: $dragElement.height() / 2
    };
  } : undefined;
  return {
    container,
    dragTemplate: () => state.dragElement,
    onDragStart,
    onDragMove,
    onDragEnd,
    cursorOffset,
    filter: options.filter
  };
};

export default SchedulerWorkSpace;