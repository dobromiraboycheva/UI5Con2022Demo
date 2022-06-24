/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/AggregationBaseDelegate"],function(e){"use strict";var r=Object.assign({},e);r.addItem=function(e,r,n){return Promise.resolve(null)};r.removeItem=function(e,r,n){return Promise.resolve(true)};r.addCondition=function(e,r,n){return Promise.resolve()};r.removeCondition=function(e,r,n){return Promise.resolve()};return r});