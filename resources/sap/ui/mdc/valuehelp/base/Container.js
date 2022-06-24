/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/mdc/mixin/PromiseMixin","sap/ui/model/BindingMode","sap/ui/base/ManagedObjectObserver"],function(e,t,n,i){"use strict";var o=e.extend("sap.ui.mdc.valuehelp.base.Container",{metadata:{library:"sap.ui.mdc",properties:{title:{type:"string",group:"Appearance",defaultValue:""}},aggregations:{_container:{type:"sap.ui.core.Element",multiple:false,visibility:"hidden"},content:{type:"sap.ui.mdc.valuehelp.base.Content",multiple:true}},events:{select:{parameters:{type:{type:"sap.ui.mdc.enum.SelectType"},conditions:{type:"object[]"}}},confirm:{parameters:{close:{type:"boolean"}}},opened:{},closed:{},cancel:{},requestDelegateContent:{parameters:{contentId:{type:"string"}}},requestSwitchToDialog:{},navigated:{parameters:{leaveFocus:{type:"boolean"},condition:{type:"object"},itemId:{type:"string"}}}}}});o.prototype.init=function(){this._oObserver=new i(this._observeChanges.bind(this));this._oObserver.observe(this,{aggregations:["content"]})};o.prototype._observeChanges=function(e){if(e.name==="content"){var t=e.child;if(e.mutation==="remove"){this._unbindContent(t)}else{this._bindContent(t)}}};o.prototype._bindContent=function(e){e.bindProperty("filterValue",{path:"/filterValue",model:"$valueHelp",mode:n.OneWay});var t={path:"/conditions",model:"$valueHelp",mode:n.OneWay};if(e._formatConditions){t.formatter=e._formatConditions.bind(e)}e.bindProperty("conditions",t);e.bindProperty("config",{path:"/_config",model:"$valueHelp",mode:n.OneWay});e.attachConfirm(this._handleConfirmed,this);e.attachCancel(this._handleCanceled,this);e.attachSelect(this._handleSelect,this);if(e.attachNavigated){e.attachNavigated(this._handleNavigated,this)}if(e.attachRequestSwitchToDialog){e.attachRequestSwitchToDialog(this._handleRequestSwitchToDialog,this)}};o.prototype._unbindContent=function(e){e.unbindProperty("filterValue");e.unbindProperty("conditions");e.unbindProperty("config");e.detachConfirm(this._handleConfirmed,this);e.detachCancel(this._handleCanceled,this);e.detachSelect(this._handleSelect,this);if(e.detachNavigated){e.detachNavigated(this._handleNavigated,this)}if(e.detachRequestSwitchToDialog){e.detachRequestSwitchToDialog(this._handleRequestSwitchToDialog,this)}};o.prototype._handleNavigated=function(e){this.fireNavigated(e.mParameters)};o.prototype._handleRequestSwitchToDialog=function(e){this.fireRequestSwitchToDialog({container:this})};o.prototype._getContainer=function(){};o.prototype._getControl=function(){var e=this.getParent();return e&&e.getControl()};o.prototype.getMaxConditions=function(){var e=this.getModel("$valueHelp");return e&&e.getObject("/_config/maxConditions")};o.prototype._isSingleSelect=function(){return this.getMaxConditions()===1};o.prototype.getDomRef=function(){var e=this.getAggregation("_container");return e&&e.getDomRef()};o.prototype.getUIArea=function(){return null};o.prototype._getUIAreaForContent=function(){return this.getUIArea()};o.prototype.open=function(e){if(!this.isOpening()){var t=this._addPromise("open");return Promise.all([this._getContainer(),e]).then(function(e){return this._placeContent(e[0])}.bind(this)).then(function(e){if(!t.isCanceled()){this._open(e)}return t}.bind(this))}return this._retrievePromise("open")};o.prototype.close=function(){var e=this._retrievePromise("open");if(e){if(e.isSettled()){this._close()}else{this._cancelPromise(e)}}};o.prototype._placeContent=function(e){return e};o.prototype._open=function(e){};o.prototype._close=function(){};o.prototype._handleOpened=function(){this._resolvePromise("open");this.fireOpened()};o.prototype._handleClosed=function(e){this._removePromise("open");this.fireClosed()};o.prototype._handleConfirmed=function(e){this.fireConfirm()};o.prototype._handleCanceled=function(e){this.fireCancel()};o.prototype._handleSelect=function(e){this.fireSelect({type:e.getParameter("type"),conditions:e.getParameter("conditions")})};o.prototype.isOpen=function(){var e=this._retrievePromise("open");return e&&e.isSettled()};o.prototype.isOpening=function(){var e=this._retrievePromise("open");return e&&!e.isCanceled()&&!e.isSettled()};o.prototype.getItemForValue=function(e){};o.prototype.isValidationSupported=function(){return false};o.prototype.navigate=function(e){return Promise.all([this._getContainer()]).then(function(e){return this._placeContent(e[0])}.bind(this)).then(function(t){this._navigate(e)}.bind(this))};o.prototype._navigate=function(e){};o.prototype.removeFocus=function(){};o.prototype.isTypeahead=function(){var e=this.getParent();return e&&e.getTypeahead()===this};o.prototype.isTypeaheadSupported=function(){return false};o.prototype.providesScrolling=function(){return false};o.prototype.getValueHelpDelegate=function(){var e=this.getParent();return e&&e.getControlDelegate()};o.prototype.getValueHelpDelegatePayload=function(){var e=this.getParent();return e&&e.getPayload()};o.prototype.awaitValueHelpDelegate=function(){var e=this.getParent();return e&&e.awaitControlDelegate()};o.prototype.isValueHelpDelegateInitialized=function(){var e=this.getParent();return e&&e.bDelegateInitialized};o.prototype.getUseAsValueHelp=function(){return false};o.prototype.getValueHelpIcon=function(){};o.prototype.getAriaAttributes=function(e){return{contentId:null,ariaHasPopup:"listbox",role:"combobox",roleDescription:null}};o.prototype.getScrollDelegate=function(e){var t=this.getAggregation("_container");return t&&t.getScrollDelegate&&t.getScrollDelegate()};o.prototype.shouldOpenOnClick=function(){return false};o.prototype.shouldOpenOnNavigate=function(){return false};o.prototype.isFocusInHelp=function(){return!this.isTypeahead()};o.prototype.isMultiSelect=function(){return false};o.prototype._getContainerConfig=function(e){var t=e&&e.getContainerConfig();var n=t&&t[this.getMetadata().getName()];if(!n&&t){var i=Object.keys(t);var o=i.find(function(e){return this.isA(e)}.bind(this));if(o){n=t[o]}}return n};o.prototype._getRetrieveDelegateContentPromise=function(){var e=this.getParent();return e&&e._retrievePromise("delegateContent")};o.prototype.getSelectedContent=function(){var e=this.getContent();return e&&e[0]};o.prototype.exit=function(){this._oObserver.disconnect();this._oObserver=undefined};t.call(o.prototype);return o});