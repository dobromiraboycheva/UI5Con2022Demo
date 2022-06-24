/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../ChartDelegate","../../../util/loadModules","sap/ui/core/Core","sap/m/library","sap/m/Text","sap/ui/mdc/library","sap/ui/mdc/odata/v4/ODataMetaModelUtil","sap/base/Log","sap/ui/mdc/util/FilterUtil","sap/ui/mdc/odata/v4/util/DelegateUtil","sap/ui/mdc/chart/ChartTypeButton","sap/ui/mdc/chart/Item","sap/ui/model/Sorter","sap/m/VBox","sap/ui/base/ManagedObjectObserver","sap/ui/core/ResizeHandler","sap/ui/mdc/p13n/panels/ChartItemPanel","sap/m/MessageStrip","../TypeUtil","../FilterBarDelegate","sap/ui/model/Filter","sap/ui/mdc/odata/v4/ChartPropertyHelper","sap/ui/thirdparty/jquery"],function(e,t,r,a,i,n,o,s,l,g,u,h,d,c,p,f,m,y,C,_,b,v,I){"use strict";var P=Object.assign({},e);var S=a.FlexJustifyContent;var T=a.FlexAlignItems;var M=new window.WeakMap;var D;var N;var O;var w;P._getState=function(e){if(M.has(e)){return M.get(e)}s.info("Couldn't get state for "+e.getId())};P._setState=function(e,t){M.set(e,t)};P.getTypeUtil=function(){return C};P.getFilterDelegate=function(){return _};P.addCondition=function(e,t,r){return Promise.resolve()};P.removeCondition=function(e,t,r){return Promise.resolve()};P._deleteState=function(e){if(this._getState(e).vizTooltip){this._getState(e).vizTooltip.destroy()}if(this._getState(e).observer){this._getState(e).observer.disconnect();this._getState(e).observer=null}return M.delete(e)};P._getChart=function(e){if(M.has(e)){return M.get(e).innerChart}s.info("Couldn't get state for "+e.getId());return undefined};P._setChart=function(e,t){if(M.has(e)){M.get(e).innerChart=t}else{M.set(e,{innerChart:t})}};P._getInnerStructure=function(e){if(M.has(e)){return M.get(e).innerStructure}s.info("Couldn't get state for "+e.getId());return undefined};P._setInnerStructure=function(e,t){if(M.has(e)){M.get(e).innerStructure=t}else{M.set(e,{innerStructure:t})}};P._getBindingInfoFromState=function(e){if(M.has(e)){return M.get(e).bindingInfo}s.info("Couldn't get state for "+e.getId());return undefined};P._setBindingInfoForState=function(e,t){if(M.has(e)){M.get(e).bindingInfo=t}else{M.set(e,{bindingInfo:t})}};P._setUpChartObserver=function(e){var t=this._getState(e);if(!t.observer){t.observer=new p(function(e){if(e.type==="destroy"){this.exit(e.object)}}.bind(this))}t.observer.observe(e,{destroy:true})};P.exit=function(e){if(this._getInnerStructure(e)){this._getInnerStructure(e).destroy()}this._deleteState(e)};P.zoomIn=function(e,t){this._getChart(e).zoom({direction:"in"})};P.zoomOut=function(e,t){this._getChart(e).zoom({direction:"out"})};P.getZoomState=function(e){if(this._getChart(e)){return this._getChart(e).getZoomInfo(this)}};P.getInnerChartSelectionHandler=function(e){return{eventId:"_selectionDetails",listener:this._getChart(e)}};P.getChartTypeLayoutConfig=function(){if(this._aChartTypeLayout){return this._aChartTypeLayout}var e=[n.ChartItemRoleType.axis1,n.ChartItemRoleType.category,n.ChartItemRoleType.series];var t=[n.ChartItemRoleType.axis1,n.ChartItemRoleType.axis2,n.ChartItemRoleType.category,n.ChartItemRoleType.series];var r=[n.ChartItemRoleType.axis1,n.ChartItemRoleType.category,n.ChartItemRoleType.category2];var a=[n.ChartItemRoleType.axis1,n.ChartItemRoleType.axis2,n.ChartItemRoleType.axis3,n.ChartItemRoleType.category,n.ChartItemRoleType.series];this._aChartTypeLayout=[{key:"column",allowedLayoutOptions:e},{key:"bar",allowedLayoutOptions:e},{key:"line",allowedLayoutOptions:e},{key:"combination",allowedLayoutOptions:e},{key:"pie",allowedLayoutOptions:e},{key:"donut",allowedLayoutOptions:e},{key:"dual_column",allowedLayoutOptions:t},{key:"dual_bar",allowedLayoutOptions:t},{key:"dual_line",allowedLayoutOptions:t},{key:"stacked_bar",allowedLayoutOptions:e},{key:"scatter",allowedLayoutOptions:t},{key:"bubble",allowedLayoutOptions:a},{key:"heatmap",allowedLayoutOptions:r},{key:"bullet",allowedLayoutOptions:e},{key:"vertical_bullet",allowedLayoutOptions:e},{key:"dual_stacked_bar",allowedLayoutOptions:t},{key:"100_stacked_bar",allowedLayoutOptions:e},{key:"stacked_column",allowedLayoutOptions:e},{key:"dual_stacked_column",allowedLayoutOptions:t},{key:"100_stacked_column",allowedLayoutOptions:e},{key:"dual_combination",allowedLayoutOptions:t},{key:"dual_horizontal_combination",allowedLayoutOptions:t},{key:"dual_horizontal_combination",allowedLayoutOptions:t},{key:"dual_stacked_combination",allowedLayoutOptions:t},{key:"dual_horizontal_stacked_combination",allowedLayoutOptions:t},{key:"stacked_combination",allowedLayoutOptions:e},{key:"100_dual_stacked_bar",allowedLayoutOptions:e},{key:"100_dual_stacked_column",allowedLayoutOptions:e},{key:"horizontal_stacked_combination",allowedLayoutOptions:e},{key:"waterfall",allowedLayoutOptions:r},{key:"horizontal_waterfall",allowedLayoutOptions:r}];return this._aChartTypeLayout};P.getAdaptionUI=function(e){return Promise.resolve(this._setupAdaptionUI(e))};P._setupAdaptionUI=function(e){var t=this.getChartTypeLayoutConfig().find(function(t){return t.key===e.getChartType()});if(!t){var r=[n.ChartItemRoleType.axis1,n.ChartItemRoleType.axis2,n.ChartItemRoleType.axis3,n.ChartItemRoleType.category,n.ChartItemRoleType.category2,n.ChartItemRoleType.series];t={key:e.getChartType(),allowedLayoutOptions:r}}var a=[{kind:"Groupable"},{kind:"Aggregatable"}];t.templateConfig=a;var i={panelConfig:t};var o=new m(i);if(e.getChartType()==="heatmap"){var s=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");o.setMessageStrip(new y({text:s.getText("chart.PERSONALIZATION_DIALOG_MEASURE_WARNING"),type:"Warning"}))}return o};P.setLegendVisible=function(e,t){if(this._getChart(e)){this._getChart(e).setVizProperties({legend:{visible:t},sizeLegend:{visible:t}})}else{s.error("Could not set legend visibility since inner chart is not yet initialized!")}};P.getSorterForItem=function(e,t){if(e.getType()==="aggregatable"){return new d(this._getAggregatedMeasureNameForMDCItem(e),t.descending)}else if(e.getType()==="groupable"){return new d(this.getInternalChartNameFromPropertyNameAndKind(t.name,"groupable",e.getParent()),t.descending)}};P.insertItemToInnerChart=function(e,t,r){if(t.getType()==="groupable"){var a=this.getInternalChartNameFromPropertyNameAndKind(t.getName(),"groupable",e);var i=this._getChart(e).getDimensionByName(a);if(!i){this.createInnerDimension(e,t)}else{i.setLabel(t.getLabel());i.setRole(t.getRole()?t.getRole():"category")}var n=this._getChart(e).getVisibleDimensions();n.splice(r,0,a);this._getChart(e).setVisibleDimensions(n)}else if(t.getType()==="aggregatable"){this.createInnerMeasure(e,t);var o=this._getChart(e).getVisibleMeasures();o.splice(r,0,this._getAggregatedMeasureNameForMDCItem(t));this._getChart(e).setVisibleMeasures(o)}this._prepareColoringForItem(t).then(function(){this._updateColoring(e,this._getChart(e).getVisibleDimensions(),this._getChart(e).getVisibleMeasures())}.bind(this));this._updateSemanticalPattern(e)};P.removeItemFromInnerChart=function(e,t){if(t.getType()==="groupable"&&this._getChart(e).getVisibleDimensions().includes(this.getInternalChartNameFromPropertyNameAndKind(t.getName(),"groupable",e))){var r=this.getInternalChartNameFromPropertyNameAndKind(t.getName(),"groupable",e);var a=this._getChart(e).getVisibleDimensions().filter(function(e){return e!==r});if(this._getState(e).inResultDimensions.length>0){this._getChart(e).setInResultDimensions(this._getState(e).inResultDimensions)}this._getChart(e).setVisibleDimensions(a)}else if(t.getType()==="aggregatable"&&this._getChart(e).getVisibleMeasures().includes(this._getAggregatedMeasureNameForMDCItem(t))){var i=[];e.getItems().filter(function(e){return e.getType()==="aggregatable"}).filter(function(e){return e!==t}).forEach(function(e){i.push(this._getAggregatedMeasureNameForMDCItem(e))}.bind(this));this._getChart(e).setVisibleMeasures(i);this._getChart(e).removeMeasure(this._getChart(e).getMeasureByName(this._getAggregatedMeasureNameForMDCItem(t)))}this._updateColoring(e,this._getChart(e).getVisibleDimensions(),this._getChart(e).getVisibleMeasures());this._updateSemanticalPattern(e)};P.addItem=function(e,t,r,a){if(t.getModel){return Promise.resolve(this._createMDCChartItem(e,t,a))}};P.removeItem=function(e,t){return Promise.resolve(true)};P.checkAndUpdateMDCItems=function(e){return new Promise(function(t,r){var a=[];e.getItems().forEach(function(t){var r=t.getName()&&t.getLabel()&&t.getType()&&t.getRole();if(!r){a.push(this._getPropertyInfosByName(t.getName(),e).then(function(e){t.setLabel(e.label);if(e.groupable){t.setType("groupable");t.setRole(t.getRole()?t.getRole():"category")}else if(e.aggregatable){t.setType("aggregatable");t.setRole(t.getRole()?t.getRole():"axis1")}}))}}.bind(this));Promise.all(a).then(function(){t()})}.bind(this))};P._createMDCChartItem=function(e,t,r){return this._getPropertyInfosByName(e,t).then(function(e){if(!e){return null}return this._createMDCItemFromProperty(e,t.getId(),r)}.bind(this))};P._createMDCItemFromProperty=function(e,t,r){if(e.groupable){return new h(t+"--GroupableItem--"+e.name,{name:e.name,label:e.label,type:"groupable",role:r?r:"category"})}if(e.aggregatable){return new h(t+"--AggregatableItem--"+e.name,{name:e.name,label:e.label,type:"aggregatable",role:r?r:"axis1"})}return null};P.initializeInnerChart=function(e){return new Promise(function(t,r){this._loadChart().then(function(r){var a=this._calculateInnerChartHeight(e);this._setInnerStructure(e,new c({justifyContent:"Center",alignItems:"Center",height:a,width:"100%"}));var n=new i;n.setText(e.getNoDataText());this._getInnerStructure(e).addItem(n);this._setUpChartObserver(e);t(this._getInnerStructure(e))}.bind(this))}.bind(this))};P.createInitialChartContent=function(e){};P._createContentFromItems=function(e){return new Promise(function(t,r){var a=[];var i=[];var n=[];var o=[];e.getItems().forEach(function(t,r){i.push(this._getPropertyInfosByName(t.getName(),e).then(function(r){if(!r){s.error("sap.ui.mdc.Chart: Item "+t.getName()+" has no property info representing it in the metadata. Make sure the name is correct and the metadata is defined correctly. Skipping the item!");return}switch(t.getType()){case"groupable":n.push(this.getInternalChartNameFromPropertyNameAndKind(t.getName(),"groupable",e));this._addInnerDimension(e,t,r);break;case"aggregatable":o.push(this._getAggregatedMeasureNameForMDCItem(t));this._addInnerMeasure(e,t,r);break;default:s.error("MDC Chart Item "+t.getId()+" with label "+t.getLabel()+' has no known type. Supported typed are: "groupable" & "aggregatable"')}a.push(this._prepareColoringForItem(t))}.bind(this)))}.bind(this));Promise.all(i).then(function(){this._getState(e).aColMeasures.forEach(function(t){if(this._getState(e).aInSettings.indexOf(t)==-1){a.push(new Promise(function(r,a){e._getPropertyByNameAsync(t).then(function(a){var i=a.aggregationMethod;var n=a.propertyPath;var s=this.getInternalChartNameFromPropertyNameAndKind(t,"aggregatable",e);var l={name:s,label:a.label,role:"axis1"};if(i&&n){l.analyticalInfo={propertyPath:n,with:i}}var g=new O(l);o.push(g);this._getChart(e).addMeasure(g);r()})}))}}.bind(this));Promise.all(a).then(function(){this._getChart(e).setVisibleDimensions(n);this._getChart(e).setVisibleMeasures(o);var r=e.getDelegate().inResultDimensions;if(r&&r instanceof Array&&r.length!=0){var a=[];r.forEach(function(t){a.push(this._getPropertyInfosByName(t,e).then(function(t){var r=this.getInternalChartNameFromPropertyNameAndKind(t.name,"groupable",e);var a=new N({name:r,label:t.label});this._getState(e).inResultDimensions.push(r);this._getChart(e).addDimension(a)}.bind(this)))}.bind(this));Promise.all(a).then(function(){this._getChart(e).setInResultDimensions(this._getState(e).inResultDimensions)}.bind(this))}this._updateColoring(e,n,o);this._updateSemanticalPattern(e);t()}.bind(this))}.bind(this))}.bind(this))};P.getInnerChart=function(e){return this._getChart(e)};P._prepareColoringForItem=function(e){return this._addCriticality(e).then(function(){this._getState(e.getParent()).aInSettings.push(e.getName());if(e.getType==="aggregatable"){this._getPropertyInfosByName(e.getName(),e.getParent()).then(function(t){for(var r=0;r<this._getAdditionalColoringMeasuresForItem(t);r++){if(this._getState(e.getParent()).aColMeasures.indexOf(this._getAdditionalColoringMeasuresForItem(t)[r])==-1){this._getState(e.getParent()).aColMeasures.push(this._getAdditionalColoringMeasuresForItem(t)[r])}}}.bind(this))}}.bind(this))};P._getAdditionalColoringMeasuresForItem=function(e){var t=[];var r=e.datapoint?e.datapoint.criticality:null;if(r&&r.DynamicThresholds){t=r.DynamicThresholds.usedMeasures}return t};P._addCriticality=function(e){return this._getPropertyInfosByName(e.getName(),e.getParent()).then(function(t){if(t.criticality||t.datapoint&&t.datapoint.criticality){var r=this._getState(e.getParent()).oColorings||{Criticality:{DimensionValues:{},MeasureValues:{}}};var a={};if(e.getType()=="groupable"){var i=t.criticality?t.criticality:[];for(var n in i){a[n]={Values:i[n]}}var o=this.getInternalChartNameFromPropertyNameAndKind(e.getName(),"groupable",e.getParent());r.Criticality.DimensionValues[o]=a}else{var i=t.datapoint&&t.datapoint.criticality?t.datapoint.criticality:[];for(var n in i){a[n]=i[n]}var s=this.getInternalChartNameFromPropertyNameAndKind(e.getName(),"aggregatable",e.getParent());r.Criticality.MeasureValues[s]=a}var l=this._getState(e.getParent());l.oColorings=r;this._setState(e.getParent(),l)}}.bind(this))};P._updateColoring=function(e,t,r){var a=I.extend(true,{},this._getState(e).oColorings),i;if(a&&a.Criticality){var n;for(i=0;i<t.length;i++){if(this._getState(e).oColorings.Criticality.DimensionValues[t[i]]){n={coloring:"Criticality",parameters:{dimension:t[i]}};delete a.Criticality.MeasureValues;break}}if(!n){delete a.Criticality.DimensionValues;for(var o in a.Criticality.MeasureValues){if(r.indexOf(o)==-1){delete a.Criticality.MeasureValues[o]}}n={coloring:"Criticality",parameters:{measure:r}}}if(n){this._getChart(e).setColorings(a);this._getChart(e).setActiveColoring(n)}}};P._updateSemanticalPattern=function(e){var t=this._getChart(e).getVisibleMeasures();t.forEach(function(t){var r=this.getPropertyFromNameAndKind(t,"aggregatable",e);if(!r){return}var a=r.datapoint;if(a){if(a.targetValue||a.foreCastValue){var i=this._getChart(e).getMeasureByName(t);i.setSemantics("actual");if(a.targetValue!=null){var n=this._getChart(e).getMeasureByName(a.targetValue);if(n){n.setSemantics("reference")}else{s.error("sap.ui.mdc.Chart: "+a.targetValue+" is not a valid measure")}}if(a.foreCastValue){var o=this._getChart(e).getMeasureByName(a.foreCastValue);if(o){o.setSemantics("projected")}else{s.error("sap.ui.comp.SmartChart: "+a.ForecastValue.Path+" is not a valid measure")}}i.setSemanticallyRelatedMeasures({referenceValueMeasure:a.targetValue,projectedValueMeasure:a.foreCastValue})}}}.bind(this))};P.getChartTypeInfo=function(e){if(!this._getChart(e)){throw"inner chart is not bound"}var t=e.getChartType(),a=r.getLibraryResourceBundle("sap.ui.mdc");var i={icon:u.mMatchingIcon[t],text:a.getText("chart.CHART_TYPE_TOOLTIP",[t])};return i};P.getAvailableChartTypes=function(e){var t=[];if(this._getChart(e)){var a=this._getChart(e).getAvailableChartTypes().available;if(t){var i=r.getLibraryResourceBundle("sap.chart.messages");for(var n=0;n<a.length;n++){var o=a[n].chart;t.push({key:o,icon:u.mMatchingIcon[o],text:i.getText("info/"+o),selected:o==e.getChartType()})}}}return t};P.getDrillStackInfo=function(){};P.getDrillStack=function(e){var t=[];t=Object.assign(t,this._getChart(e).getDrillStack());t.forEach(function(t){t.dimension=t.dimension.map(function(t){var r=this.getPropertyFromNameAndKind(t,"groupable",e);if(r){return r.name}else{s.error("MDC Chart Delegate: Couldn't map chart dimension to groupable property: "+t);return t}}.bind(this))}.bind(this));return t};P.getSortedDimensions=function(e){return new Promise(function(t,r){if(e.isPropertyHelperFinal()){t(this._sortPropertyDimensions(e.getPropertyHelper().getProperties()))}else{e.finalizePropertyHelper().then(function(){t(this._sortPropertyDimensions(e.getPropertyHelper().getProperties()))}.bind(this))}}.bind(this))};P._sortPropertyDimensions=function(e){var t=e.filter(function(e){return e.groupable});if(t){t.sort(function(e,t){if(e.label&&t.label){return e.label.localeCompare(t.label)}})}return t};P.getDrillableItems=function(e){var t=e.getItems().filter(function(e){return e.getType()==="groupable"});return t};P.setChartType=function(e,t){this._getChart(e).setChartType(t)};P.createInnerChartContent=function(e,t){return new Promise(function(r,a){this._setChart(e,new D({id:e.getId()+"--innerChart",chartType:"column",width:"100%",isAnalytical:true}));this._getChart(e).setCustomMessages({NO_DATA:e.getNoDataText()});this._getState(e).inResultDimensions=[];if(e.getHeight()){this._getChart(e).setHeight(this._calculateInnerChartHeight(e))}f.register(e,function(){this.adjustChartHeight(e)}.bind(this));var i=this._getState(e);i.aColMeasures=[];i.aInSettings=[];this._setState(e,i);this._createContentFromItems(e).then(function(){this._getChart(e).attachRenderComplete(function(){if(this._getState(e).toolbarUpdateRequested){e._updateToolbar();this._getState(e).toolbarUpdateRequested=false}}.bind(this));this._getInnerStructure(e).removeAllItems();this._getInnerStructure(e).setJustifyContent(S.Start);this._getInnerStructure(e).setAlignItems(T.Stretch);this._getInnerStructure(e).addItem(this._getChart(e));i.dataLoadedCallback=t;this._setState(e,i);var a=this._getBindingInfo(e);this.updateBindingInfo(e,a);this._performInitialBind(e,a);r()}.bind(this))}.bind(this))};P._performInitialBind=function(e,t){if(e&&t&&this._getChart(e)){this._addBindingListener(t,"dataReceived",this._getState(e).dataLoadedCallback.bind(e));this._getChart(e).bindData(t);this._setBindingInfoForState(e,t);var r=this._getState(e);r.innerChartBound=true}};P._calculateInnerChartHeight=function(e){var t=I(e.getDomRef()).height();var r=0;var a=e.getAggregation("_toolbar");var i=0;var n=e.getAggregation("_breadcrumbs");if(a){r=I(a.getDomRef()).outerHeight(true)}if(n){i=I(n.getDomRef()).outerHeight(true)}var o=i+r;if(!t){return"480px"}return t-o+"px"};P.adjustChartHeight=function(e){if(e.getHeight()&&this._getChart(e)){var t=this._calculateInnerChartHeight(e);this._getInnerStructure(e).setHeight(t);this._getChart(e).setHeight(t)}};P.requestToolbarUpdate=function(e){this._getState(e).toolbarUpdateRequested=true};P.createInnerDimension=function(e,t){this._getPropertyInfosByName(t.getName(),e).then(function(r){this._addInnerDimension(e,t,r)}.bind(this))};P.createInnerMeasure=function(e,t){this._getPropertyInfosByName(t.getName(),e).then(function(r){this._addInnerMeasure(e,t,r)}.bind(this))};P._addInnerDimension=function(e,t,r){var a=new N({name:this.getInternalChartNameFromPropertyNameAndKind(t.getName(),"groupable",e),role:t.getRole()?t.getRole():"category",label:t.getLabel()});if(r.textProperty){a.setTextProperty(r.textProperty);if(r.textFormatter){a.setTextFormatter(this._formatText.bind(r))}a.setDisplayText(true)}this._getChart(e).addDimension(a)};P._addInnerMeasure=function(e,t,r){var a=r.aggregationMethod;var i=r.propertyPath;var n={name:this._getAggregatedMeasureNameForMDCItem(t),label:t.getLabel(),role:t.getRole()?t.getRole():"axis1"};if(a&&i){n.analyticalInfo={propertyPath:i,with:a}}var o=new O(n);this._getChart(e).addMeasure(o)};P._getAggregatedMeasureNameForProperty=function(e){return e.aggregationMethod+e.name};P.rebindChart=function(e,t){this.rebind(e,t)};P.rebind=function(e,t){if(e&&t&&this._getChart(e)){this._addBindingListener(t,"dataReceived",this._getState(e).dataLoadedCallback.bind(e));if(t.binding){t.binding.bHasAnalyticalInfo=true}this._getChart(e).bindData(t);this._setBindingInfoForState(e,t);var r=this._getState(e);r.innerChartBound=true}};P._getBindingInfo=function(e){if(this._getBindingInfoFromState(e)){return this._getBindingInfoFromState(e)}var t=e.getDelegate().payload;var r="/"+t.collectionName;var a={path:r};return a};P.getInnerChartBound=function(e){var t=this._getState(e);if(!t){return false}return t.innerChartBound?true:false};P.updateBindingInfo=function(e,t){var r=A.call(this,e).concat(F.call(this,e));R(e,t);t.filters=new b(r,true);t.sorter=this.getSorters(e)};function A(e){var t=e.getP13nMode().indexOf("Filter")>-1;var r=[];if(t){var a=e.getPropertyHelper().getProperties();var i=l.getFilterInfo(this.getTypeUtil(),e.getConditions(),a);if(i.filters){r.push(i.filters)}}return r}function F(e){var t=r.byId(e.getFilter());var a=[];if(!t){return a}var i=t.getConditions();if(i){var n=t.getPropertyInfoSet?t.getPropertyInfoSet():null;var o=g.getParameterNames(t);var s=l.getFilterInfo(this.getTypeUtil(),i,n,o);if(s.filters){a.push(s.filters)}}return a}function R(e,t){var a=r.byId(e.getFilter());if(!a){return}var i=a.getConditions();var n=a.getSearch instanceof Function?a.getSearch():"";if(i){var o=g.getParametersInfo(a,i);if(o){t.path=o}}if(!t.parameters){t.parameters={}}t.parameters["$search"]=n||undefined}P.getSorters=function(e){var t;var r=e.getSortConditions()?e.getSortConditions().sorters:[];r.forEach(function(r){var a=e.getItems().find(function(e){return e.getName()===r.name});if(!a){return}var i=this.getSorterForItem(a,r);if(t){t.push(i)}else{t=[i]}}.bind(this));return t};P._getAggregatedMeasureNameForMDCItem=function(e){return this.getInternalChartNameFromPropertyNameAndKind(e.getName(),"aggregatable",e.getParent())};P.getInternalChartNameFromPropertyNameAndKind=function(e,t,r){return e};P.getPropertyFromNameAndKind=function(e,t,r){return r.getPropertyHelper().getProperty(e)};P.addInnerItem=function(e,t,r){return Promise.resolve(null)};P.insertInnerItem=function(e,t,r){};P.removeInnerItem=function(e,t,r){return Promise.resolve(true)};P.setChartTooltipVisibility=function(e,t){if(this._getChart(e)){if(t){if(!this._getState(e).vizTooltip){var r=this._getState(e);r.vizTooltip=new w;this._setState(e,r)}this._getState(e).vizTooltip.connect(this._getChart(e).getVizUid())}else if(this._getState(e).vizTooltip){this._getState(e).vizTooltip.destroy()}}else{s.error("Trying to set chart tooltip while inner chart was not yet initialized")}};P._loadChart=function(){return new Promise(function(e){var t=["sap/chart/library","sap/chart/Chart","sap/chart/data/Dimension","sap/chart/data/HierarchyDimension","sap/chart/data/TimeDimension","sap/chart/data/Measure","sap/viz/ui5/controls/VizTooltip"];function r(t,r,a,i,n,o,s){D=r;N=a;O=o;w=s;e()}sap.ui.require(t,r)})};P.getPropertyHelperClass=function(){return v};P._formatText=function(e,t){return e};P.setNoDataText=function(e,t){this._getChart(e).setCustomMessages({NO_DATA:t})};P.fetchProperties=function(e){var t=this._getModel(e);var r;if(!t){r=new Promise(function(t){e.attachModelContextChange({resolver:t},k,this)}.bind(this)).then(function(t){return this._createPropertyInfos(e.getDelegate().payload,t)}.bind(this))}else{r=this._createPropertyInfos(e.getDelegate().payload,t)}return r.then(function(t){if(e.data){e.data("$mdcChartPropertyInfo",t)}return t})};function k(e,t){var r=e.getSource();var a=this._getModel(r);if(a){r.detachModelContextChange(k);t.resolver(a)}}P._createPropertyInfos=function(e,t){var r=[];var a="/"+e.collectionName;var i=t.getMetaModel();return Promise.all([i.requestObject(a+"/"),i.requestObject(a+"@")]).then(function(e){var t=e[0],s=e[1];var l=s["@Org.OData.Capabilities.V1.SortRestrictions"]||{};var g=o.getSortRestrictionsInfo(l);var u=s["@Org.OData.Capabilities.V1.FilterRestrictions"];var h=o.getFilterRestrictionsInfo(u);for(var d in t){var c=t[d];if(c&&c.$kind==="Property"){if(c.$isCollection){continue}var p=i.getObject(a+"/"+d+"@");if(!p["@Org.OData.Aggregation.V1.Aggregatable"]&&!p["@Org.OData.Aggregation.V1.Groupable"]){continue}if(p["@Org.OData.Aggregation.V1.Aggregatable"]){r=r.concat(this._createPropertyInfosForAggregatable(d,p,c,h,g))}if(p["@Org.OData.Aggregation.V1.Groupable"]){r.push({name:d,propertyPath:d,label:p["@com.sap.vocabularies.Common.v1.Label"]||d,sortable:g[d]?g[d].sortable:true,filterable:h[d]?h[d].filterable:true,groupable:true,aggregatable:false,maxConditions:o.isMultiValueFilterExpression(h.propertyInfo[d])?-1:1,sortKey:d,dataType:c.$Type,role:n.ChartItemRoleType.category,criticality:null,textProperty:p["@com.sap.vocabularies.Common.v1.Text"]?p["@com.sap.vocabularies.Common.v1.Text"].$Path:null})}}}return r}.bind(this))};P._createPropertyInfosForAggregatable=function(e,t,r,a,i){var n=[];if(t["@Org.OData.Aggregation.V1.SupportedAggregationMethods"]){t["@Org.OData.Aggregation.V1.SupportedAggregationMethods"].forEach(function(s){n.push({name:s+e,propertyPath:e,label:t["@com.sap.vocabularies.Common.v1.Label"]+" ("+s+")"||e+" ("+s+")",sortable:i[e]?i[e].sortable:true,filterable:a[e]?a[e].filterable:true,groupable:false,aggregatable:t["@Org.OData.Aggregation.V1.Aggregatable"],aggregationMethod:s,maxConditions:o.isMultiValueFilterExpression(a.propertyInfo[e])?-1:1,dataType:r.$Type,datapoint:null})})}return n};P._getPropertyInfosByName=function(e,t){return t._getPropertyByNameAsync(e)};P._getModel=function(e){var t=e.getDelegate().payload;return e.getModel(t.model)};P._addBindingListener=function(e,t,r){if(!e.events){e.events={}}if(!e.events[t]){e.events[t]=r}else{var a=e.events[t];e.events[t]=function(){r.apply(this,arguments);a.apply(this,arguments)}}};return P});