/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/BaseDelegate"],function(e){"use strict";var n=Object.assign({},e,{fetchLinkItems:function(e,n,i){return Promise.resolve(null)},fetchLinkType:function(e,n){return Promise.resolve({initialType:{type:2,directLink:undefined},runtimeType:null})},fetchAdditionalContent:function(e,n){return Promise.resolve([])},modifyLinkItems:function(e,n,i){return Promise.resolve(i)},beforeNavigationCallback:function(e,n){return Promise.resolve(true)}});return n});