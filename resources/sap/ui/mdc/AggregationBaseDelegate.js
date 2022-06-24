/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/BaseDelegate","sap/ui/core/library"],function(e,r){"use strict";var t=Object.assign(e,{fetchProperties:function(e){return Promise.resolve([])},addItem:function(e,r,t){return Promise.resolve()},removeItem:function(e,r,t){return Promise.resolve(true)},validateState:function(e,t){var n=r.MessageType.None;return{validation:n,message:undefined}}});return t});