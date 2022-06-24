/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/valuehelp/content/FixedList","sap/ui/mdc/util/loadModules","sap/ui/model/ParseException"],function(e,t,i){"use strict";var o=e.extend("sap.ui.mdc.valuehelp.content.Bool",{metadata:{library:"sap.ui.mdc",interfaces:["sap.ui.mdc.valuehelp.ITypeaheadContent"]}});o.prototype.init=function(){e.prototype.init.apply(this,arguments);this.setUseFirstMatch(true);this.setUseAsValueHelp(true);this.setFilterList(false);this.setCaseSensitive(false);this._oObserver.observe(this,{properties:["config"]})};o.prototype.exit=function(){if(this._oModel){this._oModel.destroy();this._oModel=undefined}e.prototype.exit.apply(this,arguments)};o.prototype.getContent=function(){return this._retrievePromise("boolContent",function(){return t(["sap/ui/mdc/field/ListFieldHelpItem","sap/ui/model/json/JSONModel"]).then(function(t){var i=t[0];var o=t[1];this._oModel=new o({type:"",items:[{key:true,text:"true"},{key:false,text:"false"}]});s.call(this,this.getConfig());var r=new i(this.getId()+"-Item",{key:{path:"$Bool>key"},text:{path:"$Bool>text"}});this.bindAggregation("items",{path:"$Bool>/items",template:r});this.setModel(this._oModel,"$Bool");return e.prototype.getContent.apply(this,arguments)}.bind(this))}.bind(this))};o.prototype.getItemForValue=function(e){return Promise.resolve().then(function(){var t=this.getConfig();var o=t&&t.dataType;if(o){if(e.checkKey){if(e.parsedValue===true||e.parsedValue===false){return{key:e.parsedValue,description:o.formatValue(e.parsedValue,"string")}}else{e.checkDescription=true}}if(e.checkDescription&&e.value){var s=o.formatValue(true,"string");if(s.toLowerCase().startsWith(e.value.toLowerCase())){return{key:true,description:s}}var r=o.formatValue(false,"string");if(r.toLowerCase().startsWith(e.value.toLowerCase())){return{key:false,description:r}}}var a=this._oResourceBundle.getText("valuehelp.VALUE_NOT_EXIST",[e.value]);var n=e.exception||i;throw new n(a)}else{throw new Error("Type missing")}}.bind(this))};o.prototype.shouldOpenOnClick=function(){return false};o.prototype._observeChanges=function(t){if(t.type==="property"&&t.name==="config"){s.call(this,t.current)}e.prototype._observeChanges.apply(this,arguments)};function s(e){if(this._oModel&&e){var t=e.dataType;var i=this._oModel.getData();if(t&&i["type"]!==t.getMetadata().getName()){i["type"]=t.getMetadata().getName();var o=i["items"];for(var s=0;s<o.length;s++){var r=o[s];r["text"]=t.formatValue(r["key"],"string")}this._oModel.checkUpdate(true)}}}return o});