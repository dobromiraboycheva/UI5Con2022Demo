/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/initial/_internal/StorageUtils","sap/ui/fl/initial/_internal/StorageResultMerger","sap/ui/fl/initial/_internal/storageResultDisassemble","sap/ui/fl/write/api/Version","sap/ui/fl/Utils"],function(e,r,n,t,i){"use strict";function a(e,r,n){if(!r.layers||r.layers[0]!=="ALL"&&r.layers.indexOf("CUSTOMER")===-1){delete e.version;return e}if(n.version!==undefined){e.version=n.version;return e}var a=i.getUrlParameter(t.UrlParameter);if(a===null){delete e.version}else{e.version=parseInt(a)}return e}function l(r,n){var t=n.map(function(n){var t=Object.assign({},r,{url:n.url,path:n.path});t=a(t,n,r);return n.loadConnectorModule.loadFlexData(t).then(function(r){return r||e.getEmptyFlexDataResponse()}).catch(e.logAndResolveDefault.bind(undefined,e.getEmptyFlexDataResponse(),n,"loadFlexData"))});return Promise.all(t)}function o(e){var r=[];e.forEach(function(e){if(Array.isArray(e)){r=r.concat(e)}else{r.push(e)}});return r}function s(e){return e.map(function(e){return n(e)})}function u(e){return Promise.resolve(e).then(o).then(s).then(o).then(r.merge)}function f(r){return e.getStaticFileConnector().then(l.bind(this,r))}var c={};c.completeFlexData=function(e){if(!e||!e.reference){return Promise.reject("No reference was provided")}return Promise.all([f(e),e.partialFlexData]).then(u)};c.loadFlexData=function(r){if(!r||!r.reference){return Promise.reject("No reference was provided")}return e.getLoadConnectors().then(l.bind(this,r)).then(u)};return c});