/**
* DevExtreme (core/set_template_engine.d.ts)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * @docid
 * @publicName setTemplateEngine(name)
 * @param1 templateEngineName:string
 * @namespace DevExpress
 * @module core/set_template_engine
 * @export default
 * @public
 */
declare function setTemplateEngine(templateEngineName: string): void;

/**
 * @docid
 * @publicName setTemplateEngine(options)
 * @param1 templateEngineOptions:object
 * @param1_field1 compile:function(html, $element)
 * @param1_field2 render:function(template, data, index)
 * @namespace DevExpress
 * @module core/set_template_engine
 * @export default
 * @public
 */
declare function setTemplateEngine(templateEngineOptions: { compile?: Function, render?: Function }): void;


export default setTemplateEngine;
