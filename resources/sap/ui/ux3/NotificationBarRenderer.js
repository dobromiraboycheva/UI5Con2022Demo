/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/core/Icon","sap/ui/ux3/library"],function(e,i,t){"use strict";var a=t.NotificationBarStatus;var s;var r={};r.render=function(e,i){s=s||sap.ui.require("sap/ui/ux3/NotificationBar");d(e,i);g(e,i);u(e,i)};var d=function(e,i){e.write("<div");e.writeControlData(i);if(i.getVisibleStatus()===a.None){if(i.$().length>0){if(i._resizeFrom){i.$().stop().animate({height:0},"fast",function(){i.$().css("display","none");e.addStyle("display","none");e.writeAttribute("aria-hidden","true")})}else{e.addStyle("display","none");e.writeAttribute("aria-hidden","true")}}else{e.addStyle("display","none");e.writeAttribute("aria-hidden","true")}}else{e.writeAttribute("aria-hidden","false");e.addStyle("display","block")}e.writeStyles();e.addClass("sapUiNotificationBar");if(i._resizeTo){if(i._resizeFrom==a.Max){if(i._resizeTo==a.Default){e.addClass("sapUiNotificationBarMaximized")}}}e.writeClasses();e.write(">");o(e,i)};var l=function(e,i){var t=i.getVisibleStatus();if(t!=="None"){var a=i.getId()+"-toggler";e.write("<div");e.writeAttribute("id",a);e.addClass("sapUiBarToggle");if(t!=="Min"){e.addClass("sapUiBarToggleWide")}e.writeClasses();if(i.getAlwaysShowToggler()){e.addStyle("display","block");e.writeStyles()}e.write(">");n(e,i,"ArrowUp");n(e,i,"ArrowDown");n(e,i,"BarUp");n(e,i,"BarDown");e.write("</div>")}else{e.addStyle("display","none");e.writeStyles()}};var n=function(e,i,t){e.write("<div");var a=i.getId()+"-"+t;e.writeAttribute("id",a);var s=i.getVisibleStatus();var r=true;var d="";switch(t){case"ArrowUp":if(s==="Default"){r=false}d=i._oResBundle.getText("NOTIBAR_TITLE_ENLARGE");break;case"ArrowDown":if(s==="Max"){r=false}d=i._oResBundle.getText("NOTIBAR_TITLE_MINIMIZE");break;case"BarUp":if(s==="Min"){r=false}d=i._oResBundle.getText("NOTIBAR_TITLE_BAR_UP");break;case"BarDown":if(s==="Max"||s==="Default"){r=false}d=i._oResBundle.getText("NOTIBAR_TITLE_BAR_DOWN");break}e.writeAttributeEscaped("title",d);if(r){e.addClass("sapUiBarToggleHide")}e.addClass("sapUiBarToggle"+t);e.addClass("sapUiBarToggleItem");e.writeClasses();e.write(">");e.write("</div>")};var o=function(i,t){i.write("<div");var a=t.getId()+"-hoverItem";i.writeAttribute("id",""+a);var r=t.getVisibleStatus();if(r==="Min"){i.addStyle("top","-"+s.HOVER_ITEM_HEIGHT+"px");i.addStyle("display","block")}else{i.addStyle("display","none")}if(t.getDomRef()){var d=e(t.getDomRef());var l=d.width()+"px";i.addStyle("width",l)}i.writeStyles();i.addClass("sapUiNotiHover");i.writeClasses();i.write(">");i.write("</div>")};var g=function(e,i){if(i.getResizeEnabled()){l(e,i)}if(i.hasItems()){if(i.getVisibleStatus()==a.Max){w(e,i)}else{f(e,i)}}};var w=function(e,i){var t=i.getNotifiers();var a=i.getMessageNotifier();var s="";e.write("<div");e.writeAttribute("id",i.getId()+"-containers");e.addClass("sapUiNotifierContainers");e.writeClasses();e.write(">");if(a&&a.hasItems()){a.destroyAggregation("views",true);s=a.getId()+"-messageNotifierView";var r=p(s,a);a.addAggregation("views",r,true);e.renderControl(r)}if(t.length>0){for(var d=0;d<t.length;d++){if(t[d].hasItems()){t[d].destroyAggregation("views",true);s=t[d].getId()+"-notifierView";var l=p(s,t[d]);t[d].addAggregation("views",l,true);e.renderControl(l)}}}e.write("</div")};var f=function(e,i){var t=i.getNotifiers();var a=i.getMessageNotifier();e.write("<ul");e.writeAttribute("id",i.getId()+"-notifiers");e.addClass("sapUiNotifiers");e.writeClasses();e.write(">");var s=false;for(var r=0;r<t.length;r++){if(t[r].hasItems()){s=true;break}}var d=a&&a.hasItems()?true:false;if(s){c(e,t)}if(s&&d){e.write("<li");e.addClass("sapUiNotifierSeparator");e.writeClasses();e.write(">");e.write("&nbsp;");e.write("</li>")}if(d){C(e,a,i)}e.write("</ul>")};var u=function(e,i){e.write("</div>")};var v=function(e,i,t){var a=i.getId();e.write("<li");e.writeElementData(i);e.addClass("sapUiNotifier");e.writeClasses();e.writeAttribute("tabindex","-1");e.writeAttribute("aria-describedby",a+"-description>");e.write(">");I(e,i.getIcon(),t);e.write('<div id="'+a+'-description"');e.addStyle("display","none");e.writeStyles();e.write(">");e.write("</div>");var s=i.getMessages().length;if(s>0){e.write('<div id="'+a+'-counter" role="tooltip"');e.addClass("sapUiNotifierMessageCount");if(t){e.addClass("sapUiMessage")}e.writeClasses();e.write(">");if(s>99){s=">99"}e.write(s);e.write("</div>")}e.write("</li>")};var p=function(e,i){var t=new s.NotifierView(e,{title:i.getTitle(),renderMode:"maximized"});if(i._bEnableMessageSelect){t.addStyleClass("sapUiNotifierSelectable")}var a=i.getMessages();for(var r=0;r<a.length;r++){var d=a[r];var l=new s.MessageView(e+"-messageView-"+d.getId(),{text:d.getText(),timestamp:d.getTimestamp()});l._message=d;l.setIcon(d.getIcon()||d.getDefaultIcon("32x32"));t.addMessage(l)}return t};var c=function(e,i){for(var t=0;t<i.length;t++){v(e,i[t],false)}};var I=function(e,t,a){if(t==null||t==""){var s=new i({useIconTooltip:false});s.addStyleClass("sapUiNotifierIcon");if(a){s.setSrc("sap-icon://alert")}else{s.setSrc("sap-icon://notification-2")}e.renderControl(s);return}e.write('<img alt=""');e.addClass("sapUiNotifierIcon");e.writeClasses();e.writeAttributeEscaped("src",t);e.write(">")};var C=function(e,i,t){v(e,i,true);b(e,i,t)};var b=function(e,i,t){if(i.hasItems()){var a=i.getMessages();var s=a[a.length-1];var r=i._oMessageArea;r._message=s;var d=t.getId()+"-inplaceMessage-"+r._message.getId();e.write("<li");e.writeAttribute("id",d);e.addClass("sapUiInPlaceMessage");e.writeClasses();if(t._gapMessageArea){var l=t._gapMessageArea+"px";e.addStyle("margin-left",l);e.writeStyles()}e.write(">");if(s.getText()!=""){e.write("<div");e.writeControlData(r);e.writeAttribute("tabindex","-1");e.addClass("sapUiNotifierMessageText");e.addClass("sapUiInPlaceMessage");if(i._bEnableMessageSelect&&!r._message.getReadOnly()){e.addClass("sapUiInPlaceMessageSelectable")}e.writeClasses();e.write(">");e.writeEscaped(s.getText());e.write("</div>")}if(s.getTimestamp()!=""){e.write("<div");e.addClass("sapUiNotifierMessageTimestamp");e.addClass("sapUiInPlaceMessage");e.writeClasses();e.write(">");e.writeEscaped(s.getTimestamp());e.write("</div>")}e.write("</li>")}};return r},true);