/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library"],function(t){"use strict";var e=t.ValueState;var i={};i.render=function(t,i){if(!i.aRBs){return}var a=i.getColumns();var r=i.getEnabled();if(r){var s=i.getItems();r=false;for(var l=0;l<s.length;l++){if(s[l].getEnabled()){r=true;break}}}t.write("<div");t.writeControlData(i);t.addClass("sapUiRbG");if(a>1){if(a==i.aRBs.length){t.addClass("sapUiRbG1Row")}else{t.addClass("sapUiRbGTab");if(i.getWidth()&&i.getWidth()!=""){t.addClass("sapUiRbGTabFlex")}}}if(i.getWidth()&&i.getWidth()!=""){t.addStyle("width",i.getWidth())}if(i.getTooltip_AsString()){t.writeAttributeEscaped("title",i.getTooltip_AsString())}if(r){t.writeAttribute("tabindex","0")}else{t.writeAttribute("tabindex","-1")}t.writeAccessibilityState(i,{role:"radiogroup",invalid:i.getValueState()==e.Error,disabled:!i.getEditable()});t.writeClasses();t.writeStyles();t.write(">");for(var d=0;d<a;d++){if(a>1&&a!=i.aRBs.length){t.write("<div");t.addClass("sapUiRbGCol");t.writeClasses();t.write(">")}for(var l=d;l<i.aRBs.length;l=l+a){t.renderControl(i.aRBs[l])}if(a>1&&a!=i.aRBs.length){t.write("</div>")}}if(a>1&&a!=i.aRBs.length){t.write('<div class="sapUiRbGDummy"> </DIV>')}t.write("</div>")};return i},true);