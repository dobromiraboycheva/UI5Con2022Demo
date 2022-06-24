/*
 * ! SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/comp/library","sap/ui/core/Control","sap/suite/ui/microchart/library","sap/suite/ui/microchart/RadialMicroChart","sap/m/library","sap/ui/comp/smartmicrochart/SmartMicroChartBase","./SmartMicroChartRenderer"],function(t,a,i,e,o,r,n){"use strict";var s=r.extend("sap.ui.comp.smartmicrochart.SmartRadialMicroChart",{metadata:{library:"sap.ui.comp",designtime:"sap/ui/comp/designtime/smartmicrochart/SmartRadialMicroChart.designtime",properties:{enableAutoBinding:{type:"boolean",group:"Misc",defaultValue:false}},associations:{freeText:{type:"sap.m.Label",group:"Misc",multiple:false}}},renderer:n});s.prototype._CHART_TYPE=["Donut"];s.prototype.init=function(){this._bIsInitialized=false;this._bMetaModelLoadAttached=false;this.setProperty("chartType","Donut",true);this.setAggregation("_chart",new e,true)};s.prototype.onBeforeRendering=function(){var t=this.getAggregation("_chart");t.setSize(this.getSize(),true);i._passParentContextToChild(this,t)};s.prototype._createAndBindInnerChart=function(){this._bindProperties();this._updateAssociations.call(this)};s.prototype._bindProperties=function(){var t=this.getAggregation("_chart");if(this._oDataPointAnnotations.Value&&!this._oDataPointAnnotations.TargetValue){if(this._hasMember(this._oDataPointAnnotations.Value,"Path")){t.bindProperty("percentage",{path:this._oDataPointAnnotations.Value.Path,type:"sap.ui.model.odata.type.Decimal"})}}else if(this._hasMember(this,"_oDataPointAnnotations.TargetValue.Path")&&this._hasMember(this,"_oDataPointAnnotations.Value.Path")){t.bindProperty("total",{path:this._oDataPointAnnotations.TargetValue.Path,type:"sap.ui.model.odata.type.Decimal"});t.bindProperty("fraction",{path:this._oDataPointAnnotations.Value.Path,type:"sap.ui.model.odata.type.Decimal"})}t.bindProperty("valueColor",{parts:[this._oDataPointAnnotations.Value&&this._oDataPointAnnotations.Value.Path||"",this._oDataPointAnnotations.Criticality&&this._oDataPointAnnotations.Criticality.Path||""],formatter:this._getValueColor.bind(this)})};return s});