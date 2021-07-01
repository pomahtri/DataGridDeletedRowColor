/**
* DevExtreme (data/errors.d.ts)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * @docid Utils.errorHandler
 * @type function(e)
 * @type_function_param1 e:Error
 * @module data/errors
 * @export errorHandler
 * @namespace DevExpress.data
 * @deprecated Utils.setErrorHandler
 * @public
 */
export function errorHandler(e: Error): void;

/**
 * @docid Utils.setErrorHandler
 * @type function(handler)
 * @type_function_param1 handler: function
 * @module data/errors
 * @export setErrorHandler
 * @namespace DevExpress.data
 * @public
 */
export function setErrorHandler(handler: (e: Error) => void): void;
