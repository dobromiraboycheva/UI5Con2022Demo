/*
 * ! SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/core/Element","./ColumnWrapper"],function(a,e){"use strict";var n=a.extend("sap.ui.comp.personalization.SelectionWrapper",{constructor:function(e,n){a.apply(this,arguments)},metadata:{library:"sap.ui.comp",aggregations:{columns:{type:"sap.ui.comp.personalization.ColumnWrapper",multiple:true,singularName:"column"}}}});return n});