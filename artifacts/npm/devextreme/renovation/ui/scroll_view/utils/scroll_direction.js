/**
* DevExtreme (renovation/ui/scroll_view/utils/scroll_direction.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.ScrollDirection = void 0;

var _consts = require("../common/consts");

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ScrollDirection = /*#__PURE__*/function () {
  function ScrollDirection(direction) {
    this.DIRECTION_HORIZONTAL = "horizontal";
    this.DIRECTION_VERTICAL = "vertical";
    this.DIRECTION_BOTH = "both";
    this.direction = direction !== null && direction !== void 0 ? direction : _consts.DIRECTION_VERTICAL;
  }

  _createClass(ScrollDirection, [{
    key: "isHorizontal",
    get: function get() {
      return this.direction === _consts.DIRECTION_HORIZONTAL || this.direction === _consts.DIRECTION_BOTH;
    }
  }, {
    key: "isVertical",
    get: function get() {
      return this.direction === _consts.DIRECTION_VERTICAL || this.direction === _consts.DIRECTION_BOTH;
    }
  }, {
    key: "isBoth",
    get: function get() {
      return this.direction === _consts.DIRECTION_BOTH;
    }
  }]);

  return ScrollDirection;
}();

exports.ScrollDirection = ScrollDirection;
