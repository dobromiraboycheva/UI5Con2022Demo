/*!
 * SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/base/Log","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/comp/smartmultiedit/Container","sap/ui/comp/smartform/flexibility/changes/AddFields"],function(e,t,n,r){"use strict";var i={};i.applyChange=function(t,n,i){var o=t.getDefinition();var a=i.modifier;var f=i.appComponent;var l=o.content.field.selector;var d=i.view;var c=o.content.field.id;var s=o.content.field.index;var p=o.content.field.propertyName;var g=t.getDependentControl("form",i);var u=g&&a.getFlexDelegate(g);if(!u){if(this._checkChangeDefinition(o)){var h=o.content.field.jsType;var m=o.content.field.entitySet;var v;var C;return Promise.resolve().then(a.createControl.bind(a,"sap.ui.comp.smartform.GroupElement",i.appComponent,i.view,l||c)).then(function(e){v=e;return this._createGroupElementField(a,i.view,v,h,p,m,i.appComponent)}.bind(this)).then(function(e){C=e;return a.insertAggregation(n,"groupElements",v,s,i.view)}).then(function(){var e=this._getContainerFromGroup(n);if(e){e.indexField(C)}t.setRevertData({newFieldSelector:a.getSelector(v,i.appComponent)})}.bind(this))}else{e.error("Change doesn't contain sufficient information to be applied: "+this._getChangeInfo(o))}}return r._addFieldFromDelegate(g,n,l,c,s,p,t,a,d,f)};i.revertChange=function(t,n,r){var i=t.getDefinition(),o=t.getRevertData(),a=o.newFieldSelector,f=r.modifier;if(a){var l=f.bySelector(a,r.appComponent,r.view);return Promise.resolve().then(f.removeAggregation.bind(f,n,"groupElements",l)).then(function(){f.destroy(l);var e=this._getContainerFromGroup(n);if(e){e._refreshFields()}var i=o.valueHelpSelector;if(i){var a=r.appComponent;var d=r.view;var c=f.bySelector(i,a,d);var s=t.getDependentControl("form",r);return Promise.resolve().then(f.removeAggregation.bind(f,s,"dependents",c)).then(f.destroy.bind(f,c))}}.bind(this)).then(function(){t.resetRevertData()})}else{e.error("Change doesn't contain sufficient information to be reverted. Most Likely the Change didn't go through applyChange: "+this._getChangeInfo(i));return Promise.resolve()}};i.completeChangeContent=function(e,n,r){var i=r.appComponent;var o=e.getDefinition();if(!o.content){o.content={}}if(!o.content.field){o.content.field={}}if(n.bindingPath){o.content.field.propertyName=n.bindingPath}else{throw new Error("oSpecificChangeInfo.bindingPath or bindingPath attribute required")}if(n.newControlId){o.content.field.selector=t.getSelector(n.newControlId,i)}else{throw new Error("oSpecificChangeInfo.newControlId attribute required")}if(n.jsTypes){o.content.field.jsType=n.jsType}else if(n.bindingPath){o.content.field.jsType="sap.ui.comp.smartmultiedit.Field"}else{throw new Error("oSpecificChangeInfo.jsTypes or bindingPath attribute required")}if(n.index===undefined){throw new Error("oSpecificChangeInfo.index attribute required")}else{o.content.field.index=n.index}if(n.entitySet){o.content.field.entitySet=n.entitySet}if(n.relevantContainerId){e.addDependentControl(n.relevantContainerId,"form",r)}};i._checkChangeDefinition=function(e){var t=e.content,n=false;if(t){n=e.content.field&&(e.content.field.selector||e.content.field.id)&&e.content.field.jsType&&e.content.field.propertyName}return t&&n};i._createGroupElementField=function(e,t,n,r,i,o,a){return Promise.resolve().then(e.createControl.bind(e,r,a,t)).then(function(r){e.setProperty(r,"propertyName",i);if(o){e.setProperty(r,"entitySet",o)}return Promise.resolve().then(e.insertAggregation.bind(e,n,"elements",r,0,t,true)).then(function(){return r})})};i._getContainerFromGroup=function(e){if(e&&typeof e.getParent==="function"&&typeof e.getParent().getParent==="function"&&typeof e.getParent().getParent().getParent==="function"){var t=e.getParent().getParent().getParent();if(t instanceof n){return t}}};i._getChangeInfo=function(e){return"["+e.layer+"]"+e.namespace+"/"+e.fileName+"."+e.fileType};return i},true);