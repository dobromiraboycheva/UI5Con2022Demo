/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/InvisibleText","sap/ui/thirdparty/jquery","sap/ui/core/Control","sap/ui/core/library","./library","sap/base/Log","sap/ui/events/KeyCodes","sap/ui/dom/jquery/Focusable"],function(t,e,i,n,r,o,a){"use strict";var s=n.TitleLevel;var l=i.extend("sap.uxap.ObjectPageSectionBase",{metadata:{abstract:true,library:"sap.uxap",properties:{title:{type:"string",group:"Appearance",defaultValue:null},titleLevel:{type:"sap.ui.core.TitleLevel",group:"Appearance",defaultValue:s.Auto},visible:{type:"boolean",group:"Appearance",defaultValue:true},importance:{type:"sap.uxap.Importance",group:"Behavior",defaultValue:r.Importance.High}},aggregations:{ariaLabelledBy:{type:"sap.ui.core.InvisibleText",multiple:false,visibility:"hidden"},customAnchorBarButton:{type:"sap.m.Button",multiple:false}}},renderer:null});l.prototype.init=function(){this._bInternalVisible=true;this._bInternalTitleVisible=true;this._sInternalTitle="";this._sInternalTitleLevel=s.Auto;this._isHidden=false;this._bRtl=sap.ui.getCore().getConfiguration().getRTL()};l.prototype.onAfterRendering=function(){if(this._getObjectPageLayout()){this._getObjectPageLayout()._requestAdjustLayout().catch(function(){o.debug("ObjectPageSectionBase :: cannot adjustLayout",this)});this._getObjectPageLayout()._setSectionsFocusValues()}};l.prototype.onBeforeRendering=function(){var t="ariaLabelledBy";this.setInvisibleTextLabelValue(this._getTitle());if(!this.getAggregation(t)){this.setAggregation(t,this._getAriaLabelledBy(),true)}};l.prototype.setCustomAnchorBarButton=function(t){var e=this.setAggregation("customAnchorBarButton",t,true);if(this._getObjectPageLayout()){this._getObjectPageLayout()._updateNavigation()}return e};l.prototype.getSectionText=function(){return""};l.prototype.setInvisibleTextLabelValue=function(t){var e=this.getAggregation("ariaLabelledBy"),i=this.getSectionText(),n="";if(t){n=t+" "}if(e){sap.ui.getCore().byId(e.getId()).setText(n+i)}return this};l.prototype._getAriaLabelledBy=function(){var e="",i=this._getTitle();if(i){e+=i+" "}e+=this.getSectionText();return new t({text:e}).toStatic()};l.prototype._setInternalVisible=function(t,e){if(t!=this._bInternalVisible){this._bInternalVisible=t;if(e){this.invalidate()}}};l.prototype._getInternalVisible=function(){return this._bInternalVisible};l.prototype._setInternalTitleVisible=function(t,e){if(t!=this._bInternalTitleVisible){this._bInternalTitleVisible=t;if(e){this.invalidate()}}};l.prototype._getInternalTitleVisible=function(){return this._bInternalTitleVisible};l.prototype._setInternalTitle=function(t,e){if(t!=this._sInternalTitle){this._sInternalTitle=t;if(e){this.invalidate()}}};l.prototype._getTitle=function(){return this._getInternalTitle()||this.getTitle()};l.prototype._getInternalTitle=function(){return this._sInternalTitle};l.prototype._getARIALevel=function(){var t=this._getTitleLevel();if(t===s.Auto){t=s.H2}return t.slice(-1)};l.prototype._getTitleLevel=function(){var t=this.getTitleLevel();return t===s.Auto?this._getInternalTitleLevel():t};l.prototype._setInternalTitleLevel=function(t,e){if(t!==this._sInternalTitleLevel){this._sInternalTitleLevel=t;if(e){this.invalidate()}}};l.prototype._getInternalTitleLevel=function(){return this._sInternalTitleLevel};l.prototype._getObjectPageLayout=function(){return r.Utilities.getClosestOPL(this)};l.prototype._notifyObjectPageLayout=function(){if(this._getObjectPageLayout()&&this._getObjectPageLayout().$().length){this._getObjectPageLayout()._requestAdjustLayoutAndUxRules()}};["addAggregation","insertAggregation","removeAllAggregation","removeAggregation","destroyAggregation"].forEach(function(t){l.prototype[t]=function(e,n,r,o){if(["addAggregation","removeAggregation"].indexOf(t)>-1){o=r}if(["removeAllAggregation","destroyAggregation"].indexOf(t)>-1){o=n}var a=i.prototype[t].apply(this,arguments);if(o!==true){this._notifyObjectPageLayout()}return a}});l.prototype.setVisible=function(t,e){if(this.getVisible()===t){return this}if(!this._getObjectPageLayout()){return this.setProperty("visible",t,e)}this.setProperty("visible",t,true);this._notifyObjectPageLayout();this.invalidate();return this};l.prototype.setTitle=function(t,e){this.setProperty("title",t,e);this._notifyObjectPageLayout();this.setInvisibleTextLabelValue(t);return this};l.prototype._shouldBeHidden=function(){return l._importanceMap[this.getImportance()]>l._importanceMap[this._sCurrentLowestImportanceLevelToShow]};l._importanceMap={Low:3,Medium:2,High:1};l.prototype._updateShowHideState=function(t){var e=this._getObjectPageLayout();this._isHidden=t;this.$().children(this._sContainerSelector).toggle(!t);if(e){e._requestAdjustLayout()}return this};l.prototype._getIsHidden=function(){return this._isHidden};l.prototype._expandSection=function(){return this._updateShowHideState(false)};l.prototype._showHideContent=function(){return this._updateShowHideState(!this._getIsHidden())};l.prototype._applyImportanceRules=function(t){this._sCurrentLowestImportanceLevelToShow=t;if(this.getDomRef()){this._updateShowHideState(this._shouldBeHidden())}else{this._isHidden=this._shouldBeHidden()}};l.PAGEUP_AND_PAGEDOWN_JUMP_SIZE=5;l.prototype.onkeydown=function(t){if(t.keyCode===a.SPACE&&t.srcControl.isA("sap.uxap.ObjectPageSection")){t.preventDefault()}if(t.keyCode===a.F7){var e=this.getSubSections(),i=e[0],n;if(e.length===1){n=i._oLastFocusedControlF7;if(n){n.$().trigger("focus")}else{i.$().firstFocusableDomRef().focus()}}else{if(i.getActions().length){i.getActions()[0].$().trigger("focus")}}}};l.prototype.onsapdown=function(t){this._handleFocusing(t,t.currentTarget.nextSibling)};l.prototype._handleFocusing=function(t,i){var n;if(this._targetIsCorrect(t)&&i){n=e(t.currentTarget).parent().children();t.preventDefault();i.focus();if(n.length>1){this._scrollParent(e(i).attr("id"))}}};l.prototype._targetIsCorrect=function(t){return t.srcControl===this};l.prototype.onsapright=function(t){var e=this._bRtl?"onsapup":"onsapdown";this[e](t)};l.prototype.onsapup=function(t){this._handleFocusing(t,t.currentTarget.previousSibling)};l.prototype.onsapleft=function(t){var e=this._bRtl?"onsapdown":"onsapup";this[e](t)};l.prototype.onsaphome=function(t){this._handleFocusing(t,t.currentTarget.parentElement.firstChild)};l.prototype.onsapend=function(t){this._handleFocusing(t,t.currentTarget.parentElement.lastChild)};l.prototype.onsappageup=function(t){if(!this._targetIsCorrect(t)){return}t.preventDefault();var i;var n=e(t.currentTarget).parent().children();var r;n.each(function(n,r){if(e(r).attr("id")===t.currentTarget.id){i=n-(l.PAGEUP_AND_PAGEDOWN_JUMP_SIZE+1);return}});if(i&&n[i]){n[i].focus();r=e(n[i]).attr("id")}else if(n[0]){n[0].focus();r=e(n[0]).attr("id")}if(n.length>1){this._scrollParent(r)}};l.prototype.onsappagedown=function(t){if(!this._targetIsCorrect(t)){return}t.preventDefault();var i;var n=e(t.currentTarget).parent().children();var r;n.each(function(n,r){if(e(r).attr("id")===t.currentTarget.id){i=n+l.PAGEUP_AND_PAGEDOWN_JUMP_SIZE+1;return}});if(i&&n[i]){n[i].focus();r=e(n[i]).attr("id")}else if(n[n.length-1]){n[n.length-1].focus();r=e(n[n.length-1]).attr("id")}if(n.length>1){this._scrollParent(r)}};l.prototype._scrollParent=function(t){if(this._getObjectPageLayout()){this._getObjectPageLayout().scrollToSection(t,0,10)}};return l});