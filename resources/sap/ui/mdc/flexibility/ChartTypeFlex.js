/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={};e.setChartType={layers:{USER:true},changeHandler:{createChange:function(e){if(!e.control){throw new Error("Invalid control. The existing control object is mandatory")}return{selectorElement:e.control,changeSpecificData:{changeType:"setChartType",content:{chartType:e.chartType}}}},completeChangeContent:function(e,t){},applyChange:function(e,t,r){var n=r.modifier;return Promise.resolve().then(n.getProperty.bind(n,t,"chartType")).then(function(r){e.setRevertData(r);n.setProperty(t,"chartType",e.getContent().chartType)})},revertChange:function(e,t,r){r.modifier.setProperty(t,"chartType",e.getRevertData());e.resetRevertData()}}};return e});