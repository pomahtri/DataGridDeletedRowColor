import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["startDate", "endDate", "isFirstGroupCell", "isLastGroupCell"],
    _excluded2 = ["allDay", "startDate", "endDate"];
import dateUtils from '../../../../core/utils/date';
import { HORIZONTAL_GROUP_ORIENTATION } from '../../constants';
export class ViewDataGenerator {
  _getCompleteViewDataMap(options) {
    var {
      rowCountInGroup,
      cellCountInGroupRow,
      groupsList,
      groupByDate,
      isHorizontalGrouping,
      isVerticalGrouping,
      totalCellCount,
      groupCount
    } = options;
    var viewDataMap = [];
    var step = groupByDate ? groupCount : 1;

    var allDayPanelData = this._generateAllDayPanelData(options, cellCountInGroupRow, step);

    var viewCellsData = this._generateViewCellsData(options, rowCountInGroup, step);

    allDayPanelData && viewDataMap.push(allDayPanelData);
    viewDataMap.push(...viewCellsData);

    if (isHorizontalGrouping && !groupByDate) {
      viewDataMap = this._transformViewDataMapForHorizontalGrouping(viewDataMap, groupsList);
    }

    if (isVerticalGrouping) {
      viewDataMap = this._transformViewDataMapForVerticalGrouping(viewDataMap, groupsList);
    }

    if (groupByDate) {
      viewDataMap = this._transformViewDataMapForGroupingByDate(viewDataMap, groupsList);
    }

    var completeViewDataMap = this._addKeysToCells(viewDataMap, totalCellCount);

    return completeViewDataMap;
  }

  _transformViewDataMapForHorizontalGrouping(viewDataMap, groupsList) {
    var result = viewDataMap.map(row => row.slice());
    groupsList.slice(1).forEach((groups, index) => {
      var groupIndex = index + 1;
      viewDataMap.forEach((row, rowIndex) => {
        var nextGroupRow = row.map(cellData => {
          return _extends({}, cellData, {
            groups,
            groupIndex
          });
        });
        result[rowIndex].push(...nextGroupRow);
      });
    });
    return result;
  }

  _transformViewDataMapForVerticalGrouping(viewDataMap, groupsList) {
    var result = viewDataMap.map(row => row.slice());
    groupsList.slice(1).forEach((groups, index) => {
      var groupIndex = index + 1;
      var nextGroupMap = viewDataMap.map(cellsRow => {
        var nextRow = cellsRow.map(cellData => {
          return _extends({}, cellData, {
            groupIndex,
            groups
          });
        });
        return nextRow;
      });
      result.push(...nextGroupMap);
    });
    return result;
  }

  _transformViewDataMapForGroupingByDate(viewDataMap, groupsList) {
    var correctedGroupList = groupsList.slice(1);
    var correctedGroupCount = correctedGroupList.length;
    var result = viewDataMap.map(cellsRow => {
      var groupedByDateCellsRow = cellsRow.reduce((currentRow, cell) => {
        var rowWithCurrentCell = [...currentRow, _extends({}, cell, {
          isFirstGroupCell: true,
          isLastGroupCell: correctedGroupCount === 0
        }), ...correctedGroupList.map((groups, index) => _extends({}, cell, {
          groups,
          groupIndex: index + 1,
          isFirstGroupCell: false,
          isLastGroupCell: index === correctedGroupCount - 1
        }))];
        return rowWithCurrentCell;
      }, []);
      return groupedByDateCellsRow;
    });
    return result;
  }

  _addKeysToCells(viewDataMap, totalColumnCount) {
    var {
      currentViewDataMap: result
    } = viewDataMap.reduce((_ref, row, rowIndex) => {
      var {
        allDayPanelsCount,
        currentViewDataMap
      } = _ref;
      var isAllDay = row[0].allDay;
      var keyBase = (rowIndex - allDayPanelsCount) * totalColumnCount;
      var currentAllDayPanelsCount = isAllDay ? allDayPanelsCount + 1 : allDayPanelsCount;
      currentViewDataMap[rowIndex].forEach((cell, columnIndex) => {
        cell.key = keyBase + columnIndex;
      });
      return {
        allDayPanelsCount: currentAllDayPanelsCount,
        currentViewDataMap
      };
    }, {
      allDayPanelsCount: 0,
      currentViewDataMap: viewDataMap
    });
    return result;
  }

