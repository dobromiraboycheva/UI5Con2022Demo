/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/flexObjects/CompVariant","sap/ui/fl/apply/_internal/flexObjects/States","sap/ui/fl/apply/_internal/flexObjects/UpdatableChange","sap/ui/fl/apply/_internal/flexState/compVariants/CompVariantMerger"],function(a,n,e,t){"use strict";function r(a,n){a[n]=a[n]||{byId:{},variants:[],nonPersistedVariants:[],changes:[],defaultVariants:[],standardVariantChange:undefined,standardVariant:undefined};return a[n]}function i(a,n,e){e=e||[];var i=r(a,n);i.nonPersistedVariants.forEach(function(a){delete i.byId[a.getId()]});i.nonPersistedVariants=e.map(function(a){var e=Object.assign({id:a.id,persisted:false},a);e=t.createVariant(n,e);i.byId[a.id]=e;return e});return i}function s(t,i,s){var d=i==="variants"?a:e;var f=t[i].map(function(a){var e=new d(a);e.setState(n.PERSISTED);return e});f.forEach(function(a){var n=a.getSelector().persistencyKey;r(s,n).byId[a.getId()]=a;switch(i){case"standardVariants":r(s,n).standardVariantChange=a;break;default:r(s,n)[i].push(a)}})}return function(a){var n={};n._getOrCreate=r.bind(undefined,n);n._initialize=i.bind(undefined,n);if(a.storageResponse.changes.comp){["variants","changes","defaultVariants","standardVariants"].forEach(function(e){s(a.storageResponse.changes.comp,e,n)})}return n}});