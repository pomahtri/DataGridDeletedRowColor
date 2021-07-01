/**
* DevExtreme (esm/renovation/component_wrapper/navigation/scrollable.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Component from "../common/component";
import { Deferred } from "../../../core/utils/deferred";
export class ScrollableWrapper extends Component {
  handleMove(event) {
    this.viewRef.scrollableRef.handleMove(event);
  }

  update() {
    this.viewRef.update();
    return new Deferred().resolve();
  }

  _visibilityChanged() {
    super.repaint();
  }

  _container() {
    return this.$element().find(".dx-scrollable-container").eq(0);
  }

  $content() {
    return this.$element().find(".dx-scrollable-content").eq(0);
  }

  _moveIsAllowed(event) {
    return this.viewRef.scrollableRef.moveIsAllowed(event);
  }

  _prepareDirections(value) {
    this.viewRef.scrollableRef.prepareDirections(value);
  }

  _optionChanged(option) {
    var {
      name
    } = option;

    if (name === "useNative") {
      this._isNodeReplaced = false;
    }

    super._optionChanged(option);
  }

}
