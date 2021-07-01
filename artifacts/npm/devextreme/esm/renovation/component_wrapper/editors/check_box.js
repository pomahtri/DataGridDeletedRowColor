/**
* DevExtreme (esm/renovation/component_wrapper/editors/check_box.js)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Editor from "./editor";
import { addAttributes, getAriaName } from "../utils/utils";
export default class CheckBox extends Editor {
  _useTemplates() {
    return false;
  }

  _optionChanged(option) {
    var _this$_valueChangeAct;

    var {
      name,
      previousValue,
      value
    } = option;

    switch (name) {
      case "value":
        (_this$_valueChangeAct = this._valueChangeAction) === null || _this$_valueChangeAct === void 0 ? void 0 : _this$_valueChangeAct.call(this, {
          element: this.$element(),
          previousValue,
          value,
          event: this._valueChangeEventInstance
        });
        this._valueChangeEventInstance = undefined;
        break;

      case "onValueChanged":
        this._valueChangeAction = this._createActionByOption("onValueChanged", {
          excludeValidators: ["disabled", "readOnly"]
        });
        break;

      default:
        break;
    }

    super._optionChanged(option);
  }

  setAria(name, value) {
    var attrName = getAriaName(name);
    addAttributes(this.$element(), [{
      name: attrName,
      value
    }]);
  }

}
