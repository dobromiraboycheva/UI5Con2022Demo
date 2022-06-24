/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/core/Core","sap/ui/core/Element","sap/ui/fl/apply/_internal/controlVariants/Utils","sap/ui/fl/apply/api/FlexRuntimeInfoAPI","sap/ui/fl/initial/_internal/changeHandlers/ChangeHandlerStorage","sap/ui/fl/registry/Settings","sap/ui/fl/FlexControllerFactory","sap/ui/fl/Layer","sap/ui/fl/Utils"],function(e,n,t,r,o,a,c,i,l,s,u){"use strict";var f={};function p(e,t){if(!e.changeSpecificData){return Promise.reject(new Error("No changeSpecificData available"))}if(!e.changeSpecificData.changeType){return Promise.reject(new Error("No valid changeType"))}if(!(e.selectorControl instanceof r)){return Promise.reject(new Error("No valid selectorControl"))}var o=e.selectorControl.getMetadata().getName();return c.getChangeHandler(e.changeSpecificData.changeType,o,e.selectorControl,n,t)}function g(e,t,r){var a=o.getRelevantVariantManagementControlId(t,[],r);return n.getSelector(a,e).id}function d(e){var r=o.getAllVariantManagementControlIds(e);return r.reduce(function(r,o){var a=t.byId(o).getFor();if(a.length){r.push(n.getSelector(o,e).id)}return r},[])}function h(n){e.error(n);return Promise.reject(n)}var C={add:function(n){if(!n.changes.length){return Promise.resolve([])}var t=n.changes[0].selectorElement||n.changes[0].selectorControl;var r=u.getAppComponentForControl(t);var o=a.getFlexReference({element:t});var c=l.createForControl(r);var i=r.getModel(u.VARIANT_MODEL_NAME);var d=s.USER;var h=[];function C(){var t=[];return n.changes.reduce(function(o,a){return o.then(function(){a.selectorControl=a.selectorElement;return p(a,d)}).then(function(){if(!n.ignoreVariantManagement){if(!a.changeSpecificData.variantReference){var e=g(r,a.selectorControl,n.useStaticArea);if(e){var t=i.oData[e].currentVariant;a.changeSpecificData.variantReference=t}}}else{delete a.changeSpecificData.variantReference}a.changeSpecificData=Object.assign(a.changeSpecificData,{developerMode:false,layer:d});return c.addChange(a.changeSpecificData,a.selectorControl)}).then(function(e){t.push({changeInstance:e,selectorControl:a.selectorControl})}).catch(function(n){e.error("A Change was not added successfully. Reason:",n.message)})},Promise.resolve()).then(function(){return t})}function m(n){return n.reduce(function(n,t){return n.then(function(){return c.applyChange(t.changeInstance,t.selectorControl)}).then(function(e){h.push(e)}).catch(function(n){e.error("A Change was not applied successfully. Reason:",n.message)})},Promise.resolve())}return C().then(m).then(function(){(f[o]||[]).forEach(function(e){e(h)});return h})},reset:function(e){if(!e.selectors||e.selectors.length===0){return h("At least one control ID has to be provided as a parameter")}var n=e.selectors[0].appComponent||u.getAppComponentForControl(e.selectors[0]);if(!n){return h("App Component could not be determined")}var t=e.selectors.map(function(e){var t=e.id||e.getId();var r=n.getLocalId(t);return r||t});var r=l.createForControl(n);return r.resetChanges(s.USER,undefined,n,t,e.changeTypes)},restore:function(e){if(!e||!e.selector){return Promise.reject("No selector was provided")}var n=u.getAppComponentForControl(e.selector);if(!n){return Promise.reject("App Component could not be determined")}var t=l.createForControl(n);return t.removeDirtyChanges(s.USER,n,e.selector,e.generator,e.changeTypes)},save:function(e){var n=e.selector.appComponent||u.getAppComponentForControl(e.selector);if(!n){return h("App Component could not be determined")}var t=l.createForControl(n);var r=n.getModel(u.VARIANT_MODEL_NAME);var o=d(n);return t.saveSequenceOfDirtyChanges(e.changes,n).then(function(e){r.checkDirtyStateForControlModels(o);return e})},buildSelectorFromElementIdAndType:function(e){var n=u.getAppComponentForControl(e.element);if(!n||!e.elementId||!e.elementType){throw new Error("Not enough information given to build selector.")}return{elementId:e.elementId,elementType:e.elementType,appComponent:n,id:e.elementId,controlType:e.elementType}},isCondensingEnabled:function(){return i.getInstance().then(function(e){return e.isCondensingEnabled(s.USER)})},attachChangeCreation:function(e,n){var t=a.getFlexReference({element:e});f[t]=(f[t]||[]).concat(n)},detachChangeCreation:function(e,n){var t=a.getFlexReference({element:e});if(Array.isArray(f[t])){f[t]=f[t].filter(function(e){return e!==n})}},detachAllChangeCreationListeners:function(e){if(e){var n=a.getFlexReference({element:e});delete f[n]}else{f={}}}};return C});