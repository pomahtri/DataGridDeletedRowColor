/**
* DevExtreme (cjs/renovation/ui/grids/data_grid/data_grid.js)
* Version: 21.2.0
* Build date: Fri Jul 02 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.defaultOptions = defaultOptions;
exports.DataGrid = exports.defaultOptionRules = exports.viewFunction = void 0;

var _inferno = require("inferno");

var _vdom = require("@devextreme/vdom");

var _data_grid_props = require("./common/data_grid_props");

require("../../../../ui/data_grid/ui.data_grid");

var _widget = require("../../common/widget");

var _datagrid_component = require("./datagrid_component");

var _data_grid_views = require("./data_grid_views");

var _get_updated_options = require("./utils/get_updated_options");

var _window = require("../../../../core/utils/window");

var _utils = require("../../../../core/options/utils");

var _devices = _interopRequireDefault(require("../../../../core/devices"));

var _themes = require("../../../../ui/themes");

var _excluded = ["onOptionChanged"],
    _excluded2 = ["accessKey", "activeStateEnabled", "allowColumnReordering", "allowColumnResizing", "autoNavigateToFocusedRow", "cacheEnabled", "cellHintEnabled", "className", "columnAutoWidth", "columnChooser", "columnFixing", "columnHidingEnabled", "columnMinWidth", "columnResizingMode", "columnWidth", "columns", "commonColumnSettings", "customizeColumns", "customizeExportData", "dataSource", "dateSerializationFormat", "defaultFilterValue", "defaultFocusedColumnIndex", "defaultFocusedRowIndex", "defaultFocusedRowKey", "defaultSelectedRowKeys", "defaultSelectionFilter", "disabled", "editing", "errorRowEnabled", "export", "filterBuilder", "filterBuilderPopup", "filterPanel", "filterRow", "filterSyncEnabled", "filterValue", "filterValueChange", "focusStateEnabled", "focusedColumnIndex", "focusedColumnIndexChange", "focusedRowEnabled", "focusedRowIndex", "focusedRowIndexChange", "focusedRowKey", "focusedRowKeyChange", "groupPanel", "grouping", "headerFilter", "height", "highlightChanges", "hint", "hoverStateEnabled", "keyExpr", "keyboardNavigation", "loadPanel", "loadingTimeout", "masterDetail", "noDataText", "onAdaptiveDetailRowPreparing", "onCellClick", "onCellDblClick", "onCellHoverChanged", "onCellPrepared", "onClick", "onContextMenuPreparing", "onDataErrorOccurred", "onEditingStart", "onEditorPrepared", "onEditorPreparing", "onExported", "onExporting", "onFileSaving", "onFocusedCellChanged", "onFocusedCellChanging", "onFocusedRowChanged", "onFocusedRowChanging", "onInitNewRow", "onKeyDown", "onRowClick", "onRowCollapsed", "onRowCollapsing", "onRowDblClick", "onRowExpanded", "onRowExpanding", "onRowInserted", "onRowInserting", "onRowPrepared", "onRowRemoved", "onRowRemoving", "onRowUpdated", "onRowUpdating", "onRowValidating", "onSaved", "onSaving", "onSelectionChanged", "onToolbarPreparing", "pager", "paging", "remoteOperations", "renderAsync", "repaintChangesOnly", "rowAlternationEnabled", "rowDragging", "rowTemplate", "rtlEnabled", "scrolling", "searchPanel", "selectedRowKeys", "selectedRowKeysChange", "selection", "selectionFilter", "selectionFilterChange", "showBorders", "showColumnHeaders", "showColumnLines", "showRowLines", "sortByGroupSummaryInfo", "sorting", "stateStoring", "summary", "tabIndex", "twoWayBindingEnabled", "useKeyboard", "visible", "width", "wordWrapEnabled"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var aria = {
  role: "presentation"
};
var rowSelector = ".dx-row";

function normalizeProps(props) {
  var result = {};
  Object.keys(props).forEach(function (key) {
    if (props[key] !== undefined) {
      result[key] = props[key];
    }
  });
  return result;
}

var viewFunction = function viewFunction(_ref) {
  var instance = _ref.instance,
      onDimensionChanged = _ref.onDimensionChanged,
      onHoverEnd = _ref.onHoverEnd,
      onHoverStart = _ref.onHoverStart,
      _ref$props = _ref.props,
      accessKey = _ref$props.accessKey,
      activeStateEnabled = _ref$props.activeStateEnabled,
      className = _ref$props.className,
      disabled = _ref$props.disabled,
      focusStateEnabled = _ref$props.focusStateEnabled,
      height = _ref$props.height,
      hint = _ref$props.hint,
      hoverStateEnabled = _ref$props.hoverStateEnabled,
      rtlEnabled = _ref$props.rtlEnabled,
      showBorders = _ref$props.showBorders,
      tabIndex = _ref$props.tabIndex,
      visible = _ref$props.visible,
      width = _ref$props.width,
      restAttributes = _ref.restAttributes,
      widgetElementRef = _ref.widgetElementRef;
  return normalizeProps((0, _inferno.createComponentVNode)(2, _widget.Widget, _extends({
    "rootElementRef": widgetElementRef,
    "accessKey": accessKey,
    "activeStateEnabled": activeStateEnabled,
    "activeStateUnit": rowSelector,
    "aria": aria,
    "className": className,
    "disabled": disabled,
    "focusStateEnabled": focusStateEnabled,
    "height": height,
    "hint": hint,
    "hoverStateEnabled": hoverStateEnabled,
    "rtlEnabled": rtlEnabled,
    "tabIndex": tabIndex,
    "visible": visible,
    "width": width,
    "onHoverStart": onHoverStart,
    "onHoverEnd": onHoverEnd,
    "onDimensionChanged": onDimensionChanged
  }, restAttributes, {
    children: (0, _inferno.createComponentVNode)(2, _data_grid_views.DataGridViews, {
      "instance": instance,
      "showBorders": showBorders
    })
  })));
};

exports.viewFunction = viewFunction;
var defaultOptionRules = (0, _utils.createDefaultOptionRules)([{
  device: function device() {
    return _devices.default.real().platform === "ios";
  },
  options: {
    showRowLines: true
  }
}, {
  device: function device() {
    return _devices.default.real().deviceType !== "desktop";
  },
  options: {
    grouping: {
      expandMode: "rowClick"
    }
  }
}, {
  device: function device() {
    return (0, _themes.isMaterial)((0, _themes.current)());
  },
  options: {
    showRowLines: true,
    showColumnLines: false,
    headerFilter: {
      height: 315
    },
    editing: {
      useIcons: true
    }
  }
}]);
exports.defaultOptionRules = defaultOptionRules;

var getTemplate = function getTemplate(TemplateProp) {
  return TemplateProp && (TemplateProp.defaultProps ? function (props) {
    return normalizeProps((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)));
  } : TemplateProp);
};

var DataGrid = /*#__PURE__*/function (_InfernoWrapperCompon) {
  _inheritsLoose(DataGrid, _InfernoWrapperCompon);

  function DataGrid(props) {
    var _this;

    _this = _InfernoWrapperCompon.call(this, props) || this;
    _this.widgetElementRef = (0, _inferno.createRef)();
    _this.isTwoWayPropUpdating = false;
    _this.state = {
      instance: undefined,
      filterValue: _this.props.filterValue !== undefined ? _this.props.filterValue : _this.props.defaultFilterValue,
      focusedColumnIndex: _this.props.focusedColumnIndex !== undefined ? _this.props.focusedColumnIndex : _this.props.defaultFocusedColumnIndex,
      focusedRowIndex: _this.props.focusedRowIndex !== undefined ? _this.props.focusedRowIndex : _this.props.defaultFocusedRowIndex,
      focusedRowKey: _this.props.focusedRowKey !== undefined ? _this.props.focusedRowKey : _this.props.defaultFocusedRowKey,
      selectedRowKeys: _this.props.selectedRowKeys !== undefined ? _this.props.selectedRowKeys : _this.props.defaultSelectedRowKeys,
      selectionFilter: _this.props.selectionFilter !== undefined ? _this.props.selectionFilter : _this.props.defaultSelectionFilter
    };
    _this.getComponentInstance = _this.getComponentInstance.bind(_assertThisInitialized(_this));
    _this.beginCustomLoading = _this.beginCustomLoading.bind(_assertThisInitialized(_this));
    _this.byKey = _this.byKey.bind(_assertThisInitialized(_this));
    _this.cancelEditData = _this.cancelEditData.bind(_assertThisInitialized(_this));
    _this.cellValue = _this.cellValue.bind(_assertThisInitialized(_this));
    _this.clearFilter = _this.clearFilter.bind(_assertThisInitialized(_this));
    _this.clearSelection = _this.clearSelection.bind(_assertThisInitialized(_this));
    _this.clearSorting = _this.clearSorting.bind(_assertThisInitialized(_this));
    _this.closeEditCell = _this.closeEditCell.bind(_assertThisInitialized(_this));
    _this.collapseAdaptiveDetailRow = _this.collapseAdaptiveDetailRow.bind(_assertThisInitialized(_this));
    _this.columnCount = _this.columnCount.bind(_assertThisInitialized(_this));
    _this.columnOption = _this.columnOption.bind(_assertThisInitialized(_this));
    _this.deleteColumn = _this.deleteColumn.bind(_assertThisInitialized(_this));
    _this.deleteRow = _this.deleteRow.bind(_assertThisInitialized(_this));
    _this.deselectAll = _this.deselectAll.bind(_assertThisInitialized(_this));
    _this.deselectRows = _this.deselectRows.bind(_assertThisInitialized(_this));
    _this.editCell = _this.editCell.bind(_assertThisInitialized(_this));
    _this.editRow = _this.editRow.bind(_assertThisInitialized(_this));
    _this.endCustomLoading = _this.endCustomLoading.bind(_assertThisInitialized(_this));
    _this.expandAdaptiveDetailRow = _this.expandAdaptiveDetailRow.bind(_assertThisInitialized(_this));
    _this.filter = _this.filter.bind(_assertThisInitialized(_this));
    _this.focus = _this.focus.bind(_assertThisInitialized(_this));
    _this.getCellElement = _this.getCellElement.bind(_assertThisInitialized(_this));
    _this.getCombinedFilter = _this.getCombinedFilter.bind(_assertThisInitialized(_this));
    _this.getDataSource = _this.getDataSource.bind(_assertThisInitialized(_this));
    _this.getKeyByRowIndex = _this.getKeyByRowIndex.bind(_assertThisInitialized(_this));
    _this.getRowElement = _this.getRowElement.bind(_assertThisInitialized(_this));
    _this.getRowIndexByKey = _this.getRowIndexByKey.bind(_assertThisInitialized(_this));
    _this.getScrollable = _this.getScrollable.bind(_assertThisInitialized(_this));
    _this.getVisibleColumnIndex = _this.getVisibleColumnIndex.bind(_assertThisInitialized(_this));
    _this.hasEditData = _this.hasEditData.bind(_assertThisInitialized(_this));
    _this.hideColumnChooser = _this.hideColumnChooser.bind(_assertThisInitialized(_this));
    _this.isAdaptiveDetailRowExpanded = _this.isAdaptiveDetailRowExpanded.bind(_assertThisInitialized(_this));
    _this.isRowFocused = _this.isRowFocused.bind(_assertThisInitialized(_this));
    _this.isRowSelected = _this.isRowSelected.bind(_assertThisInitialized(_this));
    _this.keyOf = _this.keyOf.bind(_assertThisInitialized(_this));
    _this.navigateToRow = _this.navigateToRow.bind(_assertThisInitialized(_this));
    _this.pageCount = _this.pageCount.bind(_assertThisInitialized(_this));
    _this.pageIndex = _this.pageIndex.bind(_assertThisInitialized(_this));
    _this.pageSize = _this.pageSize.bind(_assertThisInitialized(_this));
    _this.refresh = _this.refresh.bind(_assertThisInitialized(_this));
    _this.repaintRows = _this.repaintRows.bind(_assertThisInitialized(_this));
    _this.saveEditData = _this.saveEditData.bind(_assertThisInitialized(_this));
    _this.searchByText = _this.searchByText.bind(_assertThisInitialized(_this));
    _this.selectAll = _this.selectAll.bind(_assertThisInitialized(_this));
    _this.selectRows = _this.selectRows.bind(_assertThisInitialized(_this));
    _this.selectRowsByIndexes = _this.selectRowsByIndexes.bind(_assertThisInitialized(_this));
    _this.showColumnChooser = _this.showColumnChooser.bind(_assertThisInitialized(_this));
    _this.undeleteRow = _this.undeleteRow.bind(_assertThisInitialized(_this));
    _this.updateDimensions = _this.updateDimensions.bind(_assertThisInitialized(_this));
    _this.resize = _this.resize.bind(_assertThisInitialized(_this));
    _this.addColumn = _this.addColumn.bind(_assertThisInitialized(_this));
    _this.addRow = _this.addRow.bind(_assertThisInitialized(_this));
    _this.clearGrouping = _this.clearGrouping.bind(_assertThisInitialized(_this));
    _this.collapseAll = _this.collapseAll.bind(_assertThisInitialized(_this));
    _this.collapseRow = _this.collapseRow.bind(_assertThisInitialized(_this));
    _this.expandAll = _this.expandAll.bind(_assertThisInitialized(_this));
    _this.expandRow = _this.expandRow.bind(_assertThisInitialized(_this));
    _this.exportToExcel = _this.exportToExcel.bind(_assertThisInitialized(_this));
    _this.getSelectedRowKeys = _this.getSelectedRowKeys.bind(_assertThisInitialized(_this));
    _this.getSelectedRowsData = _this.getSelectedRowsData.bind(_assertThisInitialized(_this));
    _this.getTotalSummaryValue = _this.getTotalSummaryValue.bind(_assertThisInitialized(_this));
    _this.getVisibleColumns = _this.getVisibleColumns.bind(_assertThisInitialized(_this));
    _this.getVisibleRows = _this.getVisibleRows.bind(_assertThisInitialized(_this));
    _this.isRowExpanded = _this.isRowExpanded.bind(_assertThisInitialized(_this));
    _this.totalCount = _this.totalCount.bind(_assertThisInitialized(_this));
    _this.isScrollbarVisible = _this.isScrollbarVisible.bind(_assertThisInitialized(_this));
    _this.getTopVisibleRowData = _this.getTopVisibleRowData.bind(_assertThisInitialized(_this));
    _this.getScrollbarWidth = _this.getScrollbarWidth.bind(_assertThisInitialized(_this));
    _this.getDataProvider = _this.getDataProvider.bind(_assertThisInitialized(_this));
    _this.updateOptions = _this.updateOptions.bind(_assertThisInitialized(_this));
    _this.dispose = _this.dispose.bind(_assertThisInitialized(_this));
    _this.setupInstance = _this.setupInstance.bind(_assertThisInitialized(_this));
    _this.instanceOptionChangedHandler = _this.instanceOptionChangedHandler.bind(_assertThisInitialized(_this));
    _this.updateTwoWayValue = _this.updateTwoWayValue.bind(_assertThisInitialized(_this));
    _this.onHoverStart = _this.onHoverStart.bind(_assertThisInitialized(_this));
    _this.onHoverEnd = _this.onHoverEnd.bind(_assertThisInitialized(_this));
    _this.onDimensionChanged = _this.onDimensionChanged.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = DataGrid.prototype;

  _proto.createEffects = function createEffects() {
    return [new _vdom.InfernoEffect(this.updateOptions, [this.state.instance, this.props, this.__state_filterValue, this.__state_focusedColumnIndex, this.__state_focusedRowIndex, this.__state_focusedRowKey, this.__state_selectedRowKeys, this.__state_selectionFilter]), new _vdom.InfernoEffect(this.dispose, []), new _vdom.InfernoEffect(this.setupInstance, []), (0, _vdom.createReRenderEffect)()];
  };

  _proto.updateEffects = function updateEffects() {
    var _this$_effects$;

    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.state.instance, this.props, this.__state_filterValue, this.__state_focusedColumnIndex, this.__state_focusedRowIndex, this.__state_focusedRowKey, this.__state_selectedRowKeys, this.__state_selectionFilter]);
  };

  _proto.updateOptions = function updateOptions() {
    var _this2 = this;

    if (this.state.instance && this.prevProps && !this.isTwoWayPropUpdating) {
      var updatedOptions = (0, _get_updated_options.getUpdatedOptions)(this.prevProps, _extends({}, this.props, {
        filterValue: this.props.filterValue !== undefined ? this.props.filterValue : this.state.filterValue,
        focusedColumnIndex: this.props.focusedColumnIndex !== undefined ? this.props.focusedColumnIndex : this.state.focusedColumnIndex,
        focusedRowIndex: this.props.focusedRowIndex !== undefined ? this.props.focusedRowIndex : this.state.focusedRowIndex,
        focusedRowKey: this.props.focusedRowKey !== undefined ? this.props.focusedRowKey : this.state.focusedRowKey,
        selectedRowKeys: this.props.selectedRowKeys !== undefined ? this.props.selectedRowKeys : this.state.selectedRowKeys,
        selectionFilter: this.props.selectionFilter !== undefined ? this.props.selectionFilter : this.state.selectionFilter
      }));
      this.state.instance.beginUpdate();
      updatedOptions.forEach(function (_ref2) {
        var path = _ref2.path,
            previousValue = _ref2.previousValue,
            value = _ref2.value;

        _this2.state.instance._options.silent(path, previousValue);

        _this2.state.instance.option(path, value);
      });
      this.prevProps = _extends({}, this.props, {
        filterValue: this.props.filterValue !== undefined ? this.props.filterValue : this.state.filterValue,
        focusedColumnIndex: this.props.focusedColumnIndex !== undefined ? this.props.focusedColumnIndex : this.state.focusedColumnIndex,
        focusedRowIndex: this.props.focusedRowIndex !== undefined ? this.props.focusedRowIndex : this.state.focusedRowIndex,
        focusedRowKey: this.props.focusedRowKey !== undefined ? this.props.focusedRowKey : this.state.focusedRowKey,
        selectedRowKeys: this.props.selectedRowKeys !== undefined ? this.props.selectedRowKeys : this.state.selectedRowKeys,
        selectionFilter: this.props.selectionFilter !== undefined ? this.props.selectionFilter : this.state.selectionFilter
      });
      this.state.instance.endUpdate();
    } else {
      this.prevProps = _extends({}, this.props, {
        filterValue: this.props.filterValue !== undefined ? this.props.filterValue : this.state.filterValue,
        focusedColumnIndex: this.props.focusedColumnIndex !== undefined ? this.props.focusedColumnIndex : this.state.focusedColumnIndex,
        focusedRowIndex: this.props.focusedRowIndex !== undefined ? this.props.focusedRowIndex : this.state.focusedRowIndex,
        focusedRowKey: this.props.focusedRowKey !== undefined ? this.props.focusedRowKey : this.state.focusedRowKey,
        selectedRowKeys: this.props.selectedRowKeys !== undefined ? this.props.selectedRowKeys : this.state.selectedRowKeys,
        selectionFilter: this.props.selectionFilter !== undefined ? this.props.selectionFilter : this.state.selectionFilter
      });
    }
  };

  _proto.dispose = function dispose() {
    var _this3 = this;

    return function () {
      _this3.state.instance.dispose();
    };
  };

  _proto.setupInstance = function setupInstance() {
    var _this$widgetElementRe;

    var element = (_this$widgetElementRe = this.widgetElementRef) === null || _this$widgetElementRe === void 0 ? void 0 : _this$widgetElementRe.current;

    var _this$props$filterVal = _extends({}, _extends({}, this.props, {
      filterValue: this.props.filterValue !== undefined ? this.props.filterValue : this.state.filterValue,
      focusedColumnIndex: this.props.focusedColumnIndex !== undefined ? this.props.focusedColumnIndex : this.state.focusedColumnIndex,
      focusedRowIndex: this.props.focusedRowIndex !== undefined ? this.props.focusedRowIndex : this.state.focusedRowIndex,
      focusedRowKey: this.props.focusedRowKey !== undefined ? this.props.focusedRowKey : this.state.focusedRowKey,
      selectedRowKeys: this.props.selectedRowKeys !== undefined ? this.props.selectedRowKeys : this.state.selectedRowKeys,
      selectionFilter: this.props.selectionFilter !== undefined ? this.props.selectionFilter : this.state.selectionFilter
    }), {
      onContentReady: this.restAttributes.onContentReady
    }),
        onOptionChanged = _this$props$filterVal.onOptionChanged,
        restProps = _objectWithoutProperties(_this$props$filterVal, _excluded);

    var instance = new _datagrid_component.DataGridComponent(element, normalizeProps(restProps));

    if ((0, _window.hasWindow)()) {
      instance.getController("resizing").updateSize(element);
    }

    instance.on("optionChanged", this.instanceOptionChangedHandler.bind(this));
    this.setState(function (state) {
      return _extends({}, state, {
        instance: instance
      });
    });
  };

  _proto.instanceOptionChangedHandler = function instanceOptionChangedHandler(e) {
    try {
      this.isTwoWayPropUpdating = true;
      this.updateTwoWayValue(e);
    } finally {
      this.isTwoWayPropUpdating = false;
    }
  };

  _proto.updateTwoWayValue = function updateTwoWayValue(e) {
    var optionValue = e.component.option(e.fullName);
    var isValueCorrect = e.value === optionValue;

    if (e.value !== e.previousValue && isValueCorrect) {
      if (e.name === "editing" && this.props.editing) {
        if (e.fullName === "editing.changes") {
          this.props.editing.changes = e.value;
        }

        if (e.fullName === "editing.editRowKey") {
          this.props.editing.editRowKey = e.value;
        }

        if (e.fullName === "editing.editColumnName") {
          this.props.editing.editColumnName = e.value;
        }
      }

      if (e.fullName === "searchPanel.text" && this.props.searchPanel) {
        this.props.searchPanel.text = e.value;
      }

      if (e.fullName === "focusedRowKey") {
        {
          var __newValue;

          this.setState(function (state) {
            __newValue = e.value;
            return {
              focusedRowKey: __newValue
            };
          });
          this.props.focusedRowKeyChange(__newValue);
        }
      }

      if (e.fullName === "focusedRowIndex") {
        {
          var _newValue;

          this.setState(function (state) {
            _newValue = e.value;
            return {
              focusedRowIndex: _newValue
            };
          });
          this.props.focusedRowIndexChange(_newValue);
        }
      }

      if (e.fullName === "focusedColumnIndex") {
        {
          var _newValue2;

          this.setState(function (state) {
            _newValue2 = e.value;
            return {
              focusedColumnIndex: _newValue2
            };
          });
          this.props.focusedColumnIndexChange(_newValue2);
        }
      }

      if (e.fullName === "filterValue" && (this.props.filterValue !== undefined ? this.props.filterValue : this.state.filterValue) !== e.value) {
        {
          var _newValue3;

          this.setState(function (state) {
            _newValue3 = e.value;
            return {
              filterValue: _newValue3
            };
          });
          this.props.filterValueChange(_newValue3);
        }
      }

      if (e.fullName === "selectedRowKeys") {
        {
          var _newValue4;

          this.setState(function (state) {
            _newValue4 = e.value;
            return {
              selectedRowKeys: _newValue4
            };
          });
          this.props.selectedRowKeysChange(_newValue4);
        }
      }

      if (e.fullName === "selectionFilter") {
        {
          var _newValue5;

          this.setState(function (state) {
            _newValue5 = e.value;
            return {
              selectionFilter: _newValue5
            };
          });
          this.props.selectionFilterChange(_newValue5);
        }
      }
    }
  };

  _proto.onHoverStart = function onHoverStart(event) {
    event.currentTarget.classList.add("dx-state-hover");
  };

  _proto.onHoverEnd = function onHoverEnd(event) {
    event.currentTarget.classList.remove("dx-state-hover");
  };

  _proto.onDimensionChanged = function onDimensionChanged() {
    var _this$state$instance;

    (_this$state$instance = this.state.instance) === null || _this$state$instance === void 0 ? void 0 : _this$state$instance.updateDimensions(true);
  };

  _proto.getComponentInstance = function getComponentInstance() {
    return this.state.instance;
  };

  _proto.beginCustomLoading = function beginCustomLoading(messageText) {
    var _this$state$instance2;

    return (_this$state$instance2 = this.state.instance) === null || _this$state$instance2 === void 0 ? void 0 : _this$state$instance2.beginCustomLoading(messageText);
  };

  _proto.byKey = function byKey(key) {
    var _this$state$instance3;

    return (_this$state$instance3 = this.state.instance) === null || _this$state$instance3 === void 0 ? void 0 : _this$state$instance3.byKey(key);
  };

  _proto.cancelEditData = function cancelEditData() {
    var _this$state$instance4;

    return (_this$state$instance4 = this.state.instance) === null || _this$state$instance4 === void 0 ? void 0 : _this$state$instance4.cancelEditData();
  };

  _proto.cellValue = function cellValue(rowIndex, dataField, value) {
    var _this$state$instance5;

    return (_this$state$instance5 = this.state.instance) === null || _this$state$instance5 === void 0 ? void 0 : _this$state$instance5.cellValue(rowIndex, dataField, value);
  };

  _proto.clearFilter = function clearFilter(filterName) {
    var _this$state$instance6;

    return (_this$state$instance6 = this.state.instance) === null || _this$state$instance6 === void 0 ? void 0 : _this$state$instance6.clearFilter(filterName);
  };

  _proto.clearSelection = function clearSelection() {
    var _this$state$instance7;

    return (_this$state$instance7 = this.state.instance) === null || _this$state$instance7 === void 0 ? void 0 : _this$state$instance7.clearSelection();
  };

  _proto.clearSorting = function clearSorting() {
    var _this$state$instance8;

    return (_this$state$instance8 = this.state.instance) === null || _this$state$instance8 === void 0 ? void 0 : _this$state$instance8.clearSorting();
  };

  _proto.closeEditCell = function closeEditCell() {
    var _this$state$instance9;

    return (_this$state$instance9 = this.state.instance) === null || _this$state$instance9 === void 0 ? void 0 : _this$state$instance9.closeEditCell();
  };

  _proto.collapseAdaptiveDetailRow = function collapseAdaptiveDetailRow() {
    var _this$state$instance10;

    return (_this$state$instance10 = this.state.instance) === null || _this$state$instance10 === void 0 ? void 0 : _this$state$instance10.collapseAdaptiveDetailRow();
  };

  _proto.columnCount = function columnCount() {
    var _this$state$instance11;

    return (_this$state$instance11 = this.state.instance) === null || _this$state$instance11 === void 0 ? void 0 : _this$state$instance11.columnCount();
  };

  _proto.columnOption = function columnOption(id, optionName, optionValue) {
    if (this.state.instance) {
      if (arguments.length === 1 || optionName === undefined) {
        return this.state.instance.columnOption(id);
      }

      if (arguments.length === 2) {
        return this.state.instance.columnOption(id, optionName);
      }

      return this.state.instance.columnOption(id, optionName, optionValue);
    }

    return null;
  };

  _proto.deleteColumn = function deleteColumn(id) {
    var _this$state$instance12;

    return (_this$state$instance12 = this.state.instance) === null || _this$state$instance12 === void 0 ? void 0 : _this$state$instance12.deleteColumn(id);
  };

  _proto.deleteRow = function deleteRow(rowIndex) {
    var _this$state$instance13;

    return (_this$state$instance13 = this.state.instance) === null || _this$state$instance13 === void 0 ? void 0 : _this$state$instance13.deleteRow(rowIndex);
  };

  _proto.deselectAll = function deselectAll() {
    var _this$state$instance14;

    return (_this$state$instance14 = this.state.instance) === null || _this$state$instance14 === void 0 ? void 0 : _this$state$instance14.deselectAll();
  };

  _proto.deselectRows = function deselectRows(keys) {
    var _this$state$instance15;

    return (_this$state$instance15 = this.state.instance) === null || _this$state$instance15 === void 0 ? void 0 : _this$state$instance15.deselectRows(keys);
  };

  _proto.editCell = function editCell(rowIndex, dataFieldColumnIndex) {
    var _this$state$instance16;

    return (_this$state$instance16 = this.state.instance) === null || _this$state$instance16 === void 0 ? void 0 : _this$state$instance16.editCell(rowIndex, dataFieldColumnIndex);
  };

  _proto.editRow = function editRow(rowIndex) {
    var _this$state$instance17;

    return (_this$state$instance17 = this.state.instance) === null || _this$state$instance17 === void 0 ? void 0 : _this$state$instance17.editRow(rowIndex);
  };

  _proto.endCustomLoading = function endCustomLoading() {
    var _this$state$instance18;

    return (_this$state$instance18 = this.state.instance) === null || _this$state$instance18 === void 0 ? void 0 : _this$state$instance18.endCustomLoading();
  };

  _proto.expandAdaptiveDetailRow = function expandAdaptiveDetailRow(key) {
    var _this$state$instance19;

    return (_this$state$instance19 = this.state.instance) === null || _this$state$instance19 === void 0 ? void 0 : _this$state$instance19.expandAdaptiveDetailRow(key);
  };

  _proto.filter = function filter(filterExpr) {
    var _this$state$instance20;

    return (_this$state$instance20 = this.state.instance) === null || _this$state$instance20 === void 0 ? void 0 : _this$state$instance20.filter(filterExpr);
  };

  _proto.focus = function focus(element) {
    var _this$state$instance21;

    return (_this$state$instance21 = this.state.instance) === null || _this$state$instance21 === void 0 ? void 0 : _this$state$instance21.focus(element);
  };

  _proto.getCellElement = function getCellElement(rowIndex, dataField) {
    var _this$state$instance22;

    return (_this$state$instance22 = this.state.instance) === null || _this$state$instance22 === void 0 ? void 0 : _this$state$instance22.getCellElement(rowIndex, dataField);
  };

  _proto.getCombinedFilter = function getCombinedFilter(returnDataField) {
    var _this$state$instance23;

    return (_this$state$instance23 = this.state.instance) === null || _this$state$instance23 === void 0 ? void 0 : _this$state$instance23.getCombinedFilter(returnDataField);
  };

  _proto.getDataSource = function getDataSource() {
    var _this$state$instance24;

    return (_this$state$instance24 = this.state.instance) === null || _this$state$instance24 === void 0 ? void 0 : _this$state$instance24.getDataSource();
  };

  _proto.getKeyByRowIndex = function getKeyByRowIndex(rowIndex) {
    var _this$state$instance25;

    return (_this$state$instance25 = this.state.instance) === null || _this$state$instance25 === void 0 ? void 0 : _this$state$instance25.getKeyByRowIndex(rowIndex);
  };

  _proto.getRowElement = function getRowElement(rowIndex) {
    var _this$state$instance26;

    return (_this$state$instance26 = this.state.instance) === null || _this$state$instance26 === void 0 ? void 0 : _this$state$instance26.getRowElement(rowIndex);
  };

  _proto.getRowIndexByKey = function getRowIndexByKey(key) {
    var _this$state$instance27;

    return (_this$state$instance27 = this.state.instance) === null || _this$state$instance27 === void 0 ? void 0 : _this$state$instance27.getRowIndexByKey(key);
  };

  _proto.getScrollable = function getScrollable() {
    var _this$state$instance28;

    return (_this$state$instance28 = this.state.instance) === null || _this$state$instance28 === void 0 ? void 0 : _this$state$instance28.getScrollable();
  };

  _proto.getVisibleColumnIndex = function getVisibleColumnIndex(id) {
    var _this$state$instance29;

    return (_this$state$instance29 = this.state.instance) === null || _this$state$instance29 === void 0 ? void 0 : _this$state$instance29.getVisibleColumnIndex(id);
  };

  _proto.hasEditData = function hasEditData() {
    var _this$state$instance30;

    return (_this$state$instance30 = this.state.instance) === null || _this$state$instance30 === void 0 ? void 0 : _this$state$instance30.hasEditData();
  };

  _proto.hideColumnChooser = function hideColumnChooser() {
    var _this$state$instance31;

    return (_this$state$instance31 = this.state.instance) === null || _this$state$instance31 === void 0 ? void 0 : _this$state$instance31.hideColumnChooser();
  };

  _proto.isAdaptiveDetailRowExpanded = function isAdaptiveDetailRowExpanded(key) {
    var _this$state$instance32;

    return (_this$state$instance32 = this.state.instance) === null || _this$state$instance32 === void 0 ? void 0 : _this$state$instance32.isAdaptiveDetailRowExpanded(key);
  };

  _proto.isRowFocused = function isRowFocused(key) {
    var _this$state$instance33;

    return (_this$state$instance33 = this.state.instance) === null || _this$state$instance33 === void 0 ? void 0 : _this$state$instance33.isRowFocused(key);
  };

  _proto.isRowSelected = function isRowSelected(key) {
    var _this$state$instance34;

    return (_this$state$instance34 = this.state.instance) === null || _this$state$instance34 === void 0 ? void 0 : _this$state$instance34.isRowSelected(key);
  };

  _proto.keyOf = function keyOf(obj) {
    var _this$state$instance35;

    return (_this$state$instance35 = this.state.instance) === null || _this$state$instance35 === void 0 ? void 0 : _this$state$instance35.keyOf(obj);
  };

  _proto.navigateToRow = function navigateToRow(key) {
    var _this$state$instance36;

    return (_this$state$instance36 = this.state.instance) === null || _this$state$instance36 === void 0 ? void 0 : _this$state$instance36.navigateToRow(key);
  };

  _proto.pageCount = function pageCount() {
    var _this$state$instance37;

    return (_this$state$instance37 = this.state.instance) === null || _this$state$instance37 === void 0 ? void 0 : _this$state$instance37.pageCount();
  };

  _proto.pageIndex = function pageIndex(newIndex) {
    var _this$state$instance38;

    return (_this$state$instance38 = this.state.instance) === null || _this$state$instance38 === void 0 ? void 0 : _this$state$instance38.pageIndex(newIndex);
  };

  _proto.pageSize = function pageSize(value) {
    var _this$state$instance39;

    return (_this$state$instance39 = this.state.instance) === null || _this$state$instance39 === void 0 ? void 0 : _this$state$instance39.pageSize(value);
  };

  _proto.refresh = function refresh(changesOnly) {
    var _this$state$instance40;

    return (_this$state$instance40 = this.state.instance) === null || _this$state$instance40 === void 0 ? void 0 : _this$state$instance40.refresh(changesOnly);
  };

  _proto.repaintRows = function repaintRows(rowIndexes) {
    var _this$state$instance41;

    return (_this$state$instance41 = this.state.instance) === null || _this$state$instance41 === void 0 ? void 0 : _this$state$instance41.repaintRows(rowIndexes);
  };

  _proto.saveEditData = function saveEditData() {
    var _this$state$instance42;

    return (_this$state$instance42 = this.state.instance) === null || _this$state$instance42 === void 0 ? void 0 : _this$state$instance42.saveEditData();
  };

  _proto.searchByText = function searchByText(text) {
    var _this$state$instance43;

    return (_this$state$instance43 = this.state.instance) === null || _this$state$instance43 === void 0 ? void 0 : _this$state$instance43.searchByText(text);
  };

  _proto.selectAll = function selectAll() {
    var _this$state$instance44;

    return (_this$state$instance44 = this.state.instance) === null || _this$state$instance44 === void 0 ? void 0 : _this$state$instance44.selectAll();
  };

  _proto.selectRows = function selectRows(keys, preserve) {
    var _this$state$instance45;

    return (_this$state$instance45 = this.state.instance) === null || _this$state$instance45 === void 0 ? void 0 : _this$state$instance45.selectRows(keys, preserve);
  };

  _proto.selectRowsByIndexes = function selectRowsByIndexes(indexes) {
    var _this$state$instance46;

    return (_this$state$instance46 = this.state.instance) === null || _this$state$instance46 === void 0 ? void 0 : _this$state$instance46.selectRowsByIndexes(indexes);
  };

  _proto.showColumnChooser = function showColumnChooser() {
    var _this$state$instance47;

    return (_this$state$instance47 = this.state.instance) === null || _this$state$instance47 === void 0 ? void 0 : _this$state$instance47.showColumnChooser();
  };

  _proto.undeleteRow = function undeleteRow(rowIndex) {
    var _this$state$instance48;

    return (_this$state$instance48 = this.state.instance) === null || _this$state$instance48 === void 0 ? void 0 : _this$state$instance48.undeleteRow(rowIndex);
  };

  _proto.updateDimensions = function updateDimensions() {
    var _this$state$instance49;

    return (_this$state$instance49 = this.state.instance) === null || _this$state$instance49 === void 0 ? void 0 : _this$state$instance49.updateDimensions();
  };

  _proto.resize = function resize() {
    var _this$state$instance50;

    return (_this$state$instance50 = this.state.instance) === null || _this$state$instance50 === void 0 ? void 0 : _this$state$instance50.resize();
  };

  _proto.addColumn = function addColumn(columnOptions) {
    var _this$state$instance51;

    return (_this$state$instance51 = this.state.instance) === null || _this$state$instance51 === void 0 ? void 0 : _this$state$instance51.addColumn(columnOptions);
  };

  _proto.addRow = function addRow() {
    var _this$state$instance52;

    return (_this$state$instance52 = this.state.instance) === null || _this$state$instance52 === void 0 ? void 0 : _this$state$instance52.addRow();
  };

  _proto.clearGrouping = function clearGrouping() {
    var _this$state$instance53;

    return (_this$state$instance53 = this.state.instance) === null || _this$state$instance53 === void 0 ? void 0 : _this$state$instance53.clearGrouping();
  };

  _proto.collapseAll = function collapseAll(groupIndex) {
    var _this$state$instance54;

    return (_this$state$instance54 = this.state.instance) === null || _this$state$instance54 === void 0 ? void 0 : _this$state$instance54.collapseAll(groupIndex);
  };

  _proto.collapseRow = function collapseRow(key) {
    var _this$state$instance55;

    return (_this$state$instance55 = this.state.instance) === null || _this$state$instance55 === void 0 ? void 0 : _this$state$instance55.collapseRow(key);
  };

  _proto.expandAll = function expandAll(groupIndex) {
    var _this$state$instance56;

    return (_this$state$instance56 = this.state.instance) === null || _this$state$instance56 === void 0 ? void 0 : _this$state$instance56.expandAll(groupIndex);
  };

  _proto.expandRow = function expandRow(key) {
    var _this$state$instance57;

    return (_this$state$instance57 = this.state.instance) === null || _this$state$instance57 === void 0 ? void 0 : _this$state$instance57.expandRow(key);
  };

  _proto.exportToExcel = function exportToExcel(selectionOnly) {
    var _this$state$instance58;

    return (_this$state$instance58 = this.state.instance) === null || _this$state$instance58 === void 0 ? void 0 : _this$state$instance58.exportToExcel(selectionOnly);
  };

  _proto.getSelectedRowKeys = function getSelectedRowKeys() {
    var _this$state$instance59;

    return (_this$state$instance59 = this.state.instance) === null || _this$state$instance59 === void 0 ? void 0 : _this$state$instance59.getSelectedRowKeys();
  };

  _proto.getSelectedRowsData = function getSelectedRowsData() {
    var _this$state$instance60;

    return (_this$state$instance60 = this.state.instance) === null || _this$state$instance60 === void 0 ? void 0 : _this$state$instance60.getSelectedRowsData();
  };

  _proto.getTotalSummaryValue = function getTotalSummaryValue(summaryItemName) {
    var _this$state$instance61;

    return (_this$state$instance61 = this.state.instance) === null || _this$state$instance61 === void 0 ? void 0 : _this$state$instance61.getTotalSummaryValue(summaryItemName);
  };

  _proto.getVisibleColumns = function getVisibleColumns(headerLevel) {
    var _this$state$instance62;

    return (_this$state$instance62 = this.state.instance) === null || _this$state$instance62 === void 0 ? void 0 : _this$state$instance62.getVisibleColumns(headerLevel);
  };

  _proto.getVisibleRows = function getVisibleRows() {
    var _this$state$instance63;

    return (_this$state$instance63 = this.state.instance) === null || _this$state$instance63 === void 0 ? void 0 : _this$state$instance63.getVisibleRows();
  };

  _proto.isRowExpanded = function isRowExpanded(key) {
    var _this$state$instance64;

    return (_this$state$instance64 = this.state.instance) === null || _this$state$instance64 === void 0 ? void 0 : _this$state$instance64.isRowExpanded(key);
  };

  _proto.totalCount = function totalCount() {
    var _this$state$instance65;

    return (_this$state$instance65 = this.state.instance) === null || _this$state$instance65 === void 0 ? void 0 : _this$state$instance65.totalCount();
  };

  _proto.isScrollbarVisible = function isScrollbarVisible() {
    var _this$state$instance66;

    return (_this$state$instance66 = this.state.instance) === null || _this$state$instance66 === void 0 ? void 0 : _this$state$instance66.isScrollbarVisible();
  };

  _proto.getTopVisibleRowData = function getTopVisibleRowData() {
    var _this$state$instance67;

    return (_this$state$instance67 = this.state.instance) === null || _this$state$instance67 === void 0 ? void 0 : _this$state$instance67.getTopVisibleRowData();
  };

  _proto.getScrollbarWidth = function getScrollbarWidth(isHorizontal) {
    var _this$state$instance68;

    return (_this$state$instance68 = this.state.instance) === null || _this$state$instance68 === void 0 ? void 0 : _this$state$instance68.getScrollbarWidth(isHorizontal);
  };

  _proto.getDataProvider = function getDataProvider(selectedRowsOnly) {
    var _this$state$instance69;

    return (_this$state$instance69 = this.state.instance) === null || _this$state$instance69 === void 0 ? void 0 : _this$state$instance69.getDataProvider(selectedRowsOnly);
  };

  _proto.render = function render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        filterValue: this.props.filterValue !== undefined ? this.props.filterValue : this.state.filterValue,
        focusedColumnIndex: this.props.focusedColumnIndex !== undefined ? this.props.focusedColumnIndex : this.state.focusedColumnIndex,
        focusedRowIndex: this.props.focusedRowIndex !== undefined ? this.props.focusedRowIndex : this.state.focusedRowIndex,
        focusedRowKey: this.props.focusedRowKey !== undefined ? this.props.focusedRowKey : this.state.focusedRowKey,
        selectedRowKeys: this.props.selectedRowKeys !== undefined ? this.props.selectedRowKeys : this.state.selectedRowKeys,
        selectionFilter: this.props.selectionFilter !== undefined ? this.props.selectionFilter : this.state.selectionFilter,
        rowTemplate: getTemplate(props.rowTemplate)
      }),
      instance: this.state.instance,
      widgetElementRef: this.widgetElementRef,
      instanceOptionChangedHandler: this.instanceOptionChangedHandler,
      updateTwoWayValue: this.updateTwoWayValue,
      onHoverStart: this.onHoverStart,
      onHoverEnd: this.onHoverEnd,
      onDimensionChanged: this.onDimensionChanged,
      restAttributes: this.restAttributes
    });
  };

  _createClass(DataGrid, [{
    key: "restAttributes",
    get: function get() {
      var _this$props$filterVal2 = _extends({}, this.props, {
        filterValue: this.props.filterValue !== undefined ? this.props.filterValue : this.state.filterValue,
        focusedColumnIndex: this.props.focusedColumnIndex !== undefined ? this.props.focusedColumnIndex : this.state.focusedColumnIndex,
        focusedRowIndex: this.props.focusedRowIndex !== undefined ? this.props.focusedRowIndex : this.state.focusedRowIndex,
        focusedRowKey: this.props.focusedRowKey !== undefined ? this.props.focusedRowKey : this.state.focusedRowKey,
        selectedRowKeys: this.props.selectedRowKeys !== undefined ? this.props.selectedRowKeys : this.state.selectedRowKeys,
        selectionFilter: this.props.selectionFilter !== undefined ? this.props.selectionFilter : this.state.selectionFilter
      }),
          accessKey = _this$props$filterVal2.accessKey,
          activeStateEnabled = _this$props$filterVal2.activeStateEnabled,
          allowColumnReordering = _this$props$filterVal2.allowColumnReordering,
          allowColumnResizing = _this$props$filterVal2.allowColumnResizing,
          autoNavigateToFocusedRow = _this$props$filterVal2.autoNavigateToFocusedRow,
          cacheEnabled = _this$props$filterVal2.cacheEnabled,
          cellHintEnabled = _this$props$filterVal2.cellHintEnabled,
          className = _this$props$filterVal2.className,
          columnAutoWidth = _this$props$filterVal2.columnAutoWidth,
          columnChooser = _this$props$filterVal2.columnChooser,
          columnFixing = _this$props$filterVal2.columnFixing,
          columnHidingEnabled = _this$props$filterVal2.columnHidingEnabled,
          columnMinWidth = _this$props$filterVal2.columnMinWidth,
          columnResizingMode = _this$props$filterVal2.columnResizingMode,
          columnWidth = _this$props$filterVal2.columnWidth,
          columns = _this$props$filterVal2.columns,
          commonColumnSettings = _this$props$filterVal2.commonColumnSettings,
          customizeColumns = _this$props$filterVal2.customizeColumns,
          customizeExportData = _this$props$filterVal2.customizeExportData,
          dataSource = _this$props$filterVal2.dataSource,
          dateSerializationFormat = _this$props$filterVal2.dateSerializationFormat,
          defaultFilterValue = _this$props$filterVal2.defaultFilterValue,
          defaultFocusedColumnIndex = _this$props$filterVal2.defaultFocusedColumnIndex,
          defaultFocusedRowIndex = _this$props$filterVal2.defaultFocusedRowIndex,
          defaultFocusedRowKey = _this$props$filterVal2.defaultFocusedRowKey,
          defaultSelectedRowKeys = _this$props$filterVal2.defaultSelectedRowKeys,
          defaultSelectionFilter = _this$props$filterVal2.defaultSelectionFilter,
          disabled = _this$props$filterVal2.disabled,
          editing = _this$props$filterVal2.editing,
          errorRowEnabled = _this$props$filterVal2.errorRowEnabled,
          exportProp = _this$props$filterVal2.export,
          filterBuilder = _this$props$filterVal2.filterBuilder,
          filterBuilderPopup = _this$props$filterVal2.filterBuilderPopup,
          filterPanel = _this$props$filterVal2.filterPanel,
          filterRow = _this$props$filterVal2.filterRow,
          filterSyncEnabled = _this$props$filterVal2.filterSyncEnabled,
          filterValue = _this$props$filterVal2.filterValue,
          filterValueChange = _this$props$filterVal2.filterValueChange,
          focusStateEnabled = _this$props$filterVal2.focusStateEnabled,
          focusedColumnIndex = _this$props$filterVal2.focusedColumnIndex,
          focusedColumnIndexChange = _this$props$filterVal2.focusedColumnIndexChange,
          focusedRowEnabled = _this$props$filterVal2.focusedRowEnabled,
          focusedRowIndex = _this$props$filterVal2.focusedRowIndex,
          focusedRowIndexChange = _this$props$filterVal2.focusedRowIndexChange,
          focusedRowKey = _this$props$filterVal2.focusedRowKey,
          focusedRowKeyChange = _this$props$filterVal2.focusedRowKeyChange,
          groupPanel = _this$props$filterVal2.groupPanel,
          grouping = _this$props$filterVal2.grouping,
          headerFilter = _this$props$filterVal2.headerFilter,
          height = _this$props$filterVal2.height,
          highlightChanges = _this$props$filterVal2.highlightChanges,
          hint = _this$props$filterVal2.hint,
          hoverStateEnabled = _this$props$filterVal2.hoverStateEnabled,
          keyExpr = _this$props$filterVal2.keyExpr,
          keyboardNavigation = _this$props$filterVal2.keyboardNavigation,
          loadPanel = _this$props$filterVal2.loadPanel,
          loadingTimeout = _this$props$filterVal2.loadingTimeout,
          masterDetail = _this$props$filterVal2.masterDetail,
          noDataText = _this$props$filterVal2.noDataText,
          onAdaptiveDetailRowPreparing = _this$props$filterVal2.onAdaptiveDetailRowPreparing,
          onCellClick = _this$props$filterVal2.onCellClick,
          onCellDblClick = _this$props$filterVal2.onCellDblClick,
          onCellHoverChanged = _this$props$filterVal2.onCellHoverChanged,
          onCellPrepared = _this$props$filterVal2.onCellPrepared,
          onClick = _this$props$filterVal2.onClick,
          onContextMenuPreparing = _this$props$filterVal2.onContextMenuPreparing,
          onDataErrorOccurred = _this$props$filterVal2.onDataErrorOccurred,
          onEditingStart = _this$props$filterVal2.onEditingStart,
          onEditorPrepared = _this$props$filterVal2.onEditorPrepared,
          onEditorPreparing = _this$props$filterVal2.onEditorPreparing,
          onExported = _this$props$filterVal2.onExported,
          onExporting = _this$props$filterVal2.onExporting,
          onFileSaving = _this$props$filterVal2.onFileSaving,
          onFocusedCellChanged = _this$props$filterVal2.onFocusedCellChanged,
          onFocusedCellChanging = _this$props$filterVal2.onFocusedCellChanging,
          onFocusedRowChanged = _this$props$filterVal2.onFocusedRowChanged,
          onFocusedRowChanging = _this$props$filterVal2.onFocusedRowChanging,
          onInitNewRow = _this$props$filterVal2.onInitNewRow,
          onKeyDown = _this$props$filterVal2.onKeyDown,
          onRowClick = _this$props$filterVal2.onRowClick,
          onRowCollapsed = _this$props$filterVal2.onRowCollapsed,
          onRowCollapsing = _this$props$filterVal2.onRowCollapsing,
          onRowDblClick = _this$props$filterVal2.onRowDblClick,
          onRowExpanded = _this$props$filterVal2.onRowExpanded,
          onRowExpanding = _this$props$filterVal2.onRowExpanding,
          onRowInserted = _this$props$filterVal2.onRowInserted,
          onRowInserting = _this$props$filterVal2.onRowInserting,
          onRowPrepared = _this$props$filterVal2.onRowPrepared,
          onRowRemoved = _this$props$filterVal2.onRowRemoved,
          onRowRemoving = _this$props$filterVal2.onRowRemoving,
          onRowUpdated = _this$props$filterVal2.onRowUpdated,
          onRowUpdating = _this$props$filterVal2.onRowUpdating,
          onRowValidating = _this$props$filterVal2.onRowValidating,
          onSaved = _this$props$filterVal2.onSaved,
          onSaving = _this$props$filterVal2.onSaving,
          onSelectionChanged = _this$props$filterVal2.onSelectionChanged,
          onToolbarPreparing = _this$props$filterVal2.onToolbarPreparing,
          pager = _this$props$filterVal2.pager,
          paging = _this$props$filterVal2.paging,
          remoteOperations = _this$props$filterVal2.remoteOperations,
          renderAsync = _this$props$filterVal2.renderAsync,
          repaintChangesOnly = _this$props$filterVal2.repaintChangesOnly,
          rowAlternationEnabled = _this$props$filterVal2.rowAlternationEnabled,
          rowDragging = _this$props$filterVal2.rowDragging,
          rowTemplate = _this$props$filterVal2.rowTemplate,
          rtlEnabled = _this$props$filterVal2.rtlEnabled,
          scrolling = _this$props$filterVal2.scrolling,
          searchPanel = _this$props$filterVal2.searchPanel,
          selectedRowKeys = _this$props$filterVal2.selectedRowKeys,
          selectedRowKeysChange = _this$props$filterVal2.selectedRowKeysChange,
          selection = _this$props$filterVal2.selection,
          selectionFilter = _this$props$filterVal2.selectionFilter,
          selectionFilterChange = _this$props$filterVal2.selectionFilterChange,
          showBorders = _this$props$filterVal2.showBorders,
          showColumnHeaders = _this$props$filterVal2.showColumnHeaders,
          showColumnLines = _this$props$filterVal2.showColumnLines,
          showRowLines = _this$props$filterVal2.showRowLines,
          sortByGroupSummaryInfo = _this$props$filterVal2.sortByGroupSummaryInfo,
          sorting = _this$props$filterVal2.sorting,
          stateStoring = _this$props$filterVal2.stateStoring,
          summary = _this$props$filterVal2.summary,
          tabIndex = _this$props$filterVal2.tabIndex,
          twoWayBindingEnabled = _this$props$filterVal2.twoWayBindingEnabled,
          useKeyboard = _this$props$filterVal2.useKeyboard,
          visible = _this$props$filterVal2.visible,
          width = _this$props$filterVal2.width,
          wordWrapEnabled = _this$props$filterVal2.wordWrapEnabled,
          restProps = _objectWithoutProperties(_this$props$filterVal2, _excluded2);

      return restProps;
    }
  }]);

  return DataGrid;
}(_vdom.InfernoWrapperComponent);

exports.DataGrid = DataGrid;

function __processTwoWayProps(defaultProps) {
  var twoWayProps = ["filterValue", "focusedColumnIndex", "focusedRowIndex", "focusedRowKey", "selectedRowKeys", "selectionFilter"];
  return Object.keys(defaultProps).reduce(function (props, propName) {
    var propValue = defaultProps[propName];
    var defaultPropName = twoWayProps.some(function (p) {
      return p === propName;
    }) ? "default" + propName.charAt(0).toUpperCase() + propName.slice(1) : propName;
    props[defaultPropName] = propValue;
    return props;
  }, {});
}

function __createDefaultProps() {
  return _extends({}, _data_grid_props.DataGridProps, __processTwoWayProps((0, _utils.convertRulesToOptions)(defaultOptionRules)));
}

DataGrid.defaultProps = __createDefaultProps();
var __defaultOptionRules = [];

function defaultOptions(rule) {
  __defaultOptionRules.push(rule);

  DataGrid.defaultProps = _extends({}, __createDefaultProps(), __processTwoWayProps((0, _utils.convertRulesToOptions)(__defaultOptionRules)));
}
