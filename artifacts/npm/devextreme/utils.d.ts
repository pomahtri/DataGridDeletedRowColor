/**
* DevExtreme (utils.d.ts)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * @docid Utils.compileGetter
 * @publicName compileGetter(expr)
 * @param1 expr:string|Array<string>
 * @return function
 * @module utils
 * @namespace DevExpress.data.utils
 * @export compileGetter
 * @public
 */
export function compileGetter(expr: string | Array<string>): Function;

/**
 * @docid Utils.compileSetter
 * @publicName compileSetter(expr)
 * @param1 expr:string|Array<string>
 * @return function
 * @module utils
 * @namespace DevExpress.data.utils
 * @export compileSetter
 * @public
 */
export function compileSetter(expr: string | Array<string>): Function;
