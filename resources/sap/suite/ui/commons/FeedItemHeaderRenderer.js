/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/m/ListItemBaseRenderer","./util/FeedItemUtils","sap/ui/core/Renderer"],function(e,t,i){"use strict";var d=i.extend(e);d.renderLIContent=function(e,i){var d=true;if(jQuery.browser.msie&&jQuery.browser.version.substring(0,2)<10){d=false}e.write("<div");e.writeControlData(i);e.addClass("sapSuiteUiCommonsFeedItemHeader");e.addClass("sapSuiteUiCommonsPointer");e.writeClasses();e.write(">");e.write('<div id="'+i.getId()+'-feedItemHeaderImage"');e.addStyle("background-image","url("+i.getImage()+")");e.writeStyles();e.addClass("sapSuiteUiCommonsFeedItemHeaderImage");e.writeClasses();e.write(">");e.write("<div");e.addClass("sapSuiteUiCommonsFeedItemHeaderLowerText");e.writeClasses();e.write(">");e.write('<div id="'+i.getId()+'-feedItemHeaderSource"');e.addClass("sapSuiteUiCommonsFeedItemHeaderSource");e.writeClasses();e.writeAttribute("tabindex",0);e.write(">");e.writeEscaped(i.getSource());e.write("</div>");e.write('<div id="'+i.getId()+'-feedItemHeaderAge"');e.addClass("sapSuiteUiCommonsFeedItemHeaderAge");e.writeClasses();e.writeAttribute("tabindex",0);e.write(">");e.writeEscaped(t.calculateFeedItemAge(i.getPublicationDate()));e.write("</div>");e.write("</div>");e.write("</div>");e.write("<div");e.addClass("sapSuiteUiCommonsFeedItemHeaderText");e.writeClasses();e.write(">");e.write('<div id="'+i.getId()+'-feedItemHeaderTitleAndDesc"');e.addClass("sapSuiteUiCommonsFeedItemHeaderDescription");if(d){e.addClass("sapSuiteUiCommonsFeedItemHeaderDescriptionMultiCol")}e.writeClasses();e.write(">");e.write('<div id="'+i.getId()+'-feedItemHeaderTitle"');e.addClass("sapSuiteUiCommonsFeedItemHeaderTitle");if(d){e.addClass("sapSuiteUiCommonsFeedItemHeaderTitleMultiCol")}e.writeClasses();e.writeAttribute("tabindex",0);e.write(">");e.writeEscaped(i.getTitle());e.write("</div>");e.write('<div id="'+i.getId()+'-feedItemHeaderDesc"');e.addClass("sapSuiteUiCommonsFeedItemHeaderHeight");e.writeClasses();e.writeAttribute("tabindex",0);e.write(">");var r=i._getHtmlControl();r.setContent("<div>"+i.getDescription()+"</div>");e.renderControl(r);e.write("</div>");e.write("</div>");e.write("</div>")};return d},true);