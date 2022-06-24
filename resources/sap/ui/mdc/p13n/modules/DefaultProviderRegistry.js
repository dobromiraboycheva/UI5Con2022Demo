/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/mdc/p13n/PersistenceProvider"],function(e,t){"use strict";var r="DefaultProviderRegistry: This class is a singleton and should not be used without an AdaptationProvider. Please use 'sap.ui.mdc.p13n.Engine.getInstance().defaultProviderRegistry' instead";var i;var o=e.extend("sap.ui.mdc.p13n.modules.DefaultProviderRegistry",{constructor:function(t){if(i){throw Error(r)}e.call(this);this._mDefaultProviders={};this._oEngine=t}});o.prototype.destroy=function(){Object.keys(this._mDefaultProviders).forEach(function(e){this._mDefaultProviders[e].destroy();delete this._mDefaultProviders[e]}.bind(this));this._oEngine=null;e.prototype.destroy.apply(this,arguments);i=null};o.prototype.attach=function(e,t){if(this._oEngine.isRegisteredForModification(e)){throw new Error("DefaultProviderRegistry: You must not change the modificationSettings for an already registered element")}var r=this._retrieveDefaultProvider(t);var i=typeof e==="string"?e:e.getId();if(r.getFor().indexOf(i)===-1){r.addFor(e)}return r};o.prototype.detach=function(e){Object.keys(this._mDefaultProviders).forEach(function(t){var r=this._mDefaultProviders[t];r.removeFor(e)}.bind(this))};o.prototype._retrieveDefaultProvider=function(e){this._mDefaultProviders[e]=this._mDefaultProviders[e]||new t({mode:e});return this._mDefaultProviders[e]};o.getInstance=function(e){if(!i){i=new o(e)}return i};return o});