/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge","sap/base/util/ObjectPath"],function(n,a){"use strict";var e={};function r(n,e){var r=n.reduce(function(n,r){if(a.get(e,r)){return n.concat(a.get(e,r))}return n},[]);var t=[];return r.filter(function(n){var a=n.fileName;var e=t.indexOf(a)!==-1;if(e){return false}t.push(a);return true})}function t(a){return a.reduce(function(a,e){return n({},a,e.ui2personalization)},{})}function i(n){return n.reduce(function(n,a){return a.cacheKey?n+=a.cacheKey:n},"")||null}e.merge=function(n){return{appDescriptorChanges:r(n,"appDescriptorChanges"),changes:r(n,"changes"),ui2personalization:t(n),comp:{variants:r(n,"comp.variants"),changes:r(n,"comp.changes"),defaultVariants:r(n,"comp.defaultVariants"),standardVariants:r(n,"comp.standardVariants")},variants:r(n,"variants"),variantChanges:r(n,"variantChanges"),variantDependentControlChanges:r(n,"variantDependentControlChanges"),variantManagementChanges:r(n,"variantManagementChanges"),cacheKey:i(n)}};return e});