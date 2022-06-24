/*!
 * SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/m/MultiInput","sap/m/MultiInputRenderer","sap/base/strings/whitespaceReplacer"],function(t,e,i){"use strict";var n=t.extend("sap.ui.comp.smartfilterbar.SFBMultiInput",{metadata:{library:"sap.ui.comp"},renderer:e});n.prototype.setTokens=function(e){e.map(function(t){return t.setText(i(t.getText()))});t.prototype.setTokens.apply(this,arguments);this._pendingAutoTokenGeneration=true;this._getFilterProvider()._tokenUpdate({control:this,fieldViewMetadata:this._getFieldViewMetadata()});this._pendingAutoTokenGeneration=false;this._isOninputTriggered=false};n.prototype._setFilterProvider=function(t){this.oFilterProvider=t};n.prototype._getFilterProvider=function(){return this.oFilterProvider};n.prototype._setFieldViewMetadata=function(t){this.oFieldViewMetadata=t};n.prototype._getFieldViewMetadata=function(){return this.oFieldViewMetadata};n.prototype.oninput=function(){t.prototype.oninput.apply(this,arguments);this._isOninputTriggered=true};n.prototype.addToken=function(){t.prototype.addToken.apply(this,arguments);this._isOninputTriggered=false;return this};n.prototype.insertToken=function(){t.prototype.insertToken.apply(this,arguments);this._isOninputTriggered=false;return this};n.prototype.onBeforeRendering=function(){t.prototype.onBeforeRendering.apply(this,arguments);if(!this._isOninputTriggered&&this.getValue()){this._pendingAutoTokenGeneration=true;this._validateCurrentText(true);this._pendingAutoTokenGeneration=false}};return n});