  _getCompleteDateHeaderMap(options, completeViewDataMap) {
    var {
      isGenerateWeekDaysHeaderData
    } = options;
    var result = [];

    if (isGenerateWeekDaysHeaderData) {
      var weekDaysRow = this._generateWeekDaysHeaderRowMap(options, completeViewDataMap);

      result.push(weekDaysRow);
    }

    var dateRow = this._generateHeaderDateRow(options, completeViewDataMap);

    result.push(dateRow);
    return result;
  }

  _generateWeekDaysHeaderRowMap(options, completeViewDataMap) {
    var {
      groupByDate,
      horizontalGroupCount,
      cellCountInDay,
      getWeekDaysHeaderText,
      daysInView
    } = options;
    var index = completeViewDataMap[0][0].allDay ? 1 : 0;
    var colSpan = groupByDate ? horizontalGroupCount * cellCountInDay : cellCountInDay;
    var weekDaysRow = [];

    for (var dayIndex = 0; dayIndex < daysInView; dayIndex += 1) {
      var cell = completeViewDataMap[index][dayIndex * colSpan];
      weekDaysRow.push(_extends({}, cell, {
        colSpan,
        text: getWeekDaysHeaderText(cell.startDate),
        isFirstGroupCell: false,
        isLastGroupCell: false
      }));
    }

    return weekDaysRow;
  }

  _generateHeaderDateRow(options, completeViewDataMap) {
    var {
      getDateHeaderText,
      today,
      groupByDate,
      horizontalGroupCount,
      cellCountInGroupRow,
      groupOrientation,
      getDateHeaderDate
    } = options;
    var dates = [];

    for (var dateIndex = 0; dateIndex < cellCountInGroupRow; dateIndex += 1) {
      dates.push(getDateHeaderDate(dateIndex));
    }

    var index = completeViewDataMap[0][0].allDay ? 1 : 0;
    var columnCount = completeViewDataMap[index].length;
    var dateHeaderColumnCount = groupByDate ? columnCount / horizontalGroupCount : columnCount;
    var colSpan = groupByDate ? horizontalGroupCount : 1;
    var isVerticalGrouping = groupOrientation === 'vertical';
    var slicedByColumnsData = completeViewDataMap[index].slice(0, dateHeaderColumnCount);
    return slicedByColumnsData.map((_ref2, index) => {
      var {
        startDate,
        isFirstGroupCell,
        isLastGroupCell
      } = _ref2,
          restProps = _objectWithoutPropertiesLoose(_ref2, _excluded);

      return _extends({}, restProps, {
        startDate: dates[index % cellCountInGroupRow],
        text: getDateHeaderText(index % cellCountInGroupRow),
        today: dateUtils.sameDate(startDate, today),
        colSpan,
        isFirstGroupCell: groupByDate || isFirstGroupCell && !isVerticalGrouping,
        isLastGroupCell: groupByDate || isLastGroupCell && !isVerticalGrouping
      });
    });
  }

  _getCompleteTimePanelMap(options, completeViewDataMap) {
    var {
      rowCountInGroup,
      getTimeCellDate
    } = options;
    var times = [];

    for (var rowIndex = 0; rowIndex < rowCountInGroup; rowIndex += 1) {
      times.push(getTimeCellDate(rowIndex));
    }

    var allDayRowsCount = 0;
    return completeViewDataMap.map((row, index) => {
      var _row$ = row[0],
          {
        allDay,
        startDate
      } = _row$,
          restCellProps = _objectWithoutPropertiesLoose(_row$, _excluded2);

      if (allDay) {
        allDayRowsCount += 1;
      }

      var timeIndex = (index - allDayRowsCount) % rowCountInGroup;
      return _extends({}, restCellProps, {
        allDay,
        startDate: allDay ? startDate : times[timeIndex]
      });
    });
  }

