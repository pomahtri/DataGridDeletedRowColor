/**
* DevExtreme (file_management/error.d.ts)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import FileSystemItem from "./file_system_item";

/**
 * @docid FileSystemError
 * @module file_management/error
 * @namespace DevExpress.fileManagement
 * @export default
 * @public
 */
 export default class FileSystemError {
   constructor(errorCode?: number, fileSystemItem?: FileSystemItem, errorText?: string)
    /**
     * @docid FileSystemError.fileSystemItem
     * @public
     */
    fileSystemItem?: FileSystemItem;

    /**
     * @docid FileSystemError.errorCode
     * @type number
     * @public
     */
    errorCode?: number;

    /**
     * @docid FileSystemError.errorText
     * @public
     */
     errorText?: string;
}
