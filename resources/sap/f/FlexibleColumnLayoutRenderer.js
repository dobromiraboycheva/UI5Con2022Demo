/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/InvisibleText","sap/ui/Device","sap/m/library"],function(n,e,r){"use strict";var o={apiVersion:2};o.render=function(n,e){var a=e.getBackgroundDesign(),t=e.getLandmarkInfo();n.openStart("div",e);n.class("sapFFCL");if(a!==r.BackgroundDesign.Transparent){n.class("sapFFCLBackgroundDesign"+a)}n.openEnd();o.renderBeginColumn(n,e,t);o.renderMidColumn(n,e,t);o.renderEndColumn(n,e,t);n.close("div")};o.renderBeginColumn=function(n,e,r){var a=e.getAggregation("_beginColumnBackArrow");n.openStart("div",e.getId()+"-beginColumn");n.accessibilityState(e,e._formatLandmarkInfo(r,"FirstColumn"));n.class("sapFFCLColumn");n.class("sapFFCLColumnBegin");n.class("sapFFCLColumnActive");n.openEnd();o.renderColumnContentWrapper(n);n.close("div");o.renderArrow(n,a)};o.renderMidColumn=function(n,e,r){var a=e.getAggregation("_midColumnForwardArrow"),t=e.getAggregation("_midColumnBackArrow");o.renderArrow(n,a);n.openStart("div",e.getId()+"-midColumn");n.accessibilityState(e,e._formatLandmarkInfo(r,"MiddleColumn"));n.class("sapFFCLColumn");n.class("sapFFCLColumnMid");n.openEnd();o.renderColumnContentWrapper(n);n.close("div");o.renderArrow(n,t)};o.renderEndColumn=function(n,e,r){var a=e.getAggregation("_endColumnForwardArrow");o.renderArrow(n,a);n.openStart("div",e.getId()+"-endColumn");n.accessibilityState(e,e._formatLandmarkInfo(r,"LastColumn"));n.class("sapFFCLColumn");n.class("sapFFCLColumnEnd");n.openEnd();o.renderColumnContentWrapper(n);n.close("div")};o.renderArrow=function(n,r){if(!e.system.phone){n.openStart("div");n.class("sapFFCLArrow");n.class("sapContrastPlus");n.openEnd();n.renderControl(r);n.close("div")}};o.renderColumnContentWrapper=function(n){n.openStart("div");n.class("sapFFCLColumnContent");n.openEnd();n.close("div")};return o},true);