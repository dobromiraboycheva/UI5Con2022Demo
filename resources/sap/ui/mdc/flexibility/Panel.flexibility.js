/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/Base","./ItemBaseFlex"],function(e,t){"use strict";var n=Object.assign({},t);n.findItem=function(e,t,n){return Promise.resolve(sap.ui.getCore().byId(n))};return{createChanges:function(e,t){var n=t.filter(function(e){return!sap.ui.getCore().byId(e.id)});var r={};return n.reduce(function(e,t){if(!r[t.id]){r[t.id]=true;e.push(t)}return e},[]).map(function(t){return{selectorElement:e,changeSpecificData:{changeType:"createItem",content:{selector:t.id}}}})},createItem:{layers:{USER:true},changeHandler:{applyChange:function(e,t,n){var r=e.getContent().selector;return Promise.resolve().then(function(){t.getModel();return n.modifier.getProperty(t,"metadataHelperPath")}).then(function(e){return new Promise(function(t,n){sap.ui.require(["sap/ui/mdc/link/PanelItem",e],function(e,n){t(n)},function(e){n(e)})})}).then(function(e){var i=n.modifier;if(i.bySelector(r,n.appComponent,n.view)){return undefined}var o=e.retrieveAllMetadata(t);var a;var u=function(e,t){var n=-1;t.some(function(t,r){if(t.getId()===e){n=r;return true}});return n};var c=i.getControlIdBySelector(r,n.appComponent);return Promise.resolve().then(i.getAggregation.bind(i,t,"items")).then(function(e){a=-1;var t=null;o.some(function(n){var r=u(n.id,e);if(r>-1){a=r}if(n.id===c){t=n;return true}});if(!t){return undefined}return i.createControl("sap.ui.mdc.link.PanelItem",n.appComponent,n.view,t.id,{text:t.text,description:t.description,href:t.href,target:t.target,icon:t.icon,visible:true})}).then(function(e){return i.insertAggregation(t,"items",e,a+1)})})},revertChange:function(t,n,r){var i=r.modifier;if(t.getContent()&&t.getContent().selector){var o=t.getContent().selector.id;var a=i.bySelector(o,r.appComponent,r.view);if(!a){return e.markAsNotApplicable("revertChange of createItem: the item with id "+o+" is not existing and therefore can not be removed.",true)}return Promise.resolve().then(i.removeAggregation.bind(i,n,"items",a))}},completeChangeContent:function(e,t,n){if(t.content){var r=n.modifier.getSelector(t.content.selector,n.appComponent);var i=e.getDefinition();i.content={selector:r}}}}}}},true);