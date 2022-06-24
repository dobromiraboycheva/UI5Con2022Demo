/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/base/security/encodeCSS"],function(e,a){"use strict";var t=e.AvatarSize;var s=e.AvatarType;var r={apiVersion:2};r.render=function(e,r){var i=r.getInitials(),l=r._getActualDisplayType(),n=r._getImageFallbackType(),o=r.getDisplaySize(),p=r.getDisplayShape(),c=r.getImageFitType(),g=r.getCustomDisplaySize(),d=r.getCustomFontSize(),u=r.getSrc(),y="sapFAvatar",f=r.getTooltip_AsString(),b=r.getAriaLabelledBy(),S=r.getAriaDescribedBy(),I=r.getAriaHasPopup(),v=r.hasListeners("press")?r._getBadge():null,A=r._getDefaultTooltip();e.openStart("span",r);e.class(y);e.class("sapFAvatarColor"+r._getActualBackgroundColor());e.class(y+o);e.class(y+l);e.class(y+p);if(r.hasListeners("press")){e.class("sapMPointer");e.class(y+"Focusable");e.attr("role","button");e.attr("tabindex",0)}else if(r.getDecorative()){e.attr("role","presentation");e.attr("aria-hidden","true")}else{e.attr("role","img")}if(r.getShowBorder()){e.class("sapFAvatarBorder")}if(o===t.Custom){e.style("width",g);e.style("height",g);e.style("font-size",d)}if(f){e.attr("title",f);e.attr("aria-label",f)}else if(i){e.attr("aria-label",A+" "+i)}else{e.attr("aria-label",A)}if(b&&b.length>0){e.attr("aria-labelledby",b.join(" "))}if(S&&S.length>0){e.attr("aria-describedby",S.join(" "))}if(I&&I!=="None"){e.attr("aria-haspopup",I.toLowerCase())}e.openEnd();if(l===s.Icon||n===s.Icon){e.renderControl(r._getIcon().addStyleClass(y+"TypeIcon"))}else if(l===s.Initials||n===s.Initials){e.openStart("span");e.class(y+"InitialsHolder");e.openEnd();e.text(i);e.close("span")}if(l===s.Image){e.openStart("span");e.class(y+"ImageHolder");e.class(y+l+c);e.style("background-image","url('"+a(u)+"')");e.openEnd();e.close("span")}if(v){e.openStart("div");e.class(y+"BadgeIconActiveArea");if(g){e.style("font-size",g)}e.openEnd();e.openStart("span");e.class(y+"BadgeIcon");e.openEnd();e.renderControl(v);e.close("span");e.close("div")}e.close("span")};return r},true);