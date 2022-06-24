/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/ActionToolbar","../Util"],function(e,n){"use strict";var t=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");var i={description:"{description}",name:"{name}",aggregations:{},properties:{},actions:{settings:{name:t.getText("actiontoolbar.RTA_SETTINGS_NAME"),handler:function(e,n){return sap.ui.mdc.p13n.Engine.getInstance().getRTASettingsActionHandler(e,n,"actionsKey").then(function(e){return e})},CAUTION_variantIndependent:true}}},r=[],a=[];return n.getDesignTime(e,a,r,i)});