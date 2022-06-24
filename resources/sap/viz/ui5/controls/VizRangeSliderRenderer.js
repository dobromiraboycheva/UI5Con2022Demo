/*!
 * SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/core/Renderer","./VizSliderBasicRenderer","sap/ui/Device"],function(e,t,i){"use strict";var n=e.extend(t);n.apiVersion=2;n.renderHandles=function(e,t){this.renderHandle(e,t,{id:t.getId()+"-handle1",position:"start"});this.renderHandle(e,t,{id:t.getId()+"-handle2",position:"end"});this.renderTooltips(e,t);e.renderControl(t._mHandleTooltip.start.label);e.renderControl(t._mHandleTooltip.end.label);e.renderControl(t._oRangeLabel)};n.renderTooltips=function(e,i){e.openStart("div",i.getId()+"-TooltipsContainer").class(t.CSS_CLASS+"TooltipContainer").style("left","0%").style("right","0%").style("min-width","0%").openEnd();this.renderTooltip(e,i,i.getInputsAsTooltips(),"Left");this.renderTooltip(e,i,i.getInputsAsTooltips(),"Right");e.close("div")};n.renderTooltip=function(e,i,n,a){e.openStart("span",i.getId()+"-"+a+"Tooltip");e.class(t.CSS_CLASS+"HandleTooltip");if(!i.getShowStartEndLabel()){e.style("visibility","hidden")}e.style("width",i._iLongestRangeTextWidth+"px");e.openEnd();e.close("span")};n.renderHandle=function(e,n,a){var s,l=n.getRange(),o=n.getEnabled(),d=sap.ui.getCore().getConfiguration().getRTL();if(a&&a.id!==undefined){e.openStart("span",a.id)}else{e.openStart("span")}if(a&&a.position!==undefined){s=l[a.position==="start"?0:1];e.attr("data-range-val",a.position);e.attr("aria-labelledby",n._mHandleTooltip[a.position].label.getId());if(n.getInputsAsTooltips()){e.attr("aria-controls",n._mHandleTooltip[a.position].tooltip.getId())}}if(n.getShowHandleTooltip()){this.writeHandleTooltip(e,n)}e.class(t.CSS_CLASS+"Handle");if(!i.system.desktop&&(i.system.phone||i.system.tablet)){e.class("viz-Mobile")}e.class("sapUiIcon");e.class("ui5-sap-viz-vizSliderHandle");e.attr("data-sap-ui-icon-content","");if(a&&a.id!==undefined&&a.id===n.getId()+"-handle1"){e.class("ui5-sap-viz-vizSliderHandle-left");e.style(d?"right":"left",l[0])}if(a&&a.id!==undefined&&a.id===n.getId()+"-handle2"){e.class("ui5-sap-viz-vizSliderHandle-right");e.style(d?"right":"left",l[1])}this.writeAccessibilityState(e,n,s);if(o){e.attr("tabindex","0")}e.openEnd().close("span")};n.writeAccessibilityState=function(e,t,i){e.accessibilityState(t,{role:"slider",orientation:"horizontal",valuemin:t.toFixed(t.getMin()),valuemax:t.toFixed(t.getMax()),valuenow:i})};n.renderStartLabel=function(e,i){e.openStart("div").class(t.CSS_CLASS+"RangeLabel").openEnd().text(i.getMin()).close("div")};n.renderEndLabel=function(e,i){e.openStart("div").class(t.CSS_CLASS+"RangeLabel").style("width",i._iLongestRangeTextWidth+"px").openEnd().text(i.getMax()).close("div")};n.renderLabels=function(e,i){e.openStart("div").class(t.CSS_CLASS+"Labels").openEnd();this.renderStartLabel(e,i);this.renderEndLabel(e,i);e.close("div")};n.renderProgressIndicator=function(e,t){var i=t.getRange();e.openStart("div",t.getId()+"-progress");if(t.getEnabled()){e.attr("tabindex","0")}this.addProgressIndicatorClass(e,t);e.style("width",t._sProgressValue);e.accessibilityState(t,{role:"slider",orientation:"horizontal",valuemin:t.toFixed(t.getMin()),valuemax:t.toFixed(t.getMax()),valuenow:i.join("-"),valuetext:t._oResourceBundle.getText("RANGE_SLIDER_RANGE_ANNOUNCEMENT",i),labelledby:t._oRangeLabel.getId()});e.openEnd().close("div")};n.render=function(e,i){var n=i.getEnabled(),a=i.getTooltip_AsString(),s=t.CSS_CLASS;e.openStart("div",i);this.addClass(e,i);e.class("ui5-sap-viz-vizRangeSlider");if(!n){e.class(s+"Disabled")}e.style("position","absolute").style("width",i.getWidth()).style("height",i.getHeight()).style("top",i.getTop()).style("left",i.getLeft());if(a&&i.getShowHandleTooltip()){e.attr("title",a)}e.openEnd();this.renderMock(e,i);e.openStart("div",i.getId()+"-inner");this.addInnerClass(e,i);if(!n){e.class(s+"InnerDisabled")}e.openEnd();if(i.getProgress()){this.renderProgressIndicator(e,i)}this.renderHandles(e,i);e.close("div");if(i.getEnableTickmarks()){this.renderTickmarks(e,i)}else{this.renderLabels(e,i)}if(i.getName()){this.renderInput(e,i)}e.close("div")};n.renderMock=function(e,t){var i=t.getRange();var n=t.getMax();var a=t.getMin();var s=Math.min(i[0],i[1]);var l=Math.max(i[0],i[1]);e.openStart("div",t.getId()+"-leftMock").class("ui5-sap-viz-vizSliderMock").class("ui5-sap-viz-vizSliderMock-left").style("right",(n-s)*100/(n-a)+"%").openEnd().close("div");e.openStart("div",t.getId()+"-rightMock").class("ui5-sap-viz-vizSliderMock").class("ui5-sap-viz-vizSliderMock-right").style("left",(l-a)*100/(n-a)+"%").openEnd().close("div");e.openStart("div",t.getId()+"-label").class("ui5-sap-viz-vizSliderLabel").style("left",(l+s)*50/(l-s)+"%");if(!t.getShowPercentageLabel()){e.style("visibility","hidden")}e.openEnd().text((l-s)*100/(n-a)+"%").close("div")};return n},true);