/*!
 * SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./library","sap/m/library","sap/ui/core/Control","sap/suite/ui/microchart/RadialMicroChartRenderer","sap/ui/Device","sap/ui/core/ResizeHandler","sap/base/Log","sap/ui/events/KeyCodes","sap/suite/ui/microchart/MicroChartUtils","./RadialMicroChartRenderer"],function(e,t,i,s,r,a,o,n,p,l){"use strict";var u=i.ValueColor;var h=s.extend("sap.suite.ui.microchart.RadialMicroChart",{constructor:function(e,t){var i;if(t&&typeof t.percentage==="number"){i=true}else if(e&&typeof e.percentage==="number"){i=true}else{i=false}try{s.apply(this,arguments);this._bPercentageMode=i}catch(e){this.destroy();throw e}},metadata:{library:"sap.suite.ui.microchart",properties:{total:{group:"Data",type:"float"},fraction:{group:"Data",type:"float",defaultValue:null},percentage:{group:"Data",type:"float",defaultValue:null},valueColor:{group:"Appearance",type:"sap.m.ValueCSSColor",defaultValue:"Neutral"},size:{group:"Misc",type:"sap.m.Size",defaultValue:"Auto"},width:{group:"Misc",type:"sap.ui.core.CSSSize"},height:{group:"Misc",type:"sap.ui.core.CSSSize"},alignContent:{group:"Misc",type:"sap.suite.ui.microchart.HorizontalAlignmentType",defaultValue:"Left"},hideOnNoData:{type:"boolean",group:"Appearance",defaultValue:false}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{press:{}}}});h.THRESHOLD_LOOK_XS=1.125;h.THRESHOLD_LOOK_S=3.5;h.THRESHOLD_LOOK_M=4.5;h.THRESHOLD_LOOK_L=5.875;h.THRESHOLD_WIDTH_NO_LABEL=6;h.prototype.init=function(){this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.microchart");this.setAggregation("tooltip","((AltText))",true);this._bThemeApplied=true;if(!sap.ui.getCore().isInitialized()){this._bThemeApplied=false;sap.ui.getCore().attachInit(this._handleCoreInitialized.bind(this))}else{this._handleCoreInitialized()}};h.prototype._handleCoreInitialized=function(){this._bThemeApplied=sap.ui.getCore().isThemeApplied();if(!this._bThemeApplied){sap.ui.getCore().attachThemeChanged(this._handleThemeApplied,this)}};h.prototype._handleThemeApplied=function(){this._bThemeApplied=true;this.invalidate();sap.ui.getCore().detachThemeChanged(this._handleThemeApplied,this)};h.prototype.onBeforeRendering=function(){if(!this._getPercentageMode()){if(this.getTotal()===0){n.info("Total cannot be 0. Please add a valid total value.")}else{this.setProperty("percentage",Math.round(this.getFraction()*100/this.getTotal()*10)/10,true)}}this._unbindMouseEnterLeaveHandler()};h.prototype.onAfterRendering=function(){this._bindMouseEnterLeaveHandler();this._sResizeHandlerId=o.register(this,this._onResize.bind(this));this._onResize()};h.prototype.ontouchstart=function(e){if(this.hasListeners("press")===true){e.setMarked()}};h.prototype.ontap=function(e){if(a.browser.msie){this.$().trigger("focus")}if(this.hasListeners("press")===true){e.setMarked()}this.firePress()};h.prototype.onkeydown=function(e){if(e.which===p.SPACE){if(this.hasListeners("press")===true){e.setMarked()}e.preventDefault()}};h.prototype.onkeyup=function(e){if(e.which===p.ENTER||e.which===p.SPACE){if(this.hasListeners("press")===true){e.setMarked()}this.firePress();e.preventDefault()}};h.prototype.attachEvent=function(e,t,i,r){s.prototype.attachEvent.call(this,e,t,i,r);if(e==="press"){this.rerender()}return this};h.prototype.detachEvent=function(e,t,i){s.prototype.detachEvent.call(this,e,t,i);if(e==="press"){this.rerender()}return this};h.prototype.exit=function(){this._deregisterResizeHandler()};h.prototype._getPercentageMode=function(){return this._bPercentageMode};h.prototype.setPercentage=function(e){if(typeof e==="number"){var t=Math.floor(e*10)/10;this._bPercentageMode=true;if(t!==this.getPercentage()){this.setProperty("percentage",t)}}else{this._bPercentageMode=false;this.setProperty("percentage",null)}return this};h.prototype._onResize=function(){var e=this.$(),t=e.height(),i=e.width(),s=e.find(".sapSuiteRMCOutsideLabel"),r=e.find(".sapSuiteRMCInsideLabel"),a=e.find(".sapSuiteRMCInnerContainer");e.removeClass("sapSuiteRMCLookL sapSuiteRMCLookM sapSuiteRMCLookS sapSuiteRMCLookXS");s.removeClass("sapSuiteRMCLabelHide");r.removeClass("sapSuiteRMCLabelHide");a.css("width",a.height());if(t<this.convertRemToPixels(h.THRESHOLD_LOOK_S)){e.addClass("sapSuiteRMCLookXS");r.addClass("sapSuiteRMCLabelHide")}else if(t<this.convertRemToPixels(h.THRESHOLD_LOOK_M)||i<this.convertRemToPixels(h.THRESHOLD_LOOK_M)){e.addClass("sapSuiteRMCLookS");s.addClass("sapSuiteRMCLabelHide")}else if(t<this.convertRemToPixels(h.THRESHOLD_LOOK_L)||i<this.convertRemToPixels(h.THRESHOLD_LOOK_L)){e.addClass("sapSuiteRMCLookM");s.addClass("sapSuiteRMCLabelHide")}else{e.addClass("sapSuiteRMCLookL");s.addClass("sapSuiteRMCLabelHide")}if(this._isAnyLabelTruncated(s)){s.addClass("sapSuiteRMCLabelHide")}if(this._isAnyLabelTruncated(r)){r.addClass("sapSuiteRMCLabelHide")}};h.prototype._getAccessibilityControlType=function(){return this._oRb.getText("ACC_CTR_TYPE_RADIALMICROCHART")};h.prototype._isValueColorValid=function(){return u.hasOwnProperty(this.getValueColor())};h.prototype._isTooltipSuppressed=function(){var e=this.getTooltip_Text();if(e&&e.trim().length===0){return true}else{return false}};h.prototype._getAltHeaderText=function(e){var t=this._oRb.getText("RADIALMICROCHART");if(e){t+=" "+this._oRb.getText("IS_ACTIVE")}t+="\n";if(!this._hasData()){t+=this._oRb.getText("NO_DATA");return t}var i=this.getPercentage();if(i>100){i=100}else if(i<0){i=0}if(this._isValueColorValid()){t+=this._oRb.getText("RADIALMICROCHART_ARIA_LABEL",[this.getPercentage(),this._getStatusText()])}else{t+=this._oRb.getText("RADIALMICROCHART_PERCENTAGE_TEXT",i)}return t};h.prototype._getStatusText=function(){var e=this.getValueColor();switch(e){case u.Error:return this._oRb.getText("SEMANTIC_COLOR_ERROR");case u.Critical:return this._oRb.getText("SEMANTIC_COLOR_CRITICAL");case u.Good:return this._oRb.getText("SEMANTIC_COLOR_GOOD");case u.Neutral:return this._oRb.getText("SEMANTIC_COLOR_NEUTRAL");default:return""}};h.prototype._addTitleAttribute=function(){if(!this.$().attr("title")&&this._hasData()){this.$().attr("title",this.getTooltip_AsString())}};h.prototype._removeTitleAttribute=function(){if(this.$().attr("title")){this.$().removeAttr("title")}};h.prototype._bindMouseEnterLeaveHandler=function(){this.$().on("mouseenter.tooltip",this._addTitleAttribute.bind(this));this.$().on("mouseleave.tooltip",this._removeTitleAttribute.bind(this))};h.prototype._unbindMouseEnterLeaveHandler=function(){this.$().off("mouseenter.tooltip");this.$().off("mouseleave.tooltip")};h.prototype._isActuallyANumber=function(e){return!isNaN(e)&&e!==null&&(e!=="Infinity"&&e!=="-Infinity")};h.prototype._hasData=function(){return this._getPercentageMode()||this._isActuallyANumber(this.getTotal())};h.prototype.firePress=function(){if(this._hasData()){s.prototype.fireEvent.call(this,"press",arguments)}};h.prototype._deregisterResizeHandler=function(){if(this._sResizeHandlerId){o.deregister(this._sResizeHandlerId);this._sResizeHandlerId=null}};l.extendMicroChart(h);return h});