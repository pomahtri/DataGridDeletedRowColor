/**
* DevExtreme (esm/ui/pivot_grid/ui.sortable.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import eventsEngine from '../../events/core/events_engine';
import { isDefined } from '../../core/utils/type';
import { extend } from '../../core/utils/extend';
import { each } from '../../core/utils/iterator';
import { addNamespace } from '../../events/utils/index';
import registerComponent from '../../core/component_registrator';
import DOMComponent from '../../core/dom_component';
import { start as dragEventStart, move as dragEventMove, end as dragEventEnd, enter as dragEventEnter, leave as dragEventLeave, drop as dragEventDrop } from '../../events/drag';
import swatchContainer from '../widget/swatch_container';
var {
  getSwatchContainer
} = swatchContainer;
var SORTABLE_NAMESPACE = 'dxSortable';
var SORTABLE_CLASS = 'dx-sortable-old';
var SCROLL_STEP = 2;
var START_SCROLL_OFFSET = 20;
var SCROLL_TIMEOUT = 10;

function elementHasPoint(element, x, y) {
  var $item = $(element);
  var offset = $item.offset();

  if (x >= offset.left && x <= offset.left + $item.outerWidth(true)) {
    if (y >= offset.top && y <= offset.top + $item.outerHeight(true)) {
      return true;
    }
  }
}

function checkHorizontalPosition(position, itemOffset, rtl) {
  if (isDefined(itemOffset.posHorizontal)) {
    return rtl ? position > itemOffset.posHorizontal : position < itemOffset.posHorizontal;
  } else {
    return true;
  }
}

function getIndex($items, $item) {
  var index = -1;
  var itemElement = $item.get(0);
  each($items, function (elementIndex, element) {
    var $element = $(element);

    if (!($element.attr('item-group') && $element.attr('item-group') === $items.eq(elementIndex - 1).attr('item-group'))) {
      index++;
    }

    if (element === itemElement) {
      return false;
    }
  });
  return index === $items.length ? -1 : index;
}

function getTargetGroup(e, $groups) {
  var result;
  each($groups, function () {
    if (elementHasPoint(this, e.pageX, e.pageY)) {
      result = $(this);
    }
  });
  return result;
}

function getItemsOffset($elements, isVertical, $itemsContainer) {
  var result = [];
  var $item = [];

  for (var i = 0; i < $elements.length; i += $item.length) {
    $item = $elements.eq(i);

    if ($item.attr('item-group')) {
      $item = $itemsContainer.find('[item-group=\'' + $item.attr('item-group') + '\']');
    }

    if ($item.is(':visible')) {
      var offset = {
        item: $item,
        index: result.length,
        posHorizontal: isVertical ? undefined : ($item.last().outerWidth(true) + $item.last().offset().left + $item.offset().left) / 2
      };

      if (isVertical) {
        offset.posVertical = ($item.last().offset().top + $item.offset().top + $item.last().outerHeight(true)) / 2;
      } else {
        offset.posVertical = $item.last().outerHeight(true) + $item.last().offset().top;
      }

      result.push(offset);
    }
  }

  return result;
}

function getScrollWrapper(scrollable) {
  var timeout = null;
  var scrollTop = scrollable.scrollTop();
  var $element = scrollable.$element();
  var top = $element.offset().top;
  var height = $element.height();
  var delta = 0;

  function onScroll(e) {
    scrollTop = e.scrollOffset.top;
  }

  scrollable.on('scroll', onScroll);

  function move() {
    stop();
    scrollable.scrollTo(scrollTop += delta);
    timeout = setTimeout(move, SCROLL_TIMEOUT);
  }

  function stop() {
    clearTimeout(timeout);
  }

  function moveIfNeed(event) {
    if (event.pageY <= top + START_SCROLL_OFFSET) {
      delta = -SCROLL_STEP;
    } else if (event.pageY >= top + height - START_SCROLL_OFFSET) {
      delta = SCROLL_STEP;
    } else {
      delta = 0;
      stop();
      return;
    }

    move();
  }

  return {
    moveIfNeed: moveIfNeed,
    element: function element() {
      return $element;
    },
    dispose: function dispose() {
      stop();
      scrollable.off('scroll', onScroll);
    }
  };
}

var Sortable = DOMComponent.inherit({
  _getDefaultOptions: function _getDefaultOptions() {
    return extend(this.callBase(), {
      onChanged: null,
      onDragging: null,
      itemRender: null,
      groupSelector: null,
      itemSelector: '.dx-sort-item',
      itemContainerSelector: '.dx-sortable-old',
      sourceClass: 'dx-drag-source',
      dragClass: 'dx-drag',
      targetClass: 'dx-drag-target',
      direction: 'vertical',
      allowDragging: true,
      groupFilter: null,
      useIndicator: false
    });
  },
  _renderItem: function _renderItem($sourceItem, target) {
    var itemRender = this.option('itemRender');
    var $item;

    if (itemRender) {
      $item = itemRender($sourceItem, target);
    } else {
      $item = $sourceItem.clone();
      $item.css({
        width: $sourceItem.width(),
        height: $sourceItem.height()
      });
    }

    return $item;
  },
  _renderIndicator: function _renderIndicator($item, isVertical, $targetGroup, isLast) {
    var height = $item.outerHeight(true);
    var width = $item.outerWidth(true);
    var top = $item.offset().top - $targetGroup.offset().top;
    var left = $item.offset().left - $targetGroup.offset().left;

    this._indicator.css({
      'position': 'absolute',
      'top': isLast && isVertical ? top + height : top,
      'left': isLast && !isVertical ? left + width : left
    }).toggleClass('dx-position-indicator-horizontal', !isVertical).toggleClass('dx-position-indicator-vertical', !!isVertical).toggleClass('dx-position-indicator-last', !!isLast).height('').width('').appendTo($targetGroup);

    isVertical ? this._indicator.width(width) : this._indicator.height(height);
  },
  _renderDraggable: function _renderDraggable($sourceItem) {
    this._$draggable && this._$draggable.remove();
    this._$draggable = this._renderItem($sourceItem, 'drag').addClass(this.option('dragClass')).appendTo(getSwatchContainer($sourceItem)).css({
      zIndex: 1000000,
      position: 'absolute'
    });
  },
  _detachEventHandlers: function _detachEventHandlers() {
    var dragEventsString = [dragEventMove, dragEventStart, dragEventEnd, dragEventEnter, dragEventLeave, dragEventDrop].join(' ');
    eventsEngine.off(this._getEventListener(), addNamespace(dragEventsString, SORTABLE_NAMESPACE));
  },
  _getItemOffset: function _getItemOffset(isVertical, itemsOffset, e) {
    for (var i = 0; i < itemsOffset.length; i++) {
      var shouldInsert = void 0;
      var sameLine = e.pageY < itemsOffset[i].posVertical;

      if (isVertical) {
        shouldInsert = sameLine;
      } else if (sameLine) {
        shouldInsert = checkHorizontalPosition(e.pageX, itemsOffset[i], this.option('rtlEnabled'));

        if (!shouldInsert && itemsOffset[i + 1] && itemsOffset[i + 1].posVertical > itemsOffset[i].posVertical) {
          shouldInsert = true;
        }
      }

      if (shouldInsert) {
        return itemsOffset[i];
      }
    }
  },
  _getEventListener: function _getEventListener() {
    var groupSelector = this.option('groupSelector');
    var element = this.$element();
    return groupSelector ? element.find(groupSelector) : element;
  },
  _attachEventHandlers: function _attachEventHandlers() {
    var that = this;
    var itemSelector = that.option('itemSelector');
    var itemContainerSelector = that.option('itemContainerSelector');
    var groupSelector = that.option('groupSelector');
    var sourceClass = that.option('sourceClass');
    var targetClass = that.option('targetClass');
    var onDragging = that.option('onDragging');
    var groupFilter = that.option('groupFilter');
    var $sourceItem;
    var sourceIndex;
    var $targetItem;
    var $targetGroup;
    var startPositions;
    var sourceGroup;
    var element = that.$element();
    var $groups;
    var scrollWrapper = null;
    var targetIndex = -1;

    var setStartPositions = function setStartPositions() {
      startPositions = [];
      each($sourceItem, function (_, item) {
        startPositions.push($(item).offset());
      });
    };

    var createGroups = function createGroups() {
      if (!groupSelector) {
        return element;
      } else {
        return groupFilter ? $(groupSelector).filter(groupFilter) : element.find(groupSelector);
      }
    };

    var disposeScrollWrapper = function disposeScrollWrapper() {
      scrollWrapper && scrollWrapper.dispose();
      scrollWrapper = null;
    };

    var invokeOnDraggingEvent = function invokeOnDraggingEvent() {
      var draggingArgs = {
        sourceGroup: sourceGroup,
        sourceIndex: sourceIndex,
        sourceElement: $sourceItem,
        targetGroup: $targetGroup.attr('group'),
        targetIndex: $targetGroup.find(itemSelector).index($targetItem)
      };
      onDragging && onDragging(draggingArgs);

      if (draggingArgs.cancel) {
        $targetGroup = undefined;
      }
    };

    that._detachEventHandlers();

    if (that.option('allowDragging')) {
      var $eventListener = that._getEventListener();

      eventsEngine.on($eventListener, addNamespace(dragEventStart, SORTABLE_NAMESPACE), itemSelector, function (e) {
        $sourceItem = $(e.currentTarget);
        var $sourceGroup = $sourceItem.closest(groupSelector);
        sourceGroup = $sourceGroup.attr('group');
        sourceIndex = getIndex((groupSelector ? $sourceGroup : element).find(itemSelector), $sourceItem);

        if ($sourceItem.attr('item-group')) {
          $sourceItem = $sourceGroup.find('[item-group=\'' + $sourceItem.attr('item-group') + '\']');
        }

        that._renderDraggable($sourceItem);

        $targetItem = that._renderItem($sourceItem, 'target').addClass(targetClass);
        $sourceItem.addClass(sourceClass);
        setStartPositions();
        $groups = createGroups();
        that._indicator = $('<div>').addClass('dx-position-indicator');
      });
      eventsEngine.on($eventListener, addNamespace(dragEventMove, SORTABLE_NAMESPACE), function (e) {
        var $item;
        var $lastItem;
        var $prevItem;

        if (!$sourceItem) {
          return;
        }

        targetIndex = -1;

        that._indicator.detach();

        each(that._$draggable, function (index, draggableElement) {
          $(draggableElement).css({
            top: startPositions[index].top + e.offset.y,
            left: startPositions[index].left + e.offset.x
          });
        });
        $targetGroup && $targetGroup.removeClass(targetClass);
        $targetGroup = getTargetGroup(e, $groups);
        $targetGroup && invokeOnDraggingEvent();

        if ($targetGroup && scrollWrapper && $targetGroup.get(0) !== scrollWrapper.element().get(0)) {
          disposeScrollWrapper();
        }

        scrollWrapper && scrollWrapper.moveIfNeed(e);

        if (!$targetGroup) {
          $targetItem.detach();
          return;
        }

        if (!scrollWrapper && $targetGroup.attr('allow-scrolling')) {
          scrollWrapper = getScrollWrapper($targetGroup.dxScrollable('instance'));
        }

        $targetGroup.addClass(targetClass);
        var $itemContainer = $targetGroup.find(itemContainerSelector);
        var $items = $itemContainer.find(itemSelector);
        var targetSortable = $targetGroup.closest('.' + SORTABLE_CLASS).data('dxSortableOld');
        var useIndicator = targetSortable.option('useIndicator');
        var isVertical = (targetSortable || that).option('direction') === 'vertical';
        var itemsOffset = getItemsOffset($items, isVertical, $itemContainer);

        var itemOffset = that._getItemOffset(isVertical, itemsOffset, e);

        if (itemOffset) {
          $item = itemOffset.item;
          $prevItem = itemsOffset[itemOffset.index - 1] && itemsOffset[itemOffset.index - 1].item;

          if ($item.hasClass(sourceClass) || $prevItem && $prevItem.hasClass(sourceClass) && $prevItem.is(':visible')) {
            $targetItem.detach();
            return;
          }

          targetIndex = itemOffset.index;

          if (!useIndicator) {
            $targetItem.insertBefore($item);
            return;
          }

          var isAnotherGroup = $targetGroup.attr('group') !== sourceGroup;
          var isSameIndex = targetIndex === sourceIndex;
          var isNextIndex = targetIndex === sourceIndex + 1;

          if (isAnotherGroup) {
            that._renderIndicator($item, isVertical, $targetGroup, that.option('rtlEnabled') && !isVertical);

            return;
          }

          if (!isSameIndex && !isNextIndex) {
            that._renderIndicator($item, isVertical, $targetGroup, that.option('rtlEnabled') && !isVertical);
          }
        } else {
          $lastItem = $items.last();

          if ($lastItem.is(':visible') && $lastItem.hasClass(sourceClass)) {
            return;
          }

          if ($itemContainer.length) {
            targetIndex = itemsOffset.length ? itemsOffset[itemsOffset.length - 1].index + 1 : 0;
          }

          if (useIndicator) {
            $items.length && that._renderIndicator($lastItem, isVertical, $targetGroup, !that.option('rtlEnabled') || isVertical);
          } else {
            $targetItem.appendTo($itemContainer);
          }
        }
      });
      eventsEngine.on($eventListener, addNamespace(dragEventEnd, SORTABLE_NAMESPACE), function () {
        disposeScrollWrapper();

        if (!$sourceItem) {
          return;
        }

        var onChanged = that.option('onChanged');
        var changedArgs = {
          sourceIndex: sourceIndex,
          sourceElement: $sourceItem,
          sourceGroup: sourceGroup,
          targetIndex: targetIndex,
          removeSourceElement: true,
          removeTargetElement: false,
          removeSourceClass: true
        };

        if ($targetGroup) {
          $targetGroup.removeClass(targetClass);
          changedArgs.targetGroup = $targetGroup.attr('group');

          if (sourceGroup !== changedArgs.targetGroup || targetIndex > -1) {
            onChanged && onChanged(changedArgs);
            changedArgs.removeSourceElement && $sourceItem.remove();
          }
        }

        that._indicator.detach();

        changedArgs.removeSourceClass && $sourceItem.removeClass(sourceClass);
        $sourceItem = null;

        that._$draggable.remove();

        that._$draggable = null;
        changedArgs.removeTargetElement && $targetItem.remove();
        $targetItem.removeClass(targetClass);
        $targetItem = null;
      });
    }
  },
  _init: function _init() {
    this.callBase();

    this._attachEventHandlers();
  },
  _render: function _render() {
    this.callBase();
    this.$element().addClass(SORTABLE_CLASS);
  },
  _dispose: function _dispose() {
    var that = this;
    that.callBase.apply(that, arguments);
    that._$draggable && that._$draggable.detach();
    that._indicator && that._indicator.detach();
  },
  _optionChanged: function _optionChanged(args) {
    var that = this;

    switch (args.name) {
      case 'onDragging':
      case 'onChanged':
      case 'itemRender':
      case 'groupSelector':
      case 'itemSelector':
      case 'itemContainerSelector':
      case 'sourceClass':
      case 'targetClass':
      case 'dragClass':
      case 'allowDragging':
      case 'groupFilter':
      case 'useIndicator':
        that._attachEventHandlers();

        break;

      case 'direction':
        break;

      default:
        that.callBase(args);
    }
  },
  _useTemplates: function _useTemplates() {
    return false;
  }
}); // TODO remove dxSortableOld component

registerComponent('dxSortableOld', Sortable);
export default Sortable;
