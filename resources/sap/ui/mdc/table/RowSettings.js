/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element"],function(t){"use strict";var i=t.extend("sap.ui.mdc.table.RowSettings",{metadata:{library:"sap.ui.mdc",properties:{highlight:{type:"string",group:"Appearance",defaultValue:"None"},highlightText:{type:"string",group:"Misc",defaultValue:""},navigated:{type:"boolean",group:"Appearance",defaultValue:false}},aggregations:{rowActions:{type:"sap.ui.mdc.table.RowActionItem",multiple:true}}}});i.prototype.getAllSettings=function(){var t={},i=this.clone();if(this.isBound("navigated")){t.navigated=i.getBindingInfo("navigated")}else{t.navigated=this.getNavigated()}if(this.isBound("highlight")){t.highlight=i.getBindingInfo("highlight")}else{t.highlight=this.getHighlight()}if(this.isBound("highlightText")){t.highlightText=i.getBindingInfo("highlightText")}else{t.highlightText=this.getHighlightText()}return t};i.prototype.getAllActions=function(){var t={},i=this.clone();if(this.isBound("rowActions")){t.items=i.getBindingInfo("rowActions");var e=t.items.template;t.templateInfo={type:e.isBound("type")?e.getBindingInfo("type"):e.getType(),text:e.isBound("text")?e.getBindingInfo("text"):e.getText(),icon:e.isBound("icon")?e.getBindingInfo("icon"):e.getIcon(),visible:e.isBound("visible")?e.getBindingInfo("visible"):e.getVisible()}}else{t.items=this.getRowActions()}return t};i.prototype.getRowActionCount=function(){var t=0;if(this.isBound("rowActions")){t=1}else{t=this.getRowActions().length}return t};return i});