  _generateViewDataMap(completeViewDataMap, options) {
    var {
      rowCount,
      startCellIndex,
      cellCount,
      isStandaloneAllDayPanel
    } = options;
    var {
      startRowIndex
    } = options;

    var sliceCells = (row, rowIndex, startIndex, count) => {
      return row.slice(startIndex, startIndex + count).map((cellData, columnIndex) => ({
        cellData,
        position: {
          rowIndex,
          columnIndex
        }
      }));
    };

    var correctedStartRowIndex = startRowIndex;
    var allDayPanelMap = [];

    if (isStandaloneAllDayPanel) {
      correctedStartRowIndex++;
      allDayPanelMap = sliceCells(completeViewDataMap[0], 0, startCellIndex, cellCount);
    }

    var dateTableMap = completeViewDataMap.slice(correctedStartRowIndex, correctedStartRowIndex + rowCount).map((row, rowIndex) => sliceCells(row, rowIndex, startCellIndex, cellCount));
    return {
      allDayPanelMap,
      dateTableMap
    };
  }

  _generateDateHeaderData(completeDateHeaderMap, options) {
    var {
      isGenerateWeekDaysHeaderData,
      cellCountInDay,
      cellWidth,
      isProvideVirtualCellsWidth
    } = options;
    var dataMap = [];
    var weekDayRowConfig = {};
    var validCellWidth = cellWidth || 0;

    if (isGenerateWeekDaysHeaderData) {
      weekDayRowConfig = this._generateDateHeaderDataRow(options, completeDateHeaderMap, cellCountInDay, 0, validCellWidth);
      dataMap.push(weekDayRowConfig.dateRow);
    }

    var datesRowConfig = this._generateDateHeaderDataRow(options, completeDateHeaderMap, 1, isGenerateWeekDaysHeaderData ? 1 : 0, validCellWidth);

    dataMap.push(datesRowConfig.dateRow);
    return {
      dataMap,
      leftVirtualCellWidth: isProvideVirtualCellsWidth ? datesRowConfig.leftVirtualCellWidth : undefined,
      rightVirtualCellWidth: isProvideVirtualCellsWidth ? datesRowConfig.rightVirtualCellWidth : undefined,
      leftVirtualCellCount: datesRowConfig.leftVirtualCellCount,
      rightVirtualCellCount: datesRowConfig.rightVirtualCellCount,
      weekDayLeftVirtualCellWidth: weekDayRowConfig.leftVirtualCellWidth,
      weekDayRightVirtualCellWidth: weekDayRowConfig.rightVirtualCellWidth,
      weekDayLeftVirtualCellCount: weekDayRowConfig.leftVirtualCellCount,
      weekDayRightVirtualCellCount: weekDayRowConfig.rightVirtualCellCount
    };
  }

  _generateDateHeaderDataRow(options, completeDateHeaderMap, baseColSpan, rowIndex, cellWidth) {
    var {
      groupByDate,
      horizontalGroupCount,
      startCellIndex,
      cellCount,
      totalCellCount,
      isProvideVirtualCellsWidth
    } = options;
    var colSpan = groupByDate ? horizontalGroupCount * baseColSpan : baseColSpan;
    var leftVirtualCellCount = Math.floor(startCellIndex / colSpan);
    var actualCellCount = Math.ceil((startCellIndex + cellCount) / colSpan);
    var dateRow = completeDateHeaderMap[rowIndex].slice(leftVirtualCellCount, actualCellCount);
    var finalLeftVirtualCellCount = leftVirtualCellCount * colSpan;
    var finalLeftVirtualCellWidth = finalLeftVirtualCellCount * cellWidth;
    var finalRightVirtualCellCount = totalCellCount - actualCellCount * colSpan;
    var finalRightVirtualCellWidth = finalRightVirtualCellCount * cellWidth;
    return {
      dateRow,
      leftVirtualCellCount: finalLeftVirtualCellCount,
      leftVirtualCellWidth: isProvideVirtualCellsWidth ? finalLeftVirtualCellWidth : undefined,
      rightVirtualCellCount: finalRightVirtualCellCount,
      rightVirtualCellWidth: isProvideVirtualCellsWidth ? finalRightVirtualCellWidth : undefined
    };
  }

