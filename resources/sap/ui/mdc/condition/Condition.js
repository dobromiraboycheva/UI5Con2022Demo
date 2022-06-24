/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/mdc/enum/ConditionValidated"],function(e,i){"use strict";var t={createItemCondition:function(e,t,n,a,r){var o=i.NotValidated;var u=[e,t];if(t===null||t===undefined){u.pop()}else{o=i.Validated}return this.createCondition("EQ",u,n,a,o,r)},createCondition:function(e,i,t,n,a,r){var o={operator:e,values:i,isEmpty:null,validated:a};if(t){o.inParameters=t}if(n){o.outParameters=n}if(r){o.payload=r}return o},_removeEmptyConditions:function(e){for(var i=e.length-1;i>-1;i--){if(e[i].isEmpty){e.splice(parseInt(i),1)}}return e},_removeInitialFlags:function(e){for(var i=e.length-1;i>-1;i--){if(e[i].isInitial){delete e[i].isInitial}}return e}};return t},true);