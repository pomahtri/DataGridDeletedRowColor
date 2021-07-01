/**
* DevExtreme (data/load_options.d.ts)
* Version: 21.2.0
* Build date: Thu Jul 01 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/

/**
 * @docid
 * @namespace DevExpress.data
 * @type object
 */
export interface LoadOptions {
    /**
     * @docid
     * @public
     */
    customQueryParams?: any;
    /**
     * @docid
     * @public
     */
    expand?: any;
    /**
     * @docid
     * @public
     */
    filter?: any;
    /**
     * @docid
     * @public
     */
    group?: any;
    /**
     * @docid
     * @public
     */
    groupSummary?: any;
    /**
     * @docid
     * @public
     */
    parentIds?: Array<any>;
    /**
     * @docid
     * @public
     */
    requireGroupCount?: boolean;
    /**
     * @docid
     * @public
     */
    requireTotalCount?: boolean;
    /**
     * @docid
     * @type getter|Array<getter>
     * @public
     */
    searchExpr?: string | Function | Array<string | Function>;
    /**
     * @docid
     * @public
     */
    searchOperation?: string;
    /**
     * @docid
     * @public
     */
    searchValue?: any;
    /**
     * @docid
     * @public
     */
    select?: any;
    /**
     * @docid
     * @public
     */
    skip?: number;
    /**
     * @docid
     * @public
     */
    sort?: any;
    /**
     * @docid
     * @public
     */
    take?: number;
    /**
     * @docid
     * @public
     */
    totalSummary?: any;
    /**
     * @docid
     * @public
     */
    userData?: any;
}