  _generateTimePanelData(completeTimePanelMap, options) {
    var {
      startRowIndex,
      rowCount,
      topVirtualRowHeight,
      bottomVirtualRowHeight,
      cellCountInGroupRow,
      isGroupedAllDayPanel,
      isVerticalGrouping,
      isAllDayPanelVisible
    } = options;
    var indexDifference = isVerticalGrouping || !isAllDayPanelVisible ? 0 : 1;
    var correctedStartRowIndex = startRowIndex + indexDifference;
    var timePanelMap = completeTimePanelMap.slice(correctedStartRowIndex, correctedStartRowIndex + rowCount);
    var timePanelData = {
      topVirtualRowHeight,
      bottomVirtualRowHeight,
      isGroupedAllDayPanel,
      cellCountInGroupRow
    };

    var {
      previousGroupedData: groupedData
    } = this._generateTimePanelDataFromMap(timePanelMap, isGroupedAllDayPanel);

    timePanelData.groupedData = groupedData;
    return timePanelData;
  }

  _generateTimePanelDataFromMap(timePanelMap, isGroupedAllDayPanel) {
    return timePanelMap.reduce((_ref3, cellData) => {
      var {
        previousGroupIndex,
        previousGroupedData
      } = _ref3;
      var currentGroupIndex = cellData.groupIndex;

      if (currentGroupIndex !== previousGroupIndex) {
        previousGroupedData.push({
          dateTable: [],
          isGroupedAllDayPanel,
          groupIndex: currentGroupIndex
        });
      }

      if (cellData.allDay) {
        previousGroupedData[previousGroupedData.length - 1].allDayPanel = cellData;
      } else {
        previousGroupedData[previousGroupedData.length - 1].dateTable.push(cellData);
      }

      return {
        previousGroupIndex: currentGroupIndex,
        previousGroupedData
      };
    }, {
      previousGroupIndex: -1,
      previousGroupedData: []
    });
  }

  _getViewDataFromMap(viewDataMap, options) {
    var {
      topVirtualRowHeight,
      bottomVirtualRowHeight,
      leftVirtualCellWidth,
      rightVirtualCellWidth,
      cellCountInGroupRow,
      totalCellCount,
      totalRowCount,
      cellCount,
      rowCount,
      startRowIndex,
      startCellIndex,
      isProvideVirtualCellsWidth,
      isGroupedAllDayPanel,
      isStandaloneAllDayPanel
    } = options;
    var {
      allDayPanelMap,
      dateTableMap
    } = viewDataMap;
    var {
      previousGroupedData: groupedData
    } = dateTableMap.reduce((_ref4, cellsRow) => {
      var {
        previousGroupIndex,
        previousGroupedData
      } = _ref4;
      var cellDataRow = cellsRow.map(_ref5 => {
        var {
          cellData
        } = _ref5;
        return cellData;
      });
      var firstCell = cellDataRow[0];
      var isAllDayRow = firstCell.allDay;
      var currentGroupIndex = firstCell.groupIndex;

      if (currentGroupIndex !== previousGroupIndex) {
        previousGroupedData.push({
          dateTable: [],
          isGroupedAllDayPanel,
          groupIndex: currentGroupIndex
        });
      }

      if (isAllDayRow) {
        previousGroupedData[previousGroupedData.length - 1].allDayPanel = cellDataRow;
      } else {
        previousGroupedData[previousGroupedData.length - 1].dateTable.push(cellDataRow);
      }

      return {
        previousGroupedData,
        previousGroupIndex: currentGroupIndex
      };
    }, {
      previousGroupIndex: -1,
      previousGroupedData: []
    });

    if (isStandaloneAllDayPanel) {
      groupedData[0].allDayPanel = allDayPanelMap.map(_ref6 => {
        var {
          cellData
        } = _ref6;
        return cellData;
      });
    }

    return {
      groupedData,
      topVirtualRowHeight,
      bottomVirtualRowHeight,
      leftVirtualCellWidth: isProvideVirtualCellsWidth ? leftVirtualCellWidth : undefined,
      rightVirtualCellWidth: isProvideVirtualCellsWidth ? rightVirtualCellWidth : undefined,
      cellCountInGroupRow,
      isGroupedAllDayPanel,
      leftVirtualCellCount: startCellIndex,
      rightVirtualCellCount: totalCellCount - startCellIndex - cellCount,
      topVirtualRowCount: startRowIndex,
      bottomVirtualRowCount: totalRowCount - startRowIndex - rowCount
    };
  }

