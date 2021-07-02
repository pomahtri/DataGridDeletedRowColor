/**
* DevExtreme (esm/renovation/ui/grids/data_grid/data_grid.js)
* Version: 21.2.0
* Build date: Fri Jul 02 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["onOptionChanged"],
    _excluded2 = ["accessKey", "activeStateEnabled", "allowColumnReordering", "allowColumnResizing", "autoNavigateToFocusedRow", "cacheEnabled", "cellHintEnabled", "className", "columnAutoWidth", "columnChooser", "columnFixing", "columnHidingEnabled", "columnMinWidth", "columnResizingMode", "columnWidth", "columns", "commonColumnSettings", "customizeColumns", "customizeExportData", "dataSource", "dateSerializationFormat", "defaultFilterValue", "defaultFocusedColumnIndex", "defaultFocusedRowIndex", "defaultFocusedRowKey", "defaultSelectedRowKeys", "defaultSelectionFilter", "disabled", "editing", "errorRowEnabled", "export", "filterBuilder", "filterBuilderPopup", "filterPanel", "filterRow", "filterSyncEnabled", "filterValue", "filterValueChange", "focusStateEnabled", "focusedColumnIndex", "focusedColumnIndexChange", "focusedRowEnabled", "focusedRowIndex", "focusedRowIndexChange", "focusedRowKey", "focusedRowKeyChange", "groupPanel", "grouping", "headerFilter", "height", "highlightChanges", "hint", "hoverStateEnabled", "keyExpr", "keyboardNavigation", "loadPanel", "loadingTimeout", "masterDetail", "noDataText", "onAdaptiveDetailRowPreparing", "onCellClick", "onCellDblClick", "onCellHoverChanged", "onCellPrepared", "onClick", "onContextMenuPreparing", "onDataErrorOccurred", "onEditingStart", "onEditorPrepared", "onEditorPreparing", "onExported", "onExporting", "onFileSaving", "onFocusedCellChanged", "onFocusedCellChanging", "onFocusedRowChanged", "onFocusedRowChanging", "onInitNewRow", "onKeyDown", "onRowClick", "onRowCollapsed", "onRowCollapsing", "onRowDblClick", "onRowExpanded", "onRowExpanding", "onRowInserted", "onRowInserting", "onRowPrepared", "onRowRemoved", "onRowRemoving", "onRowUpdated", "onRowUpdating", "onRowValidating", "onSaved", "onSaving", "onSelectionChanged", "onToolbarPreparing", "pager", "paging", "remoteOperations", "renderAsync", "repaintChangesOnly", "rowAlternationEnabled", "rowDragging", "rowTemplate", "rtlEnabled", "scrolling", "searchPanel", "selectedRowKeys", "selectedRowKeysChange", "selection", "selectionFilter", "selectionFilterChange", "showBorders", "showColumnHeaders", "showColumnLines", "showRowLines", "sortByGroupSummaryInfo", "sorting", "stateStoring", "summary", "tabIndex", "twoWayBindingEnabled", "useKeyboard", "visible", "width", "wordWrapEnabled"];
import { createComponentVNode } from "inferno";
import { InfernoEffect, InfernoWrapperComponent } from "@devextreme/vdom";
import { DataGridProps } from "./common/data_grid_props";
import "../../../../ui/data_grid/ui.data_grid";
import { Widget } from "../../common/widget";
import { DataGridComponent } from "./datagrid_component";
import { DataGridViews } from "./data_grid_views";
import { getUpdatedOptions } from "./utils/get_updated_options";
import { hasWindow } from "../../../../core/utils/window";
import { createDefaultOptionRules, convertRulesToOptions } from "../../../../core/options/utils";
import devices from "../../../../core/devices";
import { isMaterial, current } from "../../../../ui/themes";
var aria = {
  role: "presentation"
};
var rowSelector = ".dx-row";

function normalizeProps(props) {
  var result = {};
  Object.keys(props).forEach(key => {
    if (props[key] !== undefined) {
      result[key] = props[key];
    }
  });
  return result;
}

export var viewFunction = _ref => {
  var {
    instance,
    onDimensionChanged,
    onHoverEnd,
    onHoverStart,
    props: {
      accessKey,
      activeStateEnabled,
      className,
      disabled,
      focusStateEnabled,
      height,
      hint,
      hoverStateEnabled,
      rtlEnabled,
      showBorders,
      tabIndex,
      visible,
      width
    },
    restAttributes,
    widgetElementRef
  } = _ref;
  return normalizeProps(createComponentVNode(2, Widget, _extends({
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
    children: createComponentVNode(2, DataGridViews, {
      "instance": instance,
      "showBorders": showBorders
    })
  })));
};
export var defaultOptionRules = createDefaultOptionRules([{
  device: () => devices.real().platform === "ios",
  options: {
    showRowLines: true
  }
}, {
  device: () => devices.real().deviceType !== "desktop",
  options: {
    grouping: {
      expandMode: "rowClick"
    }
  }
}, {
  device: () => isMaterial(current()),
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
import { createReRenderEffect } from "@devextreme/vdom";
import { createRef as infernoCreateRef } from "inferno";

var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);

export class DataGrid extends InfernoWrapperComponent {
  constructor(props) {
    super(props);
    this.widgetElementRef = infernoCreateRef();
    this.isTwoWayPropUpdating = false;
    this.state = {
      instance: undefined,
      filterValue: this.props.filterValue !== undefined ? this.props.filterValue : this.props.defaultFilterValue,
      focusedColumnIndex: this.props.focusedColumnIndex !== undefined ? this.props.focusedColumnIndex : this.props.defaultFocusedColumnIndex,
      focusedRowIndex: this.props.focusedRowIndex !== undefined ? this.props.focusedRowIndex : this.props.defaultFocusedRowIndex,
      focusedRowKey: this.props.focusedRowKey !== undefined ? this.props.focusedRowKey : this.props.defaultFocusedRowKey,
      selectedRowKeys: this.props.selectedRowKeys !== undefined ? this.props.selectedRowKeys : this.props.defaultSelectedRowKeys,
      selectionFilter: this.props.selectionFilter !== undefined ? this.props.selectionFilter : this.props.defaultSelectionFilter
    };
    this.getComponentInstance = this.getComponentInstance.bind(this);
    this.beginCustomLoading = this.beginCustomLoading.bind(this);
    this.byKey = this.byKey.bind(this);
    this.cancelEditData = this.cancelEditData.bind(this);
    this.cellValue = this.cellValue.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
    this.clearSelection = this.clearSelection.bind(this);
    this.clearSorting = this.clearSorting.bind(this);
    this.closeEditCell = this.closeEditCell.bind(this);
    this.collapseAdaptiveDetailRow = this.collapseAdaptiveDetailRow.bind(this);
    this.columnCount = this.columnCount.bind(this);
    this.columnOption = this.columnOption.bind(this);
    this.deleteColumn = this.deleteColumn.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.deselectAll = this.deselectAll.bind(this);
    this.deselectRows = this.deselectRows.bind(this);
    this.editCell = this.editCell.bind(this);
    this.editRow = this.editRow.bind(this);
    this.endCustomLoading = this.endCustomLoading.bind(this);
    this.expandAdaptiveDetailRow = this.expandAdaptiveDetailRow.bind(this);
    this.filter = this.filter.bind(this);
    this.focus = this.focus.bind(this);
    this.getCellElement = this.getCellElement.bind(this);
    this.getCombinedFilter = this.getCombinedFilter.bind(this);
    this.getDataSource = this.getDataSource.bind(this);
    this.getKeyByRowIndex = this.getKeyByRowIndex.bind(this);
    this.getRowElement = this.getRowElement.bind(this);
    this.getRowIndexByKey = this.getRowIndexByKey.bind(this);
    this.getScrollable = this.getScrollable.bind(this);
    this.getVisibleColumnIndex = this.getVisibleColumnIndex.bind(this);
    this.hasEditData = this.hasEditData.bind(this);
    this.hideColumnChooser = this.hideColumnChooser.bind(this);
    this.isAdaptiveDetailRowExpanded = this.isAdaptiveDetailRowExpanded.bind(this);
    this.isRowFocused = this.isRowFocused.bind(this);
    this.isRowSelected = this.isRowSelected.bind(this);
    this.keyOf = this.keyOf.bind(this);
    this.navigateToRow = this.navigateToRow.bind(this);
    this.pageCount = this.pageCount.bind(this);
    this.pageIndex = this.pageIndex.bind(this);
    this.pageSize = this.pageSize.bind(this);
    this.refresh = this.refresh.bind(this);
    this.repaintRows = this.repaintRows.bind(this);
    this.saveEditData = this.saveEditData.bind(this);
    this.searchByText = this.searchByText.bind(this);
    this.selectAll = this.selectAll.bind(this);
    this.selectRows = this.selectRows.bind(this);
    this.selectRowsByIndexes = this.selectRowsByIndexes.bind(this);
    this.showColumnChooser = this.showColumnChooser.bind(this);
    this.undeleteRow = this.undeleteRow.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.resize = this.resize.bind(this);
    this.addColumn = this.addColumn.bind(this);
    this.addRow = this.addRow.bind(this);
    this.clearGrouping = this.clearGrouping.bind(this);
    this.collapseAll = this.collapseAll.bind(this);
    this.collapseRow = this.collapseRow.bind(this);
    this.expandAll = this.expandAll.bind(this);
    this.expandRow = this.expandRow.bind(this);
    this.exportToExcel = this.exportToExcel.bind(this);
    this.getSelectedRowKeys = this.getSelectedRowKeys.bind(this);
    this.getSelectedRowsData = this.getSelectedRowsData.bind(this);
    this.getTotalSummaryValue = this.getTotalSummaryValue.bind(this);
    this.getVisibleColumns = this.getVisibleColumns.bind(this);
    this.getVisibleRows = this.getVisibleRows.bind(this);
    this.isRowExpanded = this.isRowExpanded.bind(this);
    this.totalCount = this.totalCount.bind(this);
    this.isScrollbarVisible = this.isScrollbarVisible.bind(this);
    this.getTopVisibleRowData = this.getTopVisibleRowData.bind(this);
    this.getScrollbarWidth = this.getScrollbarWidth.bind(this);
    this.getDataProvider = this.getDataProvider.bind(this);
    this.updateOptions = this.updateOptions.bind(this);
    this.dispose = this.dispose.bind(this);
    this.setupInstance = this.setupInstance.bind(this);
    this.instanceOptionChangedHandler = this.instanceOptionChangedHandler.bind(this);
    this.updateTwoWayValue = this.updateTwoWayValue.bind(this);
    this.onHoverStart = this.onHoverStart.bind(this);
    this.onHoverEnd = this.onHoverEnd.bind(this);
    this.onDimensionChanged = this.onDimensionChanged.bind(this);
  }

  createEffects() {
    return [new InfernoEffect(this.updateOptions, [this.state.instance, this.props, this.__state_filterValue, this.__state_focusedColumnIndex, this.__state_focusedRowIndex, this.__state_focusedRowKey, this.__state_selectedRowKeys, this.__state_selectionFilter]), new InfernoEffect(this.dispose, []), new InfernoEffect(this.setupInstance, []), createReRenderEffect()];
  }

  updateEffects() {
    var _this$_effects$;

    (_this$_effects$ = this._effects[0]) === null || _this$_effects$ === void 0 ? void 0 : _this$_effects$.update([this.state.instance, this.props, this.__state_filterValue, this.__state_focusedColumnIndex, this.__state_focusedRowIndex, this.__state_focusedRowKey, this.__state_selectedRowKeys, this.__state_selectionFilter]);
  }

  updateOptions() {
    if (this.state.instance && this.prevProps && !this.isTwoWayPropUpdating) {
      var updatedOptions = getUpdatedOptions(this.prevProps, _extends({}, this.props, {
        filterValue: this.props.filterValue !== undefined ? this.props.filterValue : this.state.filterValue,
        focusedColumnIndex: this.props.focusedColumnIndex !== undefined ? this.props.focusedColumnIndex : this.state.focusedColumnIndex,
        focusedRowIndex: this.props.focusedRowIndex !== undefined ? this.props.focusedRowIndex : this.state.focusedRowIndex,
        focusedRowKey: this.props.focusedRowKey !== undefined ? this.props.focusedRowKey : this.state.focusedRowKey,
        selectedRowKeys: this.props.selectedRowKeys !== undefined ? this.props.selectedRowKeys : this.state.selectedRowKeys,
        selectionFilter: this.props.selectionFilter !== undefined ? this.props.selectionFilter : this.state.selectionFilter
      }));
      this.state.instance.beginUpdate();
      updatedOptions.forEach(_ref2 => {
        var {
          path,
          previousValue,
          value
        } = _ref2;

        this.state.instance._options.silent(path, previousValue);

        this.state.instance.option(path, value);
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
  }

  dispose() {
    return () => {
      this.state.instance.dispose();
    };
  }

  setupInstance() {
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
        restProps = _objectWithoutPropertiesLoose(_this$props$filterVal, _excluded);

    var instance = new DataGridComponent(element, normalizeProps(restProps));

    if (hasWindow()) {
      instance.getController("resizing").updateSize(element);
    }

    instance.on("optionChanged", this.instanceOptionChangedHandler.bind(this));
    this.setState(state => _extends({}, state, {
      instance: instance
    }));
  }

  instanceOptionChangedHandler(e) {
    try {
      this.isTwoWayPropUpdating = true;
      this.updateTwoWayValue(e);
    } finally {
      this.isTwoWayPropUpdating = false;
    }
  }

  updateTwoWayValue(e) {
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

          this.setState(state => {
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

          this.setState(state => {
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

          this.setState(state => {
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

          this.setState(state => {
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

          this.setState(state => {
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

          this.setState(state => {
            _newValue5 = e.value;
            return {
              selectionFilter: _newValue5
            };
          });
          this.props.selectionFilterChange(_newValue5);
        }
      }
    }
  }

  onHoverStart(event) {
    event.currentTarget.classList.add("dx-state-hover");
  }

  onHoverEnd(event) {
    event.currentTarget.classList.remove("dx-state-hover");
  }

  onDimensionChanged() {
    var _this$state$instance;

    (_this$state$instance = this.state.instance) === null || _this$state$instance === void 0 ? void 0 : _this$state$instance.updateDimensions(true);
  }

  get restAttributes() {
    var _this$props$filterVal2 = _extends({}, this.props, {
      filterValue: this.props.filterValue !== undefined ? this.props.filterValue : this.state.filterValue,
      focusedColumnIndex: this.props.focusedColumnIndex !== undefined ? this.props.focusedColumnIndex : this.state.focusedColumnIndex,
      focusedRowIndex: this.props.focusedRowIndex !== undefined ? this.props.focusedRowIndex : this.state.focusedRowIndex,
      focusedRowKey: this.props.focusedRowKey !== undefined ? this.props.focusedRowKey : this.state.focusedRowKey,
      selectedRowKeys: this.props.selectedRowKeys !== undefined ? this.props.selectedRowKeys : this.state.selectedRowKeys,
      selectionFilter: this.props.selectionFilter !== undefined ? this.props.selectionFilter : this.state.selectionFilter
    }),
        restProps = _objectWithoutPropertiesLoose(_this$props$filterVal2, _excluded2);

    return restProps;
  }

  getComponentInstance() {
    return this.state.instance;
  }

  beginCustomLoading(messageText) {
    var _this$state$instance2;

    return (_this$state$instance2 = this.state.instance) === null || _this$state$instance2 === void 0 ? void 0 : _this$state$instance2.beginCustomLoading(messageText);
  }

  byKey(key) {
    var _this$state$instance3;

    return (_this$state$instance3 = this.state.instance) === null || _this$state$instance3 === void 0 ? void 0 : _this$state$instance3.byKey(key);
  }

  cancelEditData() {
    var _this$state$instance4;

    return (_this$state$instance4 = this.state.instance) === null || _this$state$instance4 === void 0 ? void 0 : _this$state$instance4.cancelEditData();
  }

  cellValue(rowIndex, dataField, value) {
    var _this$state$instance5;

    return (_this$state$instance5 = this.state.instance) === null || _this$state$instance5 === void 0 ? void 0 : _this$state$instance5.cellValue(rowIndex, dataField, value);
  }

  clearFilter(filterName) {
    var _this$state$instance6;

    return (_this$state$instance6 = this.state.instance) === null || _this$state$instance6 === void 0 ? void 0 : _this$state$instance6.clearFilter(filterName);
  }

  clearSelection() {
    var _this$state$instance7;

    return (_this$state$instance7 = this.state.instance) === null || _this$state$instance7 === void 0 ? void 0 : _this$state$instance7.clearSelection();
  }

  clearSorting() {
    var _this$state$instance8;

    return (_this$state$instance8 = this.state.instance) === null || _this$state$instance8 === void 0 ? void 0 : _this$state$instance8.clearSorting();
  }

  closeEditCell() {
    var _this$state$instance9;

    return (_this$state$instance9 = this.state.instance) === null || _this$state$instance9 === void 0 ? void 0 : _this$state$instance9.closeEditCell();
  }

  collapseAdaptiveDetailRow() {
    var _this$state$instance10;

    return (_this$state$instance10 = this.state.instance) === null || _this$state$instance10 === void 0 ? void 0 : _this$state$instance10.collapseAdaptiveDetailRow();
  }

  columnCount() {
    var _this$state$instance11;

    return (_this$state$instance11 = this.state.instance) === null || _this$state$instance11 === void 0 ? void 0 : _this$state$instance11.columnCount();
  }

  columnOption(id, optionName, optionValue) {
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
  }

  deleteColumn(id) {
    var _this$state$instance12;

    return (_this$state$instance12 = this.state.instance) === null || _this$state$instance12 === void 0 ? void 0 : _this$state$instance12.deleteColumn(id);
  }

  deleteRow(rowIndex) {
    var _this$state$instance13;

    return (_this$state$instance13 = this.state.instance) === null || _this$state$instance13 === void 0 ? void 0 : _this$state$instance13.deleteRow(rowIndex);
  }

  deselectAll() {
    var _this$state$instance14;

    return (_this$state$instance14 = this.state.instance) === null || _this$state$instance14 === void 0 ? void 0 : _this$state$instance14.deselectAll();
  }

  deselectRows(keys) {
    var _this$state$instance15;

    return (_this$state$instance15 = this.state.instance) === null || _this$state$instance15 === void 0 ? void 0 : _this$state$instance15.deselectRows(keys);
  }

  editCell(rowIndex, dataFieldColumnIndex) {
    var _this$state$instance16;

    return (_this$state$instance16 = this.state.instance) === null || _this$state$instance16 === void 0 ? void 0 : _this$state$instance16.editCell(rowIndex, dataFieldColumnIndex);
  }

  editRow(rowIndex) {
    var _this$state$instance17;

    return (_this$state$instance17 = this.state.instance) === null || _this$state$instance17 === void 0 ? void 0 : _this$state$instance17.editRow(rowIndex);
  }

  endCustomLoading() {
    var _this$state$instance18;

    return (_this$state$instance18 = this.state.instance) === null || _this$state$instance18 === void 0 ? void 0 : _this$state$instance18.endCustomLoading();
  }

  expandAdaptiveDetailRow(key) {
    var _this$state$instance19;

    return (_this$state$instance19 = this.state.instance) === null || _this$state$instance19 === void 0 ? void 0 : _this$state$instance19.expandAdaptiveDetailRow(key);
  }

  filter(filterExpr) {
    var _this$state$instance20;

    return (_this$state$instance20 = this.state.instance) === null || _this$state$instance20 === void 0 ? void 0 : _this$state$instance20.filter(filterExpr);
  }

  focus(element) {
    var _this$state$instance21;

    return (_this$state$instance21 = this.state.instance) === null || _this$state$instance21 === void 0 ? void 0 : _this$state$instance21.focus(element);
  }

  getCellElement(rowIndex, dataField) {
    var _this$state$instance22;

    return (_this$state$instance22 = this.state.instance) === null || _this$state$instance22 === void 0 ? void 0 : _this$state$instance22.getCellElement(rowIndex, dataField);
  }

  getCombinedFilter(returnDataField) {
    var _this$state$instance23;

    return (_this$state$instance23 = this.state.instance) === null || _this$state$instance23 === void 0 ? void 0 : _this$state$instance23.getCombinedFilter(returnDataField);
  }

  getDataSource() {
    var _this$state$instance24;

    return (_this$state$instance24 = this.state.instance) === null || _this$state$instance24 === void 0 ? void 0 : _this$state$instance24.getDataSource();
  }

  getKeyByRowIndex(rowIndex) {
    var _this$state$instance25;

    return (_this$state$instance25 = this.state.instance) === null || _this$state$instance25 === void 0 ? void 0 : _this$state$instance25.getKeyByRowIndex(rowIndex);
  }

  getRowElement(rowIndex) {
    var _this$state$instance26;

    return (_this$state$instance26 = this.state.instance) === null || _this$state$instance26 === void 0 ? void 0 : _this$state$instance26.getRowElement(rowIndex);
  }

  getRowIndexByKey(key) {
    var _this$state$instance27;

    return (_this$state$instance27 = this.state.instance) === null || _this$state$instance27 === void 0 ? void 0 : _this$state$instance27.getRowIndexByKey(key);
  }

  getScrollable() {
    var _this$state$instance28;

    return (_this$state$instance28 = this.state.instance) === null || _this$state$instance28 === void 0 ? void 0 : _this$state$instance28.getScrollable();
  }

  getVisibleColumnIndex(id) {
    var _this$state$instance29;

    return (_this$state$instance29 = this.state.instance) === null || _this$state$instance29 === void 0 ? void 0 : _this$state$instance29.getVisibleColumnIndex(id);
  }

  hasEditData() {
    var _this$state$instance30;

    return (_this$state$instance30 = this.state.instance) === null || _this$state$instance30 === void 0 ? void 0 : _this$state$instance30.hasEditData();
  }

  hideColumnChooser() {
    var _this$state$instance31;

    return (_this$state$instance31 = this.state.instance) === null || _this$state$instance31 === void 0 ? void 0 : _this$state$instance31.hideColumnChooser();
  }

  isAdaptiveDetailRowExpanded(key) {
    var _this$state$instance32;

    return (_this$state$instance32 = this.state.instance) === null || _this$state$instance32 === void 0 ? void 0 : _this$state$instance32.isAdaptiveDetailRowExpanded(key);
  }

  isRowFocused(key) {
    var _this$state$instance33;

    return (_this$state$instance33 = this.state.instance) === null || _this$state$instance33 === void 0 ? void 0 : _this$state$instance33.isRowFocused(key);
  }

  isRowSelected(key) {
    var _this$state$instance34;

    return (_this$state$instance34 = this.state.instance) === null || _this$state$instance34 === void 0 ? void 0 : _this$state$instance34.isRowSelected(key);
  }

  keyOf(obj) {
    var _this$state$instance35;

    return (_this$state$instance35 = this.state.instance) === null || _this$state$instance35 === void 0 ? void 0 : _this$state$instance35.keyOf(obj);
  }

  navigateToRow(key) {
    var _this$state$instance36;

    return (_this$state$instance36 = this.state.instance) === null || _this$state$instance36 === void 0 ? void 0 : _this$state$instance36.navigateToRow(key);
  }

  pageCount() {
    var _this$state$instance37;

    return (_this$state$instance37 = this.state.instance) === null || _this$state$instance37 === void 0 ? void 0 : _this$state$instance37.pageCount();
  }

  pageIndex(newIndex) {
    var _this$state$instance38;

    return (_this$state$instance38 = this.state.instance) === null || _this$state$instance38 === void 0 ? void 0 : _this$state$instance38.pageIndex(newIndex);
  }

  pageSize(value) {
    var _this$state$instance39;

    return (_this$state$instance39 = this.state.instance) === null || _this$state$instance39 === void 0 ? void 0 : _this$state$instance39.pageSize(value);
  }

  refresh(changesOnly) {
    var _this$state$instance40;

    return (_this$state$instance40 = this.state.instance) === null || _this$state$instance40 === void 0 ? void 0 : _this$state$instance40.refresh(changesOnly);
  }

  repaintRows(rowIndexes) {
    var _this$state$instance41;

    return (_this$state$instance41 = this.state.instance) === null || _this$state$instance41 === void 0 ? void 0 : _this$state$instance41.repaintRows(rowIndexes);
  }

  saveEditData() {
    var _this$state$instance42;

    return (_this$state$instance42 = this.state.instance) === null || _this$state$instance42 === void 0 ? void 0 : _this$state$instance42.saveEditData();
  }

  searchByText(text) {
    var _this$state$instance43;

    return (_this$state$instance43 = this.state.instance) === null || _this$state$instance43 === void 0 ? void 0 : _this$state$instance43.searchByText(text);
  }

  selectAll() {
    var _this$state$instance44;

    return (_this$state$instance44 = this.state.instance) === null || _this$state$instance44 === void 0 ? void 0 : _this$state$instance44.selectAll();
  }

  selectRows(keys, preserve) {
    var _this$state$instance45;

    return (_this$state$instance45 = this.state.instance) === null || _this$state$instance45 === void 0 ? void 0 : _this$state$instance45.selectRows(keys, preserve);
  }

  selectRowsByIndexes(indexes) {
    var _this$state$instance46;

    return (_this$state$instance46 = this.state.instance) === null || _this$state$instance46 === void 0 ? void 0 : _this$state$instance46.selectRowsByIndexes(indexes);
  }

  showColumnChooser() {
    var _this$state$instance47;

    return (_this$state$instance47 = this.state.instance) === null || _this$state$instance47 === void 0 ? void 0 : _this$state$instance47.showColumnChooser();
  }

  undeleteRow(rowIndex) {
    var _this$state$instance48;

    return (_this$state$instance48 = this.state.instance) === null || _this$state$instance48 === void 0 ? void 0 : _this$state$instance48.undeleteRow(rowIndex);
  }

  updateDimensions() {
    var _this$state$instance49;

    return (_this$state$instance49 = this.state.instance) === null || _this$state$instance49 === void 0 ? void 0 : _this$state$instance49.updateDimensions();
  }

  resize() {
    var _this$state$instance50;

    return (_this$state$instance50 = this.state.instance) === null || _this$state$instance50 === void 0 ? void 0 : _this$state$instance50.resize();
  }

  addColumn(columnOptions) {
    var _this$state$instance51;

    return (_this$state$instance51 = this.state.instance) === null || _this$state$instance51 === void 0 ? void 0 : _this$state$instance51.addColumn(columnOptions);
  }

  addRow() {
    var _this$state$instance52;

    return (_this$state$instance52 = this.state.instance) === null || _this$state$instance52 === void 0 ? void 0 : _this$state$instance52.addRow();
  }

  clearGrouping() {
    var _this$state$instance53;

    return (_this$state$instance53 = this.state.instance) === null || _this$state$instance53 === void 0 ? void 0 : _this$state$instance53.clearGrouping();
  }

  collapseAll(groupIndex) {
    var _this$state$instance54;

    return (_this$state$instance54 = this.state.instance) === null || _this$state$instance54 === void 0 ? void 0 : _this$state$instance54.collapseAll(groupIndex);
  }

  collapseRow(key) {
    var _this$state$instance55;

    return (_this$state$instance55 = this.state.instance) === null || _this$state$instance55 === void 0 ? void 0 : _this$state$instance55.collapseRow(key);
  }

  expandAll(groupIndex) {
    var _this$state$instance56;

    return (_this$state$instance56 = this.state.instance) === null || _this$state$instance56 === void 0 ? void 0 : _this$state$instance56.expandAll(groupIndex);
  }

  expandRow(key) {
    var _this$state$instance57;

    return (_this$state$instance57 = this.state.instance) === null || _this$state$instance57 === void 0 ? void 0 : _this$state$instance57.expandRow(key);
  }

  exportToExcel(selectionOnly) {
    var _this$state$instance58;

    return (_this$state$instance58 = this.state.instance) === null || _this$state$instance58 === void 0 ? void 0 : _this$state$instance58.exportToExcel(selectionOnly);
  }

  getSelectedRowKeys() {
    var _this$state$instance59;

    return (_this$state$instance59 = this.state.instance) === null || _this$state$instance59 === void 0 ? void 0 : _this$state$instance59.getSelectedRowKeys();
  }

  getSelectedRowsData() {
    var _this$state$instance60;

    return (_this$state$instance60 = this.state.instance) === null || _this$state$instance60 === void 0 ? void 0 : _this$state$instance60.getSelectedRowsData();
  }

  getTotalSummaryValue(summaryItemName) {
    var _this$state$instance61;

    return (_this$state$instance61 = this.state.instance) === null || _this$state$instance61 === void 0 ? void 0 : _this$state$instance61.getTotalSummaryValue(summaryItemName);
  }

  getVisibleColumns(headerLevel) {
    var _this$state$instance62;

    return (_this$state$instance62 = this.state.instance) === null || _this$state$instance62 === void 0 ? void 0 : _this$state$instance62.getVisibleColumns(headerLevel);
  }

  getVisibleRows() {
    var _this$state$instance63;

    return (_this$state$instance63 = this.state.instance) === null || _this$state$instance63 === void 0 ? void 0 : _this$state$instance63.getVisibleRows();
  }

  isRowExpanded(key) {
    var _this$state$instance64;

    return (_this$state$instance64 = this.state.instance) === null || _this$state$instance64 === void 0 ? void 0 : _this$state$instance64.isRowExpanded(key);
  }

  totalCount() {
    var _this$state$instance65;

    return (_this$state$instance65 = this.state.instance) === null || _this$state$instance65 === void 0 ? void 0 : _this$state$instance65.totalCount();
  }

  isScrollbarVisible() {
    var _this$state$instance66;

    return (_this$state$instance66 = this.state.instance) === null || _this$state$instance66 === void 0 ? void 0 : _this$state$instance66.isScrollbarVisible();
  }

  getTopVisibleRowData() {
    var _this$state$instance67;

    return (_this$state$instance67 = this.state.instance) === null || _this$state$instance67 === void 0 ? void 0 : _this$state$instance67.getTopVisibleRowData();
  }

  getScrollbarWidth(isHorizontal) {
    var _this$state$instance68;

    return (_this$state$instance68 = this.state.instance) === null || _this$state$instance68 === void 0 ? void 0 : _this$state$instance68.getScrollbarWidth(isHorizontal);
  }

  getDataProvider(selectedRowsOnly) {
    var _this$state$instance69;

    return (_this$state$instance69 = this.state.instance) === null || _this$state$instance69 === void 0 ? void 0 : _this$state$instance69.getDataProvider(selectedRowsOnly);
  }

  render() {
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
  }

}

function __processTwoWayProps(defaultProps) {
  var twoWayProps = ["filterValue", "focusedColumnIndex", "focusedRowIndex", "focusedRowKey", "selectedRowKeys", "selectionFilter"];
  return Object.keys(defaultProps).reduce((props, propName) => {
    var propValue = defaultProps[propName];
    var defaultPropName = twoWayProps.some(p => p === propName) ? "default" + propName.charAt(0).toUpperCase() + propName.slice(1) : propName;
    props[defaultPropName] = propValue;
    return props;
  }, {});
}

function __createDefaultProps() {
  return _extends({}, DataGridProps, __processTwoWayProps(convertRulesToOptions(defaultOptionRules)));
}

DataGrid.defaultProps = __createDefaultProps();
var __defaultOptionRules = [];
export function defaultOptions(rule) {
  __defaultOptionRules.push(rule);

  DataGrid.defaultProps = _extends({}, __createDefaultProps(), __processTwoWayProps(convertRulesToOptions(__defaultOptionRules)));
}
