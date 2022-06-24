/*!
 * SAPUI5
 * (c) Copyright 2009-2022 SAP SE. All rights reserved.
 */
sap.ui.define(["sap/ui/Device","sap/ui/core/Core","sap/ui/core/theming/Parameters","sap/base/Log","sap/base/util/ObjectPath","sap/ui/thirdparty/jquery","sap/viz/libs/CssPlugin","sap/viz/ui5/format/ChartFormatter","sap/viz/ui5/api/env/Format","sap/ui/core/library","sap/ui/thirdparty/d3","sap/ui/thirdparty/jqueryui/jquery-ui-core","sap/ui/thirdparty/jqueryui/jquery-ui-widget","sap/ui/thirdparty/jqueryui/jquery-ui-mouse","sap/ui/thirdparty/jqueryui/jquery-ui-draggable","sap/ui/thirdparty/jqueryui/jquery-ui-droppable","sap/viz/libs/canvg","sap/viz/libs/rgbcolor","sap/viz/libs/sap-viz-info-framework","sap/viz/libs/sap-viz-info-charts","sap/viz/resources/chart/templates/standard_fiori/template","sap/viz/ui5/controls/libs/sap-viz-vizframe/sap-viz-vizframe","sap/viz/ui5/controls/libs/sap-viz-vizservices/sap-viz-vizservices","sap/ui/thirdparty/require"],function(i,a,e,t,s,r,p){"use strict";var o=sap.ui.getCore().initLibrary({name:"sap.viz",dependencies:["sap.ui.core"],types:["sap.viz.ui5.types.Area_drawingEffect","sap.viz.ui5.types.Area_marker_shape","sap.viz.ui5.types.Area_mode","sap.viz.ui5.types.Area_orientation","sap.viz.ui5.types.Axis_gridline_type","sap.viz.ui5.types.Axis_label_unitFormatType","sap.viz.ui5.types.Axis_position","sap.viz.ui5.types.Axis_type","sap.viz.ui5.types.Background_direction","sap.viz.ui5.types.Background_drawingEffect","sap.viz.ui5.types.Bar_drawingEffect","sap.viz.ui5.types.Bar_orientation","sap.viz.ui5.types.Bubble_drawingEffect","sap.viz.ui5.types.Bullet_drawingEffect","sap.viz.ui5.types.Bullet_orientation","sap.viz.ui5.types.Combination_drawingEffect","sap.viz.ui5.types.Combination_orientation","sap.viz.ui5.types.Datalabel_orientation","sap.viz.ui5.types.Datalabel_outsidePosition","sap.viz.ui5.types.Datalabel_paintingMode","sap.viz.ui5.types.Datalabel_position","sap.viz.ui5.types.Legend_layout_position","sap.viz.ui5.types.Line_drawingEffect","sap.viz.ui5.types.Line_marker_shape","sap.viz.ui5.types.Line_orientation","sap.viz.ui5.types.Pie_drawingEffect","sap.viz.ui5.types.Pie_valign","sap.viz.ui5.types.Scatter_drawingEffect","sap.viz.ui5.types.StackedVerticalBar_drawingEffect","sap.viz.ui5.types.StackedVerticalBar_mode","sap.viz.ui5.types.StackedVerticalBar_orientation","sap.viz.ui5.types.Title_alignment","sap.viz.ui5.types.Tooltip_drawingEffect","sap.viz.ui5.types.VerticalBar_drawingEffect","sap.viz.ui5.types.VerticalBar_orientation","sap.viz.ui5.types.controller.Interaction_pan_orientation","sap.viz.ui5.types.controller.Interaction_selectability_mode","sap.viz.ui5.types.legend.Common_alignment","sap.viz.ui5.types.legend.Common_drawingEffect","sap.viz.ui5.types.legend.Common_position","sap.viz.ui5.types.legend.Common_type"],interfaces:[],controls:["sap.viz.ui5.controls.chartpopover.ChartPopover","sap.viz.ui5.controls.chartpopover.ContentPanel","sap.viz.ui5.controls.chartpopover.HeaderBar","sap.viz.ui5.controls.chartpopover.ShapeMarker","sap.viz.ui5.controls.chartpopover.SubActionItemsPage","sap.viz.ui5.controls.charttooltip.ContentPanel","sap.viz.ui5.controls.charttooltip.TooltipContainer","sap.viz.ui5.controls.common.BaseControl","sap.viz.ui5.controls.Popover","sap.viz.ui5.controls.VizFrame","sap.viz.ui5.controls.VizRangeSlider","sap.viz.ui5.controls.VizSlider","sap.viz.ui5.controls.VizSliderBasic","sap.viz.ui5.controls.VizTooltip","sap.viz.ui5.core.BaseChart","sap.viz.ui5.VizContainer","sap.viz.ui5.Area","sap.viz.ui5.Area100","sap.viz.ui5.Bar","sap.viz.ui5.Bubble","sap.viz.ui5.Bullet","sap.viz.ui5.Column","sap.viz.ui5.Combination","sap.viz.ui5.Donut","sap.viz.ui5.DualBar","sap.viz.ui5.DualColumn","sap.viz.ui5.DualCombination","sap.viz.ui5.DualLine","sap.viz.ui5.DualStackedColumn","sap.viz.ui5.DualStackedColumn100","sap.viz.ui5.Heatmap","sap.viz.ui5.HorizontalArea","sap.viz.ui5.HorizontalArea100","sap.viz.ui5.Line","sap.viz.ui5.Pie","sap.viz.ui5.Scatter","sap.viz.ui5.StackedColumn","sap.viz.ui5.StackedColumn100","sap.viz.ui5.TimeBubble","sap.viz.ui5.Treemap"],elements:["sap.viz.ui5.controls.common.feeds.AnalysisObject","sap.viz.ui5.controls.common.feeds.FeedItem","sap.viz.ui5.core.BaseStructuredType","sap.viz.ui5.data.Dataset","sap.viz.ui5.data.CustomDataset","sap.viz.ui5.data.DimensionDefinition","sap.viz.ui5.data.FlattenedDataset","sap.viz.ui5.data.MeasureDefinition","sap.viz.ui5.types.Area","sap.viz.ui5.types.Area_animation","sap.viz.ui5.types.Area_hoverline","sap.viz.ui5.types.Area_marker","sap.viz.ui5.types.Area_tooltip","sap.viz.ui5.types.Axis","sap.viz.ui5.types.Axis_axisTick","sap.viz.ui5.types.Axis_axisline","sap.viz.ui5.types.Axis_gridline","sap.viz.ui5.types.Axis_indicator","sap.viz.ui5.types.Axis_label","sap.viz.ui5.types.Axis_layoutInfo","sap.viz.ui5.types.Axis_scale","sap.viz.ui5.types.Axis_title","sap.viz.ui5.types.Background","sap.viz.ui5.types.Background_border","sap.viz.ui5.types.Background_border_bottom","sap.viz.ui5.types.Background_border_left","sap.viz.ui5.types.Background_border_right","sap.viz.ui5.types.Background_border_top","sap.viz.ui5.types.Bar","sap.viz.ui5.types.Bar_animation","sap.viz.ui5.types.Bar_tooltip","sap.viz.ui5.types.Bubble","sap.viz.ui5.types.Bubble_animation","sap.viz.ui5.types.Bubble_axisTooltip","sap.viz.ui5.types.Bubble_hoverline","sap.viz.ui5.types.Bullet","sap.viz.ui5.types.Bullet_tooltip","sap.viz.ui5.types.Combination","sap.viz.ui5.types.Combination_animation","sap.viz.ui5.types.Combination_bar","sap.viz.ui5.types.Combination_dataShape","sap.viz.ui5.types.Combination_line","sap.viz.ui5.types.Combination_line_marker","sap.viz.ui5.types.Combination_tooltip","sap.viz.ui5.types.Datalabel","sap.viz.ui5.types.Datatransform","sap.viz.ui5.types.Datatransform_autoBinning","sap.viz.ui5.types.Datatransform_dataSampling","sap.viz.ui5.types.Datatransform_dataSampling_grid","sap.viz.ui5.types.Heatmap","sap.viz.ui5.types.Heatmap_animation","sap.viz.ui5.types.Heatmap_border","sap.viz.ui5.types.Heatmap_tooltip","sap.viz.ui5.types.Legend","sap.viz.ui5.types.Legend_layout","sap.viz.ui5.types.Line","sap.viz.ui5.types.Line_animation","sap.viz.ui5.types.Line_hoverline","sap.viz.ui5.types.Line_marker","sap.viz.ui5.types.Line_tooltip","sap.viz.ui5.types.Pie","sap.viz.ui5.types.Pie_animation","sap.viz.ui5.types.Pie_tooltip","sap.viz.ui5.types.RootContainer","sap.viz.ui5.types.RootContainer_layout","sap.viz.ui5.types.Scatter","sap.viz.ui5.types.Scatter_animation","sap.viz.ui5.types.Scatter_axisTooltip","sap.viz.ui5.types.Scatter_hoverline","sap.viz.ui5.types.StackedVerticalBar","sap.viz.ui5.types.StackedVerticalBar_animation","sap.viz.ui5.types.StackedVerticalBar_tooltip","sap.viz.ui5.types.Title","sap.viz.ui5.types.Title_layout","sap.viz.ui5.types.Tooltip","sap.viz.ui5.types.Tooltip_background","sap.viz.ui5.types.Tooltip_bodyDimensionLabel","sap.viz.ui5.types.Tooltip_bodyDimensionValue","sap.viz.ui5.types.Tooltip_bodyMeasureLabel","sap.viz.ui5.types.Tooltip_bodyMeasureValue","sap.viz.ui5.types.Tooltip_closeButton","sap.viz.ui5.types.Tooltip_footerLabel","sap.viz.ui5.types.Tooltip_separationLine","sap.viz.ui5.types.Treemap","sap.viz.ui5.types.Treemap_animation","sap.viz.ui5.types.Treemap_border","sap.viz.ui5.types.Treemap_tooltip","sap.viz.ui5.types.VerticalBar","sap.viz.ui5.types.VerticalBar_animation","sap.viz.ui5.types.VerticalBar_tooltip","sap.viz.ui5.types.XYContainer","sap.viz.ui5.types.controller.Interaction","sap.viz.ui5.types.controller.Interaction_pan","sap.viz.ui5.types.controller.Interaction_selectability","sap.viz.ui5.types.layout.Dock","sap.viz.ui5.types.layout.Stack","sap.viz.ui5.types.legend.Common","sap.viz.ui5.types.legend.Common_title"],version:"1.102.1"});o.ui5.types.Area_drawingEffect={normal:"normal",glossy:"glossy"};o.ui5.types.Area_marker_shape={circle:"circle",diamond:"diamond",triangleUp:"triangleUp",triangleDown:"triangleDown",triangleLeft:"triangleLeft",triangleRight:"triangleRight",cross:"cross",intersection:"intersection"};o.ui5.types.Area_mode={comparison:"comparison",percentage:"percentage"};o.ui5.types.Area_orientation={vertical:"vertical",horizontal:"horizontal"};o.ui5.types.Axis_gridline_type={line:"line",dotted:"dotted",incised:"incised"};o.ui5.types.Axis_label_unitFormatType={MetricUnits:"MetricUnits",FinancialUnits:"FinancialUnits"};o.ui5.types.Axis_position={left:"left",right:"right",top:"top",bottom:"bottom"};o.ui5.types.Axis_type={value:"value",category:"category",timeValue:"timeValue"};o.ui5.types.Background_direction={horizontal:"horizontal",vertical:"vertical"};o.ui5.types.Background_drawingEffect={normal:"normal",glossy:"glossy"};o.ui5.types.Bar_drawingEffect={normal:"normal",glossy:"glossy"};o.ui5.types.Bar_orientation={horizontal:"horizontal",vertical:"vertical"};o.ui5.types.Bubble_drawingEffect={normal:"normal",glossy:"glossy"};o.ui5.types.Bullet_drawingEffect={normal:"normal",glossy:"glossy"};o.ui5.types.Bullet_orientation={horizontal:"horizontal",vertical:"vertical"};o.ui5.types.Combination_drawingEffect={normal:"normal",glossy:"glossy"};o.ui5.types.Combination_orientation={horizontal:"horizontal",vertical:"vertical"};o.ui5.types.Datalabel_orientation={horizontal:"horizontal",vertical:"vertical"};o.ui5.types.Datalabel_outsidePosition={up:"up",down:"down",left:"left",right:"right"};o.ui5.types.Datalabel_paintingMode={rectCoordinate:"rectCoordinate",polarCoordinate:"polarCoordinate"};o.ui5.types.Datalabel_position={inside:"inside",outside:"outside"};o.ui5.types.Legend_layout_position={top:"top",bottom:"bottom",right:"right",left:"left"};o.ui5.types.Line_drawingEffect={normal:"normal",glossy:"glossy"};o.ui5.types.Line_marker_shape={circle:"circle",diamond:"diamond",triangleUp:"triangleUp",triangleDown:"triangleDown",triangleLeft:"triangleLeft",triangleRight:"triangleRight",cross:"cross",intersection:"intersection"};o.ui5.types.Line_orientation={horizontal:"horizontal",vertical:"vertical"};o.ui5.types.Pie_drawingEffect={normal:"normal",glossy:"glossy"};o.ui5.types.Pie_valign={top:"top",center:"center"};o.ui5.types.Scatter_drawingEffect={normal:"normal",glossy:"glossy"};o.ui5.types.StackedVerticalBar_drawingEffect={normal:"normal",glossy:"glossy"};o.ui5.types.StackedVerticalBar_mode={comparison:"comparison",percentage:"percentage"};o.ui5.types.StackedVerticalBar_orientation={horizontal:"horizontal",vertical:"vertical"};o.ui5.types.Title_alignment={left:"left",center:"center",right:"right"};o.ui5.types.Tooltip_drawingEffect={normal:"normal",glossy:"glossy"};o.ui5.types.VerticalBar_drawingEffect={normal:"normal",glossy:"glossy"};o.ui5.types.VerticalBar_orientation={horizontal:"horizontal",vertical:"vertical"};o.ui5.types.controller.Interaction_pan_orientation={horizontal:"horizontal",vertical:"vertical",both:"both"};o.ui5.types.controller.Interaction_selectability_mode={exclusive:"exclusive",inclusive:"inclusive",single:"single",multiple:"multiple",none:"none"};o.ui5.types.legend.Common_alignment={start:"start",middle:"middle",end:"end"};o.ui5.types.legend.Common_drawingEffect={normal:"normal",glossy:"glossy"};o.ui5.types.legend.Common_position={top:"top",bottom:"bottom",right:"right",left:"left"};o.ui5.types.legend.Common_type={ColorLegend:"ColorLegend",BubbleColorLegend:"BubbleColorLegend",SizeLegend:"SizeLegend",MeasureBasedColoringLegend:"MeasureBasedColoringLegend"};o.__svg_support=!!document.createElementNS&&!!document.createElementNS("http://www.w3.org/2000/svg","svg").createSVGRect;if(window.define){window.define("css",new p)}function n(){var i={"sap.viz.core.BaseChart":"sap.viz.ui5.core.BaseChart","sap.viz.core.BaseStructuredType":"sap.viz.ui5.core.BaseStructuredType","sap.viz.core.Dataset":"sap.viz.ui5.data.Dataset","sap.viz.core.DimensionDefinition":"sap.viz.ui5.data.DimensionDefinition","sap.viz.core.FlattenedDataset":"sap.viz.ui5.data.FlattenedDataset","sap.viz.core.MeasureDefinition":"sap.viz.ui5.data.MeasureDefinition","sap.viz.Bar":"sap.viz.ui5.Bar","sap.viz.Bubble":"sap.viz.ui5.Bubble","sap.viz.VerticalBar":"sap.viz.ui5.Column","sap.viz.Combination":"sap.viz.ui5.Combination","sap.viz.Donut":"sap.viz.ui5.Donut","sap.viz.Line":"sap.viz.ui5.Line","sap.viz.Pie":"sap.viz.ui5.Pie","sap.viz.Scatter":"sap.viz.ui5.Scatter","sap.viz.StackedVerticalBar":"sap.viz.ui5.StackedColumn","sap.viz.PercentageStackedVerticalBar":"sap.viz.ui5.StackedColumn100"};r.each(i,function(i,a){s.set(i,function(){t.warning("[Deprecated] chart '"+i+"' has been deprecated for several releases and will be removed soon. Use '"+a+"' instead.");var e=s.get(a||"");var r=Object.create(e.prototype||null);return e.apply(r,arguments)||r});s.set(i+".extend",function(){t.warning("[Deprecated] chart '"+i+"' has been deprecated for several releases and will be removed soon. Use '"+a+"' instead.");return s.get(a||"").extend.apply(this,arguments)});s.set(i+".getMetadata",function(){t.warning("[Deprecated] chart '"+i+"' has been deprecated for several releases and will be removed soon. Use '"+a+"' instead.");return s.get(a||"").getMetadata.apply(this,arguments)})});var e=a.getLoadedLibraries()["sap.viz"];if(e&&e.types){r.each(e.types,function(i,a){if(a.indexOf("sap.viz.ui5.types.")===0){s.set("sap.viz.types."+a.slice("sap.viz.ui5.types.".length),s.get(a||""))}})}}n();var l=false;var u={status:"unloaded"};o._initializeVIZ=function(){if(!o.__svg_support){return}if(l){return}o._initializeENV(true);l=true};o._initializeVIZControls=function(i,a){if(!o.__svg_support){a(false)}if(u.status==="unloaded"){u.callbacks=[a];u.status="loading";o._initializeENV(!l,i?"container":"controls",function(){u.status="loaded";if(u&&u.callbacks){for(var i=0;i<u.callbacks.length;i++){u.callbacks[i](true)}delete u.callbacks}});l=true}else if(u.status==="loading"){u.callbacks.push(a)}else if(u.status==="loaded"){a(true)}};o._initializeENV=function(e,s,r){var p=sap.viz.api.env.Resource.path("sap.viz.api.env.Language.loadPaths")||[];if(e){p=[];p.push(sap.ui.require.toUrl("sap/viz/resources/chart/langs")+"/");p.push(sap.ui.require.toUrl("sap/viz/resources/framework/langs")+"/")}if(s==="container"){p.push(sap.ui.require.toUrl("sap/viz/ui5/container/libs/locale")+"/")}else if(s==="controls"){p.push(sap.ui.require.toUrl("sap/viz/ui5/controls/libs/sap-viz-vizframe/resources/locale")+"/")}var n="auto";if(i.system.desktop===true){n="off"}else if(i.system.desktop===false){n="on"}sap.viz.api.env.globalSettings({treatAsMobile:n});if(p.length>0){if(s){sap.viz.api.env.Format.useDefaultFormatter(true);sap.viz.api.env.globalSettings({useLatestFormatPrefix:true})}sap.viz.api.env.Resource.path("sap.viz.api.env.Language.loadPaths",p);t.info("VIZ: load path for lang manager set to "+p);if(s){if(s==="container"){var l=sap.viz.controls.common.config.GlobalConfig;l.defaultAssetsRoot(sap.ui.require.toUrl("sap/viz/ui5/container/libs")+"/")}}if(s){sap.viz.api.env.Resource.path("sap.viz.api.env.Template.loadPaths",[sap.ui.require.toUrl("sap/viz/resources/chart/templates")+"/"]);a.attachThemeChanged(function(i){o._applyTheme()});o._applyTheme()}o._applyLocale(r)}};o._applyTheme=function(){o._changeTemplate("standard_fiori");var i=["sapUiChartPaletteQualitativeHue1","sapUiChartPaletteQualitativeHue2","sapUiChartPaletteQualitativeHue3","sapUiChartPaletteQualitativeHue4","sapUiChartPaletteQualitativeHue5","sapUiChartPaletteQualitativeHue6","sapUiChartPaletteQualitativeHue7","sapUiChartPaletteQualitativeHue8","sapUiChartPaletteQualitativeHue9","sapUiChartPaletteQualitativeHue10","sapUiChartPaletteQualitativeHue11","sapUiChartPaletteQualitativeHue12","sapUiChartPaletteQualitativeHue13","sapUiChartPaletteQualitativeHue14","sapUiChartPaletteQualitativeHue15","sapUiChartPaletteQualitativeHue16","sapUiChartPaletteQualitativeHue17","sapUiChartPaletteQualitativeHue18","sapUiChartPaletteQualitativeHue19","sapUiChartPaletteQualitativeHue20","sapUiChartPaletteQualitativeHue21","sapUiChartPaletteQualitativeHue22","sapUiChartPaletteSemanticBadLight3","sapUiChartPaletteSemanticBadLight2","sapUiChartPaletteSemanticBadLight1","sapUiChartPaletteSemanticBad","sapUiChartPaletteSemanticBadDark1","sapUiChartPaletteSemanticBadDark2","sapUiChartPaletteSemanticCriticalLight3","sapUiChartPaletteSemanticCriticalLight2","sapUiChartPaletteSemanticCriticalLight1","sapUiChartPaletteSemanticCritical","sapUiChartPaletteSemanticCriticalDark1","sapUiChartPaletteSemanticCriticalDark2","sapUiChartPaletteSemanticGoodLight3","sapUiChartPaletteSemanticGoodLight2","sapUiChartPaletteSemanticGoodLight1","sapUiChartPaletteSemanticGood","sapUiChartPaletteSemanticGoodDark1","sapUiChartPaletteSemanticGoodDark2","sapUiChartPaletteSemanticNeutralLight3","sapUiChartPaletteSemanticNeutralLight2","sapUiChartPaletteSemanticNeutralLight1","sapUiChartPaletteSemanticNeutral","sapUiChartPaletteSemanticNeutralDark1","sapUiChartPaletteSemanticNeutralDark2","sapUiChartPaletteNoSemDiv1Dark2","sapUiChartPaletteNoSemDiv1Dark1","sapUiChartPaletteNoSemDiv1","sapUiChartPaletteNoSemDiv1Light1","sapUiChartPaletteNoSemDiv1Light2","sapUiChartPaletteNoSemDiv1Light3","sapUiChartPaletteSequentialHue1Light3","sapUiChartPaletteSequentialHue1Light2","sapUiChartPaletteSequentialHue1Light1","sapUiChartPaletteSequentialHue1","sapUiChartPaletteSequentialHue1Dark1","sapUiChartPaletteSequentialHue1Dark2","sapUiChartPaletteSequentialHue2Light3","sapUiChartPaletteSequentialHue2Light2","sapUiChartPaletteSequentialHue2Light1","sapUiChartPaletteSequentialHue2","sapUiChartPaletteSequentialHue2Dark1","sapUiChartPaletteSequentialHue2Dark2","sapUiChartPaletteSequentialHue3Light3","sapUiChartPaletteSequentialHue3Light2","sapUiChartPaletteSequentialHue3Light1","sapUiChartPaletteSequentialHue3","sapUiChartPaletteSequentialHue3Dark1","sapUiChartPaletteSequentialHue3Dark2","sapUiChartPaletteSequentialHue6Light3","sapUiChartPaletteSequentialHue6Light2","sapUiChartPaletteSequentialHue6Light1","sapUiChartPaletteSequentialHue6","sapUiChartPaletteSequentialHue6Dark1","sapUiChartPaletteSequentialHue6Dark2","sapUiChartPaletteSequentialNeutralLight3","sapUiChartPaletteSequentialNeutralLight2","sapUiChartPaletteSequentialNeutralLight1","sapUiChartPaletteSequentialNeutral","sapUiChartPaletteSequentialNeutralDark1","sapUiChartPaletteSequentialNeutralDark2","sapUiChoroplethRegionBG","sapUiChartZeroAxisColor","sapUiNegativeElement","sapUiCriticalElement","sapUiPositiveElement","sapUiNeutralElement"];var a=e.get({name:i,callback:function(){}});sap.viz.api.env.globalSettings({colorMapping:a})};o._changeTemplate=function(i){if(sap.viz.api.env.Template.get()!==i){sap.viz.api.env.Template.set(i)}};o._applyLocale=function(i){var e=a.getConfiguration();var s=e.getLocale();var r=s.getLanguage();if(r==="zh"){r=e.getSAPLogonLanguage()==="ZH"?"zh_CN":"zh_TW"}sap.viz.api.env.Locale.set(r,function(){if(i){i()}});t.info("VIZ: env initialized (locale="+a.getConfiguration().getLanguage()+")")};return o});