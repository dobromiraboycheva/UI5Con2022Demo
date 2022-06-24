/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","./TableTypeBase","../library","sap/m/Button","sap/ui/Device","sap/m/plugins/ColumnResizer","sap/m/SegmentedButton","sap/m/SegmentedButtonItem"],function(e,t,i,o,n,s,a,l){"use strict";var r,u,p;var d=i.GrowingMode;var g=i.RowAction;var h=t.extend("sap.ui.mdc.table.ResponsiveTableType",{metadata:{library:"sap.ui.mdc",properties:{growingMode:{type:"sap.ui.mdc.GrowingMode",defaultValue:d.Basic},showDetailsButton:{type:"boolean",group:"Misc",defaultValue:false},detailsButtonSetting:{type:"sap.ui.core.Priority[]",group:"Behavior"},popinLayout:{type:"sap.m.PopinLayout",group:"Appearance",defaultValue:"Block"}}}});h.prototype.setDetailsButtonSetting=function(e){this.setProperty("detailsButtonSetting",e,true);return this};h.prototype.updateRelevantTableProperty=function(e,t,i){if(e&&e.isA("sap.m.Table")){if(t==="growingMode"){e.setGrowingScrollToLoad(i===d.Scroll);e.setGrowing(i!==d.None)}else if(t==="showDetailsButton"){this.updateShowDetailsButton(e,i)}else if(t==="popinLayout"){e.setPopinLayout(i)}}};h.updateDefault=function(e){if(e){e.setGrowing(true);e.setGrowingScrollToLoad(false)}};h.prototype.updateShowDetailsButton=function(e,t){if(t&&!this._oShowDetailsButton){e.getHeaderToolbar().insertEnd(this._getShowDetailsButton(),0);e.attachEvent("popinChanged",this._onPopinChanged,this);e.setHiddenInPopin(this._getImportanceToHide())}else if(!t&&this._oShowDetailsButton){e.detachEvent("popinChanged",this._onPopinChanged,this);e.getHeaderToolbar().removeEnd(this._oShowDetailsButton);e.setHiddenInPopin([]);this._oShowDetailsButton.destroy();delete this._oShowDetailsButton}};h.loadTableModules=function(){if(!r){return new Promise(function(e,t){sap.ui.require(["sap/m/Table","sap/m/Column","sap/m/ColumnListItem"],function(t,i,o){r=t;u=i;p=o;e()},function(){t("Failed to load some modules")})})}else{return Promise.resolve()}};h.createTable=function(e,t){return new r(e,t)};h.createColumn=function(e,t){return new u(e,t)};h.createTemplate=function(e,t){return new p(e,t)};h.updateSelection=function(e){e._oTable.setMode(t.getSelectionMode(e))};h.updateMultiSelectMode=function(e){e._oTable.setMultiSelectMode(e.getMultiSelectMode())};h.updateRowSettings=function(e,t,i){var o=e._oTemplate;o.unbindProperty("navigated");o.unbindProperty("highlight");o.unbindProperty("highlightText");this.updateRowActions(e,t,i);var n=t.getAllSettings();o.applySettings(n)};h.updateRowActions=function(e,t){e._oTemplate.unbindProperty("type");var i=e.hasListeners("rowPress")?"Active":"Inactive";if(!t){e._oTemplate.setType(i);return}var o,n,s,a=t.getAllActions();if("templateInfo"in a){var l=a.templateInfo;s=l.visible.formatter;n=typeof l.visible=="object";o=l.visible}else if(a&&a.items){var r;if(a.items.length==0){e._oTemplate.setType(i);return}r=a.items.find(function(e){return e.getType()=="Navigation"});if(!r&&a.items.length>0){throw new Error("No RowAction of type 'Navigation' found. sap.m.Table only accepts RowAction of type 'Navigation'.")}e._oTemplate.data("rowAction",r);n=r.isBound("visible");o=n?r.getBindingInfo("visible"):r.getVisible();s=o.formatter}if(s){o.formatter=function(e){var t=s(e);return t?g.Navigation:i}}else{o=o?g.Navigation:i}if(n){e._oTemplate.bindProperty("type",o)}else{e._oTemplate.setProperty("type",o)}};h.disableColumnResizer=function(e,t){var i=s.getPlugin(t);if(i){i.setEnabled(false);i.detachColumnResize(e._onColumnResize,e)}};h.enableColumnResizer=function(e,t){t.setFixedLayout("Strict");var i=s.getPlugin(t);if(!i){var o=new s;t.addDependent(o);o.attachColumnResize(e._onColumnResize,e)}else{i.setEnabled(true);i.detachColumnResize(e._onColumnResize,e);i.attachColumnResize(e._onColumnResize,e)}};h.startColumnResize=function(e,t,i){var o=s.getPlugin(e);if(!o){return}if(i&&i.isA("sap.m.table.columnmenu.Menu")){return o.getColumnResizeQuickAction(t,i)}else{return o.getColumnResizeButton(t)}};h.prototype._toggleShowDetails=function(e){if(!this._oShowDetailsButton||e===this.bHideDetails){return}var t=this.getRelevantTable();this.bHideDetails=e;if(this.bHideDetails){t.setHiddenInPopin(this._getImportanceToHide())}else{t.setHiddenInPopin([])}};h.prototype._getShowDetailsButton=function(){if(!this._oShowDetailsButton){var t=e.getLibraryResourceBundle("sap.ui.mdc");this.bHideDetails=true;this._oShowDetailsButton=new a(this.getId()+"-showHideDetails",{visible:false,selectedKey:"hideDetails",items:[new l({icon:"sap-icon://detail-more",key:"showDetails",tooltip:t.getText("table.SHOWDETAILS_TEXT"),press:[function(){this._toggleShowDetails(false)},this]}),new l({icon:"sap-icon://detail-less",key:"hideDetails",tooltip:t.getText("table.HIDEDETAILS_TEXT"),press:[function(){this._toggleShowDetails(true)},this]})]})}return this._oShowDetailsButton};h.prototype._getImportanceToHide=function(){var e=this.getDetailsButtonSetting()||[];if(e.length){return e}else{return n.system.phone?["Low","Medium"]:["Low"]}};h.prototype._onPopinChanged=function(e){var t=e.getParameter("hasPopin");var i=e.getParameter("hiddenInPopin");var o=e.getSource().getVisibleItems().length;if(o&&(i.length||t&&!this.bHideDetails)){this._oShowDetailsButton.setVisible(true)}else{this._oShowDetailsButton.setVisible(false)}};h._onRowActionPress=function(e){var t=e.getParameter("listItem");var i=t.getBindingContext();if(t.getType()!=="Navigation"){return}var o=this.getRowSettings();var n=o.getAllActions();if(this.getRowSettings().isBound("rowActions")){var s=n.items.model;if(!this._oRowActionItem){this._oRowActionItem=n.items.template.clone()}this._oRowActionItem.setModel(this.getModel(s),s);this.getRowSettings().addDependent(this._oRowActionItem)}else{this._oRowActionItem=t.data("rowAction")}this._oRowActionItem.setType("Navigation");this._oRowActionItem.firePress({bindingContext:i})};return h});