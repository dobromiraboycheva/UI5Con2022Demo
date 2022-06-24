/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./GridTableType","./ResponsiveTableType","sap/m/library","sap/m/Label","sap/ui/model/json/JSONModel","sap/ui/model/base/ManagedObjectModel","sap/ui/core/Control","sap/ui/core/Core"],function(e,t,i,n,a,o,l,r){"use strict";var s=l.extend("sap.ui.mdc.table.Column",{metadata:{library:"sap.ui.mdc",defaultAggregation:"template",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},minWidth:{type:"float",group:"Behavior",defaultValue:8},header:{type:"string"},headerVisible:{type:"boolean",group:"Misc",defaultValue:true},hAlign:{type:"sap.ui.core.HorizontalAlign",defaultValue:"Begin"},importance:{type:"sap.ui.core.Priority",group:"Behavior",defaultValue:"None"},initialIndex:{type:"int",defaultValue:-1},dataProperty:{type:"string"}},aggregations:{template:{type:"sap.ui.core.Control",multiple:false},creationTemplate:{type:"sap.ui.core.Control",multiple:false}}},renderer:{apiVersion:2,render:function(e,t){e.openStart("div",t);e.openEnd();if(t._oColumnHeaderLabel){e.renderControl(t._oColumnHeaderLabel.getLabel())}e.close("div")}}});s.prototype.init=function(){this.mSkipPropagation={template:true,creationTemplate:true};this._oManagedObjectModel=new o(this);this._oSettingsModel=new a({width:this.getWidth(),calculatedWidth:null,p13nWidth:null,resizable:false})};s.prototype.getInnerColumn=function(){var e=this.getTable();if(e&&(!this._oInnerColumn||this._oInnerColumn.isDestroyed())){this._oInnerColumn=this._createInnerColumn()}return this._oInnerColumn};s.prototype._createInnerColumn=function(){var n=this.getTable();var a;var o={parts:[{path:"$this>/width"},{path:"$columnSettings>/calculatedWidth"},{path:"$columnSettings>/p13nWidth"}],formatter:function(e,t,i){return i||t||e}};this._readP13nValues();if(n._bMobileTable){a=t.createColumn(this.getId()+"-innerColumn",{width:o,autoPopinWidth:"{$this>/minWidth}",hAlign:"{$this>/hAlign}",header:this._getColumnHeaderLabel(),importance:"{$this>/importance}",popinDisplay:"Inline"})}else{a=e.createColumn(this.getId()+"-innerColumn",{width:o,minWidth:{path:"$this>/minWidth",formatter:function(e){return Math.round(e*parseFloat(i.BaseFontSize))}},hAlign:"{$this>/hAlign}",label:this._getColumnHeaderLabel(),resizable:"{$columnSettings>/resizable}",autoResizable:"{$columnSettings>/resizable}",template:this.getTemplateClone()});a.setCreationTemplate(this.getCreationTemplateClone())}a.setModel(this._oManagedObjectModel,"$this");a.setModel(this._oSettingsModel,"$columnSettings");return a};var p=l.extend("sap.ui.mdc.table.ColumnHeaderLabel",{metadata:{final:true,aggregations:{label:{type:"sap.m.Label",multiple:false}},associations:{column:{type:"sap.ui.mdc.table.Column"}}},renderer:{apiVersion:2,render:function(e,t){e.openStart("div",t);e.style("width","100%");e.openEnd();e.renderControl(r.byId(t.getColumn()));e.close("div")}},getText:function(){return this.getLabel().getText()},clone:function(){return this.getLabel().clone()}});s.prototype._getColumnHeaderLabel=function(){var e=this.getTable();if(e&&(!this._oColumnHeaderLabel||this._oColumnHeaderLabel.isDestroyed())){this._oColumnHeaderLabel=new p({column:this,label:new n({width:"{= ${$this>/headerVisible} ? null : '0px' }",text:"{$this>/header}",textAlign:"{$this>/hAlign}",wrapping:{parts:[{path:"$this>/headerVisible"},{path:"$columnSettings>/resizable"}],formatter:function(t,i){return e._bMobileTable&&t&&!i}},wrappingType:e._bMobileTable?"Hyphenated":null})})}return this._oColumnHeaderLabel};s.prototype.getTemplateClone=function(){var e=this.getTable();var t=this.getTemplate();if(e&&t&&(!this._oTemplateClone||this._oTemplateClone.isDestroyed())){this._oTemplateClone=t.clone();if(!e._bMobileTable){if(this._oTemplateClone.setWrapping){this._oTemplateClone.setWrapping(false)}if(this._oTemplateClone.setRenderWhitespace){this._oTemplateClone.setRenderWhitespace(false)}}}return this._oTemplateClone};s.prototype.getCreationTemplateClone=function(){var e=this.getTable();var t=this.getCreationTemplate();if(e&&t&&(!this._oCreationTemplateClone||this._oCreationTemplateClone.isDestroyed())){this._oCreationTemplateClone=t.clone();if(!e._bMobileTable){if(this._oCreationTemplateClone.setWrapping){this._oCreationTemplateClone.setWrapping(false)}if(this._oCreationTemplateClone.setRenderWhitespace){this._oCreationTemplateClone.setRenderWhitespace(false)}}}return this._oCreationTemplateClone};s.prototype.setHeader=function(e){this.setProperty("header",e,true);var t=this.getDomRef();if(t){t.textContent=this.getHeader()}return this};s.prototype._onTableChange=function(e){if(e.getParameter("name")==="enableColumnResize"){this._readTableSettings()}};s.prototype._readTableSettings=function(){var e=this.getTable();this._oSettingsModel.setProperty("/resizable",e.getEnableColumnResize())};s.prototype.setParent=function(e){var t=this.getTable();l.prototype.setParent.apply(this,arguments);if(this._bIsBeingMoved){return}this._disconnectFromTable(t);this._connectToTable()};s.prototype._connectToTable=function(){var e=this.getTable();if(!e){return}this._calculateColumnWidth();this._readP13nValues();this._readTableSettings();e.attachEvent("_change",this._onTableChange,this)};s.prototype._disconnectFromTable=function(e){e=e||this.getTable();if(!e){return}if(this._oInnerColumn){this._oInnerColumn.destroy("KeepDom");e.invalidate()}};s.prototype._onModifications=function(){this._readP13nValues()};s.prototype._calculateColumnWidth=function(){var e=this.getTable();if(!e||!e.getEnableAutoColumnWidth()||!this.isPropertyInitial("width")){return}var t=e.getPropertyHelper();if(t){this._oSettingsModel.setProperty("/calculatedWidth",t.calculateColumnWidth(this))}else{e.awaitPropertyHelper().then(this._calculateColumnWidth.bind(this))}};s.prototype._readP13nValues=function(){var e=this.getTable();var t=e.getCurrentState().xConfig;var i=this.getDataProperty();if(t instanceof Promise){t.then(this._readP13nValues.bind(this));return}var n=t&&t.aggregations&&t.aggregations.columns&&t.aggregations.columns[i]&&t.aggregations.columns[i].width;this._oSettingsModel.setProperty("/p13nWidth",n)};s.prototype.getTable=function(){var e=this.getParent();return e&&e.isA("sap.ui.mdc.Table")?e:null};s.prototype.exit=function(){this._disconnectFromTable();["_oManagedObjectModel","_oSettingsModel","_oInnerColumn","_oTemplateClone","_oCreationTemplateClone","_oColumnHeaderLabel"].forEach(function(e){if(this[e]){this[e].destroy();delete this[e]}},this)};return s});