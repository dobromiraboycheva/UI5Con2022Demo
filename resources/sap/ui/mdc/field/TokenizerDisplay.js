/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/Tokenizer","sap/ui/mdc/field/TokenizerDisplayRenderer","sap/ui/events/KeyCodes","sap/m/library"],function(e,t,i,r){"use strict";var a=r.EmptyIndicatorMode;var n=e.extend("sap.ui.mdc.field.TokenizerDisplay",{metadata:{library:"sap.ui.mdc",properties:{emptyIndicatorMode:{type:"sap.m.EmptyIndicatorMode",group:"Appearance",defaultValue:a.Off}}},renderer:t});n.prototype.init=function(){e.prototype.init.apply(this,arguments);this.allowTextSelection(true);this.addStyleClass("sapUiMdcTokenizerDisplay")};n.prototype.onkeydown=function(t){e.prototype.onkeydown.call(this,t);if(!this.getEnabled()){return}if(t.which===i.ENTER){if(this.getHiddenTokensCount()>0){this._handleNMoreIndicatorPress()}}};return n});