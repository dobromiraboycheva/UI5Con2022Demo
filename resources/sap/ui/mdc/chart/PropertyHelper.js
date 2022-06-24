/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../util/PropertyHelper"],function(e){"use strict";var r=e.extend("sap.ui.mdc.chart.PropertyHelper");r.prototype.prepareProperty=function(r){e.prototype.prepareProperty.apply(this,arguments);r.isAggregatable=function(){if(r){return r.isComplex()?false:r.aggregatable}}};r.prototype.getAllAggregatableProperties=function(){return this.getProperties().filter(function(e){return e.isAggregatable()})};return r});