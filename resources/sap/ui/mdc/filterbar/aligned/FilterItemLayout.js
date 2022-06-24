/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/layout/VerticalLayout","sap/ui/layout/VerticalLayoutRenderer","sap/m/Label"],function(e,t,i){"use strict";var a=e.extend("sap.ui.mdc.filterbar.aligned.FilterItemLayout",{metadata:{library:"sap.ui.mdc"},renderer:{apiVersion:2,render:t.render}});a.prototype._setLabel=function(e){this._oLabel=new i(e.getId()+"-label");this._oLabel.setParent(this);e.connectLabel(this._oLabel);if(e.getFieldPath()==="$search"){this._oLabel.setText(" ")}else{this._oLabel.addStyleClass("sapUiMdcFilterBarBaseLabel")}};a.prototype._getFilterField=function(){return this._oFilterField};a.prototype._getFieldPath=function(){return this._sFieldPath};a.prototype.setFilterField=function(e){this._setLabel(e);this._oFilterField=e;this._sFieldPath=e.getFieldPath()};a.prototype.getContent=function(){var e=[];e.push(this._oLabel);e.push(this._oFilterField);return e};a.prototype.exit=function(){this._oFilterField=null;this._sFieldPath=null;if(this._oLabel&&!this._oLabel.bIsDestroyed){this._oLabel.destroy();this._oLabel=undefined}e.prototype.exit.apply(this,arguments)};return a});