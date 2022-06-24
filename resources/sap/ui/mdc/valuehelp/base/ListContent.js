/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/valuehelp/base/Content","sap/ui/mdc/enum/ConditionValidated"],function(e,t){"use strict";var a=e.extend("sap.ui.mdc.valuehelp.base.ListContent",{metadata:{library:"sap.ui.mdc",properties:{caseSensitive:{type:"boolean",defaultValue:false},useFirstMatch:{type:"boolean",group:"Behavior",defaultValue:true},useAsValueHelp:{type:"boolean",group:"Behavior",defaultValue:true}},aggregations:{inParameters:{type:"sap.ui.mdc.field.InParameter",group:"Data",multiple:true},outParameters:{type:"sap.ui.mdc.field.OutParameter",group:"Data",multiple:true}},events:{}}});a.prototype.init=function(){e.prototype.init.apply(this,arguments);this._oObserver.observe(this,{properties:["caseSensitive"]})};a.prototype._observeChanges=function(t){if(t.name==="caseSensitive"){this._handleFilterValueUpdate(t)}e.prototype._observeChanges.apply(this,arguments)};a.prototype.getCount=function(e){var a=0;for(var i=0;i<e.length;i++){var r=e[i];if(r.isEmpty!==true&&r.validated===t.Validated){a++}}return a};return a});