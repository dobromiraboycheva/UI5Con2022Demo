/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core"],function(t){"use strict";var e={};var i="sap.ui.mdc.IFilter";e.setFilter=function(e){var i=typeof e==="object"?e.getId():e;var n=this.getFilter();if(n!==i){this._validateFilter(e);var r=t.byId(this.getFilter());if(r){o(this,r)}this.setAssociation("filter",e,true);var s=t.byId(this.getFilter());if(s){a(this,s)}}return this};function n(t){this._rebind();if(this._onFilterSearch){this._onFilterSearch(t)}}function r(t){if(this._onFiltersChanged){this._onFiltersChanged(t)}}function a(t,e){e.attachSearch(n,t);if(e.attachFiltersChanged instanceof Function){e.attachFiltersChanged(r,t)}if(t._onFilterProvided instanceof Function){t._onFilterProvided(e)}}function o(t,e){e.detachSearch(n,t);if(e.detachFiltersChanged instanceof Function){e.detachFiltersChanged(r,t)}if(t._onFilterRemoved instanceof Function){t._onFilterRemoved(e)}}function s(t){if(!(t&&t.getMetadata()&&t.getMetadata().hasAssociation("filter"))){throw new Error("Please add the 'filter' association to your control metadata"+t)}if(!(t.rebind instanceof Function)){throw new Error("Please implement the method 'rebind' for the control "+t)}if(!(t.isFilteringEnabled instanceof Function)){throw new Error("Please implement the method isFilteringEnabled for the control "+t)}}e._validateFilter=function(e){s(this);var n=typeof e==="object"?e:t.byId(e);if(n&&!n.isA(i)){throw new Error('"'+e+'" is not valid for association "filter".'+' Please use an object that implements the "'+i+'" interface')}};e.rebind=function(){if(this.bIsDestroyed){return}var e;var i;var n=t.byId(this.getFilter()),r=this.isFilteringEnabled();if(r||n){if(n){e=n.validate(true)}if(r){i=this.retrieveInbuiltFilter().then(function(t){return t.validate(true)})}Promise.all([e,i]).then(function(){this._rebind()}.bind(this),function(){})}else{this._rebind()}};return function(){this.setFilter=e.setFilter;this._validateFilter=e._validateFilter;this.rebind=e.rebind}});