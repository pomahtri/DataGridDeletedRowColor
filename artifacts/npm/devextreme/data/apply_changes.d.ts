/**
* DevExtreme (data/apply_changes.d.ts)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * @docid Utils.applyChanges
 * @publicName applyChanges(data, changes, options)
 * @param1 data:Array<any>
 * @param2 changes:Array<any>
 * @param3 options?:any
 * @param3_field1 keyExpr:String|Array<String>
 * @param3_field2 immutable:Boolean
 * @return Array<any>
 * @namespace DevExpress.data
 * @module data/apply_changes
 * @export default
 * @public
 */
declare function applyChanges(data: Array<any>, changes: Array<any>, options?: { keyExpr?: string | Array<string>, immutable?: boolean }): Array<any>;

export default applyChanges;
