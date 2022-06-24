/*!
 * SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/chart/data/Dimension","sap/chart/utils/ChartUtils"],function(t,e){"use strict";var a=t.extend("sap.chart.data.TimeDimension",{metadata:{library:"sap.chart",properties:{timeUnit:{type:"sap.chart.TimeUnitType"},fiscalYearPeriodCount:{type:"object"},projectedValueStartTime:{type:"any"}}}});a.prototype.setTimeUnit=e.makeNotifyParentProperty("timeUnit");a.prototype.setFiscalYearPeriodCount=e.makeNotifyParentProperty("fiscalYearPeriodCount");a.prototype.setProjectedValueStartTime=e.makeNotifyParentProperty("projectedValueStartTime");return a});