/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/p13n/subcontroller/FilterController","sap/ui/core/library","sap/ui/core/ShortcutHintsMixin","sap/ui/Device","sap/ui/mdc/Control","sap/base/Log","sap/base/util/merge","sap/ui/model/base/ManagedObjectModel","sap/ui/base/ManagedObjectObserver","sap/ui/mdc/condition/ConditionModel","sap/ui/mdc/condition/Condition","sap/ui/mdc/condition/ConditionConverter","sap/ui/mdc/util/IdentifierUtil","sap/ui/mdc/filterbar/PropertyHelper","sap/ui/fl/apply/api/ControlVariantApplyAPI","sap/m/library","sap/m/Button","sap/m/MessageBox"],function(t,e,i,n,r,o,s,a,l,h,d,p,u,c,f,g,_,y){"use strict";var m=e.ValueState;var v=r.extend("sap.ui.mdc.filterbar.FilterBarBase",{metadata:{library:"sap.ui.mdc",designtime:"sap/ui/mdc/designtime/filterbar/FilterBarBase.designtime",defaultAggregation:"filterItems",interfaces:["sap.ui.mdc.IFilter","sap.ui.mdc.IxState"],properties:{delegate:{type:"object",defaultValue:{name:"sap/ui/mdc/FilterBarDelegate",payload:{modelName:undefined,collectionName:""}}},liveMode:{type:"boolean",defaultValue:false},showMessages:{type:"boolean",group:"Misc",defaultValue:true},showGoButton:{type:"boolean",defaultValue:true},filterConditions:{type:"object",defaultValue:{}},propertyInfo:{type:"object",defaultValue:[]},suspendSelection:{type:"boolean",defaultValue:false},_filterCount:{type:"string",visibility:"hidden"}},aggregations:{filterItems:{type:"sap.ui.mdc.FilterField",multiple:true},basicSearchField:{type:"sap.ui.mdc.FilterField",multiple:false},layout:{type:"sap.ui.mdc.filterbar.IFilterContainer",multiple:false,visibility:"hidden"}},associations:{variantBackreference:{type:"sap.ui.fl.variants.VariantManagement",multiple:false}},events:{search:{conditions:{type:"object"}},filtersChanged:{conditionsBased:{type:"boolean"},filtersText:{type:"string"},filtersTextExpanded:{type:"string"}}}}});var C=g.ButtonType;v.INNER_MODEL_NAME="$sap.ui.filterbar.mdc.FilterBarBase";v.CONDITION_MODEL_NAME="$filters";var b={NoError:-1,RequiredHasNoValue:0,FieldInErrorState:1,AsyncValidation:2,OngoingChangeAppliance:3};v.prototype.init=function(){r.prototype.init.apply(this,arguments);this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");this._createInnerModel();this._oObserver=new l(this._observeChanges.bind(this));this._oObserver.observe(this,{aggregations:["filterItems","basicSearchField"]});this._createInnerLayout();this._bPersistValues=false;this.getEngine().registerAdaptation(this,{controller:{Filter:t}});this._fResolveInitialFiltersApplied=undefined;this._oInitialFiltersAppliedPromise=new Promise(function(t){this._fResolveInitialFiltersApplied=t}.bind(this));this._bIgnoreChanges=false;this._bSearchTriggered=false;this._bIgnoreQueuing=false};v.prototype._createInnerLayout=function(){this._cLayoutItem=null;this._oFilterBarLayout=null;this._bPersistValues=false;this._btnAdapt=null;this.setAggregation("layout",this._oFilterBarLayout,true)};v.prototype._isPhone=function(){return n.system.phone?true:false};v.prototype._isLiveMode=function(){if(this._isPhone()){return false}return this.getLiveMode()};v.prototype._getConditionModel=function(){return this._oConditionModel};v.prototype._getSearchButton=function(){if(!this._btnSearch){this._btnSearch=new _(this.getId()+"-btnSearch",{text:this._oRb.getText("filterbar.GO"),press:this.onSearch.bind(this),type:C.Emphasized});i.addConfig(this._btnSearch,{addAccessibilityLabel:true,message:this._oRb.getText("filterbar.GoBtnShortCutHint")},this)}return this._btnSearch};v.prototype.getConditionModelName=function(){return this._getConditionModelName()};v.prototype._getConditionModelName=function(){return v.CONDITION_MODEL_NAME};v.prototype._createConditionModel=function(){this._oConditionModel=new h;this.setModel(this._oConditionModel,this._getConditionModelName())};v.prototype.applySettings=function(t,e){this._setPropertyHelperClass(c);this._setupPropertyInfoStore("propertyInfo");this._applySettings(t,e);Promise.all([this.awaitPropertyHelper()]).then(function(){if(!this._bIsBeingDestroyed){this._applyInitialFilterConditions()}}.bind(this))};v.prototype._applySettings=function(t,e){r.prototype.applySettings.apply(this,arguments);this._createConditionModel();this._oConditionModel.attachPropertyChange(this._handleConditionModelPropertyChange,this)};v.prototype._waitForMetadata=function(){return this._retrieveMetadata().then(function(){this._applyInitialFilterConditions()}.bind(this))};v.prototype.setIgnoreQueuing=function(t){this._bIgnoreQueuing=t};v.prototype.getIgnoreQueuing=function(){return this._bIgnoreQueuing};v.prototype.setSuspendSelection=function(t){this.setProperty("suspendSelection",t);if(!t){if(this._bSearchTriggered&&!this.getIgnoreQueuing()){this.triggerSearch()}this._bSearchTriggered=false;this.setIgnoreQueuing(false)}return this};v.prototype._createInnerModel=function(){this._oModel=new a(this);this.setModel(this._oModel,v.INNER_MODEL_NAME);return this};v.prototype.getCurrentState=function(){var t={};var e={};if(this._bPersistValues){var i=s({},this.getFilterConditions());for(var n in i){if(this._getPropertyByName(n)){t[n]=i[n]}}e.filter=t}var r=this.getFilterItems();var o=[];r.forEach(function(t,e){o.push({name:t.getFieldPath()})});e.items=o;return e};v.prototype.getAssignedFilterNames=function(){var t,e=null,i=this._getConditionModel();if(i){e=[];var n=i.getConditions("$search");if(n&&n.length>0){e.push(this._oRb.getText("filterbar.ADAPT_SEARCHTERM"))}this._getNonHiddenPropertyInfoSet().forEach(function(n){t=u.getPropertyKey(n);var r=i.getConditions(t);if(r&&r.length>0){e.push(n.label||t)}})}return e};v.prototype._getAssignedFiltersText=function(){var t={};t.filtersText=this._getAssignedFiltersCollapsedText(this.getAssignedFilterNames());t.filtersTextExpanded=this._getAssignedFiltersExpandedText();return t};v.prototype._getAssignedFiltersExpandedText=function(){var t=0,e=0,i=this._getConditionModel();if(i){var n=i.getAllConditions();for(var r in n){var o=this._getPropertyByName(r);if(o&&!o.hiddenFilter&&n[r].length>0){++t;if(!(r==="$search"&&this.getAggregation("basicSearchField")||this._getFilterField(r))){++e}}}}if(!t&&!e){return this._oRb.getText("filterbar.ADAPT_NOTFILTERED")}if(!e){if(t===1){return this._oRb.getText("filterbar.ADAPT_FILTER_WITH_NON_HIDDEN",[t])}return this._oRb.getText("filterbar.ADAPT_FILTERS_WITH_NON_HIDDEN",[t])}if(t===1){return this._oRb.getText("filterbar.ADAPT_FILTER_WITH_HIDDEN",[t,e])}return this._oRb.getText("filterbar.ADAPT_FILTERS_WITH_HIDDEN",[t,e])};v.prototype._getAssignedFiltersCollapsedText=function(t){var e;t=t||[];if(t.length){e=Object.keys(t).map(function(e){return t[e]}).join(", ");if(t.length===1){return this._oRb.getText("filterbar.ADAPT_FILTER_COLLAPSED",[t.length,e])}return this._oRb.getText("filterbar.ADAPT_FILTERS_COLLAPSED",[t.length,e])}return this._oRb.getText("filterbar.ADAPT_NOTFILTERED")};v.prototype.getAssignedFiltersText=function(){return this._getAssignedFiltersText()};v.prototype._reportModelChange=function(t,e){this._handleAssignedFilterNames(false,e);if(this.getLiveMode()||t){this.triggerSearch()}};v.prototype._isPersistenceSupported=function(t){return this.getEngine().isModificationSupported(this)};v.prototype.getPropertyInfoSet=function(){return this.getPropertyHelper()?this.getPropertyHelper().getProperties():[]};v.prototype._addConditionChange=function(t,e){if(!this._aOngoingChangeAppliance){this._aOngoingChangeAppliance=[]}this._aOngoingChangeAppliance.push(this.getEngine().createChanges({control:this,applySequentially:true,key:"Filter",state:t}))};v.prototype._handleConditionModelPropertyChange=function(t){var e=function(t,e){var i={};i[t]=this._stringifyConditions(t,s([],e));this._cleanupConditions(i[t]);this._addConditionChange(i,t)}.bind(this);if(!this._bIgnoreChanges){var i=t.getParameter("path");if(i.indexOf("/conditions/")===0){var n=i.substring("/conditions/".length);if(this._bPersistValues&&this._isPersistenceSupported()){var r=t.getParameter("value");if(this._getPropertyByName(n)){e(n,r)}else{this._retrieveMetadata().then(function(){e(n,r)})}}else{this._reportModelChange(false)}}}};v.prototype._toExternal=function(t,e){var i=s({},e);i=p.toString(i,t.typeConfig,this.getTypeUtil());this._cleanupCondition(i);this._convertInOutParameters(e,i,"inParameters",p.toString);this._convertInOutParameters(e,i,"outParameters",p.toString);return i};v.prototype._toInternal=function(t,e){var i=s({},e);i=p.toType(i,t.typeConfig,this.getTypeUtil());this._convertInOutParameters(e,i,"inParameters",p.toType);this._convertInOutParameters(e,i,"outParameters",p.toType);return i};v.prototype._convertInOutParameters=function(t,e,i,n){if(t[i]&&Object.keys(t[i]).length>0){Object.keys(t[i]).forEach(function(r){var s=r.startsWith("conditions/")?r.slice(11):r;var a=this._getPropertyByName(s);if(a){var l=d.createCondition("EQ",[t[i][r]]);var h=n(l,a.typeConfig,this.getTypeUtil());if(!e[i]){e[i]={}}if(!r.startsWith("conditions/")){delete e[i][r];r="conditions/"+s}e[i][r]=h.values[0]}else{o.error("mdc.FilterBar._convertInOutParameters: could not find property info for "+s)}}.bind(this))}};v.prototype._cleanupCondition=function(t){if(t){if(t.hasOwnProperty("isEmpty")){delete t.isEmpty}}};v.prototype._cleanupConditions=function(t){if(t){t.forEach(function(t){this._cleanupCondition(t)},this)}};v.prototype._stringifyCondition=function(t,e){var i=e;if(e&&e.values){if(e.values.length>0){i=this._toExternal(t,e)}else{i=s({},e);this._cleanupCondition(i)}}return i};v.prototype._stringifyConditions=function(t,e){var i=this._getPropertyByName(t);var n=e;if(i&&e){n=[];e.forEach(function(t){n.push(this._stringifyCondition(i,t))},this)}return n};v.prototype._handleAssignedFilterNames=function(t,e){if(this._bIsBeingDestroyed){return}if(!t){if(this._btnAdapt){var i=this.getAssignedFilterNames();this.setProperty("_filterCount",this._oRb.getText(i.length?"filterbar.ADAPT_NONZERO":"filterbar.ADAPT",i.length),false)}}var n=this._getAssignedFiltersText();var r={conditionsBased:!t&&!e,filtersText:n.filtersText,filtersTextExpanded:n.filtersTextExpanded};this.fireFiltersChanged(r)};v.prototype.onReset=function(t){this._getConditionModel().oConditionModel.removeAllConditions()};v.prototype.onSearch=function(t){if(!this._bSearchPressed){this._bSearchPressed=true;this.triggerSearch().then(function(){this._bSearchPressed=false}.bind(this),function(){this._bSearchPressed=false}.bind(this))}};v.prototype.triggerSearch=function(){if(this.getSuspendSelection()){this._bSearchTriggered=true;return Promise.resolve()}return this.validate()};v.prototype._hasRetrieveMetadataToBeCalled=function(){return this.getPropertyHelper()===null||this.getPropertyHelper().getProperties().length===0&&!this.isPropertyHelperFinal()};v.prototype.validate=function(t){var e=!t;var i=function(){if(!this._oValidationPromise){this._oValidationPromise=new Promise(function(t,e){this._fResolvedSearchPromise=t;this._fRejectedSearchPromise=e}.bind(this));var t=function(){this._validate(e);this._oValidationPromise=null};setTimeout(t.bind(this),0)}return this._oValidationPromise}.bind(this);return this.waitForInitialization().then(function(){if(this._hasRetrieveMetadataToBeCalled()){return this._retrieveMetadata().then(function(){return i()})}else{return i()}}.bind(this))};v.prototype._clearDelayedSearch=function(){if(this._iDelayedSearchId){clearTimeout(this._iDelayedSearchId);this._iDelayedSearchId=null}};v.prototype._getRequiredFieldsWithoutValues=function(){var t=[];this._getRequiredPropertyNames().forEach(function(e){var i=this._getConditionModel().getConditions(e);if(!i||i.length===0){t.push(e)}}.bind(this));return t};v.prototype._checkAsyncValidation=function(){var t=b.NoError;if(this._aFIChanges&&this._aFIChanges.length>0){t=b.AsyncValidation}return t};v.prototype._checkOngoingChangeAppliance=function(){var t=b.NoError;if(this._aOngoingChangeAppliance&&this._aOngoingChangeAppliance.length>0){t=b.OngoingChangeAppliance}return t};v.prototype._checkRequiredFields=function(){var t=b.NoError;var e=this._getRequiredFieldsWithoutValues();e.forEach(function(e){var i=this._getFilterField(e);if(i){if(i.getValueState()===m.None){i.setValueState(m.Error);i.setValueStateText(this._oRb.getText("filterbar.REQUIRED_FILTER_VALUE_MISSING"))}}else{o.error("Mandatory filter field '"+e+"' not visible on FilterBarBase has no value.")}t=b.RequiredHasNoValue}.bind(this));return t};v.prototype._checkFieldsInErrorState=function(){var t=b.NoError;this._getNonRequiredPropertyNames().some(function(e){var i=this._getFilterField(e);if(i&&i.getValueState()!==m.None){t=b.FieldInErrorState}return t!==b.NoError}.bind(this));return t};v.prototype._handleFilterItemSubmit=function(t){var e=t.getParameter("promise");if(e){e.then(function(){this.triggerSearch()}.bind(this)).catch(function(t){o.error(t)})}};v.prototype._handleFilterItemChanges=function(t){if(this._bIgnoreChanges){return}var e=t.oSource;if(e.getRequired()&&e.getValueState()===m.Error&&t.getParameter("valid")){e.setValueState(m.None);return}if(!this._aFIChanges){this._aFIChanges=[]}this._aFIChanges.push({name:e.getFieldPath(),promise:t.getParameter("promise")})};v.prototype._checkFilters=function(){var t=this._checkAsyncValidation();if(t!==b.NoError){return t}t=this._checkOngoingChangeAppliance();if(t!==b.NoError){return t}t=this._checkRequiredFields();if(t!==b.NoError){return t}t=this._checkFieldsInErrorState();if(t!==b.NoError){return t}return t};v.prototype._setFocusOnFirstErroneousField=function(){var t=null;this.getFilterItems().some(function(e){if(e.getValueState()!==m.None){t=e;setTimeout(e["focus"].bind(e),0)}return t!=null});return t};v.prototype._handleAsyncValidation=function(t){if(this._aFIChanges&&this._aFIChanges.length>0){var e=this._aFIChanges.slice();this._aFIChanges=null;var i=[];e.forEach(function(t){i.push(t.promise)});Promise.all(i).then(function(i){i.forEach(function(t,i){var n=this._getFilterField(e[i].name);if(n&&n.getRequired()&&n.getValueState()===m.Error){n.setValueState(m.None)}},this);this._validate(t)}.bind(this),function(e){this._validate(t)}.bind(this))}};v.prototype._handleOngoingChangeAppliance=function(t){if(this._aOngoingChangeAppliance&&this._aOngoingChangeAppliance.length>0){var e=this._aOngoingChangeAppliance.slice();this._aOngoingChangeAppliance=null;Promise.all(e).then(function(){this._validate(t)}.bind(this),function(){this._validate(t)}.bind(this))}};v.prototype._validate=function(t){var e,i;var n=function(){if(t){this.fireSearch()}}.bind(this);var r=function(){this._fRejectedSearchPromise=null;this._fResolvedSearchPromise=null}.bind(this);if(this.bIsDestroyed){r();return}i=this._checkFilters();if(i===b.AsyncValidation){this._handleAsyncValidation(t);return}if(i===b.OngoingChangeAppliance){this._handleOngoingChangeAppliance(t);return}if(i===b.NoError){n();this._fResolvedSearchPromise();r()}else{if(i===b.RequiredHasNoValue){e=this._oRb.getText("filterbar.REQUIRED_CONDITION_MISSING")}else{e=this._oRb.getText("filterbar.VALIDATION_ERROR")}if(this.getShowMessages()&&!this._isLiveMode()){try{y.error(e,{styleClass:this.$()&&this.$().closest(".sapUiSizeCompact").length?"sapUiSizeCompact":"",onClose:this._setFocusOnFirstErroneousField.bind(this)})}catch(t){o.error(t.message)}}else{o.warning("search was not triggered. "+e)}this._fRejectedSearchPromise();r()}};v.prototype.setInternalConditions=function(t){var e=this._getConditionModel();if(e){e.setConditions(t)}};v.prototype.getInternalConditions=function(){return this._getModelConditions(this._getConditionModel(),true)};v.prototype.waitForInitialization=function(){return Promise.all([this._oInitialFiltersAppliedPromise,this._oMetadataAppliedPromise])};v.prototype.initialized=function(){if(!this._oMetadataAppliedPromise){this._retrieveMetadata()}return this.waitForInitialization()};v.prototype._getModelConditions=function(t,e,i){var n={};if(t){var r=s({},t.getAllConditions());for(var o in r){if(r[o]&&(i||r[o].length>0)){n[o]=r[o];if(!e){this._cleanupConditions(n[o]);var a=this._stringifyConditions(o,n[o]);n[o]=a}}}}return n};var F=function(t){var e=t.typeConfig.typeInstance;var i=e.getConstraints();return e.getMetadata().getName()==="sap.ui.model.odata.type.String"&&i&&i.isDigitSequence&&i.maxLength?function(e){return this._toExternal(t,e,this.getTypeUtil())}.bind(this):undefined};v.prototype._isPathKnownAsync=function(t,e){var i,n,r=[];r.push(this._getPropertyByNameAsync(t));for(n in e["inParameters"]){i=n.startsWith("conditions/")?n.slice(11):n;r.push(this._getPropertyByNameAsync(i))}for(n in e["outParameters"]){i=n.startsWith("conditions/")?n.slice(11):n;r.push(this._getPropertyByNameAsync(i))}return Promise.all(r)};v.prototype._isPathKnown=function(t,e){var i,n;if(!this._getPropertyByName(t)){return false}for(i in e["inParameters"]){n=i.startsWith("conditions/")?i.slice(11):i;if(!this._getPropertyByName(n)){return false}}for(i in e["outParameters"]){n=i.startsWith("conditions/")?i.slice(11):i;if(!this._getPropertyByName(n)){return false}}return true};v.prototype._removeCondition=function(t,e,i){var n=this._getPropertyByName(t);if(n){var r=this._toInternal(n,e);if(i.indexOf(t,r,F.call(this,n))>=0){i.removeCondition(t,r)}}};v.prototype.removeCondition=function(t,e){return this.waitForInitialization().then(function(){var i=this._getConditionModel();if(i){this._isPathKnownAsync(t,e).then(function(){this._removeCondition(t,e,i)}.bind(this))}}.bind(this))};v.prototype._addCondition=function(e,i,n){var r=this._getPropertyByName(e);if(r){var o=this._toInternal(r,i);if(n.indexOf(e,o,F.call(this,r))<0){var s={};s[e]=[o];t.checkConditionOperatorSanity(s);var a=s[e];if(a&&a.length>0){this._cleanUpFilterFieldInErrorStateByName(e);n.addCondition(e,o)}}}};v.prototype.addCondition=function(t,e){return this.waitForInitialization().then(function(){var i=this._getConditionModel();if(i){this._isPathKnownAsync(t,e).then(function(){this._addCondition(t,e,i)}.bind(this))}}.bind(this))};v.prototype._setXConditions=function(t,e){var i,n,r,o=this._getConditionModel();var s=null;var a=new Promise(function(t,e){s=t});this._oConditionModel.detachPropertyChange(this._handleConditionModelPropertyChange,this);var l=function(t){for(i in t){r=t[i];n=this._getPropertyByName(i);if(n){if(r.length===0){o.removeAllConditions(i)}else{if(n.maxConditions!==-1){o.removeAllConditions(i)}r.forEach(function(t){this._addCondition(i,t,o)}.bind(this))}}}this._oConditionModel.attachPropertyChange(this._handleConditionModelPropertyChange,this);s()}.bind(this);if(e){o.removeAllConditions()}if(t){var h=true;for(i in t){r=t[i];if(!this._isPathKnown(i,r)){h=false;break}}if(!h){this._retrieveMetadata().then(function(){l(t)})}else{l(t)}}return a};v.prototype._getXConditions=function(){return this._getModelConditions(this._getConditionModel(),false)};v.prototype._getRequiredPropertyNames=function(){var t=[];this._getNonHiddenPropertyInfoSet().forEach(function(e){if(e.required){t.push(u.getPropertyKey(e))}});return t};v.prototype._getNonRequiredPropertyNames=function(){var t=[];this._getNonHiddenPropertyInfoSet().forEach(function(e){if(!e.required){t.push(u.getPropertyKey(e))}});return t};v.prototype._insertFilterFieldtoContent=function(t,e){if(!this._cLayoutItem){return}var i=this._cLayoutItem;var n=new i;n.setFilterField(t);this._oFilterBarLayout.insertFilterField(n,e)};v.prototype._filterItemInserted=function(t){if(!t.getVisible()){return}if(t.setWidth){t.setWidth("")}this._applyFilterItemInserted(t);this._handleAssignedFilterNames(true)};v.prototype._applyFilterItemInserted=function(t){var e,i;i=this.indexOfAggregation("filterItems",t);if(this.getAggregation("basicSearchField")){i++}e=i;var n=this.getFilterItems();for(var r=0;r<e;r++){if(!n[r].getVisible()){i--}}this._insertFilterFieldtoContent(t,i);if(!this._oObserver.isObserved(t,{properties:["visible"]})){this._oObserver.observe(t,{properties:["visible"]})}};v.prototype._filterItemRemoved=function(t){this._applyFilterItemRemoved(t.getFieldPath());this._handleAssignedFilterNames(true)};v.prototype._applyFilterItemRemoved=function(t){this._removeFilterFieldFromContentByName(t)};v.prototype._removeFilterFieldFromContent=function(t){this._removeFilterFieldFromContentByName(t.getFieldPath())};v.prototype._removeFilterFieldFromContentByName=function(t){var e=this._getFilterItemLayoutByName(t);if(e){this._oFilterBarLayout.removeFilterField(e);e.destroy()}};v.prototype._observeChanges=function(t){if(t.type==="aggregation"){if(t.name==="filterItems"){switch(t.mutation){case"insert":t.child.attachChange(this._handleFilterItemChanges,this);t.child.attachSubmit(this._handleFilterItemSubmit,this);this._filterItemInserted(t.child);break;case"remove":t.child.detachChange(this._handleFilterItemChanges,this);t.child.detachSubmit(this._handleFilterItemSubmit,this);this._filterItemRemoved(t.child);break;default:o.error("operation "+t.mutation+" not yet implemented")}}else if(t.name==="basicSearchField"){switch(t.mutation){case"insert":t.child.attachSubmit(this._handleFilterItemSubmit,this);this._insertFilterFieldtoContent(t.child,0);break;case"remove":t.child.detachSubmit(this._handleFilterItemSubmit,this);this._removeFilterFieldFromContent(t.child);break;default:o.error("operation "+t.mutation+" not yet implemented")}}}else if(t.type==="property"){var e;if(t.object.isA&&t.object.isA("sap.ui.mdc.FilterField")){e=t.object;if(e){if(t.current){this._filterItemInserted(e)}else{this._filterItemRemoved(e)}this._oFilterBarLayout.rerender()}}}};v.prototype._getFilterItemLayout=function(t){return this._getFilterItemLayoutByName(t.getFieldPath())};v.prototype._getFilterItemLayoutByName=function(t){var e=null;if(this._oFilterBarLayout){this._oFilterBarLayout.getFilterFields().some(function(i){if(i._getFieldPath()===t){e=i}return e!==null})}return e};v.prototype._getFilterField=function(t){var e=null;this.getFilterItems().some(function(i){if(i&&i.getFieldPath&&i.getFieldPath()===t){e=i}return e!==null});return e};v.prototype._retrieveMetadata=function(){if(this._oMetadataAppliedPromise){return this._oMetadataAppliedPromise}this._fResolveMetadataApplied=undefined;this._oMetadataAppliedPromise=new Promise(function(t,e){this._fResolveMetadataApplied=t;this._fRejectMetadataApplied=e}.bind(this));this.initControlDelegate().then(function(){if(!this._bIsBeingDestroyed){var t=function(t){t?this._fResolveMetadataApplied():this._fRejectMetadataApplied();this._fResolveMetadataApplied=null;this._fRejectMetadataApplied=null}.bind(this);if(this.bDelegateInitialized){this.finalizePropertyHelper().then(function(){t(true)})}else{o.error("Delegate not initialized.");t(false)}}}.bind(this));return this._oMetadataAppliedPromise};v.prototype.setBasicSearchField=function(t){var e=this.getAggregation("basicSearchField");if(e){this.removeAggregation("basicSearchField",e)}this.setAggregation("basicSearchField",t);if(t){if(!this._oObserver.isObserved(t,{properties:["visible"]})){this._oObserver.observe(t,{properties:["visible"]})}}return this};v.prototype._getNonHiddenPropertyInfoSet=function(){var t=[];this.getPropertyInfoSet().every(function(e){if(!e.hiddenFilter){if(u.getPropertyKey(e)!=="$search"){t.push(e)}}return true});return t};v.prototype._getNonHiddenPropertyByName=function(t){var e=null;this._getNonHiddenPropertyInfoSet().some(function(i){if(u.getPropertyKey(i)===t){e=i}return e!=null});return e};v.prototype._cleanUpFilterFieldInErrorStateByName=function(t){var e=null;var i=this.getFilterItems();i.some(function(i){if(i.getFieldPath()===t){e=i}return e!=null});if(e){this._cleanUpFilterFieldInErrorState(e)}};v.prototype._cleanUpAllFilterFieldsInErrorState=function(){var t=this.getFilterItems();t.forEach(function(t){this._cleanUpFilterFieldInErrorState(t)}.bind(this))};v.prototype._cleanUpFilterFieldInErrorState=function(t){if(t&&t.getValueState()!==m.None){t.setValueState(m.None)}};v.prototype.applyConditionsAfterChangesApplied=function(){if(this._isChangeApplying()){return}this._bIgnoreChanges=true;this._oFlexPromise=this._getWaitForChangesPromise();Promise.all([this._oFlexPromise,this._oInitialFiltersAppliedPromise,this._oMetadataAppliedPromise]).then(function(t){this._oFlexPromise=null;this._changesApplied()}.bind(this))};v.prototype._isChangeApplying=function(){return!!this._oFlexPromise};v.prototype._applyInitialFilterConditions=function(){this._bIgnoreChanges=true;this._applyFilterConditionsChanges().then(function(){this._changesApplied();this._bInitialFiltersApplied=true;this._fResolveInitialFiltersApplied();this._fResolveInitialFiltersApplied=null}.bind(this))};v.prototype._applyFilterConditionsChanges=function(){var t,e;t=this.getProperty("filterConditions");if(Object.keys(t).length>0){e=s({},t);return this._setXConditions(e,true)}return Promise.resolve()};v.prototype.setVariantBackreference=function(t){if(!this._hasAssignedVariantManagement()){this.setAssociation("variantBackreference",t);f.attachVariantApplied({selector:this,vmControlId:this.getVariantBackreference(),callback:this._handleVariantSwitch.bind(this),callAfterInitialVariant:true})}else{o.error("the association 'variant' may only be assigned once and may not change afterwards.")}};v.prototype._handleVariantSwitch=function(t){this._cleanUpAllFilterFieldsInErrorState();this._bExecuteOnSelect=this._getExecuteOnSelectionOnVariant(t);this._bDoNotTriggerFiltersChangeEventBasedOnVariantSwitch=undefined;if(t.hasOwnProperty("createScenario")&&t.createScenario==="saveAs"){this._bDoNotTriggerFiltersChangeEventBasedOnVariantSwitch=true}if(!this._isChangeApplying()&&this._bInitialFiltersApplied){this._changesApplied()}};v.prototype._getExecuteOnSelectionOnVariant=function(t){var e=false,i=this._getAssignedVariantManagement();if(i){e=i.getApplyAutomaticallyOnVariant(t)}return e};v.prototype._hasAssignedVariantManagement=function(){return this._getAssignedVariantManagement()?true:false};v.prototype._getAssignedVariantManagement=function(){var t=this.getVariantBackreference();if(t){var e=sap.ui.getCore().byId(t);if(e&&e.isA("sap.ui.fl.variants.VariantManagement")){return e}}return null};v.prototype._changesApplied=function(){if(!this._isChangeApplying()){this._bIgnoreChanges=false}this._reportModelChange(this._bExecuteOnSelect,this._bDoNotTriggerFiltersChangeEventBasedOnVariantSwitch);this._bExecuteOnSelect=undefined;this._bDoNotTriggerFiltersChangeEventBasedOnVariantSwitch=undefined};v.prototype._getView=function(){return u.getView(this)};v.prototype.getConditions=function(){var t=this._bPersistValues?this.getCurrentState().filter:this._getXConditions();if(t&&t["$search"]){delete t["$search"]}return t};v.prototype.getSearch=function(){var t=this._getConditionModel()?this._getConditionModel().getConditions("$search"):[];return t[0]?t[0].values[0]:""};v.prototype.exit=function(){if(this._hasAssignedVariantManagement()){f.detachVariantApplied({selector:this,vmControlId:this.getVariantBackreference()})}if(this.bDelegateInitialized&&this.getControlDelegate().cleanup){this.getControlDelegate().cleanup(this)}r.prototype.exit.apply(this,arguments);this._clearDelayedSearch();this._oFilterBarLayout=null;this._cLayoutItem=null;this._btnAdapt=undefined;this._btnSearch=undefined;this._oRb=null;if(this._oModel){this._oModel.destroy();this._oModel=null}if(this._oConditionModel){this._oConditionModel.detachPropertyChange(this._handleConditionModelPropertyChange,this);this._oConditionModel.destroy();this._oConditionModel=null}this._oObserver.disconnect();this._oObserver=undefined;this._bPersistValues=null;this._oDelegate=null;this._oFlexPromise=null;this._fResolveMetadataApplied=undefined;this._oMetadataAppliedPromise=null;this._oInitialFiltersAppliedPromise=null;this._oValidationPromise=null;this._aBindings=null;this._aFIChanges=null;this._aOngoingChangeAppliance=null};return v});