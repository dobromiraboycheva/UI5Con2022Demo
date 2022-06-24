/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/unified/library","sap/ui/thirdparty/jquery"],function(t,e){"use strict";var a={};a.apiVersion=2;a.render=function(a,n){var r=n.getEnabled(),i=n.getTooltip_AsString();a.openStart("div",n);a.class("sapUiFup");if(n.getButtonOnly()){a.class("sapUiFupButtonOnly")}var d=t.FileUploaderHelper.addFormClass();if(d){a.class(d)}if(!r){a.class("sapUiFupDisabled")}a.openEnd();a.openStart("form",n.getId()+"-fu_form");a.style("display","inline-block");a.attr("enctype","multipart/form-data");a.attr("method",n.getHttpRequestMethod().toLowerCase());a.attr("action",n.getUploadUrl());a.attr("target",n.getId()+"-frame");a.openEnd();a.openStart("div");if(!n.bMobileLib){a.class("sapUiFupInp")}a.openEnd();a.openStart("div");a.class("sapUiFupGroup");a.style("border","0");a.style("cellPadding","0");a.style("cellSpacing","0");a.openEnd();a.openStart("div");a.openEnd();a.openStart("div");if(n.getButtonOnly()){a.style("display","none")}a.openEnd();a.renderControl(n.oFilePath);a.close("div");a.openStart("div");a.openEnd();n._ensureBackwardsReference();a.renderControl(n.oBrowse);a.openStart("span",n.getId()+"-AccDescr");a.class("sapUiInvisibleText");a.attr("aria-hidden","true");a.openEnd();a.text(n._generateAccDescriptionText());a.close("span");a.close("div");a.close("div");a.close("div");var o=n.getName()||n.getId();a.openStart("div");a.class("sapUiFupInputMask");if(i&&i.length){a.attr("title",i)}a.openEnd();a.voidStart("input");a.attr("type","hidden");a.attr("name","_charset_");a.attr("aria-hidden","true");a.voidEnd();a.voidStart("input",n.getId()+"-fu_data");a.attr("type","hidden");a.attr("aria-hidden","true");a.attr("name",o+"-data");a.attr("value",n.getAdditionalData()||"");a.voidEnd();e.each(n.getParameters(),function(t,e){a.voidStart("input");a.attr("type","hidden");a.attr("aria-hidden","true");a.attr("name",e.getName()||"");a.attr("value",e.getValue()||"");a.voidEnd()});a.close("div");a.close("div");a.close("form");a.close("div")};return a},true);