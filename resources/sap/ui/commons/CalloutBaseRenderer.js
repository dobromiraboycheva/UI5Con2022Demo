/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var t={};t.render=function(t,e){var i=sap.ui.getCore().getConfiguration().getAccessibility();var s=e.getId();t.write("<div");t.writeControlData(e);t.addClass("sapUiCltBase");if(this.addRootClasses){this.addRootClasses(t,e)}t.writeClasses();if(i){t.writeAttribute("role","dialog");var r=e.oRb.getText("CALLOUT_ARIA_NAME");if(r){t.writeAttributeEscaped("aria-label",r)}}if(e.getTooltip_AsString()){t.writeAttributeEscaped("title",e.getTooltip_AsString())}t.addStyle("display","none");t.writeStyles();t.write(">");t.write('<span id="'+s+'-fhfe" tabindex="0"></span>');t.write("<div");t.writeAttribute("id",s+"-cont");t.addClass("sapUiCltBaseCont");if(this.addContentClasses){this.addContentClasses(t,e)}t.writeClasses();t.writeAttribute("tabindex","-1");t.write(">");if(this.renderContent){this.renderContent(t,e)}t.write("</div>");t.write("<div");t.writeAttribute("id",s+"-arrow");if(i){t.writeAttribute("role","presentation")}t.addClass("sapUiCltBaseArr");if(this.addArrowClasses){this.addArrowClasses(t,e)}t.writeClasses();t.write("></div>");t.write('<span id="'+s+'-fhee" tabindex="0"></span>');t.write("</div>")};return t},true);