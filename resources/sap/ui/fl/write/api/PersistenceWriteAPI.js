/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/includes","sap/base/util/restricted/_omit","sap/base/Log","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/fl/apply/_internal/changes/FlexCustomData","sap/ui/fl/apply/_internal/ChangesController","sap/ui/fl/apply/_internal/appVariant/DescriptorChangeTypes","sap/ui/fl/write/_internal/condenser/Condenser","sap/ui/fl/write/_internal/flexState/FlexObjectState","sap/ui/fl/write/_internal/Storage","sap/ui/fl/apply/_internal/flexState/ManifestUtils","sap/ui/fl/apply/_internal/flexState/controlVariants/VariantManagementState","sap/ui/fl/write/api/FeaturesAPI","sap/ui/fl/Layer","sap/ui/fl/LayerUtils","sap/ui/fl/registry/Settings","sap/ui/fl/Utils"],function(e,n,r,t,a,i,o,s,l,u,c,g,f,p,h,d,C){"use strict";var v={};function y(n){return n._getMap&&e(o.getChangeTypes(),n._getMap().changeType)||n.getChangeType&&e(o.getChangeTypes(),n.getChangeType())}function m(e){e.includeCtrlVariants=true;e.invalidateCache=false;return v._getUIChanges(e).then(function(e){return e.length>0})}function b(e,n){var r=C.getAppComponentForControl(n);var t=r.getModel(C.VARIANT_MODEL_NAME);var a=t&&t.sFlexReference;var i=g.getVariantManagementReferences(a);if(i.length===0){return e}var o=i.map(function(e){return t.getCurrentVariantReference(e)});return e.filter(function(e){return o.some(function(n){return e.getVariantReference()===n||!e.getVariantReference()})})}v.hasHigherLayerChanges=function(e){e.upToLayer=e.upToLayer||h.getCurrentLayer();return l.getFlexObjects(e).then(function(n){return n.filter(function(n){return h.isOverLayer(n.getLayer(),e.upToLayer)})}).then(function(e){return e.length>0})};v.save=function(e){return l.saveFlexObjects(e)};v.getResetAndPublishInfo=function(e){return Promise.all([m(e),f.isPublishAvailable()]).then(function(n){var t=n[0];var a=n[1];var i=e.layer!==p.USER&&e.layer!==p.PUBLIC;var o={isResetEnabled:t,isPublishEnabled:false,allContextsProvided:true};if(i){return u.getFlexInfo(e).then(function(e){o.allContextsProvided=e.allContextsProvided===undefined||e.allContextsProvided;o.isResetEnabled=e.isResetEnabled;o.isPublishEnabled=a&&e.isPublishEnabled;return o}).catch(function(e){r.error("Sending request to flex/info route failed: "+e.message);return o})}return o})};v.getResetAndPublishInfoFromSession=function(e){var n=c.getFlexReferenceForControl(e)||"true";return JSON.parse(window.sessionStorage.getItem("sap.ui.fl.info."+n))};v.reset=function(e){var n=i.getAppComponentForSelector(e.selector);var r=i.getFlexControllerInstance(n);var t=[e.layer,e.generator,n,e.selectorIds,e.changeTypes];return r.resetChanges.apply(r,t)};v.publish=function(e){e.styleClass=e.styleClass||"";var n=i.getAppComponentForSelector(e.selector);return i.getFlexControllerInstance(n)._oChangePersistence.transportAllUIChanges({},e.styleClass,e.layer,e.appVariantDescriptors)};v.add=function(e){if(y(e.change)){return e.change.store()}var n=i.getAppComponentForSelector(e.selector);return i.getFlexControllerInstance(n).addPreparedChange(e.change,n)};v.remove=function(e){var n;var r;return Promise.resolve().then(function(){if(!e.selector){return Promise.reject(new Error("An invalid selector was passed so change could not be removed with id: "+e.change.getId()))}r=i.getAppComponentForSelector(e.selector);if(!r){return Promise.reject(new Error("Invalid application component for selector, change could not be removed with id: "+e.change.getId()))}if(y(e.change)){var o=i.getDescriptorFlexControllerInstance(r);o.deleteChange(e.change,r);return undefined}var s=t.bySelector(e.change.getSelector(),r);n=i.getFlexControllerInstance(r);if(s){a.sync.destroyAppliedCustomData(s,e.change,t)}n.deleteChange(e.change,r);return undefined})};v.getChangesWarning=function(e){return this._getUIChanges(e).then(function(e){var n=e.some(function(e){return e.isChangeFromOtherSystem()});var r=d.getInstanceOrUndef();var t=r&&r.isProductiveSystemWithTransports();var a=e.length===0;var i={showWarning:false};if(n){i={showWarning:true,warningType:"mixedChangesWarning"}}if(t&&a){i={showWarning:true,warningType:"noChangesAndPSystemWarning"}}return i})};v._condense=function(e){return Promise.resolve().then(function(){if(!e.selector){throw Error("An invalid selector was passed")}var n=i.getAppComponentForSelector(e.selector);if(!n){throw Error("Invalid application component for selector")}if(!e.changes||e.changes&&!Array.isArray(e.changes)){throw Error("Invalid array of changes")}return s.condense(n,e.changes)})};v._getUIChanges=function(e){if(e.layer){e.currentLayer=e.layer}return l.getFlexObjects(e).then(function(n){if(e.onlyCurrentVariants){return b(n,e.selector)}return n})};return v});