/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ItemBaseFlex"],function(e){"use strict";var t=Object.assign({},e);t.findItem=function(e,t,n){return sap.ui.getCore().byId(n)};return{moveControls:"default",moveAction:t.createMoveChangeHandler()}});