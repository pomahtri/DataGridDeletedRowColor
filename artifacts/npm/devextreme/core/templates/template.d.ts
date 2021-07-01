/**
* DevExtreme (core/templates/template.d.ts)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    UserDefinedElement
} from '../element';

export interface dxTemplateOptions {
    /**
     * @docid
     * @public
     */
    name?: string;
}
/**
 * @docid
 * @section uiWidgetMarkupComponents
 * @type object
 * @public
 */
export type dxTemplate = Template;
export class Template {
    constructor(options?: dxTemplateOptions)
}

/**
 * @docid
 * @section Common
 * @public
 */
export type template = string | Function | UserDefinedElement;
