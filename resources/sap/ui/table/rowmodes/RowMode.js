/*
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../library","../utils/TableUtils","sap/ui/core/Element","sap/ui/thirdparty/jquery"],function(e,t,o,a){"use strict";var i=t.createWeakMapFacade();var n=o.extend("sap.ui.table.rowmodes.RowMode",{metadata:{library:"sap.ui.table",abstract:true}});var r={};n.prototype.init=function(){this._bFiredRowsUpdatedAfterRendering=false;i(this).bListeningForFirstRowsUpdatedAfterRendering=false;i(this).bNoDataDisabled=false;i(this).updateTableAsync=t.throttle(this.updateTable.bind(this),50,{asyncLeading:true})};n.prototype.exit=function(){this.detachEvents();this.cancelAsyncOperations();this.deregisterHooks()};n.prototype.setParent=function(){this.detachEvents();this.cancelAsyncOperations();this.deregisterHooks();o.prototype.setParent.apply(this,arguments);this.attachEvents();this.registerHooks()};n.prototype.attachEvents=function(){t.addDelegate(this.getTable(),r,this)};n.prototype.detachEvents=function(){t.removeDelegate(this.getTable(),r)};n.prototype.cancelAsyncOperations=function(){var e=this.getTable();if(e){clearTimeout(e._mTimeouts.refreshRowsCreateRows)}i(this).updateTableAsync.cancel()};n.prototype.registerHooks=function(){var e=this.getTable();var o=t.Hook.Keys;t.Hook.register(e,o.Table.RowsUnbound,this._onTableRowsUnbound,this);t.Hook.register(e,o.Table.UpdateRows,this._onTableUpdateRows,this)};n.prototype.deregisterHooks=function(){var e=this.getTable();var o=t.Hook.Keys;t.Hook.deregister(e,o.Table.RowsUnbound,this._onTableRowsUnbound,this);t.Hook.deregister(e,o.Table.UpdateRows,this._onTableUpdateRows,this)};n.prototype.getMinRequestLength=function(){h(this,"getMinRequestLength")};n.prototype.getComputedRowCounts=function(){h(this,"getComputedRowCounts")};n.prototype.getTableStyles=function(){h(this,"getTableStyles")};n.prototype.getTableBottomPlaceholderStyles=function(){h(this,"getTableBottomPlaceholderStyles")};n.prototype.getRowContainerStyles=function(){h(this,"getRowContainerStyles")};n.prototype.getTable=function(){var e=this.getParent();return t.isA(e,"sap.ui.table.Table")?e:null};n.prototype.updateTable=function(e){var t=this.getTable();if(!t){return}i(this).updateTableAsync.cancel();var o=this.updateTableRows();if(t._bInvalid){return}this.applyTableStyles();this.applyRowContainerStyles();this.applyTableBottomPlaceholderStyles();if(o||t.getRows().some(function(e){return e.getDomRef()==null})){this.renderTableRows()}if(o||t.getRows().length>0){this.fireRowsUpdated(e)}};n.prototype.getBaseRowContentHeight=function(){return 0};n.prototype.getBaseRowHeightOfTable=function(){var e=this.getTable();return e?e._getBaseRowHeight():0};n.prototype.getDefaultRowContentHeightOfTable=function(){var e=this.getTable();return e?e._getDefaultRowContentHeight():0};n.prototype.getTotalRowCountOfTable=function(){var e=this.getTable();return e?e._getTotalRowCount():0};n.prototype._onTableRowsUnbound=function(){clearTimeout(this.getTable()._mTimeouts.refreshRowsCreateRows);this.updateTable(t.RowsUpdateReason.Unbind)};n.prototype._onTableUpdateRows=function(e){var t=this.getTable();clearTimeout(t._mTimeouts.refreshRowsCreateRows);i(this).updateTableAsync(e)};n.prototype.applyTableStyles=function(e){var t=this.getTableStyles();if(e){e.style("height",t.height);e.style("min-height",t.minHeight);e.style("max-height",t.maxHeight);return}var o=this.getTable();var a=o?o.getDomRef():null;if(a){a.style.height=t.height;a.style.minHeight=t.minHeight;a.style.maxHeight=t.maxHeight}};n.prototype.applyTableBottomPlaceholderStyles=function(e){var t=this.getTableBottomPlaceholderStyles();if(e){e.style("height",t.height);return}var o=this.getTable();var a=o?o.getDomRef("placeholder-bottom"):null;if(a){a.style.height=t.height}};n.prototype.applyRowContainerStyles=function(e){var t=this.getRowContainerStyles();if(e){e.style("height",t.height);e.style("min-height",t.minHeight);e.style("max-height",t.maxHeight);return}var o=this.getTable();var a=o?o.getDomRef("tableCCnt"):null;if(a){a.style.height=t.height;a.style.minHeight=t.minHeight;a.style.maxHeight=t.maxHeight}};n.prototype.computeStandardizedRowCounts=function(e,t,o){var a=this.getRowCountConstraints();if(a.fixedTop===true){t=1}else if(a.fixedTop===false){t=0}if(a.fixedBottom===true){o=1}else if(a.fixedBottom===false){o=0}e=Math.max(0,e);t=Math.max(0,t);o=Math.max(0,o);if(t+o>=e){o=Math.max(o>0?1:0,o-Math.max(0,t+o-(e-1)));t=Math.max(t>0?1:0,t-Math.max(0,t+o-(e-1)))}if(t+o>=e){o=0}if(t+o>=e){t=0}return{count:e,scrollable:e-t-o,fixedTop:t,fixedBottom:o}};n.prototype.getRowCountConstraints=function(){var e=this.getTable();return e?e.getProperty("rowCountConstraints")||{}:{}};n.prototype.renderRowStyles=function(e){};n.prototype.renderCellContentStyles=function(e){};n.prototype.initTableRowsAfterDataRequested=function(e){var t=this.getTable();var o=t.getBinding();clearTimeout(t._mTimeouts.refreshRowsCreateRows);if(!o||e<=0||t.getRows().length>0){return}o.attachEventOnce("dataRequested",function(){clearTimeout(t._mTimeouts.refreshRowsCreateRows);t._mTimeouts.refreshRowsCreateRows=setTimeout(function(){if(t.getRows().length>0){return}var o=s(t,e),a;for(var i=0;i<o.length;i++){a=o[i];a.setRowBindingContext(null,t);t.addAggregation("rows",a,true)}t._bRowAggregationInvalid=false},0)})};n.prototype.updateTableRows=function(){var e=this.getTable();var o=e.getRows();var a=this.getComputedRowCounts().count;var i;var n=false;if(t.isNoDataVisible(e)&&!e.getBinding()){a=0}else if(t.isVariableRowHeightEnabled(e)&&a>0){a++}if(e._bRowAggregationInvalid){n=o.length>0;e.destroyAggregation("rows",e._bInvalid?"KeepDom":true);o=[]}if(a===o.length){l(this,o);return n}t.dynamicCall(e._getSyncExtension,function(e){e.syncRowCount(a)});if(o.length<a){var r=s(e,a-o.length);o=o.concat(r);l(this,o);for(i=0;i<r.length;i++){e.addAggregation("rows",r[i],true)}}else{for(i=o.length-1;i>=a;i--){e.removeAggregation("rows",i,true)}o.splice(a);l(this,o)}n=true;e._bRowAggregationInvalid=false;return n};n.prototype.renderTableRows=function(){var e=this.getTable();var t=e?e.getDomRef("tableCCnt"):null;if(!t){return}var o=a.Event("BeforeRendering");o.setMarked("renderRows");o.srcControl=e;e._handleEvent(o);var i=sap.ui.getCore().createRenderManager();var n=e.getRenderer();n.renderTableCCnt(i,e);i.flush(t,false,false);i.destroy();var r=a.Event("AfterRendering");r.setMarked("renderRows");r.srcControl=e;e._handleEvent(r);var s=e.getRows().length>0;var l=e.getDomRef();l.querySelector(".sapUiTableCtrlBefore").setAttribute("tabindex",s?"0":"-1");l.querySelector(".sapUiTableCtrlAfter").setAttribute("tabindex",s?"0":"-1")};n.prototype.getRowContexts=function(e){var t=this.getTable();return t?t._getRowContexts(e):[]};n.prototype.fireRowsUpdated=function(e){var o=this.getTable();if(!o||!o._bContextsAvailable){return}if(!this._bFiredRowsUpdatedAfterRendering){e=t.RowsUpdateReason.Render;if(!i(this).bListeningForFirstRowsUpdatedAfterRendering){i(this).bListeningForFirstRowsUpdatedAfterRendering=true;o.attachEvent("_rowsUpdated",function(){this._bFiredRowsUpdatedAfterRendering=true;i(this).bListeningForFirstRowsUpdatedAfterRendering=false}.bind(this))}}o._fireRowsUpdated(e)};n.prototype.disableNoData=function(){var e=this.getTable();if(e&&!this.isNoDataDisabled()){i(this).bNoDataDisabled=true;e.invalidate()}};n.prototype.enableNoData=function(){var e=this.getTable();if(e&&this.isNoDataDisabled()){i(this).bNoDataDisabled=false;e.invalidate()}};n.prototype.isNoDataDisabled=function(){return i(this).bNoDataDisabled};function s(e,t){var o=[];var a=e.getRows().length;for(var i=0;i<t;i++){o.push(e._getRowClone(a+i))}return o}function l(e,t){var o=e.getTable();if(!o||t.length===0){return}var a=e.getRowContexts(t.length);for(var i=0;i<t.length;i++){t[i].setRowBindingContext(a[i],o)}}function h(e,t){throw new Error(e+": sap.ui.table.rowmodes.RowMode subclass does not implement #"+t)}r.onBeforeRendering=function(e){var t=e&&e.isMarked("renderRows");if(!t){this._bFiredRowsUpdatedAfterRendering=false}};return n});