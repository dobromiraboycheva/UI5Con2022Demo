/*!
 * SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define([],function(){"use strict";var e={};e.applyChange=function(e,n,t){var r=t.modifier;var i=t.view;var a=r.getParent(n);if(a){return Promise.resolve().then(r.findIndexInParentAggregation.bind(r,n)).then(function(t){e.setRevertData({fieldIndex:t});return r.removeAggregation(a,"groupElements",n,i)})}return Promise.resolve()};e.completeChangeContent=function(e,n){var t=e.getDefinition();if(!t.content){t.content={}}};e.revertChange=function(e,n,t){var r=t.view;var i=t.modifier;var a=e.getRevertData().fieldIndex;var o=i.getParent(n);return Promise.resolve().then(i.insertAggregation.bind(i,o,"groupElements",n,a,r)).then(e.resetRevertData.bind(e))};return e},true);