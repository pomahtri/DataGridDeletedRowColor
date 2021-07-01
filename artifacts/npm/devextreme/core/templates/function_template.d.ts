/**
* DevExtreme (core/templates/function_template.d.ts)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { DxElement } from "../element";

export class FunctionTemplate {
  render(template: {
    container: unknown,
    model?: object,
    transclude?: boolean
  }): DxElement;
}
