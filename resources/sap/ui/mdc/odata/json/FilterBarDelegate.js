/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/FilterBarDelegate","sap/base/util/merge","sap/ui/mdc/util/IdentifierUtil"],function(e,t,r){"use strict";var i=Object.assign({},e);i._createFilterField=function(e,t,i){var o=i.modifier;var n=e.path||e.name;var a={};if(t.getId){a.id=t.getId()}else{a.id=t.id}var l=o.getControlIdBySelector(a,i.appComponent);var s=l+"--filter--"+r.replace(n);var p;return o.createControl("sap.ui.mdc.FilterField",i.appComponent,i.view,s,{dataType:e.typeConfig.className,conditions:"{$filters>/conditions/"+n+"}",required:e.required,label:e.label,maxConditions:e.maxConditions,delegate:{name:"sap/ui/mdc/field/FieldBaseDelegate",payload:{}}},true).then(function(r){p=r;if(e.fieldHelp){var n=e.fieldHelp;if(i.view.getId){n=i.view.getId()+"--"+e.fieldHelp}else{n=i.viewId+"--"+e.fieldHelp}o.setAssociation(p,"fieldHelp",n)}if(e.filterOperators){if(t.getId){return o.setProperty(p,"operators",e.filterOperators)}else{return o.setProperty(p,"operators",e.filterOperators.join(","))}}}).then(function(){if(e.tooltip){o.setProperty(p,"tooltip",e.tooltip)}if(e.constraints){o.setProperty(p,"dataTypeConstraints",e.constraints)}if(e.formatOptions){o.setProperty(p,"dataTypeFormatOptions",e.formatOptions)}if(e.display){o.setProperty(p,"display",e.display)}return p})};i.addItem=function(e,t,o){return i.fetchProperties().then(function(n){var a=null;n.some(function(t){if(e===r.getPropertyKey(t)){a=t}return a!==null});if(a){return i._createFilterField(a,t,o)}})};i.removeItem=function(e,t,r){return Promise.resolve(true)};i.fetchProperties=function(e){return new Promise(function(e,t){e([])})};return i});