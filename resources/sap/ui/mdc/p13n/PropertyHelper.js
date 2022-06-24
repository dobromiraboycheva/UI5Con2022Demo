/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../util/PropertyHelper"],function(e){"use strict";var r=e.extend("sap.ui.mdc.p13n.PropertyHelper",{constructor:function(r,t,p,o){var a=["filterable","sortable"];e.call(this,r,t,p,a,o)}});r.prototype.validateProperties=function(){};r.prototype.prepareProperty=function(r){e.prototype.prepareProperty.apply(this,arguments);r.label=r.label||r.name};return r});