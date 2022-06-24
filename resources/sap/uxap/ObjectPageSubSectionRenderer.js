/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(function(){"use strict";var e={apiVersion:2};e.render=function(e,t){var i,a,n,s,r,o,l,c=sap.ui.getCore().getConfiguration().getAccessibility(),d=t.getAggregation("ariaLabelledBy");if(!t.getVisible()||!t._getInternalVisible()){return}i=t.getActions()||[];r=i.length>0;n=t.getShowTitle();a=t._getInternalTitleVisible()&&t.getTitle().trim()!==""&&n;s=a||r;l=t._hasVisibleActions();e.openStart("div",t).attr("role","region").style("height",t._getHeight());if(t._bBlockHasMore){e.class("sapUxAPObjectPageSubSectionWithSeeMore")}if(t._bMultiLine){e.class("sapUxAPObjectPageSectionMultilineContent")}e.class("sapUxAPObjectPageSubSection").class("ui-helper-clearfix");if(c&&d){e.attr("aria-labelledby",d.getId())}e.openEnd();if(s){e.openStart("div",t.getId()+"-header").class("sapUxAPObjectPageSubSectionHeader");if(!a&&!l){e.class("sapUiHidden")}o=t._getUseTitleOnTheLeft();if(o){e.class("titleOnLeftLayout")}e.openEnd();e.openStart("div",t.getId()+"-headerTitle");if(a){e.attr("role","heading").attr("aria-level",t._getARIALevel())}e.class("sapUxAPObjectPageSubSectionHeaderTitle");if(t.getTitleUppercase()){e.class("sapUxAPObjectPageSubSectionHeaderTitleUppercase")}e.attr("data-sap-ui-customfastnavgroup",true).openEnd();if(a){e.text(t.getTitle())}e.close("div");if(r){e.openStart("div").class("sapUxAPObjectPageSubSectionHeaderActions").attr("data-sap-ui-customfastnavgroup",true).openEnd();i.forEach(e.renderControl,e);e.close("div")}e.close("div")}e.openStart("div").class("ui-helper-clearfix").class("sapUxAPBlockContainer");if(t._isHidden){e.style("display","none")}e.openEnd();e.renderControl(t._getGrid());e.close("div");e.openStart("div").class("sapUxAPSubSectionSeeMoreContainer");if(t._isHidden){e.style("display","none")}e.openEnd();e.renderControl(t._getSeeMoreButton());e.renderControl(t._getSeeLessButton());e.close("div");e.close("div")};return e},true);