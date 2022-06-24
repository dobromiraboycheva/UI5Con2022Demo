/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object"],function(t){"use strict";var e=t.extend("sap.ui.table.extensions.ExtensionBase",{_table:null,_type:null,_settings:null,constructor:function(n,s){t.call(this);this._table=n;this._settings=s||{};this._type=e.TABLETYPES.STANDARD;if(n.isA("sap.ui.table.TreeTable")){this._type=e.TABLETYPES.TREE}else if(n.isA("sap.ui.table.AnalyticalTable")){this._type=e.TABLETYPES.ANALYTICAL}var i=this._init(this._table,this._type,this._settings);if(i){var a=this;n["_get"+i]=function(){return a}}},destroy:function(){this._table=null;this._type=null;this.bIsDestroyed=true;t.prototype.destroy.apply(this,arguments)},getInterface:function(){return this}});e.TABLETYPES={TREE:"TREE",ANALYTICAL:"ANALYTICAL",STANDARD:"STANDARD"};e.prototype.getTable=function(){return this._table};e.prototype._init=function(t,e,n){return null};e.prototype._attachEvents=function(){};e.prototype._detachEvents=function(){};e.attachEvents=function(t){if(!t._aExtensions){return}for(var e=0;e<t._aExtensions.length;e++){t._aExtensions[e]._attachEvents()}};e.detachEvents=function(t){if(!t._aExtensions){return}for(var e=0;e<t._aExtensions.length;e++){t._aExtensions[e]._detachEvents()}};e.enrich=function(t,n,s){if(!n||!(n.prototype instanceof e)){return null}var i=new n(t,s);if(!t._aExtensions){t._aExtensions=[]}t._aExtensions.push(i);return i};e.cleanup=function(t){if(!t._bExtensionsInitialized||!t._aExtensions){return}for(var e=0;e<t._aExtensions.length;e++){t._aExtensions[e].destroy()}delete t._aExtensions;delete t._bExtensionsInitialized};e.isEnrichedWith=function(t,e){if(!t||!t._aExtensions){return false}for(var n=0;n<t._aExtensions.length;n++){if(t._aExtensions[n].getMetadata().getName()===e){return true}}return false};return e});