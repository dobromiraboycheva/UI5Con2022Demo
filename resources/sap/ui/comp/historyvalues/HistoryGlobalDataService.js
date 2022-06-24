/*
 * ! SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/base/Object","./Constants"],function(t,i){"use strict";var e;var a=t.extend("sap.ui.comp.historyvalues.HistoryGlobalDataService",{constructor:function(){t.apply(this,arguments);this._initialize()}});a.prototype._initialize=function(){this._initializeHistoryData=this._initializeHistoryData.bind(this);this._sContainerId=i.getHistoryPrefix()+"HistorySettings";this._sItemId=i.getHistoryPrefix()+"settings";this._oPersonalizer=null;this._oData={};this._oDataReadyPromise=this._getPersonalizer().getPersData().then(this._initializeHistoryData)};a.prototype._initializeHistoryData=function(t){this._oData=t||this._getDefaultData();return Object.assign({},this._oData)};a.prototype._getPersonalizer=function(){if(this._oPersonalizer){return this._oPersonalizer}var t=sap.ushell.Container.getService("Personalization"),i={keyCategory:t.constants.keyCategory.FIXED_KEY,writeFrequency:t.constants.writeFrequency.LOW,clientStorageAllowed:false,validity:Infinity},e={container:this._sContainerId,item:this._sItemId};this._oPersonalizer=t.getPersonalizer(e,i);return this._oPersonalizer};a.prototype._getDefaultData=function(){return{historyEnabled:true,apps:{}}};a.prototype._isDataReady=function(){return this._oDataReadyPromise};a.prototype.getHistoryEnabled=function(){return this._isDataReady().then(function(){return this._oData.historyEnabled}.bind(this))};a.prototype.setHistoryEnabled=function(t){return this._isDataReady().then(function(){this._oData.historyEnabled=t;return this._getPersonalizer().setPersData(this._oData)}.bind(this))};a.prototype.getApps=function(){return this._isDataReady().then(function(){return Object.assign({},this._oData.apps)}.bind(this))};a.prototype.setApps=function(t){return this._isDataReady().then(function(){this._oData.apps=t;return this._getPersonalizer().setPersData(this._oData)}.bind(this))};a.prototype.deleteHistory=function(){return this._isDataReady().then(function(){var t=this._oData,i=[],e=t.apps;Object.keys(e).forEach(function(t){i.push(sap.ushell.Container.getService("Personalization").delContainer(e[t]))});return Promise.all(i)}.bind(this))};a.prototype.destroy=function(){t.prototype.destroy.apply(this,arguments);this._sContainerId="";this._sItemId="";this._oPersonalizer=null;this._oData={};this._oDataReadyPromise=null};return{getInstance:function(){if(!e){e=new a}return e}}});