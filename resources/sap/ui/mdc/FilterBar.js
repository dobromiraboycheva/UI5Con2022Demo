/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/p13n/subcontroller/FilterController","sap/ui/mdc/p13n/subcontroller/AdaptFiltersController","sap/ui/mdc/filterbar/aligned/FilterContainer","sap/ui/mdc/filterbar/aligned/FilterItemLayout","sap/ui/mdc/filterbar/FilterBarBase","sap/ui/mdc/filterbar/FilterBarBaseRenderer","sap/m/library","sap/m/Button","sap/ui/mdc/p13n/StateUtil","sap/base/util/merge","sap/ui/mdc/filterbar/p13n/AdaptationFilterBar","sap/ui/core/library"],function(t,e,i,r,o,n,s,a,l,d,p,u){"use strict";var h=u.aria.HasPopup;var _=o.extend("sap.ui.mdc.FilterBar",{metadata:{designtime:"sap/ui/mdc/designtime/filterbar/FilterBar.designtime",properties:{showAdaptFiltersButton:{type:"boolean",defaultValue:true},p13nMode:{type:"sap.ui.mdc.FilterBarP13nMode[]"},_p13nModeItem:{type:"boolean",visibility:"hidden",defaultValue:false},_p13nModeValue:{type:"boolean",visibility:"hidden",defaultValue:false}}},renderer:n});var c=s.ButtonType;_.prototype._createInnerLayout=function(){this._cLayoutItem=r;this._oFilterBarLayout=new i;this._oFilterBarLayout.getInner().setParent(this);this._oFilterBarLayout.getInner().addStyleClass("sapUiMdcFilterBarBaseAFLayout");this.setAggregation("layout",this._oFilterBarLayout,true);this._addButtons()};_.prototype.setP13nMode=function(i){var r=this.getP13nMode();this.setProperty("p13nMode",i||[],false);var o={};o.controller={};i&&i.forEach(function(i){if(!r||r.indexOf(i)<0){this._setP13nMode(i,true)}if(i=="Item"){o.controller["Item"]=e}if(i=="Value"){o.controller["Filter"]=t}}.bind(this));r&&r.forEach(function(t){if(!i||i.indexOf(t)<0){this._setP13nMode(t,false)}}.bind(this));this.getEngine().registerAdaptation(this,o);return this};_.prototype._setP13nMode=function(t,e){switch(t){case"Item":this._setP13nModeItem(e);break;case"Value":this._setP13nModeValue(e);break}};_.prototype.setFilterConditions=function(e,i){t.checkConditionOperatorSanity(e);if(this._oP13nFB){this._oP13nFB.setFilterConditions(d({},e))}this.setProperty("filterConditions",e,i);return this};_.prototype._getP13nModeItem=function(){return this._oModel.getProperty("/_p13nModeItem")};_.prototype._setP13nModeItem=function(t){this._oModel.setProperty("/_p13nModeItem",t,true)};_.prototype._getP13nModeValue=function(){return this._oModel.getProperty("/_p13nModeValue")};_.prototype._setP13nModeValue=function(t){this._oModel.setProperty("/_p13nModeValue",t,false);this._bPersistValues=t};_.prototype._addButtons=function(){if(this._oFilterBarLayout){this.setProperty("_filterCount",this._oRb.getText("filterbar.ADAPT"),false);this._btnAdapt=new a(this.getId()+"-btnAdapt",{type:c.Transparent,text:"{"+o.INNER_MODEL_NAME+">/_filterCount}",press:this.onAdaptFilters.bind(this)});this._btnAdapt.setAriaHasPopup(h.ListBox);this._btnAdapt.setModel(this._oModel,o.INNER_MODEL_NAME);this._btnAdapt.bindProperty("visible",{parts:[{path:"/showAdaptFiltersButton",model:o.INNER_MODEL_NAME},{path:"/_p13nModeItem",model:o.INNER_MODEL_NAME}],formatter:function(t,e){return t&&e}});this._btnSearch=this._getSearchButton();this._btnSearch.setModel(this._oModel,o.INNER_MODEL_NAME);this._btnSearch.bindProperty("visible",{parts:[{path:"/showGoButton",model:o.INNER_MODEL_NAME},{path:"/liveMode",model:o.INNER_MODEL_NAME}],formatter:function(t,e){return t&&(this._isPhone()?true:!e)}.bind(this)});this._btnSearch.addStyleClass("sapUiMdcFilterBarBaseButtonPaddingRight");this._oFilterBarLayout.addButton(this._btnSearch);this._oFilterBarLayout.addButton(this._btnAdapt)}};_.prototype.retrieveInbuiltFilter=function(){var t=o.prototype.retrieveInbuiltFilter.apply(this,arguments);return t.then(function(t){t._bPersistValues=this._bPersistValues;return t}.bind(this))};_.prototype.onAdaptFilters=function(t){return this._retrieveMetadata().then(function(){return this.getEngine().uimanager.show(this,"Item",this._btnAdapt)}.bind(this))};_.prototype.getCurrentState=function(){var t=o.prototype.getCurrentState.apply(this,arguments);if(!this.getProperty("_p13nModeItem")){delete t.items}return t};o.prototype.setFocusOnFirstErroneousField=function(){return this._setFocusOnFirstErroneousField()};return _});