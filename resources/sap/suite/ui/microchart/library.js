/*!
 * SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/core/IntervalTrigger","sap/ui/core/Core","sap/ui/core/library","sap/m/library"],function(i,a){"use strict";var r=sap.ui.getCore().initLibrary({name:"sap.suite.ui.microchart",version:"1.102.0",dependencies:["sap.ui.core","sap.m"],types:["sap.suite.ui.microchart.AreaMicroChartViewType","sap.suite.ui.microchart.BulletMicroChartModeType","sap.suite.ui.microchart.CommonBackgroundType","sap.suite.ui.microchart.ComparisonMicroChartViewType","sap.suite.ui.microchart.DeltaMicroChartViewType","sap.suite.ui.microchart.HorizontalAlignmentType","sap.suite.ui.microchart.LoadStateType","sap.suite.ui.microchart.LineType"],interfaces:[],controls:["sap.suite.ui.microchart.AreaMicroChart","sap.suite.ui.microchart.BulletMicroChart","sap.suite.ui.microchart.ColumnMicroChart","sap.suite.ui.microchart.ComparisonMicroChart","sap.suite.ui.microchart.DeltaMicroChart","sap.suite.ui.microchart.HarveyBallMicroChart","sap.suite.ui.microchart.LineMicroChart","sap.suite.ui.microchart.InteractiveBarChart","sap.suite.ui.microchart.InteractiveDonutChart","sap.suite.ui.microchart.InteractiveLineChart","sap.suite.ui.microchart.RadialMicroChart","sap.suite.ui.microchart.StackedBarMicroChart"],elements:["sap.suite.ui.microchart.AreaMicroChartPoint","sap.suite.ui.microchart.AreaMicroChartItem","sap.suite.ui.microchart.AreaMicroChartLabel","sap.suite.ui.microchart.BulletMicroChartData","sap.suite.ui.microchart.ColumnMicroChartData","sap.suite.ui.microchart.ColumnMicroChartLabel","sap.suite.ui.microchart.ComparisonMicroChartData","sap.suite.ui.microchart.HarveyBallMicroChartItem","sap.suite.ui.microchart.LineMicroChartPoint","sap.suite.ui.microchart.LineMicroChartEmphasizedPoint","sap.suite.ui.microchart.LineMicroChartLine","sap.suite.ui.microchart.InteractiveBarChartBar","sap.suite.ui.microchart.InteractiveDonutChartSegment","sap.suite.ui.microchart.InteractiveLineChartPoint","sap.suite.ui.microchart.StackedBarMicroChartBar"]});r.AreaMicroChartViewType={Normal:"Normal",Wide:"Wide"};r.BulletMicroChartModeType={Actual:"Actual",Delta:"Delta"};r.CommonBackgroundType={Lightest:"Lightest",ExtraLight:"ExtraLight",Light:"Light",MediumLight:"MediumLight",Medium:"Medium",Dark:"Dark",ExtraDark:"ExtraDark",Darkest:"Darkest",Transparent:"Transparent"};r.LineType={Solid:"Solid",Dashed:"Dashed",Dotted:"Dotted"};r.HorizontalAlignmentType={Left:"Left",Center:"Center",Right:"Right"};r.ComparisonMicroChartViewType={Normal:"Normal",Wide:"Wide",Responsive:"Responsive"};r.DeltaMicroChartViewType={Normal:"Normal",Wide:"Wide",Responsive:"Responsive"};r.LoadStateType={Loading:"Loading",Loaded:"Loaded",Failed:"Failed",Disabled:"Disabled"};r._aStandardMarginClassNames=["sapUiTinyMargin","sapUiSmallMargin","sapUiMediumMargin","sapUiLargeMargin","sapUiTinyMarginBeginEnd","sapUiTinyMarginTopBottom","sapUiSmallMarginBeginEnd","sapUiSmallMarginTopBottom","sapUiMediumMarginBeginEnd","sapUiMediumMarginTopBottom","sapUiLargeMarginBeginEnd","sapUiLargeMarginTopBottom","sapUiTinyMarginTop","sapUiTinyMarginBottom","sapUiTinyMarginBegin","sapUiTinyMarginEnd","sapUiSmallMarginTop","sapUiSmallMarginBottom","sapUiSmallMarginBegin","sapUiSmallMarginEnd","sapUiMediumMarginTop","sapUiMediumMarginBottom","sapUiMediumMarginBegin","sapUiMediumMarginEnd","sapUiLargeMarginTop","sapUiLargeMarginBottom","sapUiLargeMarginBegin","sapUiLargeMarginEnd","sapUiResponsiveMargin","sapUiNoMargin","sapUiNoMarginTop","sapUiNoMarginBottom","sapUiNoMarginBegin","sapUiNoMarginEnd"];r._removeStandardMargins=function(i){for(var a=0;a<r._aStandardMarginClassNames.length;a++){if(i.hasStyleClass(r._aStandardMarginClassNames[a])){i.removeStyleClass(r._aStandardMarginClassNames[a])}}};r._passParentContextToChild=function(i,a){if(i.data("_parentRenderingContext")){a.data("_parentRenderingContext",i.data("_parentRenderingContext"))}else if(typeof i.getParent==="function"){a.data("_parentRenderingContext",i.getParent())}};r._isTooltipSuppressed=function(i){return i!==null&&i!==undefined&&!i.trim()};r._checkControlIsVisible=function(i,r){function e(){return i.getVisible()&&i.getDomRef()&&i.$().is(":visible")&&i.getDomRef().getBoundingClientRect().width!==0}function t(){if(e()){a.removeListener(t);r.call(i)}}var o=i.exit;i.exit=function(){a.removeListener(t);if(o){o.call(i)}};if(e()){r.call(i)}else{a.addListener(t)}};return r});