/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../TableSettings","../ResponsiveTableType","sap/m/table/columnmenu/QuickActionContainer","sap/m/table/columnmenu/QuickAction","sap/m/table/columnmenu/QuickSort","sap/m/table/columnmenu/QuickSortItem","sap/m/table/columnmenu/QuickGroup","sap/m/table/columnmenu/QuickGroupItem","sap/m/table/columnmenu/QuickTotal","sap/m/table/columnmenu/QuickTotalItem","sap/m/Button","sap/ui/core/Core","sap/ui/core/library"],function(e,t,r,n,a,i,o,u,c,l,s,m,g){"use strict";var p=r.extend("sap.ui.mdc.table.menu.QuickActionContainer",{metadata:{library:"sap.ui.mdc",associations:{table:{type:"sap.ui.mdc.Table"},column:{type:"sap.ui.mdc.table.Column"}}}});p.prototype.initializeQuickActions=function(){var r=this.getTable();var n=this.getColumn();var s=r.getPropertyHelper();var m=Promise.resolve();this.destroyQuickActions();if(r.isSortingEnabled()){var p=s.getProperty(n.getDataProperty()).getSortableProperties();var b=r._getSortedProperties();if(p.length>0){this.addQuickAction(new a({items:p.map(function(e){var t=g.SortOrder.None;var r=b.find(function(t){return t.name===e.name});if(r){t=r.descending?g.SortOrder.Descending:g.SortOrder.Ascending}return new i({key:e.name,label:e.label,sortOrder:t})}),change:function(t){var n=t.getParameter("item");e.createSort(r,n.getKey(),n.getSortOrder(),true)}}))}}if(r.isGroupingEnabled()){var d=s.getProperty(n.getDataProperty()).getGroupableProperties();var f=r._getGroupedProperties();if(d.length>0){this.addQuickAction(new o({items:d.map(function(e){var t=f.some(function(t){return t.name===e.name});return new u({key:e.name,label:e.label,grouped:t})}),change:function(t){var n=t.getParameter("item");e.createGroup(r,n.getKey())}}))}}if(r.isAggregationEnabled()){var y=s.getProperty(n.getDataProperty()).getAggregatableProperties();var v=r._getAggregatedProperties();if(y.length>0){this.addQuickAction(new c({items:y.map(function(e){return new l({key:e.name,label:e.label,totaled:v.hasOwnProperty(e.name)})}),change:function(t){var n=t.getParameter("item");e.createAggregation(r,n.getKey())}}))}}if(r._bMobileTable&&r.getEnableColumnResize()){var h=t.startColumnResize(r._oTable,r._oTable.getColumns()[r.indexOfColumn(n)],this.getMenu());this.addQuickAction(h)}return m};p.prototype.hasQuickActions=function(){return this.getEffectiveQuickActions().length>0};p.prototype.getTable=function(){return m.byId(this.getAssociation("table"))};p.prototype.getColumn=function(){return m.byId(this.getAssociation("column"))};return p});