/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./PropertyHelper"],function(e){"use strict";var t=e.extend("sap.ui.mdc.table.V4AnalyticsPropertyHelper",{constructor:function(t,r,n){e.call(this,t,r,n,{defaultAggregate:{type:{contextDefiningProperties:{type:"PropertyReference[]"}}}})}});t.prototype.prepareProperty=function(t){e.prototype.prepareProperty.apply(this,arguments);t.aggregatable=t.extension.defaultAggregate!=null;t.getAggregatableProperties=function(){var e=t.isComplex()?t.getReferencedProperties():[t];return e.filter(function(e){return e.aggregatable})}};t.prototype.getAggregatableProperties=function(){return this.getProperties().filter(function(e){return e.aggregatable})};return t});