  _generateViewCellsData(options, rowsCount) {
    var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var {
      cellCountInGroupRow,
      cellDataGetters
    } = options;
    var viewCellsData = [];

    for (var rowIndex = 0; rowIndex < rowsCount; rowIndex += 1) {
      viewCellsData.push(this._generateCellsRow(options, cellDataGetters, rowIndex, cellCountInGroupRow, step));
    }

    return viewCellsData;
  }

  _generateAllDayPanelData(options, cellCount) {
    var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;

    if (!options.isAllDayPanelVisible) {
      return null;
    }

    return this._generateCellsRow(options, [options.getAllDayCellData], 0, cellCount, step);
  }

  _generateCellsRow(options, cellDataGetters, rowIndex, columnCount, step) {
    var _this = this;

    var cellsRow = [];

    var _loop = function _loop(columnIndex) {
      var correctedColumnIndex = step * columnIndex;
      var cellDataValue = cellDataGetters.reduce((data, getter) => _extends({}, data, getter(undefined, rowIndex, correctedColumnIndex, 0, data.startDate).value), {});
      cellDataValue.index = rowIndex * columnCount + columnIndex;
      cellDataValue.isFirstGroupCell = _this._isFirstGroupCell(rowIndex, columnIndex, options);
      cellDataValue.isLastGroupCell = _this._isLastGroupCell(rowIndex, columnIndex, options);
      cellsRow.push(cellDataValue);
    };

    for (var columnIndex = 0; columnIndex < columnCount; ++columnIndex) {
      _loop(columnIndex);
    }

    return cellsRow;
  }

  _calculateCellIndex(horizontalGroupCount, groupOrientation, isGroupedByDate, rowIndex, columnIndex, columnsNumber) {
    var groupCount = horizontalGroupCount || 1;
    var index = rowIndex * columnsNumber + columnIndex;
    var columnsInGroup = columnsNumber / groupCount;

    if (groupOrientation === 'horizontal') {
      var columnIndexInCurrentGroup = columnIndex % columnsInGroup;

      if (isGroupedByDate) {
        columnIndexInCurrentGroup = Math.floor(columnIndex / groupCount);
      }

      index = rowIndex * columnsInGroup + columnIndexInCurrentGroup;
    }

    return index;
  }

