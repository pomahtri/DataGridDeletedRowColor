/**
* DevExtreme (esm/ui/multi_view.js)
* Version: 21.2.0
* Build date: Fri Jul 02 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../core/renderer';
import { locate } from '../animation/translator';
import { _translator, animation } from './multi_view/ui.multi_view.animation';
import { sign } from '../core/utils/math';
import { extend } from '../core/utils/extend';
import { noop, deferRender } from '../core/utils/common';
import { triggerResizeEvent } from '../events/visibility_change';
import { getPublicElement } from '../core/element';
import { isDefined } from '../core/utils/type';
import devices from '../core/devices';
import registerComponent from '../core/component_registrator';
import CollectionWidget from './collection/ui.collection_widget.live_update';
import Swipeable from '../events/gesture/swipeable';
import { Deferred } from '../core/utils/deferred'; // STYLE multiView

var MULTIVIEW_CLASS = 'dx-multiview';
var MULTIVIEW_WRAPPER_CLASS = 'dx-multiview-wrapper';
var MULTIVIEW_ITEM_CONTAINER_CLASS = 'dx-multiview-item-container';
var MULTIVIEW_ITEM_CLASS = 'dx-multiview-item';
var MULTIVIEW_ITEM_HIDDEN_CLASS = 'dx-multiview-item-hidden';
var MULTIVIEW_ITEM_DATA_KEY = 'dxMultiViewItemData';
var MULTIVIEW_ANIMATION_DURATION = 200;

var toNumber = value => +value;

var position = $element => locate($element).left;

var MultiView = CollectionWidget.inherit({
  _activeStateUnit: '.' + MULTIVIEW_ITEM_CLASS,
  _supportedKeys: function _supportedKeys() {
    return extend(this.callBase(), {
      pageUp: noop,
      pageDown: noop
    });
  },
  _getDefaultOptions: function _getDefaultOptions() {
    return extend(this.callBase(), {
      selectedIndex: 0,
      swipeEnabled: true,
      animationEnabled: true,
      loop: false,
      deferRendering: true,

      /**
      * @name dxMultiViewOptions.selectedItems
      * @hidden
      */

      /**
      * @name dxMultiViewOptions.selectedItemKeys
      * @hidden
      */

      /**
      * @name dxMultiViewOptions.keyExpr
      * @hidden
      */
      _itemAttributes: {
        role: 'tabpanel'
      },
      loopItemFocus: false,
      selectOnFocus: true,
      selectionMode: 'single',
      selectionRequired: true,
      selectionByClick: false
    });
  },
  _defaultOptionsRules: function _defaultOptionsRules() {
    return this.callBase().concat([{
      device: function device() {
        return devices.real().deviceType === 'desktop' && !devices.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }]);
  },
  _itemClass: function _itemClass() {
    return MULTIVIEW_ITEM_CLASS;
  },
  _itemDataKey: function _itemDataKey() {
    return MULTIVIEW_ITEM_DATA_KEY;
  },
  _itemContainer: function _itemContainer() {
    return this._$itemContainer;
  },
  _itemElements: function _itemElements() {
    return this._itemContainer().children(this._itemSelector());
  },
  _itemWidth: function _itemWidth() {
    if (!this._itemWidthValue) {
      this._itemWidthValue = this._$wrapper.width();
    }

    return this._itemWidthValue;
  },
  _clearItemWidthCache: function _clearItemWidthCache() {
    delete this._itemWidthValue;
  },
  _itemsCount: function _itemsCount() {
    return this.option('items').length;
  },
  _normalizeIndex: function _normalizeIndex(index) {
    var count = this._itemsCount();

    if (index < 0) {
      index = index + count;
    }

    if (index >= count) {
      index = index - count;
    }

    return index;
  },
  _getRTLSignCorrection: function _getRTLSignCorrection() {
    return this.option('rtlEnabled') ? -1 : 1;
  },
  _init: function _init() {
    this.callBase.apply(this, arguments);
    var $element = this.$element();
    $element.addClass(MULTIVIEW_CLASS);
    this._$wrapper = $('<div>').addClass(MULTIVIEW_WRAPPER_CLASS);

    this._$wrapper.appendTo($element);

    this._$itemContainer = $('<div>').addClass(MULTIVIEW_ITEM_CONTAINER_CLASS);

    this._$itemContainer.appendTo(this._$wrapper);

    this.option('loopItemFocus', this.option('loop'));

    this._initSwipeable();
  },
  _initMarkup: function _initMarkup() {
    this._deferredItems = [];
    this.callBase();

    var selectedItemIndices = this._getSelectedItemIndices();

    this._updateItemsVisibility(selectedItemIndices[0]);
  },
  _afterItemElementDeleted: function _afterItemElementDeleted($item, deletedActionArgs) {
    this.callBase($item, deletedActionArgs);

    if (this._deferredItems) {
      this._deferredItems.splice(deletedActionArgs.itemIndex, 1);
    }
  },
  _beforeItemElementInserted: function _beforeItemElementInserted(change) {
    this.callBase.apply(this, arguments);

    if (this._deferredItems) {
      this._deferredItems.splice(change.index, 0, null);
    }
  },
  _executeItemRenderAction: function _executeItemRenderAction(index, itemData, itemElement) {
    index = (this.option('items') || []).indexOf(itemData);
    this.callBase(index, itemData, itemElement);
  },
  _renderItemContent: function _renderItemContent(args) {
    var renderContentDeferred = new Deferred();
    var that = this;
    var callBase = this.callBase;
    var deferred = new Deferred();
    deferred.done(function () {
      var $itemContent = callBase.call(that, args);
      renderContentDeferred.resolve($itemContent);
    });
    this._deferredItems[args.index] = deferred;
    this.option('deferRendering') || deferred.resolve();
    return renderContentDeferred.promise();
  },
  _render: function _render() {
    this.callBase();
    deferRender(() => {
      var selectedItemIndices = this._getSelectedItemIndices();

      this._updateItems(selectedItemIndices[0]);
    });
  },
  _updateItems: function _updateItems(selectedIndex, newIndex) {
    this._updateItemsPosition(selectedIndex, newIndex);

    this._updateItemsVisibility(selectedIndex, newIndex);
  },
  _modifyByChanges: function _modifyByChanges() {
    this.callBase.apply(this, arguments);

    var selectedItemIndices = this._getSelectedItemIndices();

    this._updateItemsVisibility(selectedItemIndices[0]);
  },
  _updateItemsPosition: function _updateItemsPosition(selectedIndex, newIndex) {
    var $itemElements = this._itemElements();

    var positionSign = isDefined(newIndex) ? -this._animationDirection(newIndex, selectedIndex) : undefined;
    var $selectedItem = $itemElements.eq(selectedIndex);

    _translator.move($selectedItem, 0);

    if (isDefined(newIndex)) {
      _translator.move($itemElements.eq(newIndex), positionSign * 100 + '%');
    }
  },
  _updateItemsVisibility: function _updateItemsVisibility(selectedIndex, newIndex) {
    var $itemElements = this._itemElements();

    $itemElements.each(function (itemIndex, item) {
      var $item = $(item);
      var isHidden = itemIndex !== selectedIndex && itemIndex !== newIndex;

      if (!isHidden) {
        this._renderSpecificItem(itemIndex);
      }

      $item.toggleClass(MULTIVIEW_ITEM_HIDDEN_CLASS, isHidden);
      this.setAria('hidden', isHidden || undefined, $item);
    }.bind(this));
  },
  _renderSpecificItem: function _renderSpecificItem(index) {
    var $item = this._itemElements().eq(index);

    var hasItemContent = $item.find(this._itemContentClass()).length > 0;

    if (isDefined(index) && !hasItemContent) {
      this._deferredItems[index].resolve();

      triggerResizeEvent($item);
    }
  },
  _refreshItem: function _refreshItem($item, item) {
    this.callBase($item, item);

    this._updateItemsVisibility(this.option('selectedIndex'));
  },
  _setAriaSelected: noop,
  _updateSelection: function _updateSelection(addedSelection, removedSelection) {
    var newIndex = addedSelection[0];
    var prevIndex = removedSelection[0];
    animation.complete(this._$itemContainer);

    this._updateItems(prevIndex, newIndex);

    var animationDirection = this._animationDirection(newIndex, prevIndex);

    this._animateItemContainer(animationDirection * this._itemWidth(), function () {
      _translator.move(this._$itemContainer, 0);

      this._updateItems(newIndex); // NOTE: force layout recalculation on iOS 6 & iOS 7.0 (B254713)


      this._$itemContainer.width();
    }.bind(this));
  },
  _animateItemContainer: function _animateItemContainer(position, completeCallback) {
    var duration = this.option('animationEnabled') ? MULTIVIEW_ANIMATION_DURATION : 0;
    animation.moveTo(this._$itemContainer, position, duration, completeCallback);
  },
  _animationDirection: function _animationDirection(newIndex, prevIndex) {
    var containerPosition = position(this._$itemContainer);

    var indexDifference = (prevIndex - newIndex) * this._getRTLSignCorrection() * this._getItemFocusLoopSignCorrection();

    var isSwipePresent = containerPosition !== 0;
    var directionSignVariable = isSwipePresent ? containerPosition : indexDifference;
    return sign(directionSignVariable);
  },

  _getSwipeDisabledState() {
    return !this.option('swipeEnabled') || this._itemsCount() <= 1;
  },

  _initSwipeable() {
    this._createComponent(this.$element(), Swipeable, {
      disabled: this._getSwipeDisabledState(),
      elastic: false,
      itemSizeFunc: this._itemWidth.bind(this),
      onStart: args => this._swipeStartHandler(args.event),
      onUpdated: args => this._swipeUpdateHandler(args.event),
      onEnd: args => this._swipeEndHandler(args.event)
    });
  },

  _swipeStartHandler: function _swipeStartHandler(e) {
    animation.complete(this._$itemContainer);
    var selectedIndex = this.option('selectedIndex');
    var loop = this.option('loop');
    var lastIndex = this._itemsCount() - 1;
    var rtl = this.option('rtlEnabled');
    e.maxLeftOffset = toNumber(loop || (rtl ? selectedIndex > 0 : selectedIndex < lastIndex));
    e.maxRightOffset = toNumber(loop || (rtl ? selectedIndex < lastIndex : selectedIndex > 0));
    this._swipeDirection = null;
  },
  _swipeUpdateHandler: function _swipeUpdateHandler(e) {
    var offset = e.offset;

    var swipeDirection = sign(offset) * this._getRTLSignCorrection();

    _translator.move(this._$itemContainer, offset * this._itemWidth());

    if (swipeDirection !== this._swipeDirection) {
      this._swipeDirection = swipeDirection;
      var selectedIndex = this.option('selectedIndex');

      var newIndex = this._normalizeIndex(selectedIndex - swipeDirection);

      this._updateItems(selectedIndex, newIndex);
    }
  },
  _swipeEndHandler: function _swipeEndHandler(e) {
    var targetOffset = e.targetOffset * this._getRTLSignCorrection();

    if (targetOffset) {
      this.option('selectedIndex', this._normalizeIndex(this.option('selectedIndex') - targetOffset)); // TODO: change focusedElement on focusedItem

      var $selectedElement = this.itemElements().filter('.dx-item-selected');
      this.option('focusStateEnabled') && this.option('focusedElement', getPublicElement($selectedElement));
    } else {
      this._animateItemContainer(0, noop);
    }
  },
  _getItemFocusLoopSignCorrection: function _getItemFocusLoopSignCorrection() {
    return this._itemFocusLooped ? -1 : 1;
  },
  _moveFocus: function _moveFocus() {
    this.callBase.apply(this, arguments);
    this._itemFocusLooped = false;
  },
  _prevItem: function _prevItem($items) {
    var $result = this.callBase.apply(this, arguments);
    this._itemFocusLooped = $result.is($items.last());
    return $result;
  },
  _nextItem: function _nextItem($items) {
    var $result = this.callBase.apply(this, arguments);
    this._itemFocusLooped = $result.is($items.first());
    return $result;
  },
  _dimensionChanged: function _dimensionChanged() {
    this._clearItemWidthCache();
  },
  _visibilityChanged: function _visibilityChanged(visible) {
    if (visible) {
      this._dimensionChanged();
    }
  },

  _updateSwipeDisabledState() {
    var disabled = this._getSwipeDisabledState();

    Swipeable.getInstance(this.$element()).option('disabled', disabled);
  },

  _optionChanged: function _optionChanged(args) {
    var value = args.value;

    switch (args.name) {
      case 'loop':
        this.option('loopItemFocus', value);
        break;

      case 'animationEnabled':
        break;

      case 'swipeEnabled':
        this._updateSwipeDisabledState();

        break;

      case 'deferRendering':
        this._invalidate();

        break;

      case 'items':
        this._updateSwipeDisabledState();

        this.callBase(args);
        break;

      default:
        this.callBase(args);
    }
  }
});
/**
* @name dxMultiViewItem.visible
* @hidden
*/

registerComponent('dxMultiView', MultiView);
export default MultiView;
