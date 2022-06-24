/*
* ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["sap/base/util/merge","sap/base/util/deepEqual","sap/ui/mdc/condition/FilterOperatorUtil","sap/base/Log"],function(e,n,t,r){"use strict";var i={getPropertySetterChanges:function(e){var n=e.control;var t=e.existingState;var r=e.changedState;var i=e.operation;var a=e.deltaAttribute;var o=[];r.forEach(function(e){if(e.hasOwnProperty(a)){var r=t.find(function(n){return n.name==e.name});var u=r&&r.hasOwnProperty(a)&&r[a];var c=e[a];var f=u!==c;if(f){o.push(this.createChange(n,i,{name:e.name,value:e[a]}))}}}.bind(this));return o},_getChangeContent:function(e,n){var t={};if(e.index>=0){t.index=e.index}n.forEach(function(n){if(e.hasOwnProperty(n)){t[n]=e[n]}});return t},getConditionDeltaChanges:function(e){var n=[];var t=e.changedState;var a=e.existingState;var o=e.control;var u=e.hasOwnProperty("applyAbsolute")?e.applyAbsolute:true;var c=e.propertyInfo;for(var f in t){var s=i._hasProperty(c,f);if(!s){r.warning("property '"+f+"' not supported");continue}var p=i._diffConditionPath(f,t[f],a[f],o,u);n=n.concat(p)}return n},_hasProperty:function(e,n){return e.some(function(e){var t=e.name===n||n=="$search";t=t?t:e.path===n;return t})},_diffConditionPath:function(r,a,o,u,c){var f,s=[];var p=e([],a);var h=o?e([],o):[];if(n(a,h)){return s}var l=function(e,n){var r;do{r=false;for(var i=0;i<e.length;i++){var a=e[i];var o=t.indexOfCondition(a,n);if(o>-1){e.splice(i,1);if(c){n.splice(o,1)}r=true;break}}}while(r)};l(a,h);if(a.length>0||h.length>0){h.forEach(function(e){var n=t.indexOfCondition(e,p);var a=n>-1&&p[n].filtered===false;if(c||a){f=i.createConditionChange("removeCondition",u,r,e);s.push(f)}});a.forEach(function(e){if(c||(!e.hasOwnProperty("filtered")||e.filtered!==false)){f=i.createConditionChange("addCondition",u,r,e);s.push(f)}})}return s},createChange:function(e,n,t){var r={selectorElement:e,changeSpecificData:{changeType:n,content:t}};return r},createConditionChange:function(e,n,t,r){delete r.filtered;var i={selectorElement:n,changeSpecificData:{changeType:e,content:{name:t,condition:r}}};return i},handleChanges:function(e,n,t){return new Promise(function(r,i){sap.ui.require(["sap/ui/fl/write/api/ControlPersonalizationWriteAPI"],function(a){a.add({changes:e,ignoreVariantManagement:n,useStaticArea:t}).then(function(e){r(e)},i)})})},saveChanges:function(e,n){return new Promise(function(t,r){sap.ui.require(["sap/ui/fl/write/api/ControlPersonalizationWriteAPI"],function(r){r.save({selector:e,changes:n}).then(t)})})},restore:function(e){return new Promise(function(n,t){sap.ui.require(["sap/ui/fl/write/api/ControlPersonalizationWriteAPI"],function(r){r.restore(e).then(function(){n()},t)})})},reset:function(e){return new Promise(function(n,t){sap.ui.require(["sap/ui/fl/write/api/ControlPersonalizationWriteAPI"],function(r){r.reset(e).then(function(){n()},t)})})}};return i});