  generateGroupedDataMap(viewDataMap) {
    var {
      allDayPanelMap,
      dateTableMap
    } = viewDataMap;
    var {
      previousGroupedDataMap: dateTableGroupedMap
    } = dateTableMap.reduce((previousOptions, cellsRow) => {
      var {
        previousGroupedDataMap,
        previousRowIndex,
        previousGroupIndex
      } = previousOptions;
      var {
        groupIndex: currentGroupIndex
      } = cellsRow[0].cellData;
      var currentRowIndex = currentGroupIndex === previousGroupIndex ? previousRowIndex + 1 : 0;
      cellsRow.forEach(cell => {
        var {
          groupIndex
        } = cell.cellData;

        if (!previousGroupedDataMap[groupIndex]) {
          previousGroupedDataMap[groupIndex] = [];
        }

        if (!previousGroupedDataMap[groupIndex][currentRowIndex]) {
          previousGroupedDataMap[groupIndex][currentRowIndex] = [];
        }

        previousGroupedDataMap[groupIndex][currentRowIndex].push(cell);
      });
      return {
        previousGroupedDataMap,
        previousRowIndex: currentRowIndex,
        previousGroupIndex: currentGroupIndex
      };
    }, {
      previousGroupedDataMap: [],
      previousRowIndex: -1,
      previousGroupIndex: -1
    });
    var allDayPanelGroupedMap = [];
    allDayPanelMap === null || allDayPanelMap === void 0 ? void 0 : allDayPanelMap.forEach(cell => {
      var {
        groupIndex
      } = cell.cellData;

      if (!allDayPanelGroupedMap[groupIndex]) {
        allDayPanelGroupedMap[groupIndex] = [];
      }

      allDayPanelGroupedMap[groupIndex].push(cell);
    });
    return {
      allDayPanelGroupedMap,
      dateTableGroupedMap
    };
  }

  _isFirstGroupCell(rowIndex, columnIndex, options) {
    var {
      groupOrientation,
      rowCountInGroup,
      cellCountInGroupRow,
      groupCount,
      groupByDate
    } = options;

    if (groupByDate) {
      return columnIndex % groupCount === 0;
    }

    if (groupOrientation === HORIZONTAL_GROUP_ORIENTATION) {
      return columnIndex % cellCountInGroupRow === 0;
    }

    return rowIndex % rowCountInGroup === 0;
  }

  _isLastGroupCell(rowIndex, columnIndex, options) {
    var {
      groupOrientation,
      rowCountInGroup,
      cellCountInGroupRow,
      groupCount,
      groupByDate
    } = options;

    if (groupByDate) {
      return (columnIndex + 1) % groupCount === 0;
    }

    if (groupOrientation === HORIZONTAL_GROUP_ORIENTATION) {
      return (columnIndex + 1) % cellCountInGroupRow === 0;
    }

    return (rowIndex + 1) % rowCountInGroup === 0;
  }

  markSelectedAndFocusedCells(viewDataMap, renderOptions) {
    var {
      selectedCells,
      focusedCell
    } = renderOptions;

    if (!selectedCells && !focusedCell) {
      return viewDataMap;
    }

    var {
      allDayPanelMap,
      dateTableMap
    } = viewDataMap;
    var nextDateTableMap = dateTableMap.map(row => {
      return this._markSelectedAndFocusedCellsInRow(row, selectedCells, focusedCell);
    });

    var nextAllDayMap = this._markSelectedAndFocusedCellsInRow(allDayPanelMap, selectedCells, focusedCell);

    return {
      allDayPanelMap: nextAllDayMap,
      dateTableMap: nextDateTableMap
    };
  }

  _markSelectedAndFocusedCellsInRow(dataRow, selectedCells, focusedCell) {
    return dataRow.map(cell => {
      var {
        index,
        groupIndex,
        allDay,
        startDate
      } = cell.cellData;
      var indexInSelectedCells = selectedCells.findIndex(_ref7 => {
        var {
          index: selectedCellIndex,
          groupIndex: selectedCellGroupIndex,
          allDay: selectedCellAllDay,
          startDate: selectedCellStartDate
        } = _ref7;
        return groupIndex === selectedCellGroupIndex && (index === selectedCellIndex || selectedCellIndex === undefined && startDate.getTime() === selectedCellStartDate.getTime()) && !!allDay === !!selectedCellAllDay;
      });
      var isFocused = !!focusedCell && index === focusedCell.cellData.index && groupIndex === focusedCell.cellData.groupIndex && allDay === focusedCell.cellData.allDay;

      if (!isFocused && indexInSelectedCells === -1) {
        return cell;
      }

      return _extends({}, cell, {
        cellData: _extends({}, cell.cellData, {
          isSelected: indexInSelectedCells > -1,
          isFocused
        })
      });
    });
